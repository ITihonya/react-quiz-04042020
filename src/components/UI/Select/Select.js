//обычный функциональный компонент
import React from "react";
import classes from './Select.module.css'
//принимает props
const Select = props => {
    //для определения атрибута htmlFor в теге label
    const htmlFor = `${props.label}-${Math.random()}`

//возвращает jsx, а именно блок div с label и select
    return (
        <div className={classes.Select}>

            <label htmlFor={htmlFor}>
                {props.label}
            </label>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                {/*принимаем массив props.options и чтобы вывести его в jsx
                 перебираем его с помощью map(на каждой итерации будем получать option и index)
                 и возвращаем jsx в виде елементов option*/}
                { props.options.map((option, index) => {
                        return (
                            //с переданными определёнными параметрами
                            <option
                                value={option.value}
                                key={option.value + index}
                            >
                                {/*с текстом...*/}
                                {option.text}
                            </option>
                        )
                    })
                }
            </select>

        </div>
    )
}

export default Select