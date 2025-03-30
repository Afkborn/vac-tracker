require("dotenv").config();
const axios = require("axios");
const Messages = require("../constants/Messages");
const Tracker = require("../model/Tracker");
const getTimeForLog = require("../common/time");
const Config = require("../constants/Config");

const {
  addTrackersToDiscordUser,
  deleteTrackersFromDiscordUser,
} = require("./DiscordUserActions");
var sprintf = require("sprintf-js").sprintf;

async function getTrackerFromSteamID(steamID) {
  try {
    return await Tracker.findOne({ steamid: steamID }).exec();
  } catch (error) {
    console.error(
      getTimeForLog() + `Error finding tracker for steamID ${steamID}:`,
      error
    );
    return null;
  }
}

async function trackSteamUser(steamUser, discordUser, interaction) {
  try {
    const tracker = await getTrackerFromSteamID(steamUser.steamid);

    if (tracker) {
      const isTrackerRegisteredToDiscordUser = discordUser.trackers.some(
        (t) => t.toString() === tracker._id.toString()
      );

      if (isTrackerRegisteredToDiscordUser) {
        await interaction.editReply({
          content: sprintf(Messages.USER_TRACK_ALREADY, steamUser.personaname),
          components: [],
        });
      } else {
        const userEntry = {
          discordUser: discordUser._id,
          channelId: interaction.channelId,
          guildId: interaction.guildId,
        };

        const userExists = tracker.users.some(
          (u) => u.discordUser.toString() === discordUser._id.toString()
        );

        if (!userExists) {
          tracker.users.push(userEntry);
          await tracker.save();
        }

        const result = await addTrackersToDiscordUser(discordUser, tracker._id);

        if (result) {
          await interaction.editReply({
            content: sprintf(Messages.USER_TRACK_NOW, steamUser.personaname),
            components: [],
          });
        } else {
          await interaction.editReply({
            content: Messages.USER_TRACK_FAILED,
            components: [],
          });
        }
      }
    } else {
      const configuration = {
        method: "get",
        url: `${Config.API.STEAM_PLAYER_BANS}?key=${process.env.STEAM_API_KEY}&steamids=${steamUser.steamid}`,
      };

      const response = await axios(configuration);
      const player = response.data.players[0];

      const isTrackerRegisteredToDiscordUser = discordUser.trackers.some(
        (tracker) => tracker.steamid === steamUser.steamid
      );

      if (isTrackerRegisteredToDiscordUser) {
        await interaction.editReply({
          content: sprintf(Messages.USER_TRACK_ALREADY, steamUser.personaname),
          components: [],
        });
        return;
      }

      if (player.VACBanned) {
        await interaction.editReply({
          content: sprintf(
            Messages.USER_BANNED_ALREADY,
            steamUser.personaname,
            steamUser.steamid,
            player.DaysSinceLastBan
          ),
          components: [],
        });
        return;
      }

      try {
        const tracker = new Tracker({
          steamUser: steamUser._id,
          steamid: steamUser.steamid,
          CommunityBanned: player.CommunityBanned,
          VACBanned: player.VACBanned,
          NumberOfVACBans: player.NumberOfVACBans,
          DaysSinceLastBan: player.DaysSinceLastBan,
          NumberOfGameBans: player.NumberOfGameBans,
          EconomyBan: player.EconomyBan,
          isBanned: player.VACBanned,
          users: [
            {
              discordUser: discordUser._id,
              channelId: interaction.channelId,
              guildId: interaction.guildId,
            },
          ],
          lastCheck: new Date(),
        });

        const savedTracker = await tracker.save();
        await addTrackersToDiscordUser(discordUser, savedTracker._id);

        await interaction.editReply({
          content: sprintf(Messages.USER_TRACK_NOW, steamUser.personaname),
          components: [],
        });
      } catch (error) {
        console.error(getTimeForLog() + "Error saving tracker:", error);

        if (error.code === 11000) {
          console.log(
            getTimeForLog() +
              "Duplicate key error, trying to find existing tracker..."
          );
          const existingTracker = await Tracker.findOne({
            steamUser: steamUser._id,
          }).exec();

          if (existingTracker) {
            await addTrackersToDiscordUser(discordUser, existingTracker._id);

            const userEntry = {
              discordUser: discordUser._id,
              channelId: interaction.channelId,
              guildId: interaction.guildId,
            };

            const userExists = existingTracker.users.some(
              (u) => u.discordUser.toString() === discordUser._id.toString()
            );

            if (!userExists) {
              existingTracker.users.push(userEntry);
              await existingTracker.save();
            }

            await interaction.editReply({
              content: sprintf(Messages.USER_TRACK_NOW, steamUser.personaname),
              components: [],
            });
            return;
          }
        }

        await interaction.editReply({
          content: Messages.USER_TRACK_FAILED,
          components: [],
        });
      }
    }
  } catch (error) {
    console.error(getTimeForLog() + "Track steam user error:", error);

    if (interaction.deferred || interaction.replied) {
      try {
        await interaction.editReply({
          content: Messages.USER_TRACK_FAILED,
          components: [],
        });
      } catch (replyError) {
        console.error(
          getTimeForLog() + "Error sending error message:",
          replyError
        );
      }
    }
  }
}

async function getTrackersWithSteam(discordUser) {
  try {
    return await Tracker.find({ _id: { $in: discordUser.trackers } })
      .populate("steamUser")
      .exec();
  } catch (error) {
    console.error(
      getTimeForLog() + "Error getting trackers with Steam:",
      error
    );
    return [];
  }
}

async function getTrackerObjectFromMongo_WithSteam(trackerID) {
  try {
    return await Tracker.findOne({ _id: trackerID })
      .populate("steamUser")
      .exec();
  } catch (error) {
    console.error(
      getTimeForLog() + `Error getting tracker ${trackerID}:`,
      error
    );
    return null;
  }
}

async function unTrackSteamUser(discordUser, tracker, interaction) {
  try {
    const result = await deleteTrackersFromDiscordUser(
      discordUser,
      tracker._id
    );

    if (result) {
      await interaction.editReply({
        content: sprintf(
          Messages.USER_UNTRACK_NOW,
          tracker.steamUser.personaname
        ),
        components: [],
      });

      const userIndex = tracker.users.findIndex(
        (u) => u.discordUser.toString() === discordUser._id.toString()
      );

      if (userIndex > -1) {
        tracker.users.splice(userIndex, 1);
        await tracker.save();
      }
    } else {
      console.log(getTimeForLog() + "Failed to delete from DiscordUser");
      await interaction.editReply({
        content: Messages.USER_UNTRACK_FAILED,
        components: [],
      });
    }
  } catch (error) {
    console.error(getTimeForLog() + "Error untracking steam user:", error);

    if (interaction.deferred || interaction.replied) {
      try {
        await interaction.editReply({
          content: Messages.USER_UNTRACK_FAILED,
          components: [],
        });
      } catch (replyError) {
        console.error(
          getTimeForLog() + "Error sending error message:",
          replyError
        );
      }
    }
  }
}

async function getCountOfBannedTrackers() {
  try {
    return await Tracker.countDocuments({ isBanned: true });
  } catch (error) {
    console.error(getTimeForLog() + "Error counting banned trackers:", error);
    return 0;
  }
}

async function getBannedSteamUsers() {
  try {
    return await Tracker.find({ isBanned: true }).populate("steamUser").exec();
  } catch (error) {
    console.error(getTimeForLog() + "Error getting banned steam users:", error);
    return [];
  }
}

module.exports = {
  trackSteamUser,
  getTrackersWithSteam,
  unTrackSteamUser,
  getTrackerObjectFromMongo_WithSteam,
  getCountOfBannedTrackers,
  getBannedSteamUsers,
};
