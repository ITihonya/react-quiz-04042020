import React, {Component} from "react";
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiviQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";


class Quiz extends Component {

    state = {
        /*создаем массив в котором будут храниться все вопросы,правильные ответы и все параметры кот.относятся к голосованию
        и каждый элемент этого массива будет являться объектом*/
        //создаём объект в который будем складывать правильные и неправильные ответы для подсчёта
        results: {},//{[id]: 'success' 'error'}
        //когда опрос закончен
        isFinished: false,
        //активный вопрос
        activeQuestion: 0,
        //объект для отображения правильности ответа цветом.
        // Он будет хранить в себе информацию о текущем клике пользователя(либо правильный ответ либо неправильный)
        answerState: null,//объект будет выглядеть вот так {[id]: 'success' 'error'} и по id мы будем понимать правильный дан ответ или нет.
        quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'Чёрный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зелёный', id: 4}
                ]
            },
            {
                question: 'В каком году основали Санкт-Петербург',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1803', id: 4}
                ]
            }
        ]
    }
    onAnswerClickHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        //получаем доступ к текущему вопросу(создаем переменную question) для дальнейшей работы с ним
        const question = this.state.quiz[this.state.activeQuestion]
        //получаем доступ к объекту results
        const results = this.state.results
        //теперь логика...
        //если ответ верен
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                /*после того как в переменную results были добавлены данные [id]: 'success' или 'error'
                меняем state*/
                results: results
            })
            //чтобы визуально отобразить правильный ответ...перед переключение вопроса сделаем таймаут в 1 секунду(1000)
            //создаём переменную
            const timeout = window.setTimeout(() => {
                //теперь описываем что мы будем делать
                //когда опрос закончен
                if (this.isQuizFinished()) {
                    console.log('Finished')
                    this.setState({
                        isFinished: true
                    })
                } else {
                    //изменение activeQuestion(текущий вопрос) при переходе к другому вопросу после ответа на текущий вопрос
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                //чтобы не было утечки памяти...пишем window.clearTimeout(timeout) чтоб мы сразу убрали(удалили) переменную timeout как только закончится эта функция
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[answerId] = 'error'
            this.setState({
                answerState: {[answerId]: 'error'},
                results: results/*а можем записать коротко просто results...т.к. ключ и значения имеют один.названия*/
            })
        }
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
        console.log('Quiz ID = ', this.props.match.params.id)
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
                    {/*{} скобки в jsx означают вход в js?*/}
                    {
                        this.state.isFinished
                            ? <FinishedQuiz
                                /* теперь есть state results  и мы можем его передать в компонент FinishedQuiz*/
                                results={this.state.results}
                                /* чтобы в компоненте FinishedQuiz получить доступ к вопросам которые были*/
                                quiz={this.state.quiz}
                                onRetry={this.retryHandler}
                            />
                            : <ActiveQuiz
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick={this.onAnswerClickHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            >{/*здесь будем рендерить компонент ActiveQuiz .Сюда мы передаём параметры чтобы визуально отображать их*/}
                            </ActiveQuiz>

                    }
                    <button onClick={this.myFunc.bind(this)}></button>

                </div>
            </div>
        )
    }
}

export default Quiz
