'use strict';

class Book {
    constructor(title, author, numOfPages, haveRead) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.numOfPages = numOfPages;
        this.haveRead = haveRead;
    }

    toggleRead() {
        this.haveRead = !this.haveRead;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.numOfPages} pages, ${this.haveRead ? "already read" : "not read yet"}`;
    }    
}

let myLibrary = [];

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
const form = dialog.querySelector("form");


openButton.addEventListener('click', () => dialog.showModal());
closeButton.addEventListener('click', () => dialog.close());

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const titleInput = form.querySelector("#title");
    const authorInput = form.querySelector("#author");
    const pageInput = form.querySelector("#pages");

    if (titleInput.validity.valueMissing){
        titleInput.setCustomValidity("Title is required.");
        titleInput.reportValidity();    
        return;
    }
    if (authorInput.validity.valueMissing){
        authorInput.setCustomValidity("Author is required.");
        authorInput.reportValidity();
        return;
    }
    if (pageInput.validity.valueMissing){
        pageInput.setCustomValidity("Pages is required.");
        pageInput.reportValidity();
        return;
    }

    addBookToLibrary(titleInput.value, authorInput.value, pageInput.value, false);
    displayBooks();
    dialog.close();
    form.reset();
})


// form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     if (titleInput.validity.valueMissing)
//         titleInput.setCustomValidity("Title is required.");

// })

