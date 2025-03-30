const mongoose = require("mongoose");

const discordUserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    bot: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    discriminator: {
      type: String,
      default: null,
    },
    system: {
      type: Boolean,
      default: false,
    },
    trackers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tracker",
      },
    ],
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// Virtüeller ve metodlar
discordUserSchema.virtual("trackerCount").get(function () {
  return this.trackers.length;
});

// Kullanıcının adı değişirse güncelleme metodu
discordUserSchema.methods.updateUsername = async function (newUsername) {
  this.username = newUsername;
  return this.save();
};

// Kullanıcıyı bul veya oluştur
discordUserSchema.statics.findOrCreate = async function (userData) {
  try {
    let user = await this.findOne({ id: userData.id });

    if (!user) {
      user = new this(userData);
    } else {
      // Avatar, username gibi bilgiler değişebilir, güncelle
      user.username = userData.username;
      user.avatar = userData.avatar;
      user.discriminator = userData.discriminator;
    }

    await user.save();
    return user;
  } catch (error) {
    console.error("DiscordUser findOrCreate error:", error);
    throw error;
  }
};

// İsimlendirme düzeltmesi
const DiscordUser = mongoose.model("DiscordUser", discordUserSchema);

module.exports = DiscordUser;
