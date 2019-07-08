import Axios from 'axios';
import {Component,} from 'react';
Axios.interceptors.request.use(function (config) {
    
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});
 
// Add a response interceptor
Axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response.data;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});
Component.prototype.$axios=Axios;