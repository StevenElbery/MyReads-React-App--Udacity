import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import BookShelves from './components/bookshelves';
import Search from './components/search';

import * as BooksAPI from './utilities/BooksAPI';

class MyReadsApp extends React.Component {
  constructor () {
    super();
    this.state = BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  /**
   * Modify an indivudial bookshelf or create new item for specific bookshelf  
   * @param {string} id
   * @param {string} shelf
   */
  reviseBookShelf = (book, reviseddShelf) => {
    const { books } = this.state;

    const bookIndex = books.findIndex((key) => {
      return key.id === book.id;
    });

    let stateBooks = Object.assign([], books);

    if (bookIndex === -1) {
      const newBook = Object.assign({}, book);
      newBook.shelf = revisedShelf;
      currentstateBooks.push(newBook);
    } else {
      currentStateBooks[bookIndex] = Object.assign({}, currentStateBooks[bookIndex]);
      currentStateBooks[bookIndex].shelf = revisedshelf;
    }

    BooksAPI.update(book, revisedShelf).then(
      this.setState({ books: currentStateBooks })
    );
  };

  render () {
    const { books } = this.state;

    if (!books) {
      return null;
    }

    return (
      <div className="app">
        <Route path="/search" render={ () => (
          //Search View
          <Search
            libraryBooks={ books }
            reviseBookShelf={ this.revisedBookShelf }
          />
        ) } />
        <Route exact path="/" render={ () => (
          //Library  View
          <Library
            books={ books }
           reviseBookShelf={ this.reviseBookShelf }
          />
        ) } />
      </div>
    );
  }
}

export default MyReadsApp;