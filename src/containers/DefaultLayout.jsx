import React, { useState, useReducer } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { Layout, BackTop, message } from 'antd'
import routes from '../routes/index'
import menus from './menu'
import '@/style/layout.scss'

import AppHeader from './AppHeader.jsx'
import AppAside from './AppAside.jsx'
import AppFooter from './AppFooter.jsx'

const { Content } = Layout

const MENU_TOGGLE = 'menuToggle'

const reducer = (state, action) => {
    switch (action.type) {
        case MENU_TOGGLE:
            return { ...state, menuToggle: !state.menuToggle }
        default:
            return state
    }
}

const getMenu = menu => {
    let newMenu,
        auth = JSON.parse(localStorage.getItem('user')).auth
    if (!auth) {
        return menu
    } else {
        newMenu = menu.filter(res => res.auth && res.auth.indexOf(auth) !== -1)
        return newMenu
    }
}

const DefaultLayout = props => {
    const [menu] = useState(prevState => {
        if (!localStorage.getItem('user')) {
            props.history.push('/login')
            return []
        } else {
            return getMenu(menus)
        }
    })

    const [state, dispatch] = useReducer(reducer, { menuToggle: false })

    // let { auth } = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : ''

    const menuClick = () => {
        dispatch({ type: 'menuToggle' })
    }

    const loginOut = () => {
        localStorage.clear()
        props.history.push('/login')
        message.success('登出成功!')
    }

    return (
        <Layout className='app'>
            <BackTop />
            <AppAside menuToggle={state.menuToggle} menu={menu} />
            <Layout style={{ marginLeft: state.menuToggle ? '80px' : '200px', minHeight: '100vh' }}>
                <AppHeader menuToggle={state.menuToggle} menuClick={menuClick} loginOut={loginOut} />
                <Content className='content'>
                    <Switch>
                        {routes.map(item => {
                            return (
                                <Route
                                    key={item.path}
                                    path={item.path}
                                    exact={item.exact}
                                    render={props => <item.component {...props} />}></Route>
                            )
                        })}
                        <Redirect to='/404' />
                    </Switch>
                </Content>
                <AppFooter />
            </Layout>
        </Layout>
    )
}

export default withRouter(DefaultLayout)
