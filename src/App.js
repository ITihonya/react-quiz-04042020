import React, {Component} from 'react';
import Layout from "./hoc/Layout/Layout";
import { Route, Switch,Redirect,withRouter } from "react-router";
import Quiz from "./containers/Quiz/Quiz";
import QuizList from "./containers/QuizList/QuizList";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Auth from "./containers/Auth/Auth";
import {connect} from "react-redux";
import Logout from "./components/Logout/Logout"
import {autoLogin} from "./store/actions/auth";

class App extends Component {
    componentDidMount() {
        //если у нас что то хранится в LocalStorege то будем автоматом поддерживать нашу сессию
        this.props.autoLogin()
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/quiz/:id" component={Quiz} />
                <Route path="/" exact component={QuizList} />
                <Redirect to="/" />
            </Switch>
        )

        if (this.props.isAuthenticated){
            routes = (
                <Switch>
                    <Route path="/quiz-creator" component={QuizCreator} />
                    <Route path="/quiz/:id" component={Quiz} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={QuizList} />
                    <Redirect to="/" />
                </Switch>
            )
        }

        return (
            <Layout>
                { routes }
            </Layout>
        );
    }
}



//потребуется только одна функция mapStateToProps
function mapStateToProps(state) {
    return{
        //нам нужно понять авторизован ли сейчас пользователь или нет
        //если token есть то пользователь авторизован
        //приводим к булевскому значению
        isAuthenticated: !!state.auth.token
    }
}
//чтобы автоматически входить
function mapDispatchToProps(dispatch) {
    return{
        autoLogin:() => dispatch(autoLogin())
    }
}
//соединим App со store
export default withRouter(connect(mapStateToProps,mapDispatchToProps) (App));
