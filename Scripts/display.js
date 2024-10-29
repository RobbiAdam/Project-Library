class DisplayController {
    constructor() {
        this.modal = document.querySelector('.modal');
        this.editModal = document.querySelector('.edit-modal');
        this.addBookBtn = document.querySelector('.addBook');
        this.cancelBtn = document.querySelector('.cancel-btn');
        this.bookForm = document.getElementById('bookForm');
        this.editForm = document.getElementById('editForm');
        this.currentEditIndex = null;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        
        this.addBookBtn.addEventListener('click', () => {
            this.modal.style.display = 'block';
        });
        
        this.cancelBtn.addEventListener('click', () => {
            this.closeAndResetModal();
        });

        document.querySelector('.edit-cancel-btn').addEventListener('click', () => {
            this.closeEditModal();
        });
        
        this.bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        this.editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEditFormSubmit();
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeAndResetModal();
            }
            if (e.target === this.editModal) {
                this.closeEditModal();
            }
        });
    }

    handleFormSubmit() {
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        
        library.addBookToLibrary(title, author, pages);
        this.closeAndResetModal();
    }

    handleEditFormSubmit() {
        const title = document.getElementById('editTitle').value;
        const author = document.getElementById('editAuthor').value;
        const pages = document.getElementById('editPages').value;
        
        if (library.updateBook(this.currentEditIndex, title, author, pages)) {
            this.closeEditModal();
        }
    }

    closeAndResetModal() {
        this.modal.style.display = 'none';
        this.bookForm.reset();
    }

    closeEditModal() {
        this.editModal.style.display = 'none';
        this.editForm.reset();
        this.currentEditIndex = null;
    }

    openEditModal(book, index) {
        this.currentEditIndex = index;
        document.getElementById('editTitle').value = book.title;
        document.getElementById('editAuthor').value = book.author;
        document.getElementById('editPages').value = book.pages;
        this.editModal.style.display = 'block';
    }

    getStatusButtonClass(status) {
        switch(status) {
            case bookStatuses.read:
                return 'status-reading';
            case bookStatuses.finished:
                return 'status-finished';
            default:
                return 'status-not-read';
        }
    }

    displayBooks() {
        const container = document.querySelector('.container');
        container.innerHTML = '';
        
        const books = library.getLibrary();
        
        books.forEach((book, index) => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            
            const statusButtonClass = this.getStatusButtonClass(book.status);
            
            bookCard.innerHTML = `
                <h3>${book.title}</h3>
                <p>By: ${book.author}</p>
                <p>Pages: ${book.pages}</p>
                <div class="book-buttons">
                    <button class="status-btn ${statusButtonClass}" 
                            onclick="library.changeBookStatus(${index})">${book.status}</button>
                    <button class="edit-btn" 
                            onclick="library.editBook(${index})">Edit</button>
                    <button class="remove-btn" 
                            onclick="library.removeBookFromLibrary(${index})">Remove</button>
                </div>
            `;
            
            container.appendChild(bookCard);
        });
    }
}

const displayController = new DisplayController();