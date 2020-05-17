import React, { Component } from 'react';
import classes from './QuizCreator.module.css'
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {createControl,validate,validateForm} from "../../form/formFramework";
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Select from "../../components/UI/Select/Select";
import axios from '../../axios/axios-quiz'
import {connect} from "react-redux";
import quiz from "../../store/reducers/quiz";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";


class QuizCreator extends Component {

    state = {
        //параметр состояния формы
        isFormValid: false,
        rightAnswerId: 1,
        /*ТЕСТ КОТОРЫЙ МЫ СОЗДАЁМ МОЖЕТ СОСТОЯТЬ ИЗ НЕСКОЛЬКИХ ВОПРОСОВ и здесь мы будем хранить все вопросы к тесту
        и в методе addHandler будем добавлять эти вопросы в массив quiz*/
        formControls: createFormControl()
    }
    //функция отменяющее стандартное поведение формы
    submitHandler = event => {
        event.preventDefault()
    }
    //добавление нового вопроса в тест
    addQuestionHandler = () => {
        //деструктуризация данных для сокращения записи в параметрах answers
        const {question, option1, option2, option3, option4} = this.state.formControls
        //далее нам нужно сформировать объект каждого из вопросов и положить его в quiz
        const questionItem = {
            question: question.value,
            id: this.props.newQuiz.length +1,
            rightAnswerId: this.state.rightAnswerId,
            //ответы будут представлены ввиде массива объектов
            //которые будут состоять из двух параметров text и id
            answers: [
                // {text: this.state.formControls.option1.value, id: this.state.formControls.option1.id}
                //данную запись можно сократить с помощью деструктуризации
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }
        //добавление нового вопроса в тест
        this.props.createQuizQuestion(questionItem)
        //далее изменяем состояние state на основе новых данных
        this.setState({
            //после этого обнуляем состояние страницы...сделать её новой,чистой и нетронутой.но уже с новым вопросом
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControl()
        })
        //после этого обнуляем состояние страницы...сделать её новой,чистой и нетронутой

    }
    //завершение добавления теста
    //  Делаем функцию асинхронной с помощью async
    createQuizHandler = (event) => {
        // //используем post запрос для добавления данных в БД
        // // первым параметром передаём Url, вторым параметром массив куда будем всё складывать quiz [](this.state.quiz)
        // //т.к. axios возвращает pomise то используем метод then для получения ответа и
        // //catch для выода ошибки
        // axios.post('https://react-quiz-04042020.firebaseio.com/quizes.json', this.state.quiz)
        //     .then(response => {
        //         console.log(response)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        //ТЕПЕРЬ МОЖЕМ ВОСПОЛЬЗОВАТЬСЯ СОВРЕМЕННЫМ СИНТАКСИСОМ...ТО ЧТО ВВЕРХУ

        //В случае успешного выполнения запроса обнуляем страницу
        this.setState({
            //так как ключ и значение совпадают можем записать короче, просто quiz
            quiz: [],
            //после этого обнуляем состояние страницы...сделать её новой,чистой и нетронутой.но уже с новым вопросом
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControl()
        })
        this.props.finishCreateQuiz()
    }
    //функция изменения input
    сhangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid:validateForm(formControls)
        })
    }
    //Функция для инициализации input.Данная функция будет зависить от state
    renderControls () {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Auxiliary key={ controlName + index }>
                    <Input
                        key={ controlName + index }
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        label={control.label}
                        //!! приведение к булевому значению
                        //отвечает за то,нужно ли нам валидировать input или же нет
                        shouldValidate={!!control.validation}
                        erroprMessage={control.errorMessage}
                        //этот параметр следит за изменениями в input...редактирование inputa
                        onChange={(event) => this.сhangeHandler(event.target.value, controlName)}

                    >
                    </Input>
                    {/*Для вывода гор.черты(<hr />)можем спросить у jsx*/}
                    {index === 0 ? <hr /> : null}
                </Auxiliary>
            )
        })
    }
    //функция для выбора значений select
    selectChangeHandler = (event) => {
        this.setState({
            //чтобы привести к числовому значению применяем "+"
            rightAnswerId: +event.target.value
        })
    }

    render() {
        //выносим компонент Select в отдельную переменную с определёнными параметрами
        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4}
            ]}
        />
        return (
           <div className={classes.QuizCreator}>
               <div>{/*создаём ещё один div(где будет содержаться блок всей нашей формы),т.к. будем ипользовать display:flex*/}
                   <h1> Создание теста </h1>

                   <form onSubmit={this.submitHandler}>

                       {/* Для инициализации input будем вызывать метод renderControls*/}
                       {this.renderControls()}


                       { select }

                       <Button
                            type={'primary'}
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}/*если форма невалидная кнопка будет неактивна*/
                       >
                           Добавить вопрос
                       </Button>

                       <Button
                           type={'success'}
                           onClick={this.createQuizHandler}
                           disabled={this.props.newQuiz.length === 0}/*если нет вопросов в нашем тесте кнопка будет неактивна*/
                       >
                           Создать тест
                       </Button>
                   </form>
               </div>

           </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        newQuiz: state.create.quiz
    }

}

function mapDispatchToProps(dispatch) {
    return {
        //функция отвечающая за обавление вопроса в тест
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        //функция отвечающая за добавление теста на сервак
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuizCreator);





//ФУНКЦИИ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

//функция отменяющая дублирование кода в option
function createOptionControl(number){
    return createControl(
        {//передаём первый параметр...это config
            label: `Вариант ${number}`,
            errorMessage: 'Значение не может быть пустым',
            id: number
        },
        {//передаём второй параметр это validation
            required: true
        }
    )
}
//функция служит для обнуления state при создании нового вопроса
function createFormControl() {
    return {
        question: createControl(
            {//передаём первый параметр...это config
                label: 'Введите вопрос',
                errorMessage: 'Вопрос не может быть пустым'
            },
            {//передаём второй параметр это validation
                required: true
            }),
        option1:  createOptionControl(1),
        option2:  createOptionControl(2),
        option3:  createOptionControl(3),
        option4:  createOptionControl(4)
    }
}