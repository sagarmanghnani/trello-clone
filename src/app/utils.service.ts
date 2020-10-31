import { Injectable } from '@angular/core';
import {Board} from 'src/modals/Board'
import {Constants} from 'src/app/Constants'
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  userBoard:Board;
  constructor() {}

  public static generateRandomId(){
    return Math.floor(Math.random() * Constants.MAX_LIMIT_ID);
  }


  //currently assuming a universal board for now, it can be created in future module

  


}
