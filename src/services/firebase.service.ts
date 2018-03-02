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
    this.db.object('/events/' + id).remove();
  }


}