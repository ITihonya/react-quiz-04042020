import React from "react";
import classes from './Button.module.css'

/*создаём компонент(переменную) с телом функции {} потому что мы будем монипулировать разными классами(cls) и в return
будем возвращать jsx а именно кнопку (button)*/
const Button = props => {
    const cls = [
        classes.Button,
        classes[props.type]
    ]
    return (
        <button
            onClick={props.onClick}
            className={cls.join(' ')}
            disabled={props.disabled}

        >
            {props.children}
        </button>
    )
}

export default Button