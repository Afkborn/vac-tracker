const mongoose = require("mongoose");

const trackerSchema = mongoose.Schema({
  steamUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SteamUser",
    required: true,
  },
  steamid: {
    type: String,
    required: true,
    unique: true, // steamid alanını unique yapıyoruz
  },
  CommunityBanned: Boolean,
  VACBanned: Boolean,
  NumberOfVACBans: Number,
  DaysSinceLastBan: Number,
  NumberOfGameBans: Number,
  EconomyBan: String,
  isBanned: {
    type: Boolean,
    default: false,
  },
  bannedAt: Date,
  users: [
    {
      discordUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DiscordUser",
      },
      channelId: String,
      guildId: String,
    },
  ],
  lastCheck: {
    type: Date,
    default: Date.now,
  },
});

// steamUser indeksini kaldırıp steamid indeksini ekleme
trackerSchema.index({ steamid: 1 }, { unique: true });

module.exports = mongoose.model("Tracker", trackerSchema);
