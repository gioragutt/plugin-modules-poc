# LazyLoadingModules

## Purpose

The purpose of this project is to show a POC of having feature modules, which are not loaded via
The built-in routing mechanism, and have them expose a standard api.

## Why not use the routing mechanism?

This is a POC which will hopefully, after refactoring and improving, be used in a certain app.
This app does not rely on routing, and basically has two routes: /login and /app.
The /app contains a big application, with a map, and a lot of map elements and floating forms.
Under certain curcuimstences, we don't wont to load all feature modules -

- Different environments
- A/B Testing
- Etc
  And so, I want to provide a way for modules to expose some api, that will be available to the app, if and once loaded.

## What do we see here?

Each feature module exposes forms (regular components), which can have attributes, such as a category, a code, and etc.
The library root module exposes a FormsRepository, which holds all the loaded form components, and exposes them outside.

The app component shows a simple menu with all the components from the registry.
Clicking on a component name loads the component below the menu.

## ANGULAR CLI GENERATED STUFF

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
