# Ecommerce

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

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

====================================================================================

Debugging For angular application can be done by ->
Q) As wkt in the browser (.ts) code is converted to (.js) code so question arises 
how to debug Typescript code in Angular ?
Ans)
f12 > Source > webpack > . (dot folder) > src (folder)
Now this src folder has Complete angular project as in the development envrio, where 
we can start putting break points for debugging.

To analyze Angular application we can use -> Chrome Extension called => Augry


-----------------------------------------------------------------------------------
 <a (click)="OnClickOfTab('recipe')">Recipes</a> 
for OnClickOfTab() func we r passing argum VALUE as recipe
Thus in (.ts) file we can use this value -
 OnClickOfTab(argumVara) {
    clg(argumVara)
 }

 Similarly, 
 <app-header (recipeClickedEvent)="onClickOfRecipeEvent('recipe', $event )" > </app-header>
This onClickOfRecipeEvent() func has two argum. First argum has value as recipe and second argum is event
Object :)
 OnClickOfTab(argumVara, eventVara) {
    clg(argumVara)
    clg(eventVara)
 }


-------------------------------------------------------------------------------------------------------

AUthentication in Firebase ->
Authentication (tab) > Singin method (tab) > Sign-in provider > Email/password (enable)

Now Instiall firebase in your angular appln (bcoz- we dont have backend serverlike node, java we r using
firebase sdk as our backend server. So in order to use this firebase sdk we should install below cmd)-
npm i --save firebase

To initialize firebase when our angular application is started go to - app.component.ts
import * as firebase from {firebase}

 ngOnInit() {
    //here we r configuring the firebase setup
    //Authentication > Sign-in method > WEB SETUP (button) > copy apiKey and authDomain from config object
    firebase.initializeApp({
      apiKey: "AIzaSyCkaJIEMhBAU__bamgzEmE4jaZL-7ZVFVg",
      authDomain: "ng-recipe-book-4712d.firebaseapp.com"
    })
    //thus this will initialize firebase when our application is started
  }

Note to get this apiKey and authDomain Value go to -> firbase website then -> Authentication > Sign-in method > WEB SETUP (button) > copy apiKey and authDomain from config object

When we signin with firebase sdk, A new token is generated, this token will be stored by firebase (will be
taken care by  firebase) we need to store this token.
To this token where it is stored goto >
f12 > Application > local storage > http://localhost:4200 > u will find key value pair of token

Now since we r using firebase authentication process, so change the rules in the firebase realtime database
Go to Database> rules > 
{
  "rules" : {
    ".read" : "true", //true means any 1 who knows the url can read and write in this firebase realtime db
    ".wirte" : "true",
  }
}

So we need to restrict the access who can read and write into the firebase db- that is who so ever has the 
authentication token can only read and write into this firebase db
this can be done by changing the rule i.e-
{
  "rules" : {
    ".read" : "auth != null",
    ".wirte" : "auth != null",
  }
}

-------------------------------------------------------------------------------------------------------
   CommonModule, // this commonModule contains all the common features like - *ngFor,*ngIf,etc
        // So this module will be generally imported in imports array for featue module
        // BrowserModule is written in app.module.ts -> this module contains CommonModule and other additional features
        // which might be used when application is loaded, So we should only is use BrowserModule in App Module(root module)
        // and CommonModule in the feature module


-------------------------------------------------------------------------------------------------------
*) We must not declare same Component, Pipe and Directives in two or more module
*) We can provide same Service in two or more modules
*) We can imports same module in two or more modules
So never duplicate the declartions (in muliple modules)
