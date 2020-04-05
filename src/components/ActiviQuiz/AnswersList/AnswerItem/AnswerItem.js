//компонент в котором будет содержаться сам ответ из списка
import React from "react";
import classes from './AnswerItem.module.css'
/*AnswerItem это функция которая принимает параметры props сразу jsx выводить не будем
так как эта функция будет иметь логику...
поэтому сначала тело функции в {} скобках, а уже потом возвращаем jsx ... return()*/
const AnswerItem = props => {
    return(
        <li className={classes.AnswerItem}>{/*каждый выводимый элемент в компоненте AnswersList должен быть тегом li*/}
            {props.answer.text}{/*так как мы принимаем props то пишем props.answer(название произвольное...answer=ответ
            его мы будем передавать параметром в компоненте AnswersList в return)
            и .text чтобы отобразить текст*/}
        </li>
    )
}

export default AnswerItem