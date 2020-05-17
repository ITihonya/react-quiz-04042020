//импортируем React и Component
import React, {Component} from "react";
import classes from './Layout.module.css'
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";
import {connect} from "react-redux";
//создаём класс Layout(произвольное название) который будет наследоваться от класса Component
class Layout extends Component{
    state = {
        //статус отображения меню
        menu: false
    }
    //данная стрелочная функция будет изменять state на противоположный
    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    menuCloseHandler = () => {
        this.setState({
            menu: false
        })
    }
    //используем метот render...рендерим(получаем изображение)
    render (){
        //возвращаем jsx...обернём всё в div он и будет являться корневым для нашего приложения
        return (

            <div className={classes.Layout}>{/*стилизуем наш корневой div с омощью переменной classes*/}
                <Drawer
                isAuthenticated={this.props.isAuthenticated}
                isOpen={this.state.menu}//прокидываем в компонент Drawer статус меню
                onClose={this.menuCloseHandler}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}/*прокидываем функцию в компонент MenuToggle
                    которая будет срабатывать при клике на кнопку*/
                    isOpen={this.state.menu}//прокидываем в компонент MenuToggle статус меню
                />

             <main>{/*в этот тег(main) мы будем складывать все наши страницы которые будут нам нужны в нашем приложении
                Пока закидываем туда параметр this.props.children(т.е. контент который мы будем закидывать в открывающийся тег Layout)*/}
                 {this.props.children}
             </main>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

//экспортируем наружу класс Layout
export default connect (mapStateToProps) (Layout)