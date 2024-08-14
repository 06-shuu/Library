
const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

let book1 = new Book('Kafka on the shore', 'Haruki Murakami', 480, 'yes');
let book2 = new Book('Emily the Strange', 'Jessica Gruner', 264, 'no')
let book3 = new Book('Siyar Al-muluk', 'Nizam Al-mulk', 325, 'no')

function addBookToLibrary() {
    myLibrary.push(book1)
    myLibrary.push(book2)
    myLibrary.push(book3)
}

addBookToLibrary() //call the function too add books into array 

Book.prototype.display = function () {
    //here the book will be displayed in a card 
    return `
    <p>Title: ${this.title}</p>
    <p>Author: ${this.author}</p>
    <p>Pages: ${this.pages}</p>
    <p>Read: ${this.isRead}</p>
    `
}

function displayBooks() {
    const showBooks = document.querySelector(".showBooks")
    
    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-card');
        bookDiv.innerHTML = `<div> ${book.display()} </div>`;
        showBooks.appendChild(bookDiv);
    });
}

displayBooks()