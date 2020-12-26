import React, { useEffect, useState } from 'react'
import { Layout, Form, Input, Button } from 'antd'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import '@/style/view-style/index.scss'
import axios from '../../api/index'
import { API } from '../../api/config'
import { SUCCESS } from '../../constants'

const FormItem = Form.Item

const Store = props => {
    const [store, setStore] = useState(null)

    useEffect(() => {
        axios
            .post(API.STORE.READ)
            .then(res => {
                if (res.code === SUCCESS) {
                    setStore(res.data)
                }
            })
            .catch(err => {})
    }, [])

    const handleSubmit = () => {}

    const setValue = field => {
        return store ? store[field] : null
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
        <Layout className='index animated fadeIn'>
            <div>
                <CustomBreadcrumb arr={['门店管理']}></CustomBreadcrumb>
            </div>
            <div className={'base-style'}></div>
            <Form {...formItemLayout} onSubmit={handleSubmit}>
                <FormItem label={'门店名称'}>
                    {getFieldDecorator('storeName', {
                        initialValue: setValue('storeName'),
                        rules: [{ required: true, message: '请输入门店名称' }]
                    })(<Input placeholder='请输入门店名称' />)}
                </FormItem>
                <FormItem label={'地址'}>
                    {getFieldDecorator('address', {
                        initialValue: setValue('address'),
                        rules: [{ required: true, message: '请输入产品名称' }]
                    })(<Input placeholder='请输入产品名称' />)}
                </FormItem>
                <FormItem label={'经度'}>
                    {getFieldDecorator('longitude', {
                        initialValue: setValue('longitude'),
                        rules: [{ required: true, message: '请输入经度' }]
                    })(<Input placeholder='请输入经度' type={'number'} />)}
                </FormItem>
                <FormItem label={'纬度'}>
                    {getFieldDecorator('latitude', {
                        initialValue: setValue('latitude'),
                        rules: [{ required: true, message: '请输入纬度' }]
                    })(<Input placeholder='请输入纬度' type={'number'} />)}
                </FormItem>
                <FormItem label={'联系电话'}>
                    {getFieldDecorator('phone', {
                        initialValue: setValue('phone'),
                        rules: [{ required: true, message: '请输入电话号码' }]
                    })(<Input placeholder='请输入电话号码' />)}
                </FormItem>
                <FormItem label={'首页轮播图'}></FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type={'primary'} htmlType={'submit'}>
                        提交
                    </Button>
                </FormItem>
            </Form>
        </Layout>
    )
}

const StoreScreen = Form.create({ name: 'store' })(Store)

export default StoreScreen
