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
        <li><a href="#built-with">Built With</a></li>
      </ul>><a href="#built-with">Built With</a></li>
    </li>l>
    <li>>
      <a href="#getting-started">Getting Started</a>
      <ul>ref="#getting-started">Getting Started</a>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>i>
      </ul>><a href="#installation">Installation</a></li>
    </li>l>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>g</a></li>g</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#contact">Contact</a></li>><a href="#contact">Contact</a></li>
  </ol>
</details></details>

<!-- ABOUT THE PROJECT --><!-- ABOUT THE PROJECT -->

## About The Project## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)[![Product Name Screen Shot][product-screenshot]](https://example.com)

This is a bot that allows you to follow steam accounts on your Discord server. It will send a message to the channel you set up when the account gets a VAC ban.This is a Discord bot that helps you track Steam accounts for VAC (Valve Anti-Cheat) bans. The bot monitors Steam accounts that you specify and notifies you when any of those accounts receive a VAC ban. This is particularly useful for:

<p align="right">(<a href="#readme-top">back to top</a>)</p>- Gaming communities that want to keep their members clean from cheaters
istrators who want to enforce anti-cheat policies
### Built With- Players who want to verify if their past opponents were actually cheating

- [![Node.js][node.js]][node-url]d sends notifications to your configured Discord channel whenever a ban is detected.
- [![Express][express.js]][express-url]
- [![Discord.js][discord.js]][discord-url]
- [![Mongoose][mongoose]][mongoose-url]
- [![Steam API][steam-api]][steam-url]- **Steam Account Tracking**: Monitor multiple Steam accounts for VAC bans
d channel when a VAC ban is detected
<p align="right">(<a href="#readme-top">back to top</a>)</p>- **Easy Setup**: Simple commands to add and remove accounts from your watchlist
: View detailed information about tracked Steam accounts
<!-- GETTING STARTED -->- **Server Management**: Configure separate tracking lists for different Discord servers

## Getting Started<p align="right">(<a href="#readme-top">back to top</a>)</p>

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

- [![Node.js][node.js]][node-url]
- [![Express][express.js]][express-url]### Prerequisites
- [![Discord.js][discord.js]][discord-url]
- [![Mongoose][mongoose]][mongoose-url]This is an example of how to list things you need to use the software and how to install them.
- [![Steam API][steam-api]][steam-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>
 install npm@latest -g
<!-- GETTING STARTED -->  ```
### Installation
## Getting Started### Installation
1. Clone the repo
   ```shThis is an example of how you may give instructions on setting up your project locally._Below is an example of how you can instruct your audience on installing and setting up your app._
   git clone https://github.com/Afkborn/vac-tracker.gitpy up and running follow these simple example steps.
   ```o

2. Navigate to the project directory https://github.com/Afkborn/vac-tracker.git
   ```show to list things you need to use the software and how to install them.
   cd vac-trackerackages
   ```
   h install
3. Install NPM packages

   ```shenv file in the root directory and add your API key
   npm install
   ```

4. Create .env file in the root directory and add your API keysour audience on installing and setting up your app.\_

   ````
   STEAM_ALAN_ADI = "steam_domain_name"
   STEAM_API_KEY = "steam_api_key"           # Get from https://steamcommunity.com/dev/apikeyshCONNECTION="mongodb_connection_string"
   DISCORD_TOKEN = "discord_bot_token"       # Get from Discord Developer Portal   git clone https://github.com/Afkborn/vac-tracker.git   ```
   DISCORD_CLIENT_ID = "discord_bot_client_id"
   DISCORD_GUILD_ID = "discord_guild_id"2. Install NPM packages<p align="right">(<a href="#readme-top">back to top</a>)</p>
   DB_CONNECTION = "mongodb_connection_string"
   ```   npm install<!-- USAGE -->

   ````

5. Start the bot3. Create .env file in the root directory and add your API key## Usage
   ```sh
   npm start   STEAM_ALAN_ADI = "steam_domain_name"Here are the main commands you can use with the bot:
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>   DISCORD_CLIENT_ID = "discord_bot_client_id"- `/untrack [steam-url]` - Remove a Steam account from your tracking list
 = "discord_guild_id"l accounts you're currently tracking
<!-- CONTRIBUTING -->ent
count
## Contributing
op">back to top</a>)</p>
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.```

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".```
Don't forget to give the project a star! Thanks again!

<p align="right">(<a href="#readme-top">back to top</a>)</p>
1. Fork the Projectat make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)<!-- CONTRIBUTING -->
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)ag "enhancement".
4. Push to the Branch (`git push origin feature/AmazingFeature`)## ContributingDon't forget to give the project a star! Thanks again!
5. Open a Pull Request
Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.1. Fork the Project
<p align="right">(<a href="#readme-top">back to top</a>)</p>git checkout -b feature/AmazingFeature`)
If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
<!-- LICENSE -->et to give the project a star! Thanks again! the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
## License
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)<p align="right">(<a href="#readme-top">back to top</a>)</p>
Distributed under the MIT License. See `LICENSE.md` for more information.
4. Push to the Branch (`git push origin feature/AmazingFeature`)<!-- LICENSE -->
<p align="right">(<a href="#readme-top">back to top</a>)</p>
## License
<!-- CONTACT -->me-top">back to top</a>)</p>

## Contact<!-- LICENSE -->

Bilgehan - [@Afkborn26](https://twitter.com/Afkborn26) - kalaybilgehan60@gmail.com

Project Link: [https://github.com/Afkborn/vac-tracker](https://github.com/Afkborn/vac-tracker)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/bilgehankalay/mail.com
[contributors-shield]: https://img.shields.io/github/contributors/Afkborn/vac-tracker.svg?style=for-the-badge
[contributors-url]: https://github.com/afkborn/vac-tracker/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Afkborn/vac-tracker.svg?style=for-the-badge
[forks-url]: https://github.com/Afkborn/vac-tracker/network/members
[stars-shield]: https://img.shields.io/github/stars/Afkborn/vac-tracker.svg?style=for-the-badge
[stars-url]: https://github.com/Afkborn/vac-tracker/stargazers

[issues-shield]: https://img.shields.io/github/issues/Afkborn/vac-tracker.svg?style=for-the-badge/basic-syntax/#reference-style-links -->.com/afkborn/vac-tracker/graphs/contributors
[issues-url]: https://github.com/Afkborn/vac-tracker/issues
[license-shield]: https://img.shields.io/github/license/Afkborn/vac-tracker.svg?style=for-the-badges.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555rn/vac-tracker/network/members
[license-url]: https://github.com/Afkborn/vac-tracker/blob/main/LICENSE.md
[product-screenshot]: images/ss.pnglds.io/github/contributors/Afkborn/vac-tracker.svg?style=for-the-badge/vac-tracker/stargazers
[steam-api]: https://img.shields.io/badge/Steam_API-000000?style=for-the-badge&logo=steam&logoColor=white[contributors-url]: https://github.com/afkborn/vac-tracker/graphs/contributors[issues-shield]: https://img.shields.io/github/issues/Afkborn/vac-tracker.svg?style=for-the-badge

[mongoose-url]: https://mongoosejs.com/[mongoose]: https://img.shields.io/badge/Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white[express-url]: https://expressjs.com/[express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge[node-url]: https://nodejs.org/en/[node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white[discord-url]: https://discord.js.org/#/[discord.js]: https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white[steam-url]: https://developer.valvesoftware.com/wiki/Steam_Web_API

[mongoose-url]: https://mongoosejs.com/[mongoose]: https://img.shields.io/badge/Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white[express-url]: https://expressjs.com/[express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge[node-url]: https://nodejs.org/en/[node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white[discord-url]: https://discord.js.org/#/[discord.js]: https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white[steam-url]: https://developer.valvesoftware.com/wiki/Steam_Web_API[steam-api]: https://img.shields.io/badge/Steam_API-000000?style=for-the-badge&logo=steam&logoColor=white[product-screenshot]: images/ss.png[license-url]: https://github.com/Afkborn/vac-tracker/blob/main/LICENSE.md[license-shield]: https://img.shields.io/github/license/Afkborn/vac-tracker.svg?style=for-the-badge[issues-url]: https://github.com/Afkborn/vac-tracker/issues[issues-shield]: https://img.shields.io/github/issues/Afkborn/vac-tracker.svg?style=for-the-badge[stars-url]: https://github.com/Afkborn/vac-tracker/stargazers[stars-shield]: https://img.shields.io/github/stars/Afkborn/vac-tracker.svg?style=for-the-badge[forks-url]: https://github.com/Afkborn/vac-tracker/network/members[forks-shield]: https://img.shields.io/github/forks/Afkborn/vac-tracker.svg?style=for-the-badge[issues-url]: https://github.com/Afkborn/vac-tracker/issues
[license-shield]: https://img.shields.io/github/license/Afkborn/vac-tracker.svg?style=for-the-badge
[license-url]: https://github.com/Afkborn/vac-tracker/blob/main/LICENSE.md
[product-screenshot]: images/ss.png
[steam-api]: https://img.shields.io/badge/Steam_API-000000?style=for-the-badge&logo=steam&logoColor=white
[steam-url]: https://developer.valvesoftware.com/wiki/Steam_Web_API
[discord.js]: https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white
[discord-url]: https://discord.js.org/#/
[node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[node-url]: https://nodejs.org/en/
[express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge
[express-url]: https://expressjs.com/
[mongoose]: https://img.shields.io/badge/Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white
[mongoose-url]: https://mongoosejs.com/

```

```
