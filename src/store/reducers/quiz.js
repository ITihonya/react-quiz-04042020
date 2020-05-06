//данный файл будет отвечать за список тестов и за текущий тест

import {FETCH_QUIZ_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "../actions/actionTypes";

//создаём начальный state с чего начинается всё наше приложение
const initialState = {
    //создаём объект в который будем складывать правильные и неправильные ответы для подсчёта
    results: {},//{[id]: 'success' 'error'}
    //когда опрос закончен
    isFinished: false,
    //активный вопрос
    activeQuestion: 0,
    //объект для отображения правильности ответа цветом.
    // Он будет хранить в себе информацию о текущем клике пользователя(либо правильный ответ либо неправильный)
    answerState: null,//объект будет выглядеть вот так {[id]: 'success' 'error'} и по id мы будем понимать правильный дан ответ или нет.
    //на начальном этапе null потом загрузим с сервака
    quiz: null,
    quizes: [],
    //иконка загрузки с сервера...компонент Loader...по умолчанию false...ничего не будет грузиться
    loading: false,
    error: null
}

//формируем reducer
export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        //теперь меняем наш state когда диспатчим наши action
        /*когда отдиспатчился метод FETCH_QUIZES_START...начали что то грузить с сервера
         то в качестве state мы возвращаем наш state и плюс изменённое состояние loading на true*/
        case FETCH_QUIZES_START:
            return {
               ...state,loading: true
            }
        //когда отдиспатчился метод FETCH_QUIZES_SUCCESS...в случае того когда у нас произошёл успех в загрузке
        /*loading: false потому что мы уже закончили загрузку
        action.quizes(по названия ключа из payload) из параметра payload в actions/quiz(action creator)
        метода FETCH_QUIZES_SUCCESS*/
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,loading: false,quizes: action.quizes
            }
        //при ошибке...возвращаем state, отключаем loading и возвращаем ошибку
        //action.error(по названия ключа из payload)
        case FETCH_QUIZES_ERROR:
            return {
                ...state,loading: false,error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,loading: false,quiz: action.quiz
            }
        //обязательное условие для работы с reducer...нужно возвращать state
        default:
            return state
    }
}