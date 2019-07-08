import {
    createStore,
    combineReducers,
    applyMiddleware,
} from "redux";
import thunkMiddleware from 'redux-thunk';
import {
    createLogger,
} from 'redux-logger';
import {
    composeWithDevTools,
} from 'redux-devtools-extension';

import LoginReducer from "./reducer/login.js";
import MsgSendReducer from './reducer/toMessage.js';
import UserInfoReducer from './reducer/userInfoReducer.js';
import TopicListReducer from './reducer/TopicListReducer.js';
import StarRtcReducer from './reducer/starRtc.js';
import PelouedCaseID from './reducer/deploySend.js';
import MoveToPosDeducer from './reducer/moveTopos.js';
import sendUserIdReducer from './reducer/sendUserId.js';
//通过combineReducer() 合并多个 reducer

const loggerMiddleware = createLogger();

//通过combineReducer() 合并多个 reducer
const reducer = combineReducers({
    login: LoginReducer,
    MsgSendReducer,
    UserInfoReducer,
    TopicListReducer,
    StarRtcReducer,
    PelouedCaseID,
    MoveToPosDeducer,
    sendUserIdReducer,
});

const Store = createStore(reducer, composeWithDevTools(
    applyMiddleware(
        thunkMiddleware,
        // loggerMiddleware
    ),
    // other store enhancers if any
));
export default Store;