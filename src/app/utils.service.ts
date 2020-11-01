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
    return moment().format('YYYY-MM-DD[T]HH:mm:ss');
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

  public static generateRandomColor(){
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  


  //currently assuming a universal board for now, it can be created in future module

  


}
