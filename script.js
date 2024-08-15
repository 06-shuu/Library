
const myLibrary = [];

function Book(title, author, pages, isRead, rate) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.rate = rate;
}

let book1 = new Book('Kafka on the shore', 'Haruki Murakami', 480, 'yes','☆☆☆☆');
let book2 = new Book('Emily the Strange', 'Jessica Gruner', 264, 'no','☆☆☆')
let book3 = new Book('Siyar Al-muluk', 'Nizam Al-mulk', 325, 'no','☆☆☆')


function addBookToLibrary() {
    myLibrary.push(book1)
    myLibrary.push(book2)
    myLibrary.push(book3)
}

addBookToLibrary() 

Book.prototype.display = function () {
    return `
    <p class="title">${this.title}</p>
    <p>Author: ${this.author}</p>
    <p>Pages: ${this.pages}</p>
    <p>Read: ${this.isRead}</p>
    <p>Rate: ${this.rate}</p>
    `
}

//
const showButton = document.querySelector(".showDialog");
const addBookDialog = document.querySelector(".addBookDialog");
const outputBox = document.querySelector("output");
const selectReadingStatus = addBookDialog.querySelector('#isRead')
const selectRating = addBookDialog.querySelector('#rate')
const confirmBtn = addBookDialog.querySelector("#confirmBtn");

showButton.addEventListener("click", () => {
    addBookDialog.showModal();
});


function displayBooks() {
    const showBooks = document.querySelector(".showBooks")
    
    myLibrary.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-card');
        bookDiv.innerHTML = `
            ${book.display()} 
            <div class="ebtns">
                <button class="deleteBtn"><i class="fa-solid fa-trash-can"></i></button>
                <button class=editBtn><i class="fa-solid fa-pen-to-square"></i></button>
            </div>
            `;
        showBooks.appendChild(bookDiv);
    });
}

displayBooks()



