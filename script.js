const myLibrary = [];

function Book(title, author, pages, isRead, rate) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
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
    <p>Author: ${this.author}</p>
    <p>Pages: ${this.pages}</p>
    <p>Read: ${this.isRead}</p>
    <p>Rate: ${getStarRating(this.rate)}</p>
    `;
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
                <button class="editBtn" data-index="${index}"><i class="fa-solid fa-pen-to-square"></i></button>
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

    const editButtons = document.querySelectorAll('.editBtn');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const bookIndex = e.currentTarget.getAttribute('data-index');
            //update code here
        });
    });
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
    displayBooks();
}

const showButton = document.querySelector(".showDialog");
const addBookDialog = document.querySelector(".addBookDialog");
const confirmBtn = addBookDialog.querySelector("#confirmBtn");

showButton.addEventListener("click", () => {
    addBookDialog.showModal();
});

confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const bookTitle = document.querySelector('#title').value;
    const bookAuthor = document.querySelector('#author').value;
    const bookPages = document.querySelector('#pages').value;
    const bookRead = document.querySelector('#isRead').value;
    const bookRate = document.querySelector('#rate').value;

    let newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead, bookRate);
    addBookToLibrary(newBook);

    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#isRead').value = '';
    document.querySelector('#rate').value = '';

    addBookDialog.close();
    displayBooks();
});

addBookDialog.addEventListener("close", () => {
    displayBooks();
});

displayBooks();
