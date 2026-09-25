import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import BookSearch from "./BookSearch";
import { Book } from  "../../models/models";
import { useBooksQuery } from "../../hooks/queries/useBooksQuery";
import { useDeleteBook } from "../../hooks/mutations/useDeleteBook";

const BookList: React.FC = () => {
  const { data: books, isPending, isError, error } = useBooksQuery();
  const deleteBook = useDeleteBook();
  const [search, setSearch] = useState("");

  // Local search filtering (moved from Context)
  const searchResults = useMemo(() => {
    if (!books) return [];
    const filtered = books.filter(
      (book) =>
        book.bookName.toLowerCase().includes(search.toLowerCase()) ||
        book.bookCategory.toLowerCase().includes(search.toLowerCase())
    );
    return [...filtered].reverse();
  }, [books, search]);

  const handleDelete = (id: string) => {
    deleteBook.mutate(id);
  };

  return (
    <main>
      {deleteBook.isError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {deleteBook.error?.message || "An error occurred while deleting the book."}
        </p>
      )}
      {isPending && <p className="statusMsg">Loading books data...</p>}
      {!isPending && isError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {error?.message || "Error fetching book data"}
        </p>
      )}
      {!isPending && !isError && searchResults && (
        <>
          <BookSearch search={search} setSearch={setSearch} />
          <table>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Category</th>
                <th>Edition</th>
                <th>Price</th>
                <th>Image</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((item: Book) => (
                <tr className="item" key={item.id}>
                  <td>{item.bookName}</td>
                  <td>{item.bookCategory}</td>
                  <td>{item.edition}</td>
                  <td>{item.price}</td>
                  <td>{item.image}</td>
                  <td>
                    <Link to={`/book/${item.id}`}>
                      <FaEdit title="Press to Edit book" />
                    </Link>
                  </td>
                  <td>
                    <FaTrashAlt 
                      role="button" 
                      tabIndex={0} 
                      title="Press to Delete book" 
                      onClick={() => handleDelete(item.id)} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
};

export default BookList;