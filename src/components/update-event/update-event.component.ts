import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params} from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private fs: FirebaseService) { }

  ngOnInit() {
      this.fs.findEvent(this.route.snapshot.queryParamMap.get('id')).valueChanges().subscribe(eventObj=>{
        this.event=eventObj;
        console.log(eventObj);
      });
      
  }
  event;
}
