import { Component } from '@angular/core';

@Component({
    'selector': 'contact',
    'template': `
        <h1>Contact us</h1>
        <form action="">
          <input type="text" placeholder="Name" name="name">
          <input type="email" placeholder="Email" name="email">
          <textarea placeholder="Message" name="message"></textarea>
          <input type="submit" value="Send">
        </form>   
     `
})
export class Contact {}