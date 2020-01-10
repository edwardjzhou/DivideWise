//React
import React from 'react';
import ReactDOM from 'react-dom';
//Components
import Root from './components/root';
import configureStore from './store/store';
import { login, signup } from './util/session_api_util';


document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
    //     delete window.currentUser;
    } else {
        store = configureStore();
    }
    store = configureStore();

    const root = document.getElementById('root');
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.login = login;
    window.signup = signup;
    window.store = store;
    //window.preloadedState = preloadedState

    ReactDOM.render(<Root store={store} />, root);
});
