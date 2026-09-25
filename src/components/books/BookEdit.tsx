import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaBackspace } from "react-icons/fa";
import { Book } from  "../../models/models";
import { useBooksQuery } from "../../hooks/queries/useBooksQuery";
import { useUpdateBook } from "../../hooks/mutations/useUpdateBook";

const BookEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: books } = useBooksQuery();
  const updateBook = useUpdateBook();
  
  /*THIS CAN ALSO GO INTO BookDataContext*/
  const selectedBook = books?.find((item) => item.id.toString() === id);

  const [editBookName, setEditBookName] = useState<string>("");
  const [editBookCategory, setEditBookCategory] = useState<string>("");
  const [editEdition, setEditEdition] = useState<string>("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editImage, setEditImage] = useState<string>("");

  useEffect(() => {
    if (selectedBook) {
      setEditBookName(selectedBook.bookName);
      setEditBookCategory(selectedBook.bookCategory);
      setEditEdition(selectedBook.edition);
      setEditPrice(Number(selectedBook.price));
      setEditImage(selectedBook.image);
    }
  }, [selectedBook]);

  useEffect(() => {
    if (updateBook.isSuccess) {
      resetSelectedBookFields();
      updateBook.reset();
      navigate("/book");
    }
  }, [updateBook.isSuccess, navigate]);

  const handleSaveClick = async () => {

    if (!selectedBook) return;

    const updatedBook: Book = {
      id: selectedBook.id,
      dateCreated: selectedBook.dateCreated,
      personId: selectedBook.personId,
      auhorName: selectedBook.auhorName,
      bookName: editBookName,
      bookCategory: editBookCategory,
      edition: editEdition,
      price: editPrice,
      image: editImage,
    };

    updateBook.mutate(updatedBook);
  };

  const handleCancelClick = () => {
    resetSelectedBookFields();
    updateBook.reset();
    navigate("/book");
  };

  const resetSelectedBookFields = () => {
    setEditBookName("");
    setEditBookCategory("");
    setEditEdition("");
    setEditPrice(0);
    setEditImage("");
  };

  return (
    <main>
      {updateBook.isError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {updateBook.error?.message || "An error occurred"}
        </p>
      )}
      {updateBook.isPending && (
        <p className="statusMsg">Saving...</p>
      )}
      {selectedBook ? (
        <form
          className="bookEditForm"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <table>
            <tbody>
              <tr>
                <td colSpan={2} >
                  <span className="header-label">Edit Book</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="bookName">Name</label>
                </td>
                <td>
                  <input name="bookName" type="text" required value={editBookName} onChange={(e) => setEditBookName(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="bookCategory">Category</label>
                </td>
                <td>
                  <input name="bookCategory" type="text" required value={editBookCategory} onChange={(e) => setEditBookCategory(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="edition">Edition</label>
                </td>
                <td>
                  <input name="edition" type="text" required value={editEdition} onChange={(e) => setEditEdition(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="price">Price</label>
                </td>
                <td>
                  <input name="price" type="text" required value={editPrice} onChange={(e) => setEditPrice(Number(e.target.value))} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="image">Image</label>
                </td>
                <td>
                  <input name="image" type="text" required value={editImage} onChange={(e) => setEditImage(e.target.value)} />
                </td>
              </tr>
              <tr className="item">
                <td colSpan={2}>
                  <FaBackspace role="button" onClick={handleCancelClick} tabIndex={1} name="Cancel" title="Press to Cancel" />
                  <FaSave role="button" onClick={handleSaveClick} tabIndex={0} name="Save" title="Press to Save changes" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
      )}
    </main>
  );
};

export default BookEdit;