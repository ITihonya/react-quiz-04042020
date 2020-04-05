import React,{Component} from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiviQuiz/ActiveQuiz";

class Quiz extends Component {
    state = {
        /*сщздаем массив в котором будут храниться все вопросы,правильные ответы и все параметры кот.относятся к голосованию
        и каждый элемент этого массива будет являться объектом*/
        quiz: [
            {
                answers: [
                    {text: 'Вопрос 1'},
                    {text: 'Вопрос 2'},
                    {text: 'Вопрос 3'},
                    {text: 'Вопрос 4'}
                ]
            }
        ]
}
    render() {
        //возвращаем jsx...обернём всё в div он и будет являться корневым для нашего приложения
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Quiz</h1>
                    <ActiveQuiz>{/*здесь будем рендерить компонент ActiveQuiz */}
                        answers={this.state.quiz[0].answers}
                    </ActiveQuiz>
                </div>
            </div>
        )
    }
}

export default Quiz