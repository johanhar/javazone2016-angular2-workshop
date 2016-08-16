import {Component} from '@angular/core';
import {Message} from "./message";

@Component({
    'selector': 'contact',
    'template': `
        <h1>Contact us</h1>
        <form (ngSubmit)="submitForm()" #messageForm="ngForm">
          <input [(ngModel)]="model.name" type="text" placeholder="Name" name="name">
          <input [(ngModel)]="model.email" type="email"
                 class="error"
                 placeholder="Email" name="email" required>
          <div class="error">Email is required</div>
          <textarea [(ngModel)]="model.messageText" placeholder="Message" name="messageText"></textarea>
          <input [disabled]="!messageForm.form.valid" type="submit" value="Send">
        </form>   
        {{messageForm.form.valid}}
     `
})
export class ContactForm {

    model = new Message('', '', '');

    submitForm():void {
        console.log("Submitting form with data " + JSON.stringify(this.model));
    }

}