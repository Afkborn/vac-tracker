<!-- https://github.com/othneildrew/Best-README-Template -->

<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Afkborn/vac-tracker">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">vac-tracker</h3>

  <p align="center">
    A great bot to follow steam accounts on your Discord
    <br />
    <a href="https://github.com/Afkborn/vac-tracker"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://discord.com/api/oauth2/authorize?client_id=984541763710632027&permissions=8&scope=bot">Invite Bot to Discord </a>
    ·
    <a href="https://github.com/Afkborn/vac-tracker/issues">Report Bug</a>
    ·
    <a href="https://github.com/Afkborn/vac-tracker/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#features">Features</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This is a Discord bot that helps you track Steam accounts for VAC (Valve Anti-Cheat) bans. The bot monitors Steam accounts that you specify and notifies you when any of those accounts receive a VAC ban. This is particularly useful for:

- Gaming communities that want to keep their members clean from cheaters
- Server administrators who want to enforce anti-cheat policies
- Players who want to verify if their past opponents were actually cheating

The bot checks accounts periodically and sends notifications to your configured Discord channel whenever a ban is detected.

### Features

- **Steam Account Tracking**: Monitor multiple Steam accounts for VAC bans
- **Automatic Notifications**: Receive alerts in your Discord channel when a VAC ban is detected
- **Easy Setup**: Simple commands to add and remove accounts from your watchlist
- **Profile Statistics**: View detailed information about tracked Steam accounts
- **Server Management**: Configure separate tracking lists for different Discord servers

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

- [![Node.js][node.js]][node-url]
- [![Express][express.js]][express-url]
- [![Discord.js][discord.js]][discord-url]
- [![Mongoose][mongoose]][mongoose-url]
- [![Steam API][steam-api]][steam-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo

   ```sh
   git clone https://github.com/Afkborn/vac-tracker.git
   ```

2. Navigate to the project directory

   ```sh
   cd vac-tracker
   ```

3. Install NPM packages

   ```sh
   npm install
   ```

4. Create .env file in the root directory and add your API keys

   ```
   STEAM_ALAN_ADI = "steam_domain_name"
   STEAM_API_KEY = "steam_api_key"           # Get from https://steamcommunity.com/dev/apikey
   DISCORD_TOKEN = "discord_bot_token"       # Get from Discord Developer Portal
   DISCORD_CLIENT_ID = "discord_bot_client_id"
   DISCORD_GUILD_ID = "discord_guild_id"
   DB_CONNECTION = "mongodb_connection_string"
   ```

5. Start the bot
   ```sh
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE -->

## Usage

Here are the main commands you can use with the bot:

- `/track [steam-url]` - Add a Steam account to your tracking list
- `/untrack [steam-url]` - Remove a Steam account from your tracking list
- `/list` - View all accounts you're currently tracking
- `/configure [channel]` - Set the channel where notifications will be sent
- `/stats [steam-url]` - View detailed statistics about a Steam account

Example:

```
/track https://steamcommunity.com/id/playername/
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Bilgehan - [@Afkborn26](https://twitter.com/Afkborn26) - kalaybilgehan60@gmail.com

Project Link: [https://github.com/Afkborn/vac-tracker](https://github.com/Afkborn/vac-tracker)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Afkborn/vac-tracker.svg?style=for-the-badge
[contributors-url]: https://github.com/afkborn/vac-tracker/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Afkborn/vac-tracker.svg?style=for-the-badge
[forks-url]: https://github.com/Afkborn/vac-tracker/network/members
[stars-shield]: https://img.shields.io/github/stars/Afkborn/vac-tracker.svg?style=for-the-badge
[stars-url]: https://github.com/Afkborn/vac-tracker/stargazers
[issues-shield]: https://img.shields.io/github/issues/Afkborn/vac-tracker.svg?style=for-the-badge
[issues-url]: https://github.com/Afkborn/vac-tracker/issues
[license-shield]: https://img.shields.io/github/license/Afkborn/vac-tracker.svg?style=for-the-badge
[license-url]: https://github.com/Afkborn/vac-tracker/blob/main/LICENSE.md
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/bilgehankalay/
[product-screenshot]: images/ss.png
[node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en/
[express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[express-url]: https://expressjs.com/
[discord.js]: https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white
[discord-url]: https://discord.js.org/#/
[mongoose]: https://img.shields.io/badge/Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[mongoose-url]: https://mongoosejs.com/
[steam-api]: https://img.shields.io/badge/Steam_API-000000?style=for-the-badge&logo=steam&logoColor=white
[steam-url]: https://developer.valvesoftware.com/wiki/Steam_Web_API
