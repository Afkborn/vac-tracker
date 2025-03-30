/**
 * Steam VAC Ban Tracker için komut açıklamaları
 * Dil desteği ve kategorilere göre düzenlenmiş açıklamalar
 */

// Genel komutlar
const GENERAL_COMMANDS = {
  PING_DESC: "Pong cevaplar, ping ölçmek için",
  REGISTER_DESC: "Kayıt olmak için kullanılır",
  INFO_DESC: "Bot hakkında bilgi verir",
  INVITE_DESC: "Botu sunucunuza davet etmek için kullanılır",
};

// Takip ile ilgili komutlar
const TRACK_COMMANDS = {
  TRACK_DESC: "Bir Steam kullanıcısını takip etmek için kullanılır",
  TRACK_USER_DESC: "Takip etmek istediğiniz kullanıcı adını girin",
  TRACKLIST_DESC: "Takip ettiğiniz kullanıcıları listeler",
  UNTRACK_DESC: "Takip etmeyi bırakmak için kullanılır",
  UNTRACK_USER_DESC: "Takip etmeyi bırakmak istediğiniz kullanıcı adını girin",
};

// İstatistik ve ban ile ilgili komutlar
const STATS_COMMANDS = {
  BANNEDLIST_DESC: "Uygulama başından beri ban yiyen kullanıcıları listeler",
  MYRANK_DESC: "Sıralamanızı gösterir",
};

// Daha kolay erişim için kategorik nesne
const COMMAND_DESCRIPTIONS = {
  GENERAL: GENERAL_COMMANDS,
  TRACK: TRACK_COMMANDS,
  STATS: STATS_COMMANDS,
};

// Geriye uyumluluk için düz export da sağlayalım
module.exports = {
  ...GENERAL_COMMANDS,
  ...TRACK_COMMANDS,
  ...STATS_COMMANDS,

  // İsterseniz kategorik erişim de ekleyebilirsiniz
  CATEGORIES: COMMAND_DESCRIPTIONS,
};
