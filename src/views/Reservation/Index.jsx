import React, { useEffect, useState, Fragment } from 'react'
import { Layout, Button, Table, Popconfirm, Divider, message } from 'antd'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import '@/style/view-style/index.scss'
import axios from '../../api/index'
import { API } from '../../api/config'
import { SUCCESS } from '../../constants'
import { useHistory } from 'react-router-dom'

const { Column } = Table

const Reservation = () => {
    const history = useHistory()

    const [total, setTotal] = useState(0)
    const [reservations, setReservations] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const param = {
            beginPage: currentPage,
            pageSize: 10
        }
        axios
            .post(API.RESERVATION.READ, param)
            .then(res => {
                setLoading(false)
                res.code === SUCCESS && setReservations(res.data.res)
            })
            .catch(err => {
                setLoading(false)
            })
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
                setLoading(false)
            })
    }

    const handleRefund = record => {
        setLoading(true)
        axios
            .post(API.REFUND.UPDATE, { outTradeNo: record.outTradeNo })
            .then(res => {
                setLoading(false)
                res.code === SUCCESS && message.success('操作成功')
                res.code !== SUCCESS && message.error('操作失败')
            })
            .catch(err => {
                setLoading(false)
            })
    }

    return (
        <Layout className='index animated fadeIn'>
            <div>
                <CustomBreadcrumb arr={['预约管理']}></CustomBreadcrumb>
            </div>
            <div className={'base-style'}>
                <Table loading={loading} dataSource={reservations} rowKey={record => record.id}>
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
                                    <Popconfirm
                                        title={`确定退款 ${record.prodName} ?`}
                                        onConfirm={handleRefund(record)}>
                                        <a>删除</a>
                                    </Popconfirm>
                                ) : null}
                                {record.status === 1 ? (
                                    <Popconfirm
                                        title={`确定完成 ${record.prodName}`}
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
