const { SlashCommandBuilder } = require("discord.js");
const { isRegisteredUser } = require("../actions/DiscordUserActions");
const DiscordUser = require("../model/DiscordUser"); // Direkt modeli kullanalım
const Messages = require("../constants/Messages");
const CommandDescription = require("../constants/CommandDescription");
var sprintf = require("sprintf-js").sprintf;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("register")
    .setDescription(CommandDescription.REGISTER_DESC),
  async execute(interaction) {
    try {
      const isRegistered = await isRegisteredUser(interaction.user.id);
      if (isRegistered) {
        await interaction.reply(
          sprintf(Messages.USER_ALREADY_REGISTERED, interaction.user.username)
        );
      } else {
        // Modeldeki findOrCreate metodunu kullanmak için kullanıcı verisini hazırlayalım
        const userData = {
          id: interaction.user.id,
          username: interaction.user.username,
          bot: interaction.user.bot,
          avatar: interaction.user.avatar,
          discriminator: interaction.user.discriminator || "0000",
          system: interaction.user.system || false,
          trackers: [],
        };

        // findOrCreate metodunu kullanarak kullanıcı oluşturalım
        await DiscordUser.findOrCreate(userData);
        await interaction.reply(
          sprintf(Messages.USER_REGISTERED, interaction.user.username)
        );
      }
    } catch (error) {
      console.error(
        `Error registering user ${interaction.user.username}:`,
        error
      );
      await interaction.reply(Messages.USER_REGISTER_FAILED);
    }
  },
};
