import React from 'react';
import Book from './book';

export default function Bookshelf ({ name, books, reviseBookShelf }) {
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{ name }</h2>
            <div className="bookshelf-books">
            <ol className="content-grid">
                {
                    books.sort((a, b) => {
                        return a.title > b.title;
                    }).map((book) => (
                        <li key={ book.id }>
                            <Book
                                id={ book.id }
                                authors={ book.authors }
                                title={ book.title }
                                imageLinks={ book.imageLinks }
                                shelf={ book.shelf }
                                reviseBookShelf={ reviseBookShelf }
                            />
                        </li>
                    ))
                }
            </ol>
            </div>
        </div>
    );
};