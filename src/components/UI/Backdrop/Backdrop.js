import React from "react";
import classes from './Backdrop.module.css'

const Backdrop = props => {
    return (
        /*возвращаем блок div*/
        <div
        className={classes.Backdrop}/*указан класс затемнения*/
        onClick={props.onClick} /*при нажатии на пустую область экрана меню закроется*/
        ></div>
    )
}

export default Backdrop