import './FilterCheckBox.css'
import React from "react";

function FilterCheckBox({ isShortMovieChecked }) {
    const [checkbox, setCheckbox] = React.useState(false);
    const switchOn = (checkbox ? 'checkbox__switch_status_on' : '');
    function handleChange(e) {
        setCheckbox(e.target.checked);

    }
    function setChecked () {
      isShortMovieChecked(checkbox);

    }
    return (
        <div className="checkbox">
            <label className={`checkbox__switch ${switchOn}`}>
                <input className="checkbox__input" name="checkbox" id="checkbox-input" type="checkbox" value={checkbox} onChange={handleChange} onClick={setChecked}/>
            </label>
            <p className="checkbox__switch-text">Короткометражки</p>
        </div>
    );
}

export default FilterCheckBox;