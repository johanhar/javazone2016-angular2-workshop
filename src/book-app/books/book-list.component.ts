import { Component } from '@angular/core';
import { BookRow } from './book-row.component';
import { Book } from './book.model';

@Component({
    'selector': 'book-list',
    'directives': [BookRow],
    'template': `
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                </tr>
            </thead>
            <tbody>
                <!-- snart lager vi en NgFor her istedenfor -->
                <tr book-row></tr>
                <tr book-row></tr>
                <tr book-row></tr>
                <tr book-row></tr>
            </tbody>
        </table>
    `
})
export class BookList {
    books: [Book] = [
        new Book(
            'Java Testing with Spock', 
            'Konstantinos Kapelonis', 
            9781617292538,
            `Java Testing with Spock teaches you how to use Spock
            for a wide range of testing use cases in Java. You'll
            start with a quick overview of Spock, and work through
            writing unit tests using the Groovy language. You'll explore
            the best practices for test design as you explore the Spock
            framework. As you move along, you'll learn to write mocks,
            implement integration tests, use Spock's built-in BDD testing
            tools, and do functional web testing using Geb. Readers new
            to Groovy will appreciate the succinct language tutorial
            that'll give you just enough Groovy to use Spock effectively.`),
        
        new Book(
            'Java Testing with Spock', 
            'Konstantinos Kapelonis', 
            9781617292538,
            `Java Testing with Spock teaches you how to use Spock
            for a wide range of testing use cases in Java. You'll
            start with a quick overview of Spock, and work through
            writing unit tests using the Groovy language. You'll explore
            the best practices for test design as you explore the Spock
            framework. As you move along, you'll learn to write mocks,
            implement integration tests, use Spock's built-in BDD testing
            tools, and do functional web testing using Geb. Readers new
            to Groovy will appreciate the succinct language tutorial
            that'll give you just enough Groovy to use Spock effectively.`),
        
        new Book(
            'Java Testing with Spock', 
            'Konstantinos Kapelonis', 
            9781617292538,
            `Java Testing with Spock teaches you how to use Spock
            for a wide range of testing use cases in Java. You'll
            start with a quick overview of Spock, and work through
            writing unit tests using the Groovy language. You'll explore
            the best practices for test design as you explore the Spock
            framework. As you move along, you'll learn to write mocks,
            implement integration tests, use Spock's built-in BDD testing
            tools, and do functional web testing using Geb. Readers new
            to Groovy will appreciate the succinct language tutorial
            that'll give you just enough Groovy to use Spock effectively.`),
        
        new Book(
            'Java Testing with Spock', 
            'Konstantinos Kapelonis', 
            9781617292538,
            `Java Testing with Spock teaches you how to use Spock
            for a wide range of testing use cases in Java. You'll
            start with a quick overview of Spock, and work through
            writing unit tests using the Groovy language. You'll explore
            the best practices for test design as you explore the Spock
            framework. As you move along, you'll learn to write mocks,
            implement integration tests, use Spock's built-in BDD testing
            tools, and do functional web testing using Geb. Readers new
            to Groovy will appreciate the succinct language tutorial
            that'll give you just enough Groovy to use Spock effectively.`),
        
        new Book(
            'Java Testing with Spock', 
            'Konstantinos Kapelonis', 
            9781617292538,
            `Java Testing with Spock teaches you how to use Spock
            for a wide range of testing use cases in Java. You'll
            start with a quick overview of Spock, and work through
            writing unit tests using the Groovy language. You'll explore
            the best practices for test design as you explore the Spock
            framework. As you move along, you'll learn to write mocks,
            implement integration tests, use Spock's built-in BDD testing
            tools, and do functional web testing using Geb. Readers new
            to Groovy will appreciate the succinct language tutorial
            that'll give you just enough Groovy to use Spock effectively.`),
        
        new Book(
            'Java Testing with Spock', 
            'Konstantinos Kapelonis', 
            9781617292538,
            `Java Testing with Spock teaches you how to use Spock
            for a wide range of testing use cases in Java. You'll
            start with a quick overview of Spock, and work through
            writing unit tests using the Groovy language. You'll explore
            the best practices for test design as you explore the Spock
            framework. As you move along, you'll learn to write mocks,
            implement integration tests, use Spock's built-in BDD testing
            tools, and do functional web testing using Geb. Readers new
            to Groovy will appreciate the succinct language tutorial
            that'll give you just enough Groovy to use Spock effectively.`),

        new Book(
            'Java Testing with Spock', 
            'Konstantinos Kapelonis', 
            9781617292538,
            `Java Testing with Spock teaches you how to use Spock
            for a wide range of testing use cases in Java. You'll
            start with a quick overview of Spock, and work through
            writing unit tests using the Groovy language. You'll explore
            the best practices for test design as you explore the Spock
            framework. As you move along, you'll learn to write mocks,
            implement integration tests, use Spock's built-in BDD testing
            tools, and do functional web testing using Geb. Readers new
            to Groovy will appreciate the succinct language tutorial
            that'll give you just enough Groovy to use Spock effectively.`)
    ];
}