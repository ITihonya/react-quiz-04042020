//ActiveQuiz это функциональный компонент!!!
//импортируем без Component так как он нам не нужен потому что нам здесь нужен только jsx
import React from "react";
import AnswersList from "./AnswersList/AnswersList";
import classes from './ActiveQuiz.module.css'

//сщздаём функцию которая будет получать некоторые параметры props и возвращать jsx
const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>{/*здесь будем выводить сам вопрос*/}
                <strong>{/*здесь будем выводить номер вопроса*/}
                    2.
                </strong>&nbsp;
                Как дела?
            </span>
            <small>2 из 12</small>
        </p>
        <AnswersList
            answers={props.answers}
        >

        </AnswersList>
    </div>
)
//потом по умолчанию мы вернём данную функцию
export default ActiveQuiz