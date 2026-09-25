import React from "react";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";

interface BookSearchProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const BookSearch: React.FC<BookSearchProps> = ({ search, setSearch }) => {
    return (
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Search</label>
            <input
                id="search"
                type="text"
                placeholder="Search Book Name and Category only"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Link className="item" to={`/addbook`}>
                <FaPlusSquare role="button" title="Press to Add new book" />
            </Link>
        </form>
    );
};

export default BookSearch;
