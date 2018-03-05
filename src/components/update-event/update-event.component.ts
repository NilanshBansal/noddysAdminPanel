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
  objectKeys = Object.keys; 
  curDate=new Date();
  curMonth=this.curDate.getMonth() + 1;
  nowDate=this.curDate.getFullYear() + "-" +  ("0" + this.curMonth).slice(-2) + "-" + ("0" + this.curDate.getDate()).slice(-2);
  nowTime=new Date().toLocaleTimeString();
  city = "Delhi NCR";
  eventTitle="title";
  updateForm:FormGroup;
  constructor(private route:ActivatedRoute,
              private fs: FirebaseService,
              public fb: FormBuilder,
              private router:Router) {}
  
              
  ngOnInit() {
    this.fs.findObjects("categories").valueChanges().subscribe(data => {
      // console.log("categories: ",data);
      this.categories = data;
      this.fs.findObjects("locations").valueChanges().subscribe(data => {
        console.log("locations: ",data);
        this.locations = data;
        this.fs.findEvent(this.route.snapshot.queryParamMap.get('id')).valueChanges().subscribe(eventObj=>{
          console.log(this.locations);
          console.log(this.categories);
          this.event=eventObj;
          console.log(eventObj);
          this.eventTitle=this.event.myDisplayTitle;
          // this.startDate=new Date(this.event['upcoming_occurrences']);
          this.updateForm = this.fb.group({
            title: [this.eventTitle, Validators.required],
            description: [this.event.description, Validators.required],
            // cat:this.fb.group({
              category: [/* this.event.myCategory */'Choose a category'],
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
            city:['Delhi NCR'],
            
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

      });
    });
    

      
  }
  ngAfterViewChecked(){
    var cityDropdown=(<HTMLInputElement>document.getElementById("cityDropdown"));
    cityDropdown.value=this.city;
    //console.log("dekh bhai dekh");
  
   
  }
  cityChanged(cityInput){
    // var cityDropdown=(<HTMLInputElement>document.getElementById("cityDropdown"));
    this.city=cityInput;
    let that=this;

  }
  submitEvent(){
    var title=this.updateForm.value["title"];
    var description=this.updateForm.value["description"];
    var category=this.updateForm.value["category"];
    var anyOtherCategory=this.updateForm.value["anyOtherCategory"];
    var startAge=this.updateForm.get('age.startAge').value;
    var endAge=this.updateForm.get('age.endAge').value;
    var startDate=this.updateForm.value["startDate"];
    var endDate=this.updateForm.value["endDate"];
    var startTime=this.updateForm.value["startTime"];
    var endTime=this.updateForm.value["endTime"];
    var city=this.updateForm.value["city"];
    var place=this.updateForm.value["place"];
    var anyOtherPlace=this.updateForm.value["anyOtherPlace"];
    var address=this.updateForm.value["address"];
    var pinCode=this.updateForm.value["pinCode"];
    var price=this.updateForm.value["price"];
    var email=this.updateForm.value["email"];
    var phone=this.updateForm.value["phone"];
    var myCategory;
    var titleWithoutFormGroup=(<HTMLInputElement>(document.getElementById('titleInput'))).value;
  
    console.log("see",title);
    if(anyOtherCategory==""){
      anyOtherCategory=null;
    }
    if(category=="Choose a category"){
      category=null;
    }
    if(category==null){
      myCategory=anyOtherCategory;
    }
    else{
      myCategory=category;
    }
    var obj={
      // "title":title,
      "title":titleWithoutFormGroup,
      "description":description,
      "category":category,
      "anyOtherCategory":anyOtherCategory,
      "myCategory":myCategory,
      "startAge":startAge,
      "endAge":endAge,
      "myAge":{
        "lower":startAge,
        "upper":endAge
       },
      // "startDate":startDate,
      // "endDate":endDate,
      // "startTime":startTime,
      // "endTime":endTime,
      "city":city,
      "place":place,
      "anyOtherPlace":anyOtherPlace,
      "myPincode":pinCode,
      // "price":price,
      "img_url":'',
      "url":'',
      "booking_url":'',
      "booking_enquiry_url":'',
      "venue":{
        "name":"",
        "address":address,
        "lat":"",
        "lon":"",
        "city":city
      },
      "mySource":"noddysApp",
      "upcoming_occurrences":{
        0:{
          "date":startDate,
          "start_time":startTime,
          "end_time":endTime,
          "end_date":endDate,
          "single_occurrence":"",
          "timezone":"",
          "enable_ticketing":"",

        }
      },
      "price":{
        0:{
        
            "name": "Per Person",
            "currency": "INR",
            "value": price,
            "is_individual": 1,
            "date": "",
            "time": "",
            "all_occurrences": 1,
            "rank": 1,
            "occurrence_id": 37988610,
            "end_date": "2018-02-17",
            "end_time": "17:00:00",
            "is_valid": "Y",
            "occurrences": [
                {
                    "date": startDate,
                    "time": startTime,
                    "end_date": endDate,
                    "end_time": endTime,
                }
            ],
            "convenience_fees": "",
            "cgst": "",
            "sgst": ""
        }
        
      },
      "myContactDetails":{
        "contactPerson":"",
        "telephoneNo":phone,
        "email":email
      }
    };

    console.log(obj);
    //this.fs.addObject("events",obj);
    // let that=this;
    // setTimeout(function(){
    //   that.fs.addObject("noddysEvents",obj);
    // },2000);
    // alert("Event added");
    // this.router.navigate(['/']);
    
    
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
