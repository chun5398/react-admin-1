import React, { useState, useEffect, memo } from 'react'
import axios from '../../api/index'
import { API } from '../../api/config'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Row, Col, Form, Input, Button, Upload, Icon } from 'antd'
import { useParams } from 'react-router-dom'

const FormItem = Form.Item
const TextArea = Input.TextArea

const Detail = props => {
    const params = useParams()

    const [id, setId] = useState(-1)
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const id = params.id ? parseInt(params.id) : -1
        id !== -1 && setProduct(JSON.parse(localStorage.getItem('editProduct')))
        id === -1 && localStorage.removeItem('editProduct')
        setId(id)
    }, [])

    const setValue = field => {
        let value = id !== -1 ? product[field] : null
        return value
    }

    const setImages = () => {
        if (product) {
            let uploaded = { urL: product.prodImgUrl, uid: product.prodImgId, name: product.prodName, status: 'done' }
            const images = [uploaded]
            return images
        } else {
            return []
        }
    }

    const handleSubmit = event => {
        event.preventDefault()
        props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) return
            const values = { ...fieldsValue }
            console.log(values)
        })
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

    const { getFieldDecorator, getFieldValue } = props.form

    return (
        <Layout>
            <div>
                <CustomBreadcrumb arr={['产品管理', '产品详情']}></CustomBreadcrumb>
            </div>
            <Row>
                <Col>
                    <div className={'base-style'}>
                        <Form {...formItemLayout} onSubmit={handleSubmit}>
                            <FormItem label={'名称'}>
                                {getFieldDecorator('prodName', {
                                    initialValue: setValue('prodName'),
                                    rules: [{ required: true, message: '请输入产品名称' }]
                                })(<Input placeholder='请输入产品名称' />)}
                            </FormItem>
                            <FormItem label={'简介'}>
                                {getFieldDecorator('prodDesc', {
                                    initialValue: setValue('prodDesc'),
                                    rules: [{ required: true, message: '请输入产品简介' }]
                                })(<Input placeholder='请输入产品简介' />)}
                            </FormItem>
                            <FormItem label={'详情'}>
                                {getFieldDecorator('prodDetail', {
                                    initialValue: setValue('prodDetail'),
                                    rules: [{ required: true, message: '请输入产品详情' }]
                                })(<TextArea placeholder='请输入产品详情' />)}
                            </FormItem>
                            <FormItem label={'金额'}>
                                {getFieldDecorator('prodPrice', {
                                    initialValue: setValue('prodPrice'),
                                    rules: [{ required: true, message: '请输入产品金额' }]
                                })(<Input placeholder='请输入产品金额' type={'number'} />)}
                            </FormItem>
                            <FormItem label={'图片'}>
                                <Upload fileList={setImages()} action={'/yuanle/fs/upload'}>
                                    <Button icon={'upload'}>上传图片</Button>
                                </Upload>
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type={'primary'} htmlType={'submit'}>
                                    {id === -1 ? '新增产品' : '提交修改'}
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}

const DetailScreen = Form.create({ name: 'product_detail' })(Detail)

export default DetailScreen
