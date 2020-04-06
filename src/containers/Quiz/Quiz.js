import React,{Component} from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiviQuiz/ActiveQuiz";

class Quiz extends Component {
    state = {
        /*сщздаем массив в котором будут храниться все вопросы,правильные ответы и все параметры кот.относятся к голосованию
        и каждый элемент этого массива будет являться объектом*/
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {text: 'Чёрный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зелёный',id: 4}
                ]
            }
        ]
}

onAnswerClickHandler = (answerId) => {
    console.log('AnswerId: ', answerId)
}
    render() {

        //возвращаем jsx...обернём всё в div он и будет являться корневым для нашего приложения
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    <ActiveQuiz
                        question={this.state.quiz[0].question}
                        answers={this.state.quiz[0].answers}
                        onAnswerClick={this.onAnswerClickHandler}
                    >{/*здесь будем рендерить компонент ActiveQuiz */}
                    </ActiveQuiz>
                </div>
            </div>
        )
    }
}

export default Quiz
