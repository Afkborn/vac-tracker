const DiscordUser = require("../model/DiscordUser");
const getTimeForLog = require("../common/time");

/**
 * isRegisteredUser fonksiyonu ile kullanıcının kayıtlı olup olmadığını kontrol ediyoruz
 * @param {String} discordUserID
 * @returns {Promise<Object|false>} Kullanıcı nesnesini veya false
 */
async function isRegisteredUser(discordUserID) {
  try {
    const discordUser = await DiscordUser.findOne({ id: discordUserID }).exec();
    return discordUser || false;
  } catch (error) {
    console.error(getTimeForLog() + `Error checking user ${discordUserID}:`, error);
    return false;
  }
}

/**
 * registerUser fonksiyonu ile kullanıcıyı kayıt ediyoruz
 * @param {Object} user Discord kullanıcı nesnesi
 * @returns {Promise<Object>} Oluşturulan DiscordUser nesnesi
 */
async function registerUser(user) {
  try {
    const discordUser = new DiscordUser(user);
    console.log(getTimeForLog() + "Registering Discord user:", user.username);
    await discordUser.save();
    return discordUser;
  } catch (error) {
    console.error(getTimeForLog() + "Error registering user:", error);
    throw error;
  }
}

/**
 * getDiscordUserFromMongo fonksiyonu ile kullanıcının kayıtlı olduğu discordUser nesnesini döndürüyoruz
 * @param {String} discordUserID Discord kullanıcı ID'si
 * @returns {Promise<Object>} Bulunan kullanıcı nesnesi
 */
async function getDiscordUserFromMongo(discordUserID) {
  try {
    return await DiscordUser.findOne({ id: discordUserID })
      .populate("trackers")
      .exec();
  } catch (error) {
    console.error(getTimeForLog() + `Error getting Discord user ${discordUserID}:`, error);
    throw error;
  }
}

/**
 * Kullanıcıya tracker ekler
 * @param {Object} discordUser DiscordUser nesnesi
 * @param {String} trackersID Tracker ID'si
 * @returns {Promise<Object>} Güncellenmiş kullanıcı nesnesi
 */
async function addTrackersToDiscordUser(discordUser, trackersID) {
  try {
    // Tekrarlanan tracker'ları önlemek için kontrol
    if (!discordUser.trackers.includes(trackersID)) {
      discordUser.trackers.push(trackersID);
    }
    
    await discordUser.save();
    return discordUser;
  } catch (error) {
    console.error(getTimeForLog() + "Error adding tracker to Discord user:", error);
    throw error;
  }
}

/**
 * Kullanıcıdan tracker kaldırır
 * @param {Object} discordUser DiscordUser nesnesi
 * @param {String} trackersID Tracker ID'si
 * @returns {Promise<Object>} Güncellenmiş kullanıcı nesnesi
 */
async function deleteTrackersFromDiscordUser(discordUser, trackersID) {
  try {
    discordUser.trackers.pull(trackersID);
    await discordUser.save();
    return discordUser;
  } catch (error) {
    console.error(getTimeForLog() + "Error removing tracker from Discord user:", error);
    throw error;
  }
}

module.exports = {
  isRegisteredUser,
  registerUser,
  getDiscordUserFromMongo,
  addTrackersToDiscordUser,
  deleteTrackersFromDiscordUser,
};
