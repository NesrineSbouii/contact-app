import { Contact } from 'src/app/models/contact';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {
  set contact(t: Contact[]) {
    localStorage.setItem('items', JSON.stringify(t));
  }


  getItems(){
    var data = localStorage.getItem('items');
    if (data){
      return JSON.parse(data);
    }else{
      return []
    }
  }

  constructor() { }
}
