import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // shouldShowRecipesTab: string;

  /*
  onClickOfHeaderEvent(event) {
     if (event == 'recipe')
       this.shouldShowRecipesTab = 'show_recipe';
     else
       this.shouldShowRecipesTab = 'show_shopping';
   }
  */

  ngOnInit() {
    // here we r configuring the firebase setup
    // Authentication > Sign-in method > WEB SETUP (button) > copy apiKey and authDomain from config object
    firebase.initializeApp({
      apiKey: 'AIzaSyCkaJIEMhBAU__bamgzEmE4jaZL-7ZVFVg',
      authDomain: 'ng-recipe-book-4712d.firebaseapp.com'

    });
    // thus this will initialize firebase when our application is started
  }
}
