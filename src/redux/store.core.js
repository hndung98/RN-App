import { createStore } from 'redux';
import rootReducer from './reducer.core';

const store = createStore(rootReducer);

export default store;