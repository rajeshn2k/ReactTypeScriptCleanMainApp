import { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { FaSave, FaBackspace } from "react-icons/fa";
import { CreatePersonInput } from "../../models/models";
import { useCreatePerson } from "../../hooks/mutations/useCreatePerson";

const PersonAdd: React.FC = () => {
  const navigate = useNavigate();
  const createPerson = useCreatePerson();

  const emptyPerson: CreatePersonInput = {
    firstName: "",
    lastName: "",
    isPlaySports: false,
    category: "",
    dateOfBirth: new Date(),
    rank: 0,
  };

  const [personItem, setPersonItem] = useState<CreatePersonInput>(emptyPerson);

  useEffect(() => {
    if (createPerson.isSuccess) {
      resetSelectedPersonFields();
      createPerson.reset();
      navigate("/person");
    }
  }, [createPerson.isSuccess, navigate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericFields = ["rank"];
    const { name, value, type, checked } = e.target;
    setPersonItem((prev) => ({
      ...prev,

      [name]:
        name === "dateOfBirth"
          ? new Date(value) // Convert to Date object
          : type === "checkbox"
            ? checked
            : numericFields.includes(name)
              ? value === ""
                ? null
                : Number(value)
              : value,
    }));
  };

  const handleSaveClick = async () => {
    if (!personItem) return;
    const createdPerson: CreatePersonInput = {
      category: personItem.category,
      dateOfBirth: personItem.dateOfBirth,
      firstName: personItem.firstName,
      isPlaySports: personItem.isPlaySports,
      lastName: personItem.lastName,
      rank: personItem.rank
    };
    createPerson.mutate(createdPerson);
  };

  const handleCancelClick = () => {
    resetSelectedPersonFields();
    createPerson.reset();
    navigate("/person");
  };

  const resetSelectedPersonFields = () => {
    setPersonItem(emptyPerson);
  };

  return (
    <main>
      {createPerson.isError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {createPerson.error?.message || "Error creating person"}
        </p>
      )}
      {createPerson.isPending && (
        <p className="statusMsg">Creating...</p>
      )}
      {personItem ? (
        <form
          className="personEditForm"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <table>
            <tbody>
               <tr>
                <td colSpan={2} >
                  <span className="header-label">Add New Person</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="firstName">First Name</label>
                </td>
                <td>
                  <input name="firstName" type="text" value={personItem.firstName} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>
                  <input name="lastName" type="text" value={personItem.lastName} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td>Rank</td>
                <td>
                  <input name="rank" type="number" value={personItem.rank} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td>Category</td>
                <td>
                  <input name="category" type="text" value={personItem.category} onChange={handleChange} />
                </td>
              </tr>
              <tr>
                <td>Date of Birth</td>
                <td>
                  <input
                    name="dateOfBirth"
                    readOnly
                    type="date"
                    value={(personItem.dateOfBirth, "MMMM dd, yyyy")}
                    // value={
                    //   personItem.dateOfBirth ? personItem.dateOfBirth.toISOString().split("T")[0] : "" // Convert Date object to 'YYYY-MM-DD' format
                    // }
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Play Cricket?</td>
                <td>
                  <input name="isPlaySports" type="checkbox" checked={personItem.isPlaySports as boolean} onChange={handleChange} />
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

export default PersonAdd;