const bookStatuses = Object.freeze({
    "read": "Reading",
    "not-read": "Not Read",
    "finished": "Finished",
});

class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

class Library {
    addBookToLibrary(title, author, pages) {
        const newBook = new Book(title, author, pages, bookStatuses["not-read"]);

        if (this.checkIfBookExists(title)) {
            alert(`${title} already exists in the library.`);
            return;
        }
        myLibrary.push(newBook);
        displayController.displayBooks();
    }

    removeBookFromLibrary(index) {
        myLibrary.splice(index, 1);
        displayController.displayBooks();
    }

    getLibrary() {
        return myLibrary;
    }

    checkIfBookExists(title, excludeIndex = -1) {
        return myLibrary.some((book, index) => 
            index !== excludeIndex && book.title.toLowerCase() === title.toLowerCase()
        );
    }

    changeBookStatus(index) {
        const book = myLibrary[index];
        const statusValues = Object.values(bookStatuses);
        const currentStatusIndex = statusValues.indexOf(book.status);
        const nextStatusIndex = (currentStatusIndex + 1) % statusValues.length;
        book.status = statusValues[nextStatusIndex];
        displayController.displayBooks();
    }

    editBook(index) {
        const book = myLibrary[index];
        displayController.openEditModal(book, index);
    }

    updateBook(index, title, author, pages) {        
        if (this.checkIfBookExists(title, index)) {
            alert(`${title} already exists in the library.`);
            return false;
        }
        const book = myLibrary[index];
        book.title = title;
        book.author = author;
        book.pages = pages;
        displayController.displayBooks();
        return true;
    }
}

const myLibrary = [];
const library = new Library();