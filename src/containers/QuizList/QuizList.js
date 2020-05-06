import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import classes from './QuizList.module.css'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizes} from "../../store/actions/quiz";

class QuizList extends Component {

    //функция вывода списка тестов
    renderQuizes () {
        return this.props.quizes.map(quiz => {
            return (
                <li
                    key={quiz.id}
                >
                    <NavLink
                        to={'/quiz/' + quiz.id }
                    >
                       {quiz.name}
                    </NavLink>
                </li>
            )
        })
    }
    // //проверим работу бэк
    // //сделаем get запрос на нашу БД и проверим работает ли она
    componentDidMount() {
        //fetchQuizes функция из mapDispathToProps
        this.props.fetchQuizesQl()
    }

    render() {
        return (
           <div className={classes.QuizList}>
               <div>
                   <h1> Список тестов </h1>
                   {
                       this.props.loading && this.props.quizes.length !== 0
                           ? <Loader/>
                           :  <ul>
                               {this.renderQuizes()}
                           </ul>
                   }
               </div>
           </div>
        )
    }
}

//передаём параметр state
function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

//dispatch(fetchQuizes())данная функция импортируется из файла actio
//принимает параметром dispatch и должен вернуть новый объект
function mapDispatсhToProps(dispatch) {
    return {
        //будем говорить компоненту что ему нужно загрузить какое то кол-во тестов
        //метод fetchQuizes не принимает параметры  и будет диспатчить новый action creator fetchQuizes()
        fetchQuizesQl: () => dispatch(fetchQuizes())
    }
}
//оборачиваем QuizList в connect чтобы он взаимодействовал со store
export default connect(mapStateToProps, mapDispatсhToProps)(QuizList);