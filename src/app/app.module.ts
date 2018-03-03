import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { MomentModule } from 'angular2-moment';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FirebaseService } from '../services/firebase.service';
import { AddEventComponent } from '../components/add-event/add-event.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HomeComponent } from '../components/home/home.component';
export const firebaseConfig = {
  
  
  apiKey: "AIzaSyAKt-m1_bzokNg-2ZKQYLycN8yfbNo_ipc",
  authDomain: "noddysclub-6d0a4.firebaseapp.com",
  databaseURL: "https://noddysclub-6d0a4.firebaseio.com",
  projectId: "noddysclub-6d0a4",
  storageBucket: "noddysclub-6d0a4.appspot.com",
  messagingSenderId: "155131590327"
  
};
const appRoutes:Routes=[
  {path:'',component:HomeComponent},
  {path:'addevent',component:AddEventComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    AddEventComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    MomentModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
