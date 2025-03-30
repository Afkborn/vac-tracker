/**
 * Steam VAC Ban Tracker için mesaj sabitleri
 * Dil desteği ve kategorilere göre düzenlenmiş mesajlar
 */

// Kullanıcı işlemleri ile ilgili mesajlar
const USER_MESSAGES = {
  NOT_REGISTERED: "Kayıtlı değilsin, kayıt olmak için /register komutunu kullanabilirsin.",
  ALREADY_REGISTERED: "Zaten kayıtlısın %s!",
  REGISTERED: "Artık seni tanıyorum %s !",
  REGISTER_FAILED: "Kayıt olurken bir hata oluştu, lütfen daha sonra tekrar deneyin.",
};

// Steam kullanıcı işlemleri ile ilgili mesajlar
const STEAM_USER_MESSAGES = {
  NOT_FOUND: "Kullanıcı bulunamadı.",
  PRIVATE: "Kullanıcı %s profilini gizli tutuyor.",
  FOUND: "Kullanıcı Adı :  %s",
  BANNED_ALREADY: "[%s](https://steamcommunity.com/profiles/%s) kullanıcısı zaten banlı, takip etmeye gerek yok :) (%s gündür banlı)",
  BANNED: "Sana haberim var <@%s>, hileci %s ibnesini banlamışlar :) https://steamcommunity.com/profiles/%s",
};

// Takip işlemleri ile ilgili mesajlar
const TRACKING_MESSAGES = {
  TRACK_NOW: "Artık %s kullanıcısını takip ediyorsun.",
  TRACK_ALREADY: "Zaten %s kullanıcısını takip ediyorsun.",
  TRACK_FAILED: "Takip hatası, lütfen daha sonra tekrar deneyin.",
  UNTRACK_NOW: "%s kullanıcısını takip etmiyorsun.",
  UNTRACKED: "XXXX kullanıcısını takip etmeyi bıraktın.",
  UNTRACK_FAILED: "Steam hesabı takipten çıkarılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
  NOT_TRACKED: "Zaten %s kullanıcısını takip etmiyorsun.",
};

// Takip listesi ile ilgili mesajlar
const TRACKLIST_MESSAGES = {
  EMPTY: "Takip listeniz boş.",
  HEADER: "Takip listenizde %s kullanıcı var\n",
  USER: "%s [Click to see!](https://steamcommunity.com/profiles/%s)\n",
  USER_BANNED: "%s [Click to see!](https://steamcommunity.com/profiles/%s) (Banı %s önce yemiş xD)\n",
};

// Genel bilgi mesajları
const INFO_MESSAGES = {
  BOT_INFO: "Merhaba, ben %s, sunucularda steam hesaplarının ban durmunu takip ederek hizmet veriyorum. Şimdiye kadar %s kullanıcıyı takip ettim, %s kullanıcının banlanmasını fark edip, sana bildirdim :)\nKayıt olmak için /register, kanalına davet etmek için /invite komutunu kullanabilirsin.",
  INVITE_TEXT: "Beni sunucuna davet etmek için tıkla!",
  COMMAND_ERROR: "Bir hata oluştu, lütfen daha sonra tekrar deneyin.",
};

// Banlı kullanıcı listesi ile ilgili mesajlar
const BANNED_MESSAGES = {
  LIST_HEADER: "Şimdiye kadar %s kullanıcı banlanmış :)\n",
  LIST_USER: "%s [Click to see!](https://steamcommunity.com/profiles/%s) (%s önce)\n",
  LIST_EMPTY: "Henüz banlanmış kullanıcı bulunmamaktadır.",
  USER_TRACKLIST_EMPTY: "%s kullanıcısının takip listesi boş.",
};

// İstatistik mesajları
const STAT_MESSAGES = {
  MYRANK_DESC: "Şu an %s kullanıcıyı takip ediyorsun. Bu kullanıcıların %s tanesi banlanmış. Bu da senin başarı oranının %s olduğunu gösteriyor :)\n",
};

// Tüm mesajları birleştirip ihraç edelim
module.exports = {
  ...USER_MESSAGES,
  ...STEAM_USER_MESSAGES,
  ...TRACKING_MESSAGES,
  ...TRACKLIST_MESSAGES,
  ...INFO_MESSAGES,
  ...BANNED_MESSAGES,
  ...STAT_MESSAGES,
  
  // Geriye uyumluluk için orijinal property isimlerini de sağlayalım
  USER_NOT_REGISTERED: USER_MESSAGES.NOT_REGISTERED,
  USER_ALREADY_REGISTERED: USER_MESSAGES.ALREADY_REGISTERED,
  USER_REGISTERED: USER_MESSAGES.REGISTERED,
  USER_REGISTER_FAILED: USER_MESSAGES.REGISTER_FAILED,
  USER_NOT_FOUND: STEAM_USER_MESSAGES.NOT_FOUND,
  USER_PRIVATE: STEAM_USER_MESSAGES.PRIVATE,
  USER_FOUND: STEAM_USER_MESSAGES.FOUND,
  USER_BANNED_ALREADY: STEAM_USER_MESSAGES.BANNED_ALREADY,
  USER_BANNED: STEAM_USER_MESSAGES.BANNED,
  USER_TRACK_NOW: TRACKING_MESSAGES.TRACK_NOW,
  USER_TRACK_ALREADY: TRACKING_MESSAGES.TRACK_ALREADY,
  USER_TRACK_FAILED: TRACKING_MESSAGES.TRACK_FAILED,
  USER_UNTRACK_NOW: TRACKING_MESSAGES.UNTRACK_NOW,
  USER_UNTRACKED: TRACKING_MESSAGES.UNTRACKED,
  USER_UNTRACK_FAILED: TRACKING_MESSAGES.UNTRACK_FAILED,
  USER_NOT_TRACKED: TRACKING_MESSAGES.NOT_TRACKED,
  TRACKLIST: TRACKLIST_MESSAGES.HEADER,
  TRACKLIST_EMPTY: TRACKLIST_MESSAGES.EMPTY,
  TRACKLIST_USER: TRACKLIST_MESSAGES.USER,
  TRACKLIST_USER_BANNED: TRACKLIST_MESSAGES.USER_BANNED,
  COMMAND_ERROR: INFO_MESSAGES.COMMAND_ERROR,
  BANNEDLİST_HEADER: BANNED_MESSAGES.LIST_HEADER,
  BANNEDLİST_USER: BANNED_MESSAGES.LIST_USER,
};
