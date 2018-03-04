import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Params, Router} from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {
  event;
  categories;
  locations;
  startDate;
  curDate=new Date();
  curMonth=this.curDate.getMonth() + 1;
  nowDate=this.curDate.getFullYear() + "-" +  ("0" + this.curMonth).slice(-2) + "-" + ("0" + this.curDate.getDate()).slice(-2);
  nowTime=new Date().toLocaleTimeString();
  city = "Delhi NCR";
  updateForm:FormGroup;
  constructor(private route:ActivatedRoute,
              private fs: FirebaseService,
              public fb: FormBuilder,
              private router:Router) {}
  
              
  ngOnInit() {
    alert("oninit");
      this.fs.findEvent(this.route.snapshot.queryParamMap.get('id')).valueChanges().subscribe(eventObj=>{
        this.event=eventObj;
        console.log(eventObj);
        console.log(this.event.title);
        // this.startDate=new Date(this.event['upcoming_occurrences']);
        this.updateForm = this.fb.group({
          
          title: [this.event.title, Validators.required],
          description: [this.event.description, Validators.required],
          // cat:this.fb.group({
            category: [/* this.event.myCategory */''],
            anyOtherCategory: [''],
          // },{validator:this.catValidator}),
          
          age:this.fb.group({
            startAge: ['',Validators.required],
            endAge: ['',Validators.required],
          },{validator:this.ageValidator}),
          
          startDate:[this.nowDate,Validators.required],
          endDate:[this.nowDate,Validators.required],
          startTime:[this.nowTime,Validators.required],
          endTime:[this.nowTime,Validators.required],
          city:[this.event.myCity],
          
          // placeGroup:this.fb.group({
            place:['Choose a place'],
            anyOtherPlace:[''],
          // },{validator:this.placeValidator}),
          
          address:[this.event.venue.address,Validators.required],
          pinCode:[''],
          price:['',Validators.required],
          email:[''],
          phone:['']
    
          
        });
      });

      this.fs.findObjects("categories").valueChanges().subscribe(data => {
        // console.log("categories: ",data);
        this.categories = data;
      });
      this.fs.findObjects("locations").valueChanges().subscribe(data => {
        console.log("locations: ",data);
        this.locations = data;
      });
      
      
  }
 

  ageValidator = (control: AbstractControl): {[key: string]: boolean} => {
    const startAge = control.get('startAge');
    const endAge = control.get('endAge');
    
    if(startAge.value>endAge.value){
      return  {nomatch:true};
    }
    else{
      return null;
    }
  };

}
