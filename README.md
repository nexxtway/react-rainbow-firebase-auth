# react-rainbow-firebase-auth

User authentication is often the hardest part of building any web app, especially if you want to integrate multiple providers. Having a profile is one of the most common features you will need to add on your projects. Now all the tough work has been done for you as a templete build in `React` that will allow you in just a few minutes to authenticate using Firebase service.

#### The project uses:

- react 16.12.0
- react-dom 16.12.0
- react-redux 7.1.3
- react-router-dom 5.1.2
- react-intl 3.6.2
- redux 4.0.4
- redux-form 8.2.6
- firebase 7.4.0
- styled-components 4.4.1
- react-rainbow-components 1.11.0
- eslint 6.1.0
- stylelint 12.0.0
- cypress 3.7.0

## Providers supported:

- Google
- Facebook

## Features:

- Ideal authentication UI and security solution for modern Single Page Apps
- Supports local login with username, e-mail and password using best security practices
- Supports social login with Facebook and Google using best security practices
- User profile page with the ability to update your current password, username and e-mail
- Sends system emails for password reset
- Facebook and Google integration fully tested
- Integration test with Cypress

## Install & Run

- These instructions are basic, you can use any method to do this work.

1. Make a new folder for your repo
2. Start a Git instance and copy over template files
3. Overwrite this README
4. Make sure to change the repo title
5. Make sure to change the `manifest.json` on the `public` folder
6. Make sure to change the `firebase.js` on the `src` folder

## Miscellaneous

#### Before you begin

[Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup)

#### Be ready to get acces with Facebook provider

1. On the [Facebook for Developers site](https://developers.facebook.com/docs/facebook-login), get the **App ID** and an **App Secret** for your app
2. Enable Facebook Login:
    1. In the [Firebase console](https://console.firebase.google.com), open the **Auth** section.
    2. On the **Sign in method** tab, enable the **Facebook** sign-in method and specify the **App ID** and **App Secret** you got from Facebook.
    3. Then, make sure your **OAuth redirect URI** (e.g. `my-app-12345.firebaseapp.com/__/auth/handler`) is listed as one of your **OAuth redirect URIs** in your Facebook app's settings page on the [Facebook for Developers](https://developers.facebook.com) site in the **Product Settings > Facebook Login** config.

#### Be ready to get acces with Google provider

1. Enable Google Sign-In in the Firebase console:
    1. In the [Firebase console](https://console.firebase.google.com), open the **Auth** section.
    2. On the **Sign in method** tab, enable the **Google** sign-in method and click **Save**.

#### Be ready to get acces with GitHub provider

1. In the [Firebase console](https://console.firebase.google.com), open the **Auth** section.
2. On the **Sign in method** tab, enable the **GitHub** provider.
3. Add the **Client ID** and **Client Secret** from that provider's developer console to the provider configuration:
    1. [Register your app](https://github.com/settings/applications/new) as a developer application on GitHub and get your app's OAuth 2.0 **Client ID** and **Client Secret**.
    2. Make sure your Firebase **OAuth redirect URI** (e.g. `my-app-12345.firebaseapp.com/__/auth/handler`) is set as your **Authorization callback URL** in your app's settings page on your [GitHub app's config](https://github.com/settings/developers).
4. Click **Save**.

## Supporters

This is an open-source projectOpen maintained by [nexxtway](https://nexxtway.com)
