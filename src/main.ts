import { bootstrap } from '@angular/platform-browser-dynamic';

import { BookApp } from './book-app/book-app.component';
import { About } from './book-app/about/about.component';
import { Books } from './book-app/books/books.component';
import { Contact } from './book-app/contact/contact.component';

import {bind, Component} from '@angular/core';
import {
  ROUTER_DIRECTIVES,
  provideRouter,
  Router,
  RouterConfig
} from '@angular/router';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

const routes: RouterConfig = [
    {
        path: '', 
        redirectTo: 'books', 
        terminal: true
    },
    {
        path: 'about', 
        component: About
    },
    {
        path: 'books',
        component: Books
    },
    {
        path: 'contact',
        component: Contact
    }
];

bootstrap(BookApp, [
    provideRouter(routes),
    disableDeprecatedForms(),
    provideForms(),
    bind(LocationStrategy).toClass(HashLocationStrategy)
]);