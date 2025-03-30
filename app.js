require("dotenv").config();
const dbConnect = require("./db/dbConnect");
const reloadCommands = require("./reloadCommands");
const getTimeForLog = require("./common/time");
const { getSteamUserFromMongo } = require("./actions/SteamUserActions");
const { getDiscordUserFromMongo } = require("./actions/DiscordUserActions");
const {
  trackSteamUser,
  unTrackSteamUser,
  getTrackerObjectFromMongo_WithSteam,
} = require("./actions/TrackerActions");
const startService = require("./service/TrackService");
const fs = require("node:fs");
const path = require("node:path");
const Messages = require("./constants/Messages");
const {
  Client,
  GatewayIntentBits,
  Collection,
  ActivityType,
} = require("discord.js");

// Discord client yapılandırması
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Komutları yükleme fonksiyonu
async function loadCommands() {
  client.commands = new Collection();
  const commandsPath = path.join(__dirname, "commands");
  const commands = [];

  try {
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);

      if ("data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
        console.log(getTimeForLog() + "Loaded command: " + command.data.name);
      } else {
        console.log(
          getTimeForLog() +
            `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }

    return commands;
  } catch (error) {
    console.error(getTimeForLog() + "Error loading commands:", error);
    return [];
  }
}

// Buton etkileşimleri için handler
async function handleButtonInteraction(i) {
  try {
    // Etkileşimin daha önce cevaplanıp cevaplanmadığını kontrol et
    if (i.replied || i.deferred) {
      console.log(getTimeForLog() + "Interaction already handled, skipping");
      return;
    }

    // Önce defer yaparak Discord'a bir işlem olduğunu bildir
    // Bu sayede 3 saniyelik zaman aşımını önlemiş oluruz
    await i.deferUpdate();

    if (i.customId.startsWith("trackButton_")) {
      const steamId = i.customId.split("_")[1];
      const steamUser = await getSteamUserFromMongo(steamId);
      const discordUser = await getDiscordUserFromMongo(i.user.id);
      
      if (!steamUser || !discordUser) {
        return await i.editReply({
          content: "Steam kullanıcısı veya Discord kullanıcısı bulunamadı.",
          components: []
        });
      }
      
      await trackSteamUser(steamUser, discordUser, i);
    } else if (i.customId.startsWith("unTrackButton_")) {
      const trackerID = i.customId.split("_")[1];
      const tracker = await getTrackerObjectFromMongo_WithSteam(trackerID);
      const discordUser = await getDiscordUserFromMongo(i.user.id);
      
      if (!tracker || !discordUser) {
        return await i.editReply({
          content: "Takip edilen kullanıcı veya Discord kullanıcısı bulunamadı.",
          components: []
        });
      }
      
      await unTrackSteamUser(discordUser, tracker, i);
    }
  } catch (error) {
    console.error(getTimeForLog() + "Error handling button interaction:", error);
    
    try {
      // Eğer hala reply yapmamışsa
      if (!i.replied && !i.deferred) {
        await i.reply({
          content: Messages.COMMAND_ERROR,
          ephemeral: true,
        });
      } else if (i.deferred) {
        // Eğer deferred ama henüz reply yapılmamışsa 
        await i.editReply({
          content: Messages.COMMAND_ERROR,
          components: []
        });
      }
    } catch (replyError) {
      console.error(getTimeForLog() + "Error sending error message:", replyError);
    }
  }
}

// Discord.js olaylarını kurma
function setupEventListeners() {
  // Bot hazır olduğunda
  client.on("ready", () => {
    console.log(getTimeForLog() + `Logged in as ${client.user.tag}!`);
    client.user.setPresence({
      activities: [{ name: "Steam hesaplarını", type: ActivityType.Watching }],
      status: "online",
    });
    console.log(getTimeForLog() + "Bot is now online and ready!");
  });

  // Komut etkileşimleri
  client.on("interactionCreate", async (interaction) => {
    try {
      // Sadece butonlara tıklanması durumunda
      if (interaction.isButton()) {
        await handleButtonInteraction(interaction);
        return;
      }

      // Slash komutlar
      if (!interaction.isChatInputCommand()) return;

      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`
        );
        return;
      }

      // Komutu çalıştır
      await command.execute(interaction);
    } catch (error) {
      console.error(getTimeForLog() + "Interaction error:", error);

      // Eğer interaction henüz cevaplanmadıysa
      if (!interaction.replied && !interaction.deferred) {
        await interaction
          .reply({
            content: Messages.COMMAND_ERROR,
            ephemeral: true,
          })
          .catch(console.error);
      }
    }
  });

  // Beklenmeyen hatalar için
  client.on("error", (error) => {
    console.error(getTimeForLog() + "Discord client error:", error);
  });
}

// Ana başlatma fonksiyonu
async function startup() {
  try {
    console.log(getTimeForLog() + "Starting application...");

    // Komutları yükle
    const commands = await loadCommands();

    // Discord.js olaylarını kur
    setupEventListeners();

    // Komutları Discord'a yükle
    await reloadCommands(commands);

    // MongoDB'ye bağlan
    await dbConnect();

    // Takip servisini başlat
    startService(client);

    // Bot'u Discord'a bağla
    await client.login(process.env.DISCORD_TOKEN);

    console.log(getTimeForLog() + "Startup complete!");
  } catch (error) {
    console.error(getTimeForLog() + "Fatal startup error:", error);
    process.exit(1);
  }
}

// Uygulamayı başlat
startup();

// Beklenmedik hataları yakala
process.on("unhandledRejection", (error) => {
  console.error(getTimeForLog() + "Unhandled promise rejection:", error);
});

process.on("uncaughtException", (error) => {
  console.error(getTimeForLog() + "Uncaught exception:", error);
  // Kritik hatalar için uygulamayı yeniden başlatabilirsiniz
  // process.exit(1);
});
