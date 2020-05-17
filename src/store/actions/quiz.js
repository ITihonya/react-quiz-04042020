//здесь мы реализовываем все наши action creator кот.нужны для тестов
    import axios from '../../axios/axios-quiz'
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, FINISH_QUIZ, QUIZ_NEXT_QUESTION,
    QUIZ_SET_STATE, RETRY_QUIZ
} from "./actionTypes";

//наш action creator fetchQuizes для получения списка quizes
export function fetchQuizes() {
    //будет возвращать асинхронную функцию
    return async dispatch => {
        //чтобы загрузить список с сервера нам нужно отдиспатчить сначала :
        // когда мы начали что то загружать fetchQuizesStart
        dispatch(fetchQuizesStart())
        //обернём всё в try cath, чтобы отловить ошибки
        try {
            const response = await axios.get('/quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест № ${index + 1}`,
                })
            })
            //когда получили неоторые данные и преобразовали в массим quizes диспатчим fetchQuizesSuccess
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

////наш action creator fetchQuizById для получения теста quiz
export function fetchQuizById(quizId) {
    //что будет делать данная функция
    //будет возвр. асинхронную функц.dispatch где мы будем описывать логику по загрузке теста с сервера
    return async dispatch => {
        //Для начала изм. в state параметр loading: false на loading: true используя функц.fetchQuizesStart
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get(`/quizes/${quizId}.json`)
            const quiz = response.data
            dispatch(fetchQuizSuccess(quiz))
        }catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }

}

//наш action creator для получения ответа
export function quizAnswerClick(answerId) {
    /*нам будет необходим доступ к state для этого вторым параметром redux thunk
    нам предоставляет функцию getState*/
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }
        //получаем доступ к текущему вопросу(создаем переменную question) для дальнейшей работы с ним
        const question = state.quiz[state.activeQuestion]
        //получаем доступ к объекту results
        const results = state.results
        //теперь логика...
        //если ответ верен
        if (question.rightAnswerId === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({[answerId]: 'success'}, results))
            // this.setState({
            //     answerState: {[answerId]: 'success'},
            //     /*после того как в переменную results были добавлены данные [id]: 'success' или 'error'
            //     меняем state*/
            //     results: results
            // })
            //чтобы визуально отобразить правильный ответ...перед переключение вопроса сделаем таймаут в 1 секунду(1000)
            //создаём переменную
            const timeout = window.setTimeout(() => {
                //теперь описываем что мы будем делать
                if (isQuizFinished(state)) {
                    console.log('Finished')
                    //action creator когда опрос закончен
                    dispatch(finishQuiz())
                    // this.setState({
                    //     isFinished: true
                    // })
                } else {
                    //изменение activeQuestion(текущий вопрос) при переходе к другому вопросу после ответа на текущий вопрос
                    //action creator  который будет переключать вопрос
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                    // this.setState({
                    //     activeQuestion: this.state.activeQuestion + 1,
                    //     answerState: null
                    // })
                }
                //чтобы не было утечки памяти...пишем window.clearTimeout(timeout) чтоб мы сразу убрали(удалили) переменную timeout как только закончится эта функция
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[answerId] = 'error'
            dispatch(quizSetState({[answerId]: 'error'}, results))
            // this.setState({
            //     answerState: {[answerId]: 'error'},
            //     results: results/*а можем записать коротко просто results...т.к. ключ и значения имеют один.названия*/
            // })
        }
    }

}

//Каждый возвр.некотор.объект у которого обязательно должно быть поле type.
//в случаем вызова этого метода fetchQuizesStart диспатчим
function fetchQuizesStart (){
    return {
        //Для type создаём набор констант в файле actionTypes
        type: FETCH_QUIZES_START
    }
}
//если успешно загрузили с сервера диспатчим FETCH_QUIZES_SUCCESS
function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        //payload
        quizes: quizes
    }
}
//если получили ошибку
function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        //payload
        error: e
    }
}

function fetchQuizSuccess(quiz) {
    return{
        type: FETCH_QUIZ_SUCCESS,
        quiz: quiz
    }
}

function quizSetState(answerState, results) {
    return{
        type: QUIZ_SET_STATE,
        answerState, results
    }
}

function finishQuiz() {
    return{
        type: FINISH_QUIZ
    }
}

function quizNextQuestion(number) {
    return{
        type: QUIZ_NEXT_QUESTION,
        //payload
        number: number
    }
}

function isQuizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}

export function retryQuiz() {
    return{
        type: RETRY_QUIZ
    }
}