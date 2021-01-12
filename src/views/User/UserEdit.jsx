import React, { useState, useEffect } from 'react'
import axios from '../../api/index'
import { API } from '../../api/config'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Row, Col, Form, Input, Button, Upload, Icon, message } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import { SUCCESS } from '../../constants'

const FormItem = Form.Item
const TextArea = Input.TextArea

const UserEdit = props => {
    const params = useParams()
    const history = useHistory()

    const [id, setId] = useState(-1)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const id = params.id ? parseInt(params.id) : -1
        if (id !== -1) {
            let user = JSON.parse(localStorage.getItem('editUser'))
            setUser(user)
        }
        setId(id)
    }, [])

    const setValue = field => {
        let value = id !== -1 ? user[field] : null
        return value
    }

    const handleSubmit = event => {
        event.preventDefault()
        props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) {
                return
            }

            const { amount, nickName, ...rest } = fieldsValue
            axios
                .post(API.USER.UPDATE, rest)
                .then(res => {
                    res.code === SUCCESS && message.success('操作成功') && history.replace('/user')
                    res.code !== SUCCESS && message.error(res.message)
                })
                .catch(err => {
                    message.error(err.message)
                })
        })
    }

    const handleHistoryBack = () => {
        history.replace('/user')
    }

    const formItemLayout = {
        labelCol: {
            xs: { span: 16 },
            sm: { span: 6 }
        },
        wrapperCol: {
            xs: { span: 16 },
            sm: { span: 10 }
        }
    }

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 16,
                offset: 0
            },
            sm: {
                span: 10,
                offset: 6
            }
        }
    }

    const { getFieldDecorator } = props.form

    return (
        <Layout>
            <div>
                <CustomBreadcrumb arr={['用户管理', '用户详情']}></CustomBreadcrumb>
            </div>
            <Row>
                <Col>
                    <div className={'base-style'}>
                        <Form {...formItemLayout} onSubmit={handleSubmit}>
                            <FormItem label={'用户ID'}>
                                {getFieldDecorator('id', {
                                    initialValue: setValue('id'),
                                    rules: []
                                })(<Input placeholder='请输入产品名称' disabled={true} />)}
                            </FormItem>
                            <FormItem label={'昵称'}>
                                {getFieldDecorator('nickName', {
                                    initialValue: setValue('nickName'),
                                    rules: [{ required: true, message: '请输入产品名称' }]
                                })(<Input placeholder='请输入产品名称' disabled={true} />)}
                            </FormItem>
                            <FormItem label={'联系电话'}>
                                {getFieldDecorator('phone', {
                                    initialValue: setValue('phone'),
                                    rules: [{ required: true, message: '请输入客户联系电话' }]
                                })(<Input placeholder='请输入客户联系电话' />)}
                            </FormItem>
                            <FormItem label={'备注'}>
                                {getFieldDecorator('remark', {
                                    initialValue: setValue('remark'),
                                    rules: [{ required: true, message: '请输入客户备注' }]
                                })(<TextArea placeholder='请输入客户备注' />)}
                            </FormItem>
                            <FormItem label={'余额'}>
                                {getFieldDecorator('amount', {
                                    initialValue: setValue('amount'),
                                    rules: []
                                })(<Input type={'number'} suffix={'元'} disabled={true} />)}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type={'primary'} style={{ marginRight: 16 }} onClick={handleHistoryBack}>
                                    返回
                                </Button>
                                <Button type={'primary'} htmlType={'submit'}>
                                    {'提交修改'}
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}

const UserEditScreen = Form.create({ name: 'user_edit' })(UserEdit)

export default UserEditScreen
