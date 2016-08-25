import { Component } from '@angular/core';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup
} from '@angular/forms';

@Component({
    'selector': 'contact',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    'template': `
        <form [formGroup]="contactForm" 
            (ngSubmit)="onSubmit(contactForm.value)">

            <input type="text" 
                name="name" 
                placeholder="Name *"
                [formControl]="contactForm.controls['name']">

            <input type="email" 
                name="email" 
                placeholder="Email"
                [formControl]="contactForm.controls['email']">

            <textarea placeholder="Message *" 
                name="message"
                [formControl]="contactForm.controls['message']>
            </textarea>

            <button type="submit">Contact us</button>
        </form>
    `
})
export class Contact {
    contactForm: FormGroup;

    constructor(formBuilder: FormBuilder) {
        this.contactForm = formBuilder.group({
            'email': [''],
            'name': [''],
            'message': ['']
        })
    }

    onSubmit(value: string): void {
        console.log('you submitted value: ', value);
    }
}