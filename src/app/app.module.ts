import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { FirebaseService } from '../services/firebase.service';
export const firebaseConfig = {
  
  
  apiKey: "AIzaSyAKt-m1_bzokNg-2ZKQYLycN8yfbNo_ipc",
  authDomain: "noddysclub-6d0a4.firebaseapp.com",
  databaseURL: "https://noddysclub-6d0a4.firebaseio.com",
  projectId: "noddysclub-6d0a4",
  storageBucket: "noddysclub-6d0a4.appspot.com",
  messagingSenderId: "155131590327"
  
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
