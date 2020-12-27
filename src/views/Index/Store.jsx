import React, { useEffect, useState } from 'react'
import { Layout, Form, Input, Button, Upload, Icon, message } from 'antd'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import '@/style/view-style/index.scss'
import axios from '../../api/index'
import { API } from '../../api/config'
import { SUCCESS } from '../../constants'
import request from 'axios'

const FormItem = Form.Item

const Store = props => {
    const [store, setStore] = useState(null)
    const [banner, setBanner] = useState([])
    const [uploadImage, setUploadImage] = useState(null)
    const [uploadLoading, setUploadLoading] = useState(false)

    const latitude = 30.622738
    const longitude = 104.121294

    useEffect(() => {
        axios
            .post(API.STORE.READ)
            .then(res => {
                if (res.code === SUCCESS) {
                    setStore(res.data)
                    let banner = res.data.imageUrlList.map((item, index) => ({
                        uid: item.id,
                        name: index,
                        url: item.url
                    }))
                    setBanner(banner)
                }
            })
            .catch(err => {})
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        props.form.validateFieldsAndScroll((err, fieldsValue) => {
            if (err) {
                return
            }

            if (banner.length === 0) {
                message.error('首页轮播图必须传入')
                return
            }

            if (banner.length < 3) {
                message.error('首页轮播图必须为3张')
                return
            }
            const { imageUrlList, ...rest } = store

            const images = { image1: banner[0].uid, image2: banner[1].uid, image3: banner[2].uid }

            const param = { ...rest, ...fieldsValue, ...images }

            axios
                .post(API.STORE.UPDATE, param)
                .then(res => {
                    console.log(res)
                    res.code === SUCCESS && message.success('操作成功')
                    res.code !== SUCCESS && message.error(res.message)
                })
                .catch(err => {
                    message.error(err.message)
                })
        })
    }

    const handleChangeImage = event => {
        setBanner(banner.filter(item => item.uid !== event.file.uid))
    }

    const handleBeforeUpload = file => {
        setUploadImage(file)
        return false
    }

    const handleUpload = () => {
        axios
            .post(
                API.UPLOAD,
                { file: uploadImage },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            .then(res => {
                res.code === SUCCESS && setUploadImage(null)
            })
    }

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
            <div className={'base-style'}>
                <Form {...formItemLayout} onSubmit={e => handleSubmit(e)}>
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
                    <FormItem label={'首页轮播图'}>
                        <Upload
                            fileList={banner}
                            beforeUpload={file => handleBeforeUpload(file)}
                            onChange={e => handleChangeImage(e)}>
                            {banner && banner.length >= 3 ? null : (
                                <Button>
                                    <Icon type={'upload'} />
                                </Button>
                            )}
                        </Upload>
                        <Button
                            type={'primary'}
                            onClick={handleUpload}
                            disabled={!uploadImage}
                            loading={uploadLoading}
                            style={{ marginTop: 16 }}>
                            上传图片
                        </Button>
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type={'primary'} htmlType={'submit'}>
                            提交
                        </Button>
                    </FormItem>
                </Form>
            </div>
        </Layout>
    )
}

const StoreScreen = Form.create({ name: 'store' })(Store)

export default StoreScreen
