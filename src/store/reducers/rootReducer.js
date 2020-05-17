import {combineReducers} from "redux";
//импоритируем редюсер для Quiz и QuizLst
import quizReducer from './quiz'
import createReducer from "./create";
import authReducer from "./auth";
//импортируем редюсер для Quiz и QuizLst
export default combineReducers ({
    //регистрируем редюсер для Quiz и QuizLst
    quiz: quizReducer,

    //регистрируем редюсер для QuizCreator
    create: createReducer,
    auth: authReducer
})
