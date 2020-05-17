import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionTypes";
import axios from '../../axios/axios-quiz'

//добавление вопроса в тест
export function createQuizQuestion(item) {
    return{
        type: CREATE_QUIZ_QUESTION,
        item
    }
}
//добавление нового теста на сервер
export function finishCreateQuiz() {
    //чтобы правильно определить объект response перед опрератором перед асинхр.событием axios ставим await
    //данный метод axios.post вернёт нам promise и с помощью await мы распарсим данный promise и положим в response
    //метод post принимает 2 параметра...это url и массив который мы создали в state...а именно quiz
    //чтобы получить доступ к state принимем вторым параметром метод getState и вызываем его в запросе
    return async (dispatch, getState) => {
        await axios.post('quizes.json', getState().create.quiz)
        dispatch(resetQuizCreation())
    }
}

/*после добавления нового теста на сервер нам нужно обнулить массив quiz
чтобы мы могли заного создавать новый тест*/
export function resetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION
    }
}