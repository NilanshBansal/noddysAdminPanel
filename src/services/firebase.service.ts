import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseService {
  public items: Observable<any[]>;
  public objects: Observable<any[]>;
  
  constructor(private db: AngularFireDatabase,
    private afs: AngularFirestore,
    ) {}

    returnItems(stringvar) {
        //return this.db.list('/' + stringvar);
        return this.db.object("/" + stringvar);
        //return this.objects;
      }


}