# Tenjin Cordova Demo

This project demonstrates how to use the [Tenjin Cordova Plugin](https://github.com/Ordinance/cordova-sdk).

Get your API_KEY from your [Tenjin Organization tab](https://www.tenjin.io/dashboard/organizations).

Clone the project

    git clone https://github.com/Ordinance/cordova-demo

Install the Tenjin plugin

    cd cordova-demo
    cordova plugin add cordova-plugin-tenjin

Edit [www/js/index.js](www/js/index.js) and update apiKey.

    let apiKey = "REPLACE_WITH_YOUR_API_KEY";

For Android

    cordova platform add android
    cordova run android

For iOS

    cordova platform add ios
    cordova run ios

Note: for iOS you might need to open platforms/ios/Tenjin.xcworkspace and set the Team before building.

## Tenjin Configuration

[Create a new app](https://www.tenjin.io/dashboard/apps/new) in Tenjin to receive events. The bundle id of *this* demo app is `io.tenjin.cordova.demo`.

Once the app is running, add your device as a [test device in Tenjin](https://www.tenjin.io/dashboard/debug_app_users). You can get the advertising id of your device from the Android or iOS log. 

Open the [SDK Live Data](https://www.tenjin.io/dashboard/sdk_diagnostics) screen to view events from the demo app.