//компонент с ответами
//импортируем React из react чтобы поддерживался jsx
import React from "react";
import AnswerItem from "./AnswerItem/AnswerItem";
import classes from './AnswersList.module.css'

//AnswersList функция которая принимает параметры props(массив с ответами) и отдаёт на выходе jsx

/*обращаемся к jsx...далее props получаем массив кот.будет называться answers далее
         к нему мы применяем map(пробегаемся по каждому элемента данного массива)
          и в колбек функции будем выводить какой то результат...а именно возвращать jsx.
          На входе в map мы получаем answer(вопрос из массива(итерируемый элемент) и его индекс(ключ))*/
/*в методе map мы должны вернуть jsx и в нашем случае это быдет jsx с тегом AnswerItem
            ...туда же мы будем передавать какие то параметры*/
const AnswersList = props => (
    <ul className={classes.AnswersList}>
        { props.answers.map((answer, index) => {
            return(
                <AnswerItem
                    answer={answer}
                >

                </AnswerItem>
            )
        })}
    </ul>
)

//экспортируем по дефолту наружу
export default AnswersList