import {Component} from '@angular/core';
import {Message} from "./message";

@Component({
    'selector': 'contact',
    'directives': [],
    'template': `
        <h1 *ngIf="!submitted">Contact us</h1>
        <form *ngIf="!submitted" #messageForm="ngForm" (ngSubmit)="submitForm()" novalidate>
          <input autofocus="true"
                 autocomplete="off" 
                 [(ngModel)]="model.name" 
                 type="text" 
                 [class.error]="name.invalid && !name.pristine"
                 placeholder="Name *" 
                 #name="ngModel"
                 required
                 name="name">
          <div class="error" [hidden]="name.valid || name.pristine">
            Name is required.
          </div>
          <input autocomplete="off"
                 [(ngModel)]="model.email" type="email"
                 placeholder="Email" name="email">
          <textarea [(ngModel)]="model.messageText" 
                    placeholder="Your message *" 
                    [class.error]="message.invalid && !message.pristine"
                    #message="ngModel"
                    required
                    name="messageText">
          </textarea>
          <div class="error" [hidden]="message.valid || message.pristine">
            Message text is required.
          </div>
          <input [hidden]="!messageForm.form.valid" type="submit" value="Send">
        </form>   
        <h1 *ngIf="submitted">Thank you!</h1>
     `
})
export class ContactForm {
    submitted: boolean = false;
    model = new Message('', '', '');

    submitForm():void {
        console.log("Submitting form with data " + JSON.stringify(this.model));
        this.submitted = true;
        this.model = new Message('', '', '');
        setTimeout(() => {
            this.submitted = false;
        }, 2000);
    }

}