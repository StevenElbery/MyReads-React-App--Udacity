import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Bookshelf from './bookshelf';

class BookShelves extends Component {

    filterBooks = (shelf) => {
        const { books } = this.props;
        return books.filter((book) => book.shelf === shelf);
    }

    render () {
        const { revisebookShelf } = this.props;

        return(
            <div className="all-books">
            <div className="all-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="all-books-content">
              <div>
                <Bookshelf
                  name="Currently Reading"
                  books={ this.filterBooks('currentlyReading') }
                  reviseBookShelf={ reviseBookShelf }
                />
                <Bookshelf
                  name="Want to Read"
                  books={ this.filterBooks('wantToRead') }
                  reviseBookShelf={ reviseBookShelf }
                />
                <Bookshelf
                  name="Read"
                  books={ this.filterBooks('read') }
                  reviseBookShelf={ reviseBookShelf }
                />
              </div>
            </div>
            <div className="pending-search">
              <Link
                    to="/search"
                >
                    Contribute a book to the library
              </Link>
            </div>
          </div>
        );
    }
}

export default BookShelves;