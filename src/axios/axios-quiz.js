import axios from 'axios'
//у axios вызываем метод create куда передаём объект конфигурации...один из них это baseURL(служебный)
export default axios.create ({
    baseURL: 'https://react-quiz-04042020.firebaseio.com/'
})