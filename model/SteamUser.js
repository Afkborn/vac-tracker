const mongoose = require("mongoose");

const steamUserSchema = mongoose.Schema(
  {
    steamid: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    personaname: {
      type: String,
      required: true,
      trim: true,
    },
    profileurl: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    avatarmedium: {
      type: String,
      required: true,
    },
    avatarfull: {
      type: String,
      required: true,
    },
    avatarhash: {
      type: String,
      required: true,
    },
    personastate: {
      type: Number,
      default: 0,
    },
    communityvisibilitystate: {
      type: Number,
      default: 0,
    },
    profilestate: {
      type: Number,
      default: 0,
    },
    lastlogoff: {
      type: Number,
      default: 0,
    },
    commentpermission: {
      type: Number,
      default: 0,
    },
    realname: {
      type: String,
      default: "",
    },
    primaryclanid: {
      type: String,
      default: "",
    },
    timecreated: {
      type: Number,
      default: 0,
    },
    cityid: {
      type: Number,
      default: 0,
    },
    loccountrycode: {
      type: String,
      default: "",
    },
    locstatecode: {
      type: String,
      default: "",
    },
    loccityid: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "lastUpdated",
    },
  }
);

// Yardımcı metodlar
steamUserSchema.methods.getSteamProfileUrl = function () {
  return `https://steamcommunity.com/profiles/${this.steamid}`;
};

// Steam API'den kullanıcıyı güncelleme işlevi için statik metot
steamUserSchema.statics.findOrCreate = async function (userData) {
  try {
    // Mevcut kullanıcıyı ara
    let user = await this.findOne({ steamid: userData.steamid });

    // Yoksa yeni kullanıcı oluştur
    if (!user) {
      user = new this(userData);
    } else {
      // Varsa bilgilerini güncelle (lastUpdated alanı otomatik güncellenir)
      Object.assign(user, userData);
    }

    await user.save();
    return user;
  } catch (error) {
    console.error("SteamUser findOrCreate error:", error);
    throw error;
  }
};

// İsimlendirme düzeltmesi (Mongoose tarafından SteamUsers olarak kaydedilmemesi için)
const SteamUser = mongoose.model("SteamUser", steamUserSchema);

module.exports = SteamUser;
