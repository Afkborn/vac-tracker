/**
 * Steam VAC Ban Tracker için yapılandırma sabitleri
 */

// Uygulama genel ayarları
const APP_CONFIG = {
  // Uygulama bilgileri
  APP_NAME: "Steam VAC Ban Tracker",
  DEVELOPER: "Bilgehan KALAY",
  GITHUB_REPO: "https://github.com/Afkborn/vac-tracker",

  // Geliştirme modu (production vs development)
  IS_DEV_MODE: process.env.NODE_ENV === "development",

  // Renk kodları
  COLORS: {
    PRIMARY: 0x2a475e, // Steam mavi
    SUCCESS: 0x5c7e10, // Yeşil
    DANGER: 0xd13438, // Kırmızı (Ban)
    WARNING: 0xffa500, // Turuncu
    INFO: 0x0099ff, // Mavi
  },

  // Logo ve resimler
  LOGOS: {
    STEAM:
      "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/47890/3b5c603ce418dfca46adf8b1bef568d9a6b8f2a3.jpg",
    STEAM_BAN:
      "https://community.cloudflare.steamstatic.com/public/images/signinthroughsteam/sits_large_noborder.png",
    BOT: "https://cdn.discordapp.com/avatars/984541763710632027/80256ec835ef3a394d1e6d0aa7399e08.png",
  },
};

// Hizmet/servis ayarları
const SERVICE_CONFIG = {
  // Takip servisi aralıkları (milisaniye)
  TRACK_INTERVAL: APP_CONFIG.IS_DEV_MODE ? 1000 * 60 : 10000 * 60 * 60, // Dev: 1 dakika, Prod: 10 saat
  SERVICE_INTERVAL: APP_CONFIG.IS_DEV_MODE ? 1000 * 30 : 10000 * 60, // Dev: 30 saniye, Prod: 10 dakika

  // API limitleri ve önbellek
  STEAM_API_CACHE_TTL: 60 * 60, // 1 saat
  DISCORD_BUTTON_TIMEOUT: 60000, // 60 saniye
};

// API endpoints
const API_ENDPOINTS = {
  STEAM_PLAYER_BANS: "http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/",
  STEAM_PLAYER_SUMMARY:
    "http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/",
  STEAM_VANITY_URL:
    "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/",
};

module.exports = {
  ...APP_CONFIG,
  ...SERVICE_CONFIG,
  API_ENDPOINTS,

  // Kategorik erişim için
  APP: APP_CONFIG,
  SERVICE: SERVICE_CONFIG,
  API: API_ENDPOINTS,
};
