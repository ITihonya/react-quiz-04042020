//функц.компонент
import React from "react";
import classes from './MenuToggle.module.css'


const MenuToggle = props => {
    //массив с классами для отрисовки в css
    const cls = [
        classes.MenuToggle,
        'fa',
    ]
    if(props.isOpen){
       cls.push('fa-times')
        cls.push(classes.open)
    }
    else {
        cls.push('fa-bars')
    }
    return (
        //компонент будет выполнен в виде иконки
        <i
        className={cls.join(' ')} //соединяем классы из массива cls в строку
        onClick={props.onToggle} //выполняя клик вызывается функция кот.меняет state
        />
    )
}

export default MenuToggle