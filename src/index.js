import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
//функции для...создания store
import {createStore, compose, applyMiddleware} from "redux";
//обёртка чтобы реакт понял что мы используем redux
import {Provider} from "react-redux";
import rootReducer from "./store/reducers/rootReducer";
//параметр для applyMiddleware
import thunk from "redux-thunk";


//функция для подключения devtools
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const store = createStore(
    rootReducer,
    //передаём параметром функцию applyMiddleware
    composeEnhancers(
        applyMiddleware(thunk)
    )

)

//настраиваем роутинг.Оборачиваем всё наше приложение в BrowserRouter
const application = (
    //передаём параметром нашу созданную переменную store
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>

)
ReactDOM.render(
  <React.StrictMode>
      {application}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
