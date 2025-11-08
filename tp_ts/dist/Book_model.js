"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
class Book {
    constructor(id, title, author, pages, pagesRead, status, price, format, suggestedBy) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.pagesRead = pagesRead;
        this.status = status;
        this.price = price;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = pagesRead >= pages;
    }
    currentlyAt() {
        return Math.round((this.pagesRead / this.pages) * 100);
    }
    deleteBook() {
        console.log(`${this.title} has been deleted`);
    }
}
exports.Book = Book;
