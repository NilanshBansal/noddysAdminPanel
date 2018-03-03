import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  allEvents;
  objectKeys=Object.keys;
  parseDate = Date.parse;
  todayTimestamp = Date.parse((new Date()).toString());
  Math: any;
  constructor(private db:AngularFireDatabase,
              private fs:FirebaseService){
  this.Math=Math;     
  this.fs.returnItems("events").valueChanges().subscribe(data=>{
    this.allEvents=data;
    console.log(data);
  });
  
  }
  purgeAll(){
    // this.fs.removeAll();
  }
  
  purge(originName){
    this.fs.removeEventByOrigin(originName);
  }
  purgeEvent(id){
    this.fs.removeEventById(id);
  }
}