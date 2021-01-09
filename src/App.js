import React from 'react'
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import loadable from './utils/loadable'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { ConfigProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'animate.css'
import './style/base.scss'
import './style/App.scss'

moment.locale('zh-CN')

// 公共模块
const DefaultLayout = loadable(() => import(/* webpackChunkName: 'default' */ './containers'))

// 基础页面
const View404 = loadable(() => import(/* webpackChunkName: '404' */ './views/Others/404'))
const View500 = loadable(() => import(/* webpackChunkName: '500' */ './views/Others/500'))
const Login = loadable(() => import(/* webpackChunkName: 'login' */ './views/Login'))

const App = () => (
    <ConfigProvider locale={zh_CN}>
        <Router>
            <Switch>
                <Route path='/' exact render={() => <Redirect to='/reservation' />} />
                <Route path='/500' component={View500} />
                <Route path='/login' component={Login} />
                <Route path='/404' component={View404} />
                <Route component={DefaultLayout} />
            </Switch>
        </Router>
    </ConfigProvider>
)

export default App
