import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isLoader:boolean = false
  constructor() { }
  showLoader(){
      this.isLoader = true;
  }
  hideLoader(){
      this.isLoader = false;
  }
}
