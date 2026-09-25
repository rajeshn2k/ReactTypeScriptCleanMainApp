import React from "react";
import { Link } from "react-router-dom";
import { FaPlusSquare } from "react-icons/fa";

interface PersonSearchProps {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const PersonSearch: React.FC<PersonSearchProps> = ({ search, setSearch }) => {
    return (
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Search</label>
            <input
                id="search"
                type="text"
                placeholder="Search Person Name and Category only"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Link className="item" to={`/addperson`}>
                <FaPlusSquare role="button" title="Press to Add new book" />
            </Link>
        </form>
    );
};

export default PersonSearch;
