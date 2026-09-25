import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave, FaBackspace } from "react-icons/fa";
import { CreateBookInput } from "../../models/models";
import { useCreateBook } from "../../hooks/mutations/useCreateBook";

const BookAdd: React.FC = () => {
  const navigate = useNavigate();
  const createBook = useCreateBook();

  const [editBookName, setEditBookName] = useState<string>("");
  const [editBookCategory, setEditBookCategory] = useState<string>("");
  const [editEdition, setEditEdition] = useState<string>("");
  const [editPrice, setEditPrice] = useState<number>(0);
  const [editImage, setEditImage] = useState<string>("");

  useEffect(() => {
    if (createBook.isSuccess) {
      resetSelectedBookFields();
      createBook.reset();
      navigate("/book");
    }
  }, [createBook.isSuccess, navigate]);

  const handleSaveClick = async () => {
    const createBookInput: CreateBookInput = {
      bookName: editBookName,
      bookCategory: editBookCategory,
      edition: editEdition,
      price: editPrice,
      image: editImage,
    };
    createBook.mutate(createBookInput);
  };

  const handleCancelClick = () => {
    resetSelectedBookFields();
    createBook.reset();
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
      {createBook.isError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {createBook.error?.message || "Error creating book"}
        </p>
      )}
      {createBook.isPending && (
        <p className="statusMsg">Creating...</p>
      )}
      {(
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
                  <span className="header-label">Add New Book</span>
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
      )}
    </main>
  );
};

export default BookAdd;