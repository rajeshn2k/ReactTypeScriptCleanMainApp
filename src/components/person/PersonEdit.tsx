import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaSave, FaBackspace } from "react-icons/fa";
import { Person } from  "../../models/models";
import { usePersonsQuery } from "../../hooks/queries/usePersonsQuery";
import { useUpdatePerson } from "../../hooks/mutations/useUpdatePerson";

const PersonEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: persons } = usePersonsQuery();
  const updatePerson = useUpdatePerson();
  
  /*THIS CAN ALSO GO INTO PersonDataContext*/
  const selectedPerson = persons?.find((item) => item.id.toString() === id);

  const emptyPerson: Person = {
    firstName: "",
    lastName: "",
    isPlaySports: false,
    category: "",
    dateCreated: new Date(),
    dateOfBirth: new Date(),
    id: "",
    rank: 0,
  };

  const [personItem, setPersonItem] = useState<Person>(emptyPerson);

  useEffect(() => {
    if (selectedPerson) {
      setPersonItem(selectedPerson);
    }
  }, [selectedPerson]);

  useEffect(() => {
    if (updatePerson.isSuccess) {
      resetSelectedPersonFields();
      updatePerson.reset();
      navigate("/person");
    }
  }, [updatePerson.isSuccess, navigate]);

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
    const updatedPerson: Person = {
      id: personItem.id,
      category: personItem.category,
      dateOfBirth: personItem.dateOfBirth,
      dateCreated: personItem.dateCreated,
      firstName: personItem.firstName,
      isPlaySports: personItem.isPlaySports,
      lastName: personItem.lastName,
      rank: personItem.rank
    };
    updatePerson.mutate(updatedPerson);
  };

  const handleCancelClick = () => {
    resetSelectedPersonFields();
    updatePerson.reset();
    navigate("/person");
  };

  const resetSelectedPersonFields = () => {
    setPersonItem(emptyPerson);
  };

  return (
    <main>
      {updatePerson.isError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {updatePerson.error?.message || "An error occurred"}
        </p>
      )}
      {updatePerson.isPending && (
        <p className="statusMsg">Saving...</p>
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
                  <span className="header-label">Edit Person</span>
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

export default PersonEdit;