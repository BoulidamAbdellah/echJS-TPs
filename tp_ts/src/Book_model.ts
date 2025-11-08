export type BookStatus = "Read" | "Re-read" | "DNF" | "Currently reading" | "Returned Unread" | "Want to read";
export type BookFormat = "Print" | "PDF" | "Ebook" | "AudioBook";

export class Book {
  id: number
  title: string;
  author: string;
  pages: number;
  pagesRead: number;
  status: BookStatus;
  price: number;
  format: BookFormat;
  suggestedBy: string;
  finished: boolean;

  constructor(
    id: number,
    title: string,
    author: string,
    pages: number,
    pagesRead: number,
    status: BookStatus,
    price: number,
    format: BookFormat,
    suggestedBy: string
  ) {
    this.id = id ;
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

  currentlyAt(): number {
    return Math.round((this.pagesRead / this.pages) * 100);
  }

  deleteBook() {
    console.log(`${this.title} has been deleted`);
  }
}
