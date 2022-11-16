import React from "react";
import style from "../../../css/MainPage.module.css";
import Svg from "../../util/Svg";

const SearchForm = ({onClick, onChange, value, onClose}) => {
    return (<div className={style.search_box}>
        <div className={style.search_form}>
            <div className={style.icon}>
                <Svg><i className={"material-icons"}>search</i></Svg>
            </div>
            <input onChange={onChange} value={value} name="search"/>
        </div>
        <div className={style.search_close} onClick={onClose}>
            <div>
                <div/>
                <div/>
            </div>
        </div>
    </div>)
}

export default SearchForm