<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/tseringwolfe/2025-Snap-InclusiveIdentity">
    <img src="https://avatars.githubusercontent.com/u/85767261?s=200&v=4" alt="Logo" width="180" height="180">
  </a>

<h3 align="center">Snapchat Inclusive Identity Feature</h3>

  <p align="center">
    Text here, feature for snap
    <br />
    <br />
    <a href="https://github.com/tseringwolfe/2025-Snap-InclusiveIdentity"><strong>Explore the Docs Link»</strong></a>
    <br />
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
    <li><a href="#license">License</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

what it was built with

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With 

- [![React Native][ReactNative-Shield]][ReactNative-url]
- [![Expo][Expo-shield]][Expo-url]
- [![Supabase][Supabase-shield]][Supabase-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

To set up this project locally, clone the repo, then install all node package manager dependencies.
To get a local copy up and running, follow these simple steps.

### Prerequisites

- **Supabase Project**
  - Create a free account at supabase.com, and set up:
  - Authentication (email/password)
  - project URL and public key
  - Create a .env.local file and add supabase key

### Installation

1. Fork Repo
2. Clone the repo
   ```sh
   gh repo clone your-username/repository-name
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your supabase key in `.env.local`
   ```js
   EXPO_PUBLIC_SUPABASE_URL=your_url_here
   EXPO_PUBLIC_SUPABASE_KEY=your_key_here
   ```
5. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

Usage of this project

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[ReactNative-shield]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[ReactNative-url]: https://reactnative.dev/
[Supabase-shield]: https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white
[Supabase-url]: https://supabase.com/
[Expo-shield]: https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white
[Expo-url]: https://expo.dev/
