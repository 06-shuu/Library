const myLibrary = [];

function Book(title, author, pages, readStatus, rate) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.rate = rate;
}

let book1 = new Book('Kafka on the shore', 'Haruki Murakami', 480, 'yes', 'excellent');
let book2 = new Book('Emily the Strange', 'Jessica Gruner', 264, 'no', 'good');
let book3 = new Book('Siyar Al-muluk', 'Nizam Al-mulk', 325, 'no', 'good');

function addBookToLibrary(book) {
    myLibrary.push(book);
}

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

function getStarRating(rate) {
    switch (rate) {
        case 'bad':
            return '☆';
        case 'average':
            return '☆☆';
        case 'good':
            return '☆☆☆';
        case 'excellent':
            return '☆☆☆☆';
    }
}

Book.prototype.display = function () {
    return `
    <p class="title">${this.title}</p>
    <p> <span class="info">Author: </span> ${this.author}</p>
    <p> <span class="info">Pages: </span>${this.pages}</p>
    <p> <span class="info">Read: </span>${this.readStatus}</p>
    <p> <span class="info">Rate:</span>${getStarRating(this.rate)}</p>
    `;
};

Book.prototype.toggleReadBtn = function () {
    this.readStatus = this.readStatus === 'yes' ? 'no' : 'yes';
};

function displayBooks() {
    const showBooks = document.querySelector(".showBooks");
    showBooks.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-card');
        bookDiv.innerHTML = `
            ${book.display()} 
            <div class="ebtns">
                <button class="deleteBtn" data-index="${index}"><i class="fa-solid fa-trash-can"></i></button>
                <button class="readBtn" data-index="${index}"><i class="fa-brands fa-readme"></i></button>
            </div>
            `;
        showBooks.appendChild(bookDiv);
    });

    const deleteButtons = document.querySelectorAll('.deleteBtn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const bookIndex = e.currentTarget.getAttribute('data-index');
            removeBookFromLibrary(bookIndex);
        });
    });

    const readButtons = document.querySelectorAll('.readBtn');
    readButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const bookIndex = e.currentTarget.getAttribute('data-index');
            myLibrary[bookIndex].toggleReadBtn();
            displayBooks(); 
        });
    });
    console.log(myLibrary)
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

const showButton = document.querySelector(".showDialog");
const addBookDialog = document.querySelector(".addBookDialog");

showButton.addEventListener("click", () => {
    addBookDialog.showModal();
});

const form = document.querySelector("form.addBookDialog");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const bookTitle = document.querySelector('#title').value;
    const bookAuthor = document.querySelector('#author').value;
    const bookPages = document.querySelector('#pages').value;
    const bookRead = document.querySelector('#readStatus').value;
    const bookRate = document.querySelector('#rate').value;

    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead, bookRate);
    addBookToLibrary(newBook);

    form.reset();
    addBookDialog.close();
    displayBooks();
});

displayBooks();


