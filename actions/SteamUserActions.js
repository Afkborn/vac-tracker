require("dotenv").config();
const axios = require("axios");
const SteamUser = require("../model/SteamUser");
const getTimeForLog = require("../common/time");
const Config = require("../constants/Config");

function steamidToSteam64(steamid) {
  var steam64id = 76561197960265728n;
  var steamidparts = steamid.split(":");
  var steamID = parseInt(steamidparts[2]);
  steam64id += BigInt(steamID * 2);
  if (steamidparts[1] == "1") {
    steam64id += BigInt(1);
  }
  return steam64id;
}

function isNumeric(s) {
  return !isNaN(s - parseFloat(s));
}

async function getSteamIDFromVanity(vanity) {
  try {
    const configuration = {
      method: "get",
      url: `${Config.API.STEAM_VANITY_URL}?key=${process.env.STEAM_API_KEY}&vanityurl=${vanity}`,
    };
    const response = await axios(configuration);
    if (response.data.response.success == 1) {
      return response.data.response.steamid;
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      getTimeForLog() + `Error getting Steam ID from vanity "${vanity}":`,
      error
    );
    return null;
  }
}

async function getSteamID(steamString) {
  try {
    if (steamString.includes("https")) {
      if (steamString[-1] != "/") {
        steamString += "/";
      }
      if (steamString.includes("profiles")) {
        let steamID = steamString.split("/")[4];
        return steamID;
      }
      if (steamString.includes("id")) {
        steamString = steamString.split("/")[4];
        const steamID = await getSteamIDFromVanity(steamString);
        return steamID;
      }
    }

    if (isNumeric(steamString)) {
      return steamString;
    }

    if (steamString.startsWith("STEAM_")) {
      return steamidToSteam64(steamString);
    }

    const steamID = await getSteamIDFromVanity(steamString);
    return steamID;
  } catch (error) {
    console.error(
      getTimeForLog() + `Error parsing Steam ID from "${steamString}":`,
      error
    );
    return null;
  }
}

async function getSteamUser(userstring) {
  try {
    const steamID = await getSteamID(userstring);
    if (steamID == null) {
      console.log(getTimeForLog() + `No Steam ID found for "${userstring}"`);
      return null;
    }

    const configuration = {
      method: "get",
      url: `${Config.API.STEAM_PLAYER_SUMMARY}?key=${process.env.STEAM_API_KEY}&steamids=${steamID}`,
    };

    const response = await axios(configuration);
    const steamUser = response.data.response.players[0];

    if (steamUser == null) {
      console.log(getTimeForLog() + `No Steam user found for ID ${steamID}`);
      return null;
    }

    // Modelde eklediğimiz findOrCreate metodunu kullanıyoruz
    return await SteamUser.findOrCreate(steamUser);
  } catch (error) {
    console.error(getTimeForLog() + `Error getting Steam user:`, error);
    return null;
  }
}

async function getSteamUserFromMongo(steamID) {
  try {
    return await SteamUser.findOne({ steamid: steamID }).exec();
  } catch (error) {
    console.error(
      getTimeForLog() + `Error getting Steam user ${steamID} from MongoDB:`,
      error
    );
    return null;
  }
}

async function getCountOfSteamUsers() {
  try {
    return await SteamUser.countDocuments({});
  } catch (error) {
    console.error(getTimeForLog() + "Error counting Steam users:", error);
    return 0;
  }
}

module.exports = {
  getSteamUser,
  getSteamUserFromMongo,
  getCountOfSteamUsers,
};
