/**
 * Steam VAC Ban Tracker için emoji sabitleri
 */

// Steam durumları için emojiler
const STEAM_STATUS = {
  OFFLINE: "⚪", // Çevrimdışı
  ONLINE: "🟢", // Çevrimiçi
  BUSY: "🔴", // Meşgul
  AWAY: "🟡", // Dışarıda
  SNOOZE: "💤", // Uyuyor
  LOOKING_TO_TRADE: "💱", // Takas İçin
  LOOKING_TO_PLAY: "🎮", // Oynamak İçin
  UNKNOWN: "⚪", // Bilinmiyor
};

// Aksiyon emojileri
const ACTION = {
  TRACK: "👁️", // Takip et
  BANNED: "🚫", // Banlanmış
  RECENT_BAN: "🔥", // Yeni banlanmış
  WARNING: "⚠️", // Uyarı
  SUCCESS: "✅", // Başarılı
  ERROR: "❌", // Hata
  INFO: "ℹ️", // Bilgi
  LOADING: "⏳", // Yükleniyor
};

// Kategori emojileri
const CATEGORY = {
  STATS: "📊", // İstatistik
  USERS: "👥", // Kullanıcılar
  BANNED: "🔴", // Banlı kullanıcılar
  TRACKING: "🟢", // Takip edilenler
  HISTORY: "📜", // Geçmiş
  BOT: "🤖", // Bot
  COMMANDS: "📝", // Komutlar
  SERVER: "🖥️", // Sunucu
  COMMUNITY: "🌐", // Topluluk
};

// Durum emojileri numaraya göre dönüştürme fonksiyonu
function getSteamStatusEmoji(personastate) {
  switch (personastate) {
    case 0:
      return STEAM_STATUS.OFFLINE;
    case 1:
      return STEAM_STATUS.ONLINE;
    case 2:
      return STEAM_STATUS.BUSY;
    case 3:
      return STEAM_STATUS.AWAY;
    case 4:
      return STEAM_STATUS.SNOOZE;
    case 5:
      return STEAM_STATUS.LOOKING_TO_TRADE;
    case 6:
      return STEAM_STATUS.LOOKING_TO_PLAY;
    default:
      return STEAM_STATUS.UNKNOWN;
  }
}

module.exports = {
  STEAM_STATUS,
  ACTION,
  CATEGORY,
  getSteamStatusEmoji,
};
