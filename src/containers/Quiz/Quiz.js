import React, {Component} from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiviQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById} from "../../store/actions/quiz";


class Quiz extends Component {

    onAnswerClickHandler = (answerId) => {

    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    /*функция для кнопки повторить(опрос)
    это будет стрелочная функция чтобы не терять контекст
    возвращаем State в первоначальное состояние*/
    /*Далее эту функцию будем передавать параметром в компонент FinishedQuiz
    * с произвольным названием onRetry,
    * а уже в компоненте FinishedQuiz с помощью функции onClick будем принимать через props...
    * <button onClick={props.onRetry}>Повторить</button>*/
    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }
    //проверка получения данных
  componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    myFunc () {
        console.log(this, this.state)
    }

    render() {
        //возвращаем jsx...обернём всё в div он и будет являться корневым для нашего приложения
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>

                    {
                        //если идёт загрузка или нет элемента quiz
                        this.props.loading || !this.props.quiz
                        ? <Loader />
                        : this.props.isFinished
                            ? <FinishedQuiz
                                /* теперь есть state results  и мы можем его передать в компонент FinishedQuiz*/
                                results={this.props.results}
                                /* чтобы в компоненте FinishedQuiz получить доступ к вопросам которые были*/
                                quiz={this.props.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                question={this.props.quiz[this.props.activeQuestion].question}
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />
                            /*здесь будем рендерить компонент ActiveQuiz .Сюда мы передаём параметры чтобы визуально отображать их*/

                    }
                </div>
            </div>
        )
    }
}
//state.quiz.results///quiz здесь ссылается на ключ из объекта combineReducers в файле rootReducer,
// значением этого ключа(quiz) является функция quizReducer которая содержит в себе state
function mapStateToProps(state) {
    return{
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDisatchToProps(dispatch) {
    return{
        //создаём в action данные методы

        //загружает с сервака тест
        //принимает параметром некоторый id теста
        fetchQuizById: id => dispatch(fetchQuizById(id))
        //выбирает ответ
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId))
    }
}

export default connect(mapStateToProps,mapDisatchToProps)(Quiz)
