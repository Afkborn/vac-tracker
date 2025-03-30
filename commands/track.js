const { isRegisteredUser } = require("../actions/DiscordUserActions");
const Messages = require("../constants/Messages");
const CommandDescription = require("../constants/CommandDescription");
const Config = require("../constants/Config");
const Emojis = require("../constants/Emojis");
const { getSteamUser } = require("../actions/SteamUserActions");
const getTimeForLog = require("../common/time");
const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
var sprintf = require("sprintf-js").sprintf;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("track")
    .setDescription(CommandDescription.TRACK_DESC)
    .addStringOption((option) =>
      option
        .setName("username")
        .setDescription(CommandDescription.TRACK_USER_DESC)
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const isRegistered = await isRegisteredUser(interaction.user.id);
      if (!isRegistered) {
        return await interaction.reply(Messages.USER_NOT_REGISTERED);
      }

      const username = interaction.options.getString("username");
      const steamUser = await getSteamUser(username);

      if (!steamUser) {
        return await interaction.reply(Messages.USER_NOT_FOUND);
      }

      if (steamUser.communityvisibilitystate != 3) {
        return await interaction.reply(
          sprintf(Messages.USER_PRIVATE, steamUser.personaname)
        );
      }

      // Steam hesabı için bir embed oluşturalım
      const steamEmbed = new EmbedBuilder()
        .setColor(Config.COLORS.PRIMARY)
        .setTitle(steamUser.personaname)
        .setURL(steamUser.profileurl)
        .setDescription(`Steam ID: ${steamUser.steamid}`)
        .setThumbnail(steamUser.avatarfull)
        .addFields({
          name: "Profil Durumu",
          value: getSteamStatus(steamUser.personastate),
          inline: true,
        })
        .setFooter({
          text: Config.APP_NAME,
          iconURL: Config.LOGOS.STEAM,
        })
        .setTimestamp();

      // Eğer kullanıcının gerçek adı varsa ekleyelim
      if (steamUser.realname) {
        steamEmbed.addFields({
          name: "Gerçek Ad",
          value: steamUser.realname,
          inline: true,
        });
      }

      // Eğer ülke bilgisi varsa ekleyelim
      if (steamUser.loccountrycode) {
        steamEmbed.addFields({
          name: "Ülke",
          value: `:flag_${steamUser.loccountrycode.toLowerCase()}:`,
          inline: true,
        });
      }

      // Hesap oluşturulma tarihi bilgisi varsa ekleyelim
      if (steamUser.timecreated) {
        const creationDate = new Date(steamUser.timecreated * 1000);
        steamEmbed.addFields({
          name: "Hesap Oluşturulma Tarihi",
          value: `<t:${Math.floor(steamUser.timecreated)}:D>`,
          inline: true,
        });
      }

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("trackButton_" + steamUser.steamid)
          .setLabel("Takip Et")
          .setStyle(ButtonStyle.Success)
          .setEmoji(Emojis.ACTION.TRACK)
      );

      await interaction.reply({
        content: sprintf(Messages.USER_FOUND, steamUser.personaname),
        embeds: [steamEmbed],
        components: [row],
      });
    } catch (error) {
      console.error(getTimeForLog() + "Error in track command:", error);
      await interaction.reply(Messages.COMMAND_ERROR);
    }
  },
};

// Steam durumunu açıklayıcı metne çevirme
function getSteamStatus(personastate) {
  switch (personastate) {
    case 0:
      return "Çevrimdışı";
    case 1:
      return "Çevrimiçi";
    case 2:
      return "Meşgul";
    case 3:
      return "Dışarıda";
    case 4:
      return "Uyuyor";
    case 5:
      return "Takas İçin";
    case 6:
      return "Oynamak İçin";
    default:
      return "Bilinmiyor";
  }
}
