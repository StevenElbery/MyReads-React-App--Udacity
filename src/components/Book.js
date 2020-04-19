import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {
    constructor () {
        super();
        this.state = { shelf: 'none' };
    }

    modifyBookShelf (value) {
        const { reviseBookShelf } = this.props;
        reviseBookShelf(this.props, value);
        //Current state set to update automatically from the search view - no refresh needed
        this.setState({ shelf: value });
    };

    componentDidMount () {
        const { shelf } = this.props;
        this.setState({ shelf });
    };


    render () {
        const { title, authors, imageLinks } = this.props;
        const { thumbnail } = imageLinks;
        const { shelf } = this.state;

        return(
            <div className="book">
                <div className="book-banner">
                    <div className="book-coverpage" style={ { width: 128, height: 193, backgroundImage: `url("${ thumbnail }")` } }>
                    </div>
                    <div className="bookshelf-switch">
                        <select
                            value={ shelf }
                            onChange={ (event) => this.modifyBookShelf(event.target.value) }
                        >
                            <option value="none" disabled>Select new category:</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">Pending</option>
                        </select>
                    </div>
                </div>
                <div className="book-titles">{ title }</div>
                <div className="book-authors">{ authors }</div>
            </div>
        );
    }
}

export default Book;