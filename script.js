'use strict';

let myLibrary = [];

function Book(title, author, numOfPages, haveRead) {
    if (!new.target) throw Error("Need to use 'new' operator!");
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.numOfPages = numOfPages;
    this.haveRead = haveRead;
}

Book.prototype.toggleRead = function () {
    this.haveRead = !this.haveRead;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.haveRead ? "already read" : "not read yet"}`;
}

function addBookToLibrary(title, author, numOfPages, haveRead) {
    myLibrary.push(new Book(title, author, numOfPages, haveRead));
}

function removeBook() {
    let id = this.getAttribute('data-id');
    myLibrary = myLibrary.filter(book => book.id !== id);
    displayBooks();
}

function toggleReadBook() {
    let id = this.getAttribute('data-id');
    let theBook = myLibrary.find(book => book.id === id);
    theBook.toggleRead();
    displayBooks();
}

function displayBook(book) {
    const flexbox = document.createElement("div");
    flexbox.classList.add("flexbox");

    const bookInfo = document.createElement("p");
    bookInfo.textContent = book.info();

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete this book";
    deleteButton.setAttribute("data-id", book.id);
    deleteButton.addEventListener('click', removeBook);

    const readButton = document.createElement("button");
    readButton.textContent = book.haveRead ? "Unread" : "Read";
    readButton.setAttribute("data-id", book.id);
    readButton.addEventListener('click', toggleReadBook);

    flexbox.appendChild(bookInfo);
    flexbox.appendChild(deleteButton);
    flexbox.appendChild(readButton);
    container.appendChild(flexbox);

}

function displayBooks() {
    container.innerHTML = "";
    myLibrary.forEach(displayBook);
}

const container = document.querySelector(".container");

addBookToLibrary("The Hobbit1", "J.R.R. Tolkien1", 291, false);
addBookToLibrary("The Hobbit2", "J.R.R. Tolkien2", 292, false);
addBookToLibrary("The Hobbit3", "J.R.R. Tolkien3", 293, false);
displayBooks();

const dialog = document.querySelector("dialog");

const openButton = document.querySelector("#open-button");
const closeButton = document.querySelector('#close-button');
const submitButton = document.querySelector('#submit-button')

const inputs = dialog.querySelectorAll('input');

openButton.addEventListener('click', () => dialog.showModal());

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const inputArray = Array.from(inputs).map(item => item.value);
    addBookToLibrary(inputArray[0], inputArray[1], inputArray[2], false);
    displayBooks();
    dialog.close();
    document.querySelector('form').reset();
})

