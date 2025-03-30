const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Messages = require("../constants/Messages");
const CommandDescription = require("../constants/CommandDescription");
const Config = require("../constants/Config");
const Emojis = require("../constants/Emojis");
const {
  getBannedSteamUsers,
  getCountOfBannedTrackers,
} = require("../actions/TrackerActions");
const { getCountOfSteamUsers } = require("../actions/SteamUserActions");
const { getPassingTime } = require("../utils/DateUtils");
const getTimeForLog = require("../common/time");
var sprintf = require("sprintf-js").sprintf;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bannedlist")
    .setDescription(CommandDescription.BANNEDLIST_DESC),
  async execute(interaction) {
    try {
      const bannedUsers = await getBannedSteamUsers();

      if (bannedUsers.length === 0) {
        return await interaction.reply(Messages.BANNED_MESSAGES.LIST_EMPTY);
      }

      // İstatistik bilgileri
      const totalSteamUsers = await getCountOfSteamUsers();
      const banRatio = ((bannedUsers.length / totalSteamUsers) * 100).toFixed(1);

      // Zengin embed oluşturalım
      const bannedListEmbed = new EmbedBuilder()
        .setColor(Config.COLORS.DANGER)
        .setTitle(`${Emojis.ACTION.BANNED} VAC/Game Ban Listesi`)
        .setDescription(
          `Steam VAC Ban Tracker tarafından tespit edilen toplam **${bannedUsers.length}** banlanmış hesap bulunmaktadır.`
        )
        .setThumbnail(Config.LOGOS.STEAM_BAN)
        .addFields({
          name: `${Emojis.CATEGORY.STATS} İstatistikler`,
          value: `Toplam Takip Edilen: **${totalSteamUsers}**\nToplam Banlanan: **${bannedUsers.length}**\nBan Oranı: **%${banRatio}**`,
          inline: false,
        })
        .setFooter({
          text: Config.APP_NAME,
          iconURL: Config.LOGOS.STEAM,
        })
        .setTimestamp();

      // Bannedlisti bölümlere ayıralım (Son 7 gün içinde ve diğerleri)
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const recentlyBanned = bannedUsers.filter(
        (user) => new Date(user.bannedAt) >= oneWeekAgo
      );
      const olderBanned = bannedUsers.filter(
        (user) => new Date(user.bannedAt) < oneWeekAgo
      );

      // Son 7 gün içinde banlananları ayrı bir bölümde gösterelim
      if (recentlyBanned.length > 0) {
        let recentlyBannedText = "";

        recentlyBanned.forEach((user, index) => {
          recentlyBannedText += `${index + 1}. ${Emojis.ACTION.RECENT_BAN} [${
            user.steamUser.personaname
          }](${user.steamUser.profileurl}) - \`${getPassingTime(
            user.bannedAt
          )}\` önce\n`;
        });

        bannedListEmbed.addFields({
          name: `⚡ Son 7 Günde Banlananlar (${recentlyBanned.length})`,
          value: recentlyBannedText,
          inline: false,
        });
      }

      // Older banned users (show in chunks of 15)
      const maxUsersPerPage = 15;
      if (olderBanned.length > 0) {
        // Son 15 banlanmış hesabı gösterelim
        const displayUsers = olderBanned.slice(0, maxUsersPerPage);
        let olderBannedText = "";

        displayUsers.forEach((user, index) => {
          olderBannedText += `${index + 1}. ${Emojis.ACTION.BANNED} [${
            user.steamUser.personaname
          }](${user.steamUser.profileurl}) - \`${getPassingTime(
            user.bannedAt
          )}\` önce\n`;
        });

        bannedListEmbed.addFields({
          name: `📜 Diğer Banlı Hesaplar (Toplam: ${olderBanned.length})`,
          value: olderBannedText,
          inline: false,
        });

        // Eğer daha fazla banlı kullanıcı varsa not düşelim
        if (olderBanned.length > maxUsersPerPage) {
          bannedListEmbed.addFields({
            name: "Not",
            value: `*${
              olderBanned.length - maxUsersPerPage
            } adet daha banlı hesap bulunmaktadır. Gösterilen hesap sayısı sınırlandırılmıştır.*`,
            inline: false,
          });
        }
      }

      await interaction.reply({ embeds: [bannedListEmbed] });
    } catch (error) {
      console.error(getTimeForLog() + "Error in bannedlist command:", error);
      await interaction.reply(Messages.COMMAND_ERROR);
    }
  },
};
