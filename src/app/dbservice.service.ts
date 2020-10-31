import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StateWorkflow } from 'src/modals/StateWorkflow';

@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  
  constructor(
    public firestore:AngularFirestore
  ) {}


  createNewStateList(stateList:any){
    return new Promise((resolve, reject) => {
      this.firestore.collection('States').add(stateList).then(() => {
        resolve();
      },
      (err) => {
        reject();
      }
      )
    });
  }

}
