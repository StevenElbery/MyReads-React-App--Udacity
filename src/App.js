import React from 'react';
//s import { Route } from '/react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import BookShelves from './components/BookShelves';
import Search from './components/Search';

import * as BooksAPI from './BooksAPI';

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
  reviseBookShelf = (book, revisedShelf) => {
    const { books } = this.state;

    const bookIndex = books.findIndex((key) => {
      return key.id === book.id;
    });

    let currentStateBooks = Object.assign([], books);

    if (bookIndex === -1) {
      const newBook = Object.assign({}, book);
      newBook.shelf = revisedShelf;
      currentStateBooks.push(newBook);
    } else {
      currentStateBooks[bookIndex] = Object.assign({}, currentStateBooks[bookIndex]);
      currentStateBooks[bookIndex].shelf = revisedShelf;
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
        <Router>
        <Route path="/search" render={ () => (
          //Search View
          <Search
            libraryBooks={ books }
            reviseBookShelf={ this.revisedBookShelf }
          />
        ) } />

        <Route exact path="/" render={ () => (
          //Library  View
          <BookShelves
            books={ books }
           reviseBookShelf={ this.reviseBookShelf }
          />
        ) } />
        </Router>
      </div>
    );
  }
}

export default MyReadsApp;