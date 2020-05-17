import axios from "axios";
import {AUTH_LOGOUT, AUTH_SUCCESS} from "./actionTypes";


export function auth(email, password, isLogin) {
    //т.к. будем делать запрос серверу,поэтому будем возвращать асинхронный dispatch
    return async dispatch => {
        /*так как  нас метод post мы должны передать три параметра,
        для этого создаём объект authData*/
        const authData = {
            email,
            password,
            //этот параметр нам нужен по умолчанию в firebase
            returnSecureToken: true
        }
        //теперь нам нужно определить какой запрос нам необходим...на Залогиниться или на Регистрацию
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxuu9JJBB8q_q-qj-5HQklfCvRevQlfDg'
        if(isLogin){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxuu9JJBB8q_q-qj-5HQklfCvRevQlfDg'
        }
//axios будет делать запрос по url с параметрами auth() и складывать всё в response
        const response = await axios.post(url,authData)
        const data = response.data
        /*чтобы поддерживать сессию в реакт приложении, нам необходимо занести
        в localStorage некоторые данные...например токен который мы получили от сервера
        (для того чтобы мы имели к нему доступ)*/

        //получаем актуальную дату и время + 1 час
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000)
        //токен
        localStorage.setItem('token', data.idToken)
        //нужно завести локальный id пользователя
        localStorage.setItem('userId', data.localId)
        //продолжительность сессии обычно такие токены выдаются на 1 час(3600 мин)
        localStorage.setItem('expirationDate', expirationDate)
         //после как завершили все манипуляции можем dispatchить
        //передаём параметры токена чтобы поддерживать сессию
       dispatch(authSuccess(data.idToken))
        //теперь мы знаем что ровно через час у нас закончится сессия.Для это созд.ещё dispatch
        dispatch(autoLogout(data.expiresIn))
    }
}

function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token
    }
}

function autoLogout(time) {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
}

export function logout() {
    //обнуляем localStorage с помощью метода removeItem и убираем второй параметр
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')
    return{
        type: AUTH_LOGOUT
    }
}
//креэйтор для автоматического входа чтобы поддерживать сессию
export function autoLogin(){
    //функция будет асинхронной поэтому возвращаем dispatch
    return dispatch => {
        const token = localStorage.getItem('token')
        //если у нас нет token то будем вызывать функцию dispatch с методом logout
        // потому что мы не залогинены
        if(!token){
            dispatch(logout())
            //если token есть нужно проверить валидный ли он сейчас
        }else {
            //оборачиваем в конструктор new Date чтобы преобразовать в js дату
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                //если потерял актуальность...тогда входим
                dispatch(logout())
            }else {
                //если время не вышло dispatch два новых события
                dispatch(authSuccess(token))
                dispatch(autoLogout((expirationDate.getTime() - new Date().getTime())/1000))
            }

        }
    }
}