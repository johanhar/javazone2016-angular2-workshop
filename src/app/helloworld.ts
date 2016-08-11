import { Component } from '@angular/core';
import { HelloAgain } from '../hello-world/hello-world';

@Component({
    'directives': [HelloAgain],
    'selector': 'hello-world',
    'template': `<h1>Hello world</h1><hello-again></hello-again>`
})
export class HelloWorld {}