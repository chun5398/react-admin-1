import React, { useEffect, useState, Fragment } from 'react'
import { Layout, Table, Popconfirm, message, Button, Divider, Input, DatePicker } from 'antd'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import '@/style/view-style/index.scss'
import axios from '../../api/index'
import { API } from '../../api/config'
import { SUCCESS } from '../../constants'
import moment from 'moment'

const { Column } = Table

const Reservation = () => {
    const [total, setTotal] = useState(0)
    const [reservations, setReservations] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const [phone, setPhone] = useState('')
    const [bookDate, setBookDate] = useState(null)

    useEffect(() => {
        handleFilterQuery()
    }, [currentPage])

    const handleTurnOff = record => {
        setLoading(true)
        axios
            .post(API.RESERVATION.UPDATE, { bookId: record.id })
            .then(res => {
                setLoading(false)
                res.code === SUCCESS && message.success('操作成功')
                res.code !== SUCCESS && message.error('操作失败')
            })
            .catch(err => {
                message.error(err.message || '未知错误')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const handleRefund = record => {
        setLoading(true)
        axios
            .post(API.REFUND.AGREE, { outTradeNo: record.outTradeNo })
            .then(res => {
                res.code === SUCCESS && message.success('操作成功')
                res.code !== SUCCESS && message.error('操作失败')
            })
            .catch(err => {
                message.error(err.message || '未知错误')
            })
            .finally(() => {
                setLoading(false)
                handleFilterQuery()
            })
    }

    const handleRejectRefund = record => {
        setLoading(true)
        axios
            .post(API.REFUND.REJECT, { outTradeNo: record.outTradeNo })
            .then(res => {
                res.code === SUCCESS && message.success('操作成功')
                res.code !== SUCCESS && message.error('操作失败')
            })
            .catch(err => {
                message.error(err.message || '未知错误')
            })
            .finally(() => {
                setLoading(false)
                handleFilterQuery()
            })
    }

    const handleRefresh = () => {
        handleFilterQuery()
    }

    const handleSetPhone = e => {
        setPhone(e.target.value)
    }

    const handleSetDate = (date, dateString) => {
        setBookDate(moment(dateString, 'YYYY-MM-DD'))
    }

    const handleResetCondition = () => {
        setPhone('')
        setBookDate(null)
    }

    const handleFilterQuery = () => {
        setLoading(true)
        const param = {
            beginPage: currentPage,
            pageSize: 10,
            phone,
            bookDate: bookDate ? bookDate._i : null
        }
        axios
            .post(API.RESERVATION.READ, param)
            .then(res => {
                if (res.code === SUCCESS) {
                    setLoading(false)
                    setTotal(res.data.total * 10)
                    setReservations(res.data.res)
                } else {
                    message.error(res.message)
                }
            })
            .catch(err => {
                message.error(err.message)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Layout className='index animated fadeIn'>
            <div>
                <CustomBreadcrumb arr={['预约管理']}></CustomBreadcrumb>
            </div>
            <div className={'base-style'}>
                <div>
                    <DatePicker
                        onChange={(date, dateString) => handleSetDate(date, dateString)}
                        style={{ marginRight: '15px' }}
                        value={bookDate}
                    />
                    <Input
                        placeholder={'用户联系电话'}
                        style={{ marginRight: '15px', width: '170px' }}
                        value={phone}
                        onChange={e => handleSetPhone(e)}
                    />
                    <Button
                        type={'primary'}
                        icon={'search'}
                        onClick={handleFilterQuery}
                        style={{ marginRight: '15px' }}>
                        查询
                    </Button>
                    <Button
                        type={'primary'}
                        icon={'close'}
                        onClick={handleResetCondition}
                        style={{ marginRight: '15px' }}>
                        重置查询条件
                    </Button>
                    <Button type={'primary'} icon={'reload'} onClick={handleRefresh}>
                        刷新
                    </Button>
                    <Divider />
                </div>
                <Table
                    loading={loading}
                    dataSource={reservations}
                    rowKey={record => record.id}
                    pagination={{
                        pageSize: 10,
                        total: total,
                        current: currentPage,
                        onChange: (page, pageSize) => {
                            setLoading(true)
                            setCurrentPage(page)
                        }
                    }}>
                    <Column title={'昵称'} dataIndex={'userName'} />
                    <Column title={'预约服务'} dataIndex={'prodName'} />
                    <Column title={'预约日期'} dataIndex={'bookDate'} />
                    <Column title={'开始时间'} dataIndex={'startTime'} />
                    <Column title={'结束时间'} dataIndex={'endTime'} />
                    <Column title={'状态'} dataIndex={'statusName'} />
                    <Column title={'联系电话'} dataIndex={'phone'} />
                    <Column
                        title={'操作'}
                        dataIndex={''}
                        render={record => (
                            <Fragment>
                                {record.status === 6 ? (
                                    <Fragment>
                                        <Popconfirm
                                            title={`确定 ${record.userName}(${record.phone})的退款申请 ?`}
                                            cancelText={'取消'}
                                            okText={'确定'}
                                            onConfirm={() => handleRefund(record)}>
                                            <a>同意</a>
                                        </Popconfirm>
                                        <Divider type={'vertical'} />
                                        <Popconfirm
                                            title={`拒绝 ${record.userName}(${record.phone})的退款申请 ?`}
                                            cancelText={'取消'}
                                            okText={'确定'}
                                            onConfirm={() => handleRejectRefund(record)}>
                                            <a>拒绝</a>
                                        </Popconfirm>
                                    </Fragment>
                                ) : null}
                                {record.status === 1 ? (
                                    <Popconfirm
                                        title={`确定完成 ${record.prodName}`}
                                        cancelText={'取消'}
                                        okText={'确定'}
                                        onConfirm={() => handleTurnOff(record)}>
                                        <a>完成服务</a>
                                    </Popconfirm>
                                ) : null}
                            </Fragment>
                        )}
                    />
                </Table>
            </div>
        </Layout>
    )
}

export default Reservation
