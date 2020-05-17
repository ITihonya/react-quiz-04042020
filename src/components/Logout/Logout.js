import React, { Component } from 'react';
import {connect} from "react-redux";

import {logout} from "../../store/actions/auth";
import {Redirect} from "react-router";


class Logout extends Component {
    //когда компонент определится и инициализируется нужно задиспатчить функцию logout
    componentDidMount() {
        this.props.logout()
    }
    //в методе render мы сделаем redirect на основную страницу с помощью компонента Redirect
    render() {
        return <Redirect to={'/'} />
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)