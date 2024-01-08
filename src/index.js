// React必要的两个核心包
import React, {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/es/locale/zh_CN'
import {BrowserRouter as Router} from 'react-router-dom'
import "./styles.css"

//导入项目的根组件
import App from './App';

// 把App根组件渲染到id为root的dom节点上
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <ConfigProvider
            locale={zhCN}>
            <App/>
        </ConfigProvider>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
