import React, { useState, useEffect } from 'react'
import axios from '../../api/index'
import { API } from '../../api/config'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Row, Col, Form, Input, Button, Upload, Icon, message } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import { SUCCESS } from '../../constants'

const FormItem = Form.Item
const TextArea = Input.TextArea

const Detail = props => {
    const params = useParams()
    const history = useHistory()

    const [id, setId] = useState(-1)
    const [product, setProduct] = useState(null)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [produdctImage, setProdudctImage] = useState([])

    useEffect(() => {
        const id = params.id ? parseInt(params.id) : -1
        if (id !== -1) {
            let product = JSON.parse(localStorage.getItem('editProduct'))
            setProduct(product)
            setProdudctImage([{ uid: product.prodImgId, url: product.prodImgUrl }])
        }
        id === -1 && localStorage.removeItem('editProduct')
        setId(id)
    }, [])

    const setValue = field => {
        let value = id !== -1 ? product[field] : null
        return value
    }

    const handleSubmit = event => {
        event.preventDefault()
        props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) {
                return
            }

            let param

            if (id === -1) {
                param = { ...fieldsValue, prodImgId: produdctImage[0].uid }
            } else {
                const { prodImgUrl, ...rest } = product
                param = { ...rest, ...fieldsValue, prodImgId: produdctImage[0].uid }
            }

            const url = id === -1 ? API.PRODUCT.CREATE : API.PRODUCT.UPDATE

            axios
                .post(url, param)
                .then(res => {
                    res.code === SUCCESS && message.success('操作成功')
                    res.code !== SUCCESS && message.error(res.message)
                })
                .catch(err => {
                    message.error(err.message)
                })
        })
    }

    const handleRemove = file => {
        const removed = produdctImage.filter(item => item.uid !== file.uid)
        setProdudctImage(removed)
    }

    const handleHistoryBack = () => {
        history.replace('/product')
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

    const UploadButton = (
        <div>
            <Icon type={uploadLoading ? 'loading' : 'plus'} />
            <div className={'antd-upload-text'}>点击上传</div>
        </div>
    )

    const handleSuccess = (res, file, xhr) => {
        console.log(res)
        if (res.code === SUCCESS) {
            const { id, url } = res.data
            setProdudctImage([...produdctImage, { uid: id, url: url, name: produdctImage.length }])
        } else {
            message.error(res.message || '上传失败')
        }
    }

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
                                })(<Input placeholder='请输入产品金额' type={'number'} suffix={'元'} />)}
                            </FormItem>
                            <FormItem label={'时长'}>
                                {getFieldDecorator('timeService', {
                                    initialValue: setValue('timeService'),
                                    rules: [{ required: true, message: '请输入服务时长' }]
                                })(<Input placeholder='请输入服务时长' type={'number'} suffix={'分钟'} />)}
                            </FormItem>
                            <FormItem label={'图片'}>
                                <Upload
                                    fileList={produdctImage}
                                    onRemove={handleRemove}
                                    data={{ mtokenId: localStorage.getItem('mtokenId') }}
                                    action={`/yuanle${API.UPLOAD}`}
                                    listType={'picture-card'}
                                    onSuccess={(res, file, xhr) => handleSuccess(res, file, xhr)}>
                                    {produdctImage.length < 1 ? UploadButton : null}
                                </Upload>
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type={'primary'} style={{ marginRight: 16 }} onClick={handleHistoryBack}>
                                    返回
                                </Button>
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
