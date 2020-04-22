import React from "react";
import classes from './FinishedQuiz.module.css'
import Button from "../UI/Button/Button";
//навигационный компонент такой же как и NavLink толь с меньшим функционалом
import {Link} from "react-router-dom";
//так как код объёмный...чтобы не забыть что лежит в props можно будет его вывести в консоль и глянуть
const FinishedQuiz = props => {
    /* чтобы посчитать количество правильных ответов.
    нужно пробежаться по параметру props.results а так как это объект используем Object.keys()
    который превращает объект в массив ключей этого объекта*/
    /*Для подсчёта используем reduce.В методе reduce первым параметром мы передаём колбэк функцию,
    вторым параметром значение с которого мы хотим начать счёт...
    это 0 и этому значению будет равняться total в самом начале счёта,
    а key это значение элемента перебираемого reduceом объекта, а именно props.results */
    const successCount = Object.keys(props.results).reduce((total, key) => {
        console.log(props.results[key])
        if (props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)


    return (
        <div className={classes.FinishedQuiz}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                    ]

                    return (
                        <li
                            key={index}
                        >
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    )
                })}

            </ul>

            <p>Правильно {successCount} из {props.quiz.length}</p>
            <div>
                <Button
                    onClick={props.onRetry}
                    type={'primary'}
                >
                    Повторить
                </Button>
                {/*Оборачиваем кнопку в компонент Link чтобы при клике переходить на гл.страницу(список тестов)*/}
                <Link to={'/'}>
                    <Button
                        type={'success'}
                    >
                        Перейти в список тестов
                    </Button>
                </Link>

            </div>
        </div>
    )
}

export default FinishedQuiz