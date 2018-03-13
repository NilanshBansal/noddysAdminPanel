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
  objectKeys = Object.keys;
  parseDate = Date.parse;
  todayTimestamp = Date.parse((new Date()).toString());
  Math: any;
  totalCount = 0;
  countFb = 0;
  countNoddy = 0;
  countEventsHigh = 0;


  constructor(private db: AngularFireDatabase,
    private fs: FirebaseService) {
    this.Math = Math;


  }
  ngOnInit() {
    this.fs.returnItems("events").valueChanges().subscribe(data => {
      this.allEvents = data || [];
      
      // console.log(data);

    });
  }
  ngAfterViewInit(){
    let keys = Object.keys(this.allEvents);
    this.totalCount = keys.length;
    keys.forEach((key) => {
      if (this.allEvents[key].mySource == 'fb') {
        this.countFb++;
      }
      if (this.allEvents[key].mySource == 'eventsHigh') {
        this.countEventsHigh++;
      }
      if (this.allEvents[key].mySource == 'noddysApp') {
        this.countNoddy++;
      }
    })
    // console.log(this.allEvents);
    console.log(this.totalCount);
    console.log(this.countFb);
    console.log(this.countEventsHigh);
    console.log(this.countNoddy);
  }
  
  purgeAll() {
    // this.fs.removeAll();
  }

  purge(originName) {
    this.fs.removeEventByOrigin(originName);
  }
  purgeEvent(id) {
    console.log(id);
    if(this.allEvents[id].mySource=='fb'){
      this.countFb--;
    }
    if(this.allEvents[id].mySource=='eventsHigh'){
      this.countEventsHigh--;
    }
    if(this.allEvents[id].mySource=='noddysApp'){
      this.countNoddy--;
    }
    this.fs.removeEventById(id);
    this.totalCount--;
  }
}
