//импортируем React и Component
import React, {Component} from "react";
import classes from './Layout.module.css'

//создаём класс Layout(произвольное название) который будет наследоваться от класса Component
class Layout extends Component{
    //используем метот render...рендерим(получаем изображение)
    render (){
        //возвращаем jsx...обернём всё в div он и будет являться корневым для нашего приложения
        return (

            <div className={classes.Layout}>{/*стилизуем наш корневой div с омощью переменной classes*/}
                {/*в этот тег(main) мы будем складывать все наши страницы которые будут нам нужны в нашем приложении
                Пока закидываем туда параметр this.props.children(т.е. контент который мы будем закидывать в открывающийся тег Layout)*/}

             <main>
                 {this.props.children}
             </main>
            </div>
        )
    }
}
//экспортируем наружу класс Layout
export default Layout