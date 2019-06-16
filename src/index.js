import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList';
import {Provider} from 'react-redux'
import store from './store'
import {persistor} from './store'
import {PersistGate} from 'redux-persist/lib/integration/react';

//ReactDOM.render(<TodoList />, document.getElementById('root'));

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <TodoList />
    </PersistGate>
  </Provider>, document.getElementById('root')
);