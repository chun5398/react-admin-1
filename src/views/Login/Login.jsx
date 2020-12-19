import React, { useState, useEffect } from 'react'
import { Layout, Input, Icon, Form, Button, Divider, message, notification } from 'antd'
import { withRouter } from 'react-router-dom'
import axios from '../../api/index'
import { API } from '../../api/config'
import '@/style/view-style/login.scss'
import { SUCCESS } from '../../constants'

const Login = props => {
    const [loading, setLoading] = useState(false)

    const { getFieldDecorator } = props.form

    const handleSubmit = e => {
        setLoading(true)
        e.preventDefault()
        props.form.validateFields((err, values) => {
            if (!err) {
                let { username, password } = values
                axios
                    .post(API.LOGIN, { userId: username, psd: password })
                    .then(res => {
                        setLoading(false)
                        if (res.code === SUCCESS) {
                            const { mtokenId, userId, userName } = res.data
                            localStorage.setItem('user', JSON.stringify({ userId, userName }))
                            localStorage.setItem('mtokenId', mtokenId)
                            message.success('登录成功!')
                            props.history.push('/')
                        }
                    })
                    .catch(err => {})

                // 这里可以做权限校验 模拟接口返回用户权限标识
                // switch (values.username) {
                //     case 'admin':
                //         values.auth = 0
                //         break
                //     default:
                //         values.auth = 1
                // }
            }
        })
    }

    useEffect(() => {
        notification.open({
            message: '欢迎使用后台管理平台',
            duration: null,
            description: null
        })
        return () => {
            notification.destroy()
        }
    }, [])

    return (
        <Layout className='login animated fadeIn'>
            <div className='model'>
                <div className='login-form'>
                    <h3>后台管理系统</h3>
                    <Divider />
                    <Form onSubmit={handleSubmit}>
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: '请输入用户名!' }]
                            })(
                                <Input
                                    prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder='用户名'
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: '请输入密码' }]
                            })(
                                <Input
                                    prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type='password'
                                    placeholder='密码'
                                />
                            )}
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' htmlType='submit' className='login-form-button' loading={loading}>
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(Form.create()(Login))
