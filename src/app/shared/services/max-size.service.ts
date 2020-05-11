import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class MaxSizeService {

  maxSize: number;

  constructor() { 
    this.maxSize = 1048576;
  }

  setUserMaxsize(size: number){
    const user = JSON.parse(localStorage.getItem('user'));
    user.maxSize = size;
    this.maxSize = size;
  }

  getMaxsize(){
    return this.maxSize;
  }

}
