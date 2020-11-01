import { Injectable } from '@angular/core';
import {Board} from 'src/modals/Board'
import {Constants} from 'src/app/Constants'
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  userBoard:Board;
  constructor(
  ) {}

  public static generateRandomId(){
    return Math.floor(Math.random() * Constants.MAX_LIMIT_ID);
  }

  public static currentDateTime(){
    return moment().format('YYYY-MM-DD');
  }

  public static fetchResultsFromLocalStorage(key:string){
    return JSON.parse(localStorage.getItem(key)); 
  }

  public static storeResultsFromLocalStorage(key:string, value:any){
    localStorage.setItem(key, JSON.stringify(value));
  }

  public static showStandardDateTime(dateTime){
    return moment(dateTime,'YYYY-MM-DD').format('MMM Do YY')
  }

  


  //currently assuming a universal board for now, it can be created in future module

  


}
