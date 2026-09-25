import { GenericSearchParams } from "../../models/GenericSearchParams";

export const GenericSearch = ({searchValue, setSearchValue}: GenericSearchParams) => {

    const onSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return (
        <form className="searchForm" onSubmit={(e) => e.preventDefault()}>
            <div className="row">
                <div className="column"><label htmlFor="searchInput">Search</label></div>
                <div className="column"><input id="searchInput"
                                            type="text"
                                            placeholder="Search by Category"
                                            value={searchValue}
                                            onChange={onSearchValueChange}/></div>
            </div>
        </form>
    )
}

export default GenericSearch