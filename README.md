# Security-Access-Tuner-Android
# Description

Security Access Tuner in game Alien: Isolation made with **React Native**, this version is designed to check number code.
React version: [Security-Access-Tuner](https://github.com/ShawnDGitHub/Security-Access-Tuner)

![screenshot](https://github.com/ShawnDGitHub/Security-Access-Tuner/blob/main/screenshot.png)

What already done:

- light/dark mode
- landscape layout support

The screenshot is from the React version. The current project is nearly done with some TODOs left:

- reset screen
- hover component changes its background color when check code state change

# How to start

1. ```npm install```
2. ```npm run android``` (remember to start your avd or connect your physic device <u>before this</u>.)

# Notice
I didn't upload the file <u>gradle.properties</u>, you should go and create one at 'android/gradle.properties'.

It looks like:

```groovy
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m

android.useAndroidX=true

reactNativeArchitectures=armeabi-v7a,arm64-v8a,x86,x86_64

newArchEnabled=true

hermesEnabled=true

# remember to replace the value with your paramters!
REACTNATIVE_STORE_FILE=your-keystore-name
REACTNATIVE_KEY_ALIAS=your-alias
REACTNATIVE_STORE_PASSWORD=your-password
REACTNATIVE_KEY_PASSWORD=your-password-again
```

