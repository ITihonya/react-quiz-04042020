//Для type создаём набор констант в файле actionTypes
//и экспортируем их в файл action/quiz.js

//для списка QuizList
export const FETCH_QUIZES_START = 'FETCH_QUIZES_START'
export const FETCH_QUIZES_SUCCESS = 'FETCH_QUIZES_SUCCESS'
export const FETCH_QUIZES_ERROR = 'FETCH_QUIZES_ERROR'

//для тэста Quiz
export const FETCH_QUIZ_SUCCESS = 'FETCH_QUIZ_SUCCES'
export const QUIZ_SET_STATE = 'QUIZ_SET_STATE'
export const FINISH_QUIZ = 'FINISH_QUIZ'
export const QUIZ_NEXT_QUESTION = 'QUIZ_NEXT_QUESTION'
export const RETRY_QUIZ = 'RETRY_QUIZ'

//для QuizCreator
export const CREATE_QUIZ_QUESTION = 'CREATE_QUIZ_QUESTION'
//обнуление массива quiz для создания нового теста после добавления на сервак
export const RESET_QUIZ_CREATION = 'RESET_QUIZ_CREATION'

//для авторизации Auth
export const AUTH_SUCCESS = 'AUTH_SUCCESS'
// Для контроля длительности сессии
export const AUTH_LOGOUT = 'AUTH_LOGOUT'