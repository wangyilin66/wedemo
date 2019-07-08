import React from 'react';
import ReactDOM from 'react-dom';

import "./common/css/main.css";
import App from './views/main';
import './views/utils/axios';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import { Provider, } from 'react-redux';
import Store from './store/index.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={Store} locale={zh_CN}>
        <App/>
    </Provider>, 
    document.getElementById('root'));
serviceWorker.unregister();
