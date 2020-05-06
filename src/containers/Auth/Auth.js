import React, { Component } from 'react';
import classes from './Auth.module.css'
import Input from "../../components/UI/Input/Input";
import is from 'is_js'
import axios from 'axios'
import Button from "../../components/UI/Button/Button";


class Auth extends Component {
    //Формируем СВОЮ валидацию!!!Формируем state с переменной formControls для валидации данных.
    state = {
        //нам нужно изменять данное состояние когда мы вписываем что то в контролы(input)
        isFormValid: false,
        // в переменной formControls мы будем работать с контролами email и password
        //здеь мы проработаем всё детально без дополнительных облегчающих функцийй
        // а позжее в QuizCreator поговорим как можем это оптимизировать и создадим свой маленький Framework
        //На основе данных переменной formControls сгенерируем СВОИ input!!!
        //сделаем отдельную функцию renderInputs которая будет рендерить нам inputы
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                //отвечает за состояние валидации данного контрола
                // по умолчанию false т.к. value: ''...пустая строка, а значит НЕ валидно!
                //и чтобы не выводилась сразу ошибка нам нужо применить touched
                valid: false,
                //будет отвечать за состояние был ли затронуть данный imput пользователем(что то вводил и ввёл неправильно)
                //сначала false...не был затронут
                touched: false,
                //объект validation где мы будем указывать правила по которым мы будем валидировать контрол
                validation: {
                    //НЕзаполнение.Будем требовать!Без него мы не сможем заSubmitшть нашу форму...
                    requaired: true,
                    //мы хотим чтобы это был email
                    email: true
                }

            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                //отвечает за состояние валидации данного контрола
                /* по умолчанию false т.к. value: ''...пустая строка,а значит НЕ валидно!
                и чтобы не выводилась сразу ошибка нам нужо применить touched*/
                valid: false,
                //будет отвечать за состояние был ли затронуть данный imput пользователем(что то вводил и ввёл неправильно)
                //сначала false...не был затронут
                touched: false,
                //объект validation где мы будем указывать правила по которым мы будем валидировать контрол
                validation: {
                    //НЕзаполнение.Будем требовать!Без него мы не сможем заSubmitшть нашу форму...
                    requaired: true,
                    //потому что для fireBase длинна пароля 6 символов
                    minLength: 6
                }

            }
        }
    }

    //обычная функция es6 синтаксиса, которая будет рендерить нам inputы
    //будет возваращать массив состоящий из input
    /*получаем массив (состоящий из элементов email и password)
    из переменной formControls, а т.к. это объект используем Object.keys()*/
    //return Object.keys... в итоге функция возвращает сразу оператор map
    renderInputs(){
        return Object.keys(this.state.formControls).map((controlName,index) =>{
            //чтоб сокр.немного код создадим переменную control.
            // В этой переменной находятся объект характерный для каждого из контролов email и password
            const control = this.state.formControls[controlName]
            return (
                //в качестве итератора передаём атрибут key генерируем его с помощью controlName+index
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
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }
//фуекция для того чтобы логиниться
    loginHandler =  async () => {
        //так как  нас метод post мы должны передать три параметра, для этого создаём объект authData
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true

        }
        //для проверки обращения к серверу + отлов ошибок
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxuu9JJBB8q_q-qj-5HQklfCvRevQlfDg',authData)
            console.log(response)
            console.log(response.data)
        }catch (e) {
            console.log(e)
        }
    }
//функция регистрации.Отправляем post запрос на сервер для добавления пользователя
    registrHandler = async () => {
        //так как  нас метод post мы должны передать три параметра, для этого создаём объект authData
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true

        }
        //для проверки обращения к серверу + отлов ошибок
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxuu9JJBB8q_q-qj-5HQklfCvRevQlfDg',authData)
            console.log(response)
            console.log(response.data)
        }catch (e) {
            console.log(e)
        }


    }
    //эта функция будет принимать event и всё что она будет делать...это "эвентить" стандартное поведение формы
    submitHandler = (event) => {
        //preventDefault всегда используют для <form>.Форму голяком никогда не отправляют
        event.preventDefault()
    }

    //функция контроля валидации.
    //с параметрами value(наполнение контрола пользователем) и validation(параметры валидации этого контрола)
    validateControl(value, validation) {
        //если параметр validation отсутствует, значит этот контрол мы не валидируем
        if(!validation) {
            return true
        }
        let isValid = true
        //если переменная validation определёна
        if(validation.requaired) {
            isValid = value.trim() !== '' && isValid
        }

        if(validation.email){
            isValid = is.email(value) && isValid
        }

        if(validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid
    }


//функция изменения состояния input
    //чтобы грамонто отображались все поля и валидировались в нашей форме
    onChangeHandler = (event, controlName) => {
        //Объекты не должны мутироваться а мы создаем копии и их изменяем с помощью setState
        /*переменная formControls по названию объекта в state.И делаем из него копию объекта formControls
        с помощью оператора spread(...),для будующего изменения state*/
        const formControls = { ...this.state.formControls }
        //таким же образом делаем копию итерируемого контрола (или mail или password)
        const control = { ...formControls[controlName] }
        //теперь переопределяем параметры контрола
        //event.target.value это читаем содержиое value(подставляем в input)
        control.value = event.target.value
        /*раз попадаем в функцию onChangeHandler и читаем содержимое value значит input затронут пользователем
        а значил меняем значение touched на противоположное*/
        control.touched = true
        /*контроль валидации.Определяем функцией validateControl с параметрами
        control.value(наполнение контрола пользователем) и control.validation(параметры валидации этого контролп)*/
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control
        //для проверки валидности формы
        let isFormValid = true
        //получаем ключи объекта formControls(это или email или password).
        // Далее для каждого элемента(name),полученного массива мы переопределяем переменную isFormValid
        Object.keys(formControls).forEach(name => {
            /*если formControls[name].valid(true) && isFormValid(true),
            то isFormValid тоже true в противном случае false(тогда блокируем кнопку отправки формы(Войти и Зарегистрироваться),
            устанавливая параметр disabled в значение true)*/
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })
    }



    render() {
        return (
            //чтобы применить display: flex нужен корневой div
           <div className={classes.Auth}>
                <div>
                    <h1>авторизация</h1>
                    {/*форма которая позволит нам логиниться и создавать акаунты*/}
                    {/*onSubmit={this.submitHandler} метод который будет отменять стандартное поведение формы*/}
                    <form
                        onSubmit={this.submitHandler}/*preventDefault в submitHandler всегда используют для <form>.
                        Форму голяком никогда не отправляют.Не даёт отправить голую форму.Т.е.предотвращает отправку*/
                        className={classes.AuthForm}
                    >
                        {this.renderInputs()}

                        <Button
                            type={'success'}//тип для класса
                            onClick={this.loginHandler}
                            /*таким образом отключаем кнопку если форма не валидна.
                            disabled в начении true*/
                            disabled={!this.state.isFormValid}
                        >
                            Войти
                        </Button>

                        <Button
                            type={'primary'}//тип для класса
                            onClick={this.registrHandler}
                            /*таким образом отключаем кнопку если форма не валидна.
                            disabled в начении true*/
                            disabled={!this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>

                    </form>
                </div>

           </div>
        );
    }
}

export default Auth;


