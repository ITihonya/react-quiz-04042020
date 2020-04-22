//функциональный компонент
import React, {Component} from "react";
import classes from './Drawer.module.css'
import {NavLink} from "react-router-dom";
import Backdrop from "../../UI/Backdrop/Backdrop";
/*список ссылок формируем в виде объекта
to:путь, label: название страницы, exact: false или true(если true то только точное совпадение адреса)*/
const link = [
    {to:'/', label: 'Список', exact: true},
    {to:'/Auth', label: 'Авторизация', exact: false},
    {to:'/quiz-creator', label: 'Создать тест', exact: false}
]
class Drawer extends Component{
    clickHandler = () => {
        //вызываем функцию
        this.props.onClose()
    }
    //функция перебирает элементы(ссылки) выводимые в компоненте Drawer и выводит в виде списка li
    renderLink(){
        return link.map((link, index) => {
            return (
                <li key={index}>
                    {/*Для роутинга мы должны использовать для ссылок не тег <a> а компонент NavLink*/}
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        //чтобы при клике на ссылку закрывался Drawer(меню)
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }
    render() {
        //создаём массив классов которые будут отвечать за отображение открытия и закрытие меню Drawer
        const cls = [
            //сласс по умолчанию
            classes.Drawer
        ]
        //если меню закрыто
        if(!this.props.isOpen){
            //добавляем новый класс
            cls.push(classes.close)
        }
        //что будет находится в самом render.Верстка для данного компонента.
        return (
            <React.Fragment>
                {/*корневой элемент navigation(nav)*/}
                <nav className={cls.join(' ')}>
                    {/*внутри будет находится список ul где мы будет выводит список всех наших ссылок*/}
                    <ul>
                        {this.renderLink()}
                    </ul>
                </nav>
                {/*проверяем,если меню открыто(isOpen = true) показываем Backdrop(затемняем контент)
                если меню закрыто (isOpen = false) не показываем Backdrop.
                параметр onClick c props.onClose(результатом  положения меню (isOpen = false или true))
                передаём в Backdrop*/}
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>

        )
    }
}

export default Drawer