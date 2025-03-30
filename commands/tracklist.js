const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { isRegisteredUser } = require("../actions/DiscordUserActions");
const { getTrackersWithSteam } = require("../actions/TrackerActions");
const { getPassingTime } = require("../utils/DateUtils");
const Messages = require("../constants/Messages");
const CommandDescription = require("../constants/CommandDescription");
const Config = require("../constants/Config");
const Emojis = require("../constants/Emojis");
const getTimeForLog = require("../common/time");
var sprintf = require("sprintf-js").sprintf;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tracklist")
    .setDescription(CommandDescription.TRACKLIST_DESC),
  async execute(interaction) {
    try {
      const discordUser = await isRegisteredUser(interaction.user.id);
      if (!discordUser) {
        return await interaction.reply(Messages.USER_NOT_REGISTERED);
      }

      const trackedUsers = await getTrackersWithSteam(discordUser);
      if (trackedUsers.length === 0) {
        return await interaction.reply(Messages.TRACKLIST_EMPTY);
      }

      // Embed oluşturalım
      const trackListEmbed = new EmbedBuilder()
        .setColor(Config.COLORS.PRIMARY)
        .setTitle(`${discordUser.username}'ın Takip Listesi`)
        .setDescription(
          `Toplam ${trackedUsers.length} Steam hesabı takip ediliyor`
        )
        .setFooter({
          text: Config.APP_NAME,
          iconURL: Config.LOGOS.STEAM,
        })
        .setTimestamp();

      // Takip edilen hesaplar için banlı ve banlı olmayanlar olarak iki kategori oluşturalım
      const bannedUsers = trackedUsers.filter((user) => user.isBanned);
      const nonBannedUsers = trackedUsers.filter((user) => !user.isBanned);

      // Önce banlı olmayanları ekleyelim
      if (nonBannedUsers.length > 0) {
        let normalUsersField = "";

        nonBannedUsers.forEach((user, index) => {
          // Her kullanıcı için durum emojisi ekleyelim
          const statusEmoji = Emojis.getSteamStatusEmoji(
            user.steamUser.personastate
          );
          normalUsersField += `${index + 1}. ${statusEmoji} [${
            user.steamUser.personaname
          }](${user.steamUser.profileurl}) - \`${user.steamUser.steamid}\`\n`;
        });

        trackListEmbed.addFields({
          name: `${Emojis.CATEGORY.TRACKING} Takip Edilen Hesaplar (${nonBannedUsers.length})`,
          value: normalUsersField || "Takip edilen hesap bulunamadı",
          inline: false,
        });
      }

      // Sonra banlı olanları ekleyelim
      if (bannedUsers.length > 0) {
        let bannedUsersField = "";

        bannedUsers.forEach((user, index) => {
          // Banlı kullanıcılar için özel emoji ve ban tarihi ekleyelim
          bannedUsersField += `${index + 1}. ${Emojis.ACTION.BANNED} [${
            user.steamUser.personaname
          }](${user.steamUser.profileurl}) - \`${getPassingTime(
            user.bannedAt
          )}\` önce banlandı\n`;
        });

        trackListEmbed.addFields({
          name: `🔴 Banlı Hesaplar (${bannedUsers.length})`,
          value: bannedUsersField,
          inline: false,
        });

        // Başarı oranı ekleyelim
        const successRate = (
          (bannedUsers.length / trackedUsers.length) *
          100
        ).toFixed(2);
        trackListEmbed.addFields({
          name: "📊 Ban Tespit Oranı",
          value: `%${successRate}`,
          inline: true,
        });
      }

      // Thumbnail olarak kullanıcının Discord avatarını ekleyelim
      if (interaction.user.avatar) {
        trackListEmbed.setThumbnail(
          interaction.user.displayAvatarURL({ dynamic: true })
        );
      }

      await interaction.reply({ embeds: [trackListEmbed] });
    } catch (error) {
      console.error(getTimeForLog() + "Error in tracklist command:", error);
      await interaction.reply(Messages.COMMAND_ERROR);
    }
  },
};
