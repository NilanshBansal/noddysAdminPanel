import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from '../services/firebase.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  allEvents;
  objectKeys=Object.keys;
  constructor(private db:AngularFireDatabase,
              private fs:FirebaseService){
                
  this.fs.returnItems("events").valueChanges().subscribe(data=>{
    this.allEvents=data;
    console.log(data);
  });
  
  }
  
}
