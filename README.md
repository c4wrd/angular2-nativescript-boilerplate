# Angular 2 NativeScript Boilerplate

An easy to use boilerplate for Angular 2 applications on Android and iOS

Features:
   - Typescript, SASS
   - Easy to use Gulp workflow
   - Separate your build directory from your source

This was built in efforts to find an easy to use Typescript workflow, and at
an attempt to make a lightweight boilerplate without all of the additional
bloat. It can be assumed you know how to implement Angular 2, or are learning,
but setting up an easy to use build-system is non-trivial.

# Getting Started

1. Install this repository
```
git clone https://github.com/c4wrd/angular2-nativescript-boilerplate.git MyApp
```

2. Install node packages
```
cd MyApp
npm install
npm install --only=dev
```

3. Modify the src directory, this is where your application will live

4. Add the platforms you desire
```
tns platform add ios
tns platform add android
```

5. Build with Gulp
```
gulp
```

6. Emulate or deploy!
```
tns emulate ios
```

This README is currently being written...
