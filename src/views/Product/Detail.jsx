import React, { useState, useEffect, memo } from 'react'
import axios from '../../api/index'
import { API } from '../../api/config'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Row, Col, Form, Input, Button, Upload, Icon } from 'antd'
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
            if (err) return
            const values = { ...fieldsValue }
            console.log(values)
        })
    }

    const handleRemove = file => {
        const removed = produdctImage.filter(item => item.uid !== file.uid)
        setProdudctImage(removed)
    }

    const handleUpload = options => {
        const file = new FormData()
        file.append('file', options.file)
        axios
            .post(
                API.UPLOAD,
                { file: file.getAll('file')[0] },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            .then(res => {
                const item = {
                    uid: res.data.id,
                    name: produdctImage.length,
                    url: res.data.url
                }
                res.code === SUCCESS && setProdudctImage(produdctImage.push(item))
            })
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

    const { getFieldDecorator, getFieldValue } = props.form

    const UploadButton = (
        <div>
            <Icon type={uploadLoading ? 'loading' : 'plus'} />
            <div className={'antd-upload-text'}>点击上传</div>
        </div>
    )

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
                                <Upload
                                    fileList={produdctImage}
                                    onRemove={handleRemove}
                                    listType={'picture-card'}
                                    customRequest={handleUpload}>
                                    {produdctImage.length < 1 ? UploadButton : null}
                                </Upload>
                                {/* <Upload name={'file'} beforeUpload={file => handleBeforeUpload(file)}>
                                    {product && product.prodImgUrl ? (
                                        <img src={product.prodImgUrl} style={{ width: 200 }} />
                                    ) : (
                                        UploadButton
                                    )}
                                </Upload>
                                <Button
                                    type={'primary'}
                                    onClick={handleUpload}
                                    disabled={!uploadImage}
                                    loading={uploadLoading}
                                    style={{ marginTop: 16 }}>
                                    上传图片
                                </Button> */}
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type={'primary'} style={{ marginRight: 16 }} onClick={handleHistoryBack}>
                                    取消
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
