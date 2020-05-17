//данный редюсер преднозначен для QuizCreator

import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "../actions/actionTypes"

const initialState = {
    quiz: []
}
export default function createReducer (state = initialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                //возвращаем обновлённый state
                ...state,
                /*Нам нужно добавить новый элемент item который мы передаём с помощью action в функции createQuizQuestion.
                Чтобы наш массив quiz не мутировал
                клонируем наш массив quiz и добавляем в него action.item*/
                quiz: [...state.quiz,action.item]
            }
        case RESET_QUIZ_CREATION:
            return {
                //возвращаем обновлённый state и обнуляем массив quiz
                ...state,quiz: []
            }
        default:
            return state
    }
}