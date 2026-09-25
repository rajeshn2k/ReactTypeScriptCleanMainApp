import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import PersonSearch from "./PersonSearch";
import { usePersonsQuery } from "../../hooks/queries/usePersonsQuery";
import { useDeletePerson } from "../../hooks/mutations/useDeletePerson";

const PersonList: React.FC = () => {
  const { data: persons, isPending, isError, error } = usePersonsQuery();
  const deletePerson = useDeletePerson();
  const [search, setSearch] = useState("");

  // Local search filtering (moved from Context)
  const searchResults = useMemo(() => {
    if (!persons) return [];
    const filtered = persons.filter(
      (person) =>
        person.firstName?.toLowerCase().includes(search.toLowerCase()) ||
        person.lastName?.toLowerCase().includes(search.toLowerCase()) ||
        person.category?.toLowerCase().includes(search.toLowerCase())
    );
    return [...filtered].reverse();
  }, [persons, search]);

  const handleDelete = (id: string) => {
    deletePerson.mutate(id);
  };

  return (
    <main>
      {deletePerson.isError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {deletePerson.error?.message || "An error occurred while deleting the person."}
        </p>
      )}
      {isPending && <p className="statusMsg">Loading persons data...</p>}
      {!isPending && isError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {error?.message || "Error fetching person data"}
        </p>
      )}
      {!isPending && !isError && searchResults && (
        <>
          <PersonSearch search={search} setSearch={setSearch} />
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Rank</th>
                <th>Category</th>
                <th>Date Of Birth</th>
                <th>Play Cricket?</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((item) => (
                <tr className="item" key={item.id}>
                  <td>
                    <span>{item.firstName}</span> , <span>{item.lastName}</span>
                  </td>
                  <td>{item.rank}</td>
                  <td>{item.category}</td>
                  <td>{(item.dateOfBirth, "MMMM dd, yyyy")}</td>
                  <td>{item.isPlaySports ? "true" : "false"}</td>
                  <td>
                    <Link to={`/person/${item.id}`}>
                      <FaEdit title="Press to edit a Person" />
                    </Link>
                  </td>
                  <td>
                    <FaTrashAlt 
                      role="button" 
                      title="Press to delete a Person" 
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

export default PersonList;