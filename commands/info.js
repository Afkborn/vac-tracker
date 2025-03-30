const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Messages = require("../constants/Messages");
const CommandDescription = require("../constants/CommandDescription");
const Config = require("../constants/Config");
const Emojis = require("../constants/Emojis");
const { getCountOfSteamUsers } = require("../actions/SteamUserActions");
const { getCountOfBannedTrackers } = require("../actions/TrackerActions");
const getTimeForLog = require("../common/time");
var sprintf = require("sprintf-js").sprintf;
const { version } = require("../package.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription(CommandDescription.INFO_DESC),
  async execute(interaction) {
    try {
      const countOfSteamUsers = await getCountOfSteamUsers();
      const countOfBannedSteamAccounts = await getCountOfBannedTrackers();
      const banDetectionRate =
        countOfSteamUsers > 0
          ? ((countOfBannedSteamAccounts / countOfSteamUsers) * 100).toFixed(1)
          : "0";

      const infoEmbed = new EmbedBuilder()
        .setColor(Config.COLORS.PRIMARY)
        .setTitle(Config.APP_NAME)
        .setDescription(
          "Discord sunucularında Steam hesaplarının VAC/Game ban durumlarını takip eden bir botum. Takip ettiğiniz hesaplar banlandığında sizi bilgilendiriyorum!"
        )
        .setThumbnail(Config.LOGOS.STEAM)
        .addFields(
          {
            name: `${Emojis.CATEGORY.STATS} İstatistikler`,
            value:
              `${Emojis.ACTION.TRACK} **Takip Edilen Hesaplar:** ${countOfSteamUsers}\n` +
              `${Emojis.ACTION.BANNED} **Tespit Edilen Banlar:** ${countOfBannedSteamAccounts}\n` +
              `${Emojis.CATEGORY.STATS} **Ban Tespit Oranı:** %${banDetectionRate}\n`,
            inline: false,
          },
          {
            name: `${Emojis.CATEGORY.BOT} Bot Bilgileri`,
            value:
              `📟 **Versiyon:** v${version}\n` +
              `🏓 **Ping:** ${interaction.client.ws.ping}ms\n` +
              `🕒 **Uptime:** ${formatUptime(interaction.client.uptime)}\n`,
            inline: false,
          },
          {
            name: `${Emojis.CATEGORY.COMMANDS} Komutlar`,
            value:
              "`/register` - Botu kullanmak için kayıt olmanız gerekiyor\n" +
              "`/track [username]` - Steam kullanıcısını takip etmeye başla\n" +
              "`/tracklist` - Takip ettiğiniz kullanıcıları göster\n" +
              "`/untrack [username]` - Kullanıcıyı takipten çıkar\n" +
              "`/bannedlist` - Banlanan tüm kullanıcıları listele\n",
            inline: false,
          }
        )
        .setFooter({
          text: "✉️ Sorun veya önerin mi var? Beni geliştiren kişiye ulaş!",
          iconURL: interaction.client.user.displayAvatarURL({ dynamic: true }),
        })
        .setTimestamp();

      // İnteraktif butonlar veya linkler için
      const inviteUrl = `https://discord.com/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=277025704960&scope=bot%20applications.commands`;

      // İsteğe bağlı olarak, sunucu ve kullanıcı sayısını da ekleyebiliriz
      const guildCount = interaction.client.guilds.cache.size;
      infoEmbed.addFields({
        name: `${Emojis.CATEGORY.COMMUNITY} Topluluk`,
        value:
          `${Emojis.CATEGORY.SERVER} **Sunucu Sayısı:** ${guildCount}\n` +
          `🔗 [Sunucuna Ekle](${inviteUrl})`,
        inline: false,
      });

      await interaction.reply({ embeds: [infoEmbed] });
    } catch (error) {
      console.error(getTimeForLog() + "Error in info command:", error);
      await interaction.reply(Messages.COMMAND_ERROR);
    }
  },
};

// Uptime'ı formatlayan yardımcı fonksiyon
function formatUptime(uptime) {
  const totalSeconds = Math.floor(uptime / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let uptimeString = "";
  if (days > 0) uptimeString += `${days} gün `;
  if (hours > 0) uptimeString += `${hours} saat `;
  if (minutes > 0) uptimeString += `${minutes} dakika `;
  if (seconds > 0) uptimeString += `${seconds} saniye`;

  return uptimeString.trim();
}
