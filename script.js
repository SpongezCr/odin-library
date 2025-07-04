'use strict';

const myLibrary = [];

function Book(title, author, numOfPages, haveRead) {
    if (!new.target) throw Error("Need to use 'new' operator!");
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
    this.info = () => `${this.title} by ${this.author}, ${numOfPages} pages, ${haveRead ? "already read" : "not read yet"}`
}


function addBookToLibrary(title, author, numOfPages, haveRead) {
    myLibrary.push(new Book(title, author, numOfPages, haveRead));
}

function displayBooks() {
    myLibrary.forEach( book => {
        const bookInfo = document.createElement("p");
        bookInfo.textContent = book.info();
        container.appendChild(bookInfo);
    })
}

const container = document.querySelector(".container");

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
displayBooks();