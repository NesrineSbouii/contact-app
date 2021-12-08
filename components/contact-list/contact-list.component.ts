import { Component, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact';
import { ContactServiceService } from 'src/app/service/contact-service.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit  {
  selectedIndex: number= -1;
  items: Contact[] = [];
  formContact: FormGroup = new FormGroup({}); 
  constructor(fb: FormBuilder ,private contactService : ContactServiceService) {
    this.formContact = fb.group({
      "firstName": [null,[Validators.required ,Validators.minLength(3)]],
      "lastName": [null, [Validators.required ,Validators.minLength(3)]],
      "email": [null,Validators.email],
      "phoneNumber": [null,  [Validators.required, Validators.pattern("[0-9 ]{8}")]]

    })
    
  }



  ngOnInit(): void {

    this.items= this.contactService.getItems()
  }
  
  onNameChange($event: any, index: number) {
    this.items[index].firstName = $event.target.value;
  }

  onSubmit(){
      this.items.push(this.formContact.value)
      this.contactService.contact = this.items;
      this.formContact.reset()
  }

  deleteFromList(index: number){
    this.contactService.contact = this.items.splice(index, 1);
  }
  

  
}
