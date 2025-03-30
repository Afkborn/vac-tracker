const getTimeForLog = require("../common/time");
const Tracker = require("../model/Tracker");
require("dotenv").config();
const Messages = require("../constants/Messages");
const Config = require("../constants/Config");
const Emojis = require("../constants/Emojis");
var sprintf = require("sprintf-js").sprintf;
const axios = require("axios");

// Config'den aralıkları kullanıyoruz
const TRACK_INTERVAL = Config.SERVICE.TRACK_INTERVAL;
const SERVICE_INTERVAL = Config.SERVICE.SERVICE_INTERVAL;

async function getDueTracks() {
  try {
    const trackers = await Tracker.find({
      isBanned: false,
    }).populate("steamUser users.discordUser");
    return trackers;
  } catch (error) {
    console.error(getTimeForLog() + "Error getting due tracks:", error);
    return [];
  }
}

async function trackSteamUser(track, client) {
  try {
    console.log(
      getTimeForLog() +
        "Tracking " +
        track.steamUser.personaname +
        " with id: " +
        track.steamUser.steamid
    );

    const configuration = {
      method: "get",
      url: `${Config.API.STEAM_PLAYER_BANS}?key=${process.env.STEAM_API_KEY}&steamids=${track.steamid}`,
    };

    const response = await axios(configuration);
    const player = response.data.players[0];

    const isBanned = player.NumberOfGameBans > 0 || player.NumberOfVACBans > 0;

    track.lastCheck = new Date();

    if (isBanned) {
      console.log(
        getTimeForLog() +
          track.steamUser.personaname +
          " is banned! Sending notifications..."
      );
      track.isBanned = true;
      track.bannedAt = new Date();

      const discordUser = track.users;
      for (const user of discordUser) {
        try {
          const guild = await client.guilds.fetch(user.guildId);
          const channel = await guild.channels.fetch(user.channelId);
          await channel.send(
            sprintf(
              Messages.USER_BANNED,
              user.discordUser.id,
              track.steamUser.personaname,
              track.steamUser.steamid
            )
          );
        } catch (notifyError) {
          console.error(
            getTimeForLog() + "Error sending notification:",
            notifyError
          );
        }
      }
    }

    await track.save();
  } catch (error) {
    console.error(
      getTimeForLog() + `Error tracking user ${track.steamid}:`,
      error
    );
    // Yine de son kontrol zamanını güncelleyelim ki sürekli hatalı denemeler yapmasın
    track.lastCheck = new Date();
    await track
      .save()
      .catch((saveErr) =>
        console.error(
          getTimeForLog() + "Error saving track after failed check:",
          saveErr
        )
      );
  }
}

async function checkTracks(client) {
  try {
    const tracks = await getDueTracks();
    const dueTracks = [];
    const now = new Date().getTime();

    tracks.forEach((track) => {
      const lastTrack = new Date(track.lastCheck).getTime();
      const diff = now - lastTrack;
      if (diff > TRACK_INTERVAL) {
        dueTracks.push(track);
      }
    });

    if (dueTracks.length > 0) {
      console.log(
        getTimeForLog() +
          "There are " +
          dueTracks.length +
          " accounts due for tracking."
      );

      // Promise.all kullanarak tüm takipleri paralel olarak başlat
      await Promise.all(
        dueTracks.map((track) => trackSteamUser(track, client))
      );
    } else {
      console.log(getTimeForLog() + "No accounts to track at this time");
    }
  } catch (error) {
    console.error(getTimeForLog() + "Error in checkTracks:", error);
  }
}

function startService(client) {
  console.log(
    getTimeForLog() +
      `Starting Track Service (${
        Config.IS_DEV_MODE ? "Development" : "Production"
      } mode)`
  );
  console.log(
    getTimeForLog() + `Track interval: ${TRACK_INTERVAL / 1000 / 60} minutes`
  );
  console.log(
    getTimeForLog() +
      `Service interval: ${SERVICE_INTERVAL / 1000 / 60} minutes`
  );

  // İlk kontrol
  checkTracks(client);

  // Düzenli aralıklarla kontrol
  setInterval(() => {
    console.log(getTimeForLog() + "Checking for accounts to track");
    checkTracks(client);
  }, SERVICE_INTERVAL);
}

module.exports = startService;
