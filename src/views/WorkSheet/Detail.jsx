import React, { useState, useEffect } from 'react'
import axios from '../../api/index'
import { API } from '../../api/config'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Row, Col, Form, Input, Button, DatePicker, TimePicker } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import moment from 'moment'

const FormItem = Form.Item

const Detail = props => {
    const params = useParams()
    const history = useHistory()

    const [id, setId] = useState(-1)
    const [startTime, setStartTime] = useState('00:00')
    const [endTime, setEndTime] = useState('00:00')
    const [maxOrder, setMaxOrder] = useState(0)

    useEffect(() => {
        const id = params.id ? parseInt(params.id) : -1
        setId(id)
        if (id !== -1) {
            let workSheet = JSON.parse(localStorage.getItem('editWorkSheet'))
            const { startTime, endTime, maxOrder } = workSheet
            setStartTime(startTime)
            setEndTime(endTime)
            setMaxOrder(maxOrder)
        } else {
            localStorage.removeItem('editWorkSheet')
        }
    }, [])

    const handleHistoryBack = () => {
        history.replace('/product')
    }

    const handleSubmit = event => {
        event.preventDefault()
    }

    const { getFieldDecorator, getFieldValue } = props.form

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
    return (
        <Layout>
            <div>
                <CustomBreadcrumb arr={['工作表', '工作表详情']}></CustomBreadcrumb>
            </div>
            <Row>
                <Col>
                    <div className={'base-style'}>
                        <Form {...formItemLayout} onSubmit={handleSubmit}>
                            <FormItem label={'工作表ID'}>
                                <Input placeholder='工作表ID' disabled={true} type={'number'} value={id} />
                            </FormItem>
                            <FormItem label={'起始时间'}>
                                <TimePicker
                                    placeholder='请输入起始时间'
                                    format={'HH:mm'}
                                    value={moment(startTime, 'HH:mm')}
                                />
                            </FormItem>
                            <FormItem label={'结束时间'}>
                                <TimePicker
                                    placeholder='请输入起始时间'
                                    format={'HH:mm'}
                                    value={moment(endTime, 'HH:mm')}
                                />
                            </FormItem>
                            <FormItem label={'最大预约数'}>
                                <Input placeholder='请输入最大预约数' type={'number'} value={maxOrder} />
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type={'primary'} style={{ marginRight: 16 }} onClick={handleHistoryBack}>
                                    取消
                                </Button>
                                <Button type={'primary'} htmlType={'submit'}>
                                    {id === -1 ? '新增' : '提交修改'}
                                </Button>
                            </FormItem>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Layout>
    )
}

const DetailScreen = Form.create({ name: 'worksheet_detail' })(Detail)

export default DetailScreen
