import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { StateWorkflow } from 'src/modals/StateWorkflow';
import { Observable } from 'rxjs';
import { FirebaseApp } from "@angular/fire";
import 'firebase/storage'
import { Task } from 'src/modals/Task';


@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  
  constructor(
    public firestore:AngularFirestore,
    public angularFirebase:FirebaseApp
  ) {
    
  }


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

  

  fetchAllStatesForBoardId(boardId:number):Observable<StateWorkflow[]>{
    return this.firestore.collection<StateWorkflow>("States", ref => ref.where('board_id', '==', boardId)).valueChanges({idField: 'state_id'}).pipe();
  }

  uploadAttachment(file, filename,extension){
    return new Promise((resolve, reject) => {
      const id = Math.random().toString(36).substring(2);
      const ref = this.angularFirebase.storage().ref(`${id}${filename}`).put(file).then((uploadTaskSnapshot) => {
        uploadTaskSnapshot.ref.getDownloadURL().then(downloadUrl => {
          resolve(downloadUrl);
        })
        .catch((err) => {
          reject();
        })
      });
    })

  }

  createNewTask(task:Task){
    return new Promise((resolve, reject) => {
      this.firestore.collection('Tasks').add(task).then(() => {
        resolve();
      },
      (err) => {
        reject();
      }
      )
    })
  }

  getTasksFromStateId(stateId:string):Observable<Task[]> {
    return this.firestore.collection<Task>("Tasks", ref => ref.where('state_id','==', stateId)).valueChanges({idField: 'task_id'}).pipe();
  }

  updateTask(taskId:string, updateData:Task){
    return new Promise((resolve, reject) => {
      return this.firestore.collection("Tasks").doc(taskId).set(updateData).then(() => {
        resolve();
      },
      (err) => {
        reject();
      }
      )
    })
  }

  fetchAllowedStatesForBoardId(boardId, order:number){
    return this.firestore.collection<StateWorkflow>("States", ref => ref.where('board_id', '==', boardId).where('order', '<=', order + 1)).valueChanges({idField: 'state_id'}).pipe();

  }

  deleteTaskFromTaskId(taskId){
    return this.firestore.collection("Tasks").doc(taskId).delete();
  }

}
