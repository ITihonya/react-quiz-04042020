//компонент в котором будет содержаться сам ответ из списка
import React from "react";
import classes from './AnswerItem.module.css'
/*AnswerItem это функция которая принимает параметры props сразу jsx выводить не будем
так как эта функция будет иметь логику...
поэтому сначала тело функции в {} скобках, а уже потом возвращаем jsx ... return()*/
const AnswerItem = props => {
    //создаём переменную куда мы будем добавлять в переменную classes новые подклассы...или success или error
    const cls = [classes.AnswerItem]
    //проверяем.Если в props.state лежит не null а или success или error
    if(props.state){
        //то мы добавляем в переменную classes новый подкласс...или success или error в зависимости оттого что попадёт в props.state
        cls.push(classes[props.state])
    }
    return(
        <li

            className={cls.join(' ')}/* чтобы классы отрисовывались их нужно за joinить...
            превратить в строку...а изначально переменная cls является массивом*/
            onClick={() => props.onAnswerClick(props.answer.id)}
        >{/*каждый выводимый элемент в компоненте AnswersList должен быть тегом li*/}
            {props.answer.text}
        </li>
    )
}

export default AnswerItem