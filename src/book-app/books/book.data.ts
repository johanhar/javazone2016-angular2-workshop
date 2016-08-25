import { Book } from './book.model';

export const BOOK_DATA: [Book] = [

    new Book(
        1, 
        'Java Testing with Spock', 
        'Konstantinos Kapelonis', 
        'ISBN 9781617292538', 
        'Java Testing with Spock teaches you how to use Spock for a wide range of testing use cases in Java.'),

    new Book(
        2, 
        'Oculus Rift in Action', 
        'Bradley Austin Davis', 
        'ISBN 9781617292194', 
        'Oculus Rift in Action introduces the powerful Oculus Rift headset and teaches you how to integrate its many features into 3D games and other virtual reality experiences.'),

    new Book(
        3, 
        'Technology Paradise Lost', 
        'Erik Keller', 
        'ISBN 9781932394139', 
        'An engine of the world economy, the computer industry is sputtering. What happened? Will it regain its power and again drive economic growth as in the past?'),

    new Book(
        4, 
        'Learn Linux in a Month of Lunches', 
        'Steven Ovadia', 
        'ISBN 9781617293283', 
        'Learn Linux in a Month of Lunches shows you how to install and use Linux for all the things you do with your OS, like connecting to a network, installing software, and securing your system.')

]