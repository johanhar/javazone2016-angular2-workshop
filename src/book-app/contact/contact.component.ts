import { Component } from '@angular/core';
import {
  FORM_DIRECTIVES,
  REACTIVE_FORM_DIRECTIVES,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

@Component({
    'selector': 'contact',
    directives: [FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    'template': `
        <p class="center" *ngIf="submitted">Thank you for contacting us!</p>

        <form [formGroup]="contactForm" 
            (ngSubmit)="onSubmit(contactForm.value)" 
            novalidate>

            <input type="text" 
                name="name" 
                placeholder="Name *"
                [formControl]="contactForm.controls['name']">

            <input type="email" 
                name="email" 
                placeholder="Email"
                [formControl]="contactForm.controls['email']" 
                novalidate>

            <textarea placeholder="Message *" 
                name="message"
                [formControl]="contactForm.controls['message']">
            </textarea>

            <button type="submit">Contact us</button>
        </form>
        <div class="center">
            <p *ngIf="!contactForm.controls['name'].valid && contactForm.controls['name'].touched">Name is required</p>
            <p *ngIf="!contactForm.controls['email'].valid && contactForm.controls['email'].touched">Email is invalid</p>
            <p *ngIf="!contactForm.controls['message'].valid && contactForm.controls['message'].touched">Message is required</p>
        </div>
    `
})
export class Contact {
    contactForm: FormGroup;
    submitted: boolean = false;

    constructor(formBuilder: FormBuilder) {
        this.contactForm = formBuilder.group({
            'email': ['', Validators.pattern('^[^ ]+@[^ ]+\\.[^ ]+$')],
            'name': ['', Validators.required],
            'message': ['', Validators.required]
        })
    }

    onSubmit(value: string): void {
        console.log('you submitted value: ', value);
        this.contactForm.reset();
        this.submitted = true;

        setTimeout(() => {
            this.submitted = false;
        }, 2000);
    }
}