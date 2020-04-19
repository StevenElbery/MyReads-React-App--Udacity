import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from './Book';

class Search extends Component {

    constructor () {
        super();
        this.state = {
            query: '',
            books: []
        };
    }


    /**
     * Revise the query to request api and search api with current query to update the state of the view
     * @param {string} query string is used to request from the API
     */
    updateQuery = (query) => {
        const { libraryBooks } = this.props;

        this.setState({ query: query });
        const filteredQuery = query.trim();
        if (filteredQuery === '') {
            return;
        }
        BooksAPI.search(filteredQuery, 10).then((response) => {
            if (response && response.length) {
                const books = response.map((book) => {
                    const libBook = libraryBooks.find((libBook) => libBook.id === book.id);
                    const shelf = libBook ? libBook.shelf : 'none';

                    return {
                        id: book.id,
                        shelf: shelf,
                        authors: book.authors,
                        title: book.title,
                        imageLinks: {
                            thumbnail: book.imageLinks.thumbnail
                        }
                    };
                });
                this.setState({ books });
            }
        });
    };


    render () {
        const { books } = this.state;
        const { updateBookShelf } = this.props;

        return(
            <div className="search-library">
            <div className="search-library-bar">
              <Link
                to="/"
                className="exit-search"
              >
              Close
              </Link>
              <div className="search-library-input-wrapper">
                <input
                    type="text"
                    placeholder="Search library by title, author, or category"
                    onChange={ (event) => this.updateQuery(event.target.value) }
                />
              </div>
            </div>
            <div className="search-library-results">
              <ol className="library-grid">
                    {
                        books.map((book) => (
                            <li key={ book.id }>
                                <Book
                                    id={ book.id }
                                    shelf={ book.shelf }
                                    authors={ book.authors }
                                    title={ book.title }
                                    imageLinks={ book.imageLinks }
                                    updateBookShelf={ updateBookShelf }
                                />
                            </li>
                        ))
                    }
              </ol>
            </div>
          </div>
        );
    }
}

export default Search;