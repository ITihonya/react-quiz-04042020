import React from "react";
import classes from './Input.module.css'

// Реализуем функцию кот.будет проверять есть ли у нас в input какая-нить ошибка или нет
// Нам ненужны все свойства которые лежат в данном объекте props(type,id,value,onChange и т.д.)
// нам нужны всего 3 параметра...поэтому делаем деструктуризацию...вместо (props)...({})
//1. valid будет определять при валидации формы
//2. touched
//3. shouldValidate булево значение
// Все параметры будем сами генерировать и передавать в input
function isInvalid({valid, touched, shouldValidate}) {
    // если не валидированный контрол(!valid)
    // и если мы должны его валидировать(shouldValidate(но не для всех контролов нужна валидация...
    // и нам это нужно будет проверять))
    // и мы его потрогали(touched)
    return !valid && shouldValidate && touched //то это означает что он у нас НЕ валидный
}


const Input = props => {
    /* так как этот компонент будет универсальным то нам нужна переменная отвечающая за тип input(text,number...)
    данный тип будет определяться из props.type или если этот тип не определён то по умолчанию 'text'*/
    const inputType = props.type || 'text'
    //переменная для классов...далее мы внеё будем добавлять(push) разные классы...например для валидации
    const cls = [classes.Input]
    /*данная переменная будет формировать уникальный id для input
    и определяться строкой `${inputType}-${Math.random()}`*/
    const htmlFor = `${inputType}-${Math.random()}`
    // если у нас данный input не валидный isInvalid === true, а проверять мы его будем по параметрам props
    if(isInvalid(props)){
        cls.push(classes.invalid)
    }


    return (
        // в div описываем структуру Input
        <div
            className={cls.join(' ')}
        >
            <label
                htmlFor={htmlFor}
            >
                {props.label}
            </label>

            <input
                type={inputType}// из переменной const inputType
                id={htmlFor}//из переменной const htmlFor
                value={props.value}
                onChange={props.onChange}//нужно следить за изменениями нашего компонента
            />
            {/*Заходим в jsx...{}.Валидация.Если будут ошибки мы будем показывать span
             если нет null(ничего не будем показывать)
             выводим props.errorMessage а если ничего не передавали то 'Введите верное значение'*/}
            { isInvalid(props) ? <span>{props.errorMessage || 'Введите верное значение'}</span> : null}

        </div>
    )
}

export default Input