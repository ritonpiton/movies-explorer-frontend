import './SearchForm.css';
import React from 'react';
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";
import {useFormWithValidation} from "../../utils/useFormWithValidation";

function SearchForm({ whereToFind, handleSearch, isShortMovieChecked, isLoading }) {
    const [request, setRequest] = React.useState(true); // есть ли текст в строке поиска
    const { values, handleChange } = useFormWithValidation({});

    function handleSubmit(e) {
        e.preventDefault();
        if (!values.search) {
            setRequest(false)
            return;
        }
        handleSearch(values.search, whereToFind);
        setRequest(true);
    }

    return (
        <form className='search' onSubmit={handleSubmit}>
            <div className="search__container">
                <fieldset className="search__fieldset">
                    <input name="search" id="search-input" type="text" value={values.search || ''} placeholder="Фильм..." onChange={handleChange}
                           className="search__input"/>
                    <button className={`button search__submit-btn ${isLoading ? 'search__submit-btn_disabled' : ''}`}>Найти</button>
                </fieldset>
                <span className={`${!request ? 'search__input-error_active' : ''} search__input-error`}>Нужно ввести ключевое слово</span>
                <FilterCheckBox isShortMovieChecked={isShortMovieChecked}/>
            </div>
        </form>
    );
}

export default SearchForm;