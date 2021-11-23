class book {
  constructor(title, author, idCode) {
    this.title = title;
    this.author = author;
    this.idCode = idCode;
  }
}

class collection {


  addbook(title, author, idCode) {
    const newbook = new book(title, author, idCode);
    collection.push(newbook);
    idCode += 1;
  }

  removebook (idCode) {
    collection.filter((book) => {
      if (book.idCode === idCode) {
        const index = collection.indexOf(book);
        collection.splice(index, 1);
      }
      return book;
    });
    // Remove from print
    const toRemove = document.getElementById(`${idCode}`);
    booksWrapper.removeChild(toRemove);
    catchValue();
  }
  
  
}


