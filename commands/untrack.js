const { isRegisteredUser } = require("../actions/DiscordUserActions");
const Messages = require("../constants/Messages");
const CommandDescription = require("../constants/CommandDescription");
const Config = require("../constants/Config");
const Emojis = require("../constants/Emojis");
const getTimeForLog = require("../common/time");
const { getTrackersWithSteam } = require("../actions/TrackerActions");
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
var sprintf = require("sprintf-js").sprintf;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("untrack")
    .setDescription(CommandDescription.UNTRACK_DESC)
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription(CommandDescription.UNTRACK_USER_DESC)
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const isRegistered = await isRegisteredUser(interaction.user.id);
      if (!isRegistered) {
        return await interaction.reply(Messages.USER_NOT_REGISTERED);
      }
      
      const username = interaction.options.getString("username");
      const trackedUsers = await getTrackersWithSteam(isRegistered);
      const trackedUser = trackedUsers.find(
        (user) => user.steamUser.personaname == username
      );
      
      if (trackedUser) {
        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("unTrackButton_" + trackedUser._id)
            .setLabel("Takipden Çık")
            .setStyle(ButtonStyle.Danger)
            .setEmoji(Emojis.ACTION.ERROR)
        );
        
        await interaction.reply({
          content: sprintf("Takipten çıkmak istediğine emin misin?"),
          components: [row],
        });
      } else {
        await interaction.reply(sprintf(Messages.USER_NOT_TRACKED, username));
      }
    } catch (error) {
      console.error(getTimeForLog() + "Error in untrack command:", error);
      await interaction.reply(Messages.COMMAND_ERROR);
    }
  },
};
