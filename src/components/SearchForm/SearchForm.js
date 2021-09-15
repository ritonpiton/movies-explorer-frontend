import './SearchForm.css';
import React from 'react';
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";

function SearchForm({ handleSearch }) {
    const [search, setSearch] = React.useState('');
    function handleChange(e) {
        setSearch(e.target.value);
    }
    function handleSubmit(e) {
        e.preventDefault();
        if (!search) {
            return;
        }
        handleSearch(search);
    }

    return (
        <form className='search'>
            <div className="search__container">
                <fieldset className="search__fieldset">
                    <input name="search" id="search-input" type="text" value={search} placeholder="Фильм" onChange={handleChange}
                           className="search__input" required />
                    <button className="button search__submit-btn" onClick={handleSubmit}>Найти</button>
                </fieldset>
                <FilterCheckBox />
            </div>
        </form>
    );
}

export default SearchForm;