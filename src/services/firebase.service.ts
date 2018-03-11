import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseService {
  // public items: Observable<any[]>;
  // public objects: Observable<any[]>;

  constructor(private db: AngularFireDatabase,
    private afs: AngularFirestore,
  ) { }

  returnItems(stringvar) {
    //return this.db.list('/' + stringvar);
    return this.db.object("/" + stringvar);
    //return this.objects;
  }
  removeAll() {

    const itemRef = this.db.list("/events");
    itemRef.remove();
  }
  filterdata(order,equal){
    // return this.db.list('/events', ref => ref.orderByChild(order).equalTo(equal).limitToFirst(5));
    return this.db.list('/events', ref => ref.orderByChild(order).equalTo(equal));
  }
  removeEventByOrigin(originName){
    this.filterdata('mySource',originName).snapshotChanges().subscribe(data=>{
      console.log(data);
      data.forEach(element=>{
        this.db.object('/events/' + element["key"]).remove();
      });
    });

  }

  removeEventById(id){
    console.log("called remove object");
    this.db.object('/events/' + id).remove();
  }
  findObjects(stringvar) {
    return this.db.object('/' + stringvar);
  }

  addObject(stringvar,element){
    console.log("called add object");
    console.log(element);
    const itemRef = this.db.object("/" + stringvar);
    var obj={};
    itemRef.snapshotChanges().subscribe(snapshot => {
      obj={};
      element["title"] = element["title"].replace(/[\.,#,$,/,\[,\]]/g, '');
      console.log(element["title"] );
      if (snapshot.payload.val() == null || (snapshot.payload.val() != null && snapshot.payload.val()[element["title"]] == undefined)) {
        console.log("dekhoji");
        element["myAdminApproved"] = true;
        element["myDisplayTitle"]=element["title"];
        element["myLocation"]="";
        // element["myPincode"]="";
        // element["myLocationCaps"]="";
        if(element["city"]=='Delhi'){
          element["myCity"]='Delhi NCR';
          element["myCityCaps"]=element["myCity"].toUpperCase();
        }
        else{
          element["myCityCaps"]=element["city"].toUpperCase();
        
        }
        // element["myCategory"]=element["cats"][0];
        // element["myCategoryCaps"]="";
        
        // element["myAge"]={
        //  "lower":0,
        //  "upper":18
        // };
        obj[element["myDisplayTitle"]] = element;
        console.log(element["myDisplayTitle"]);
      }
      console.log("hello");
      console.log(obj);
      itemRef.update(obj);
    });
    
  }
  findEvent(eventid){
    return this.db.object('/events/' + eventid);
  
  }

}