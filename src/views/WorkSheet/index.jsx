import React, { useEffect, useState } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Table, Button, message } from 'antd'
import axios from '../../api/index'
import { API } from '../../api/config'
import { SUCCESS } from '../../constants'
import { useHistory } from 'react-router-dom'

const { Column } = Table

const WorkSheet = () => {
    const history = useHistory()

    const [total, setTotal] = useState(1)
    const [workSheets, setWorkSheets] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        localStorage.removeItem('editProduct')
    })

    useEffect(() => {
        axios
            .post(API.WORKSHEET.READ, { beginPage: currentPage, pageSize: 10 })
            .then(res => {
                if (res.code === SUCCESS) {
                    setWorkSheets(res.data)
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
    }, [currentPage])

    const handleRefresh = () => {
        setLoading(true)
        axios
            .post(API.WORKSHEET.READ, { beginPage: currentPage, pageSize: 10 })
            .then(res => {
                if (res.code === SUCCESS) {
                    setWorkSheets(res.data)
                    // setTotal(res.data.total * 10)
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

    const handleAdd = () => {
        history.push(`/worksheet/-1`)
    }

    const handleEdit = record => {
        history.push(`/worksheet/${record.id}`)
        localStorage.setItem('editWorkSheet', JSON.stringify(record))
    }

    return (
        <Layout>
            <div>
                <CustomBreadcrumb arr={['工作表管理']}></CustomBreadcrumb>
            </div>
            <div className={'base-style'}>
                <Button type={'primary'} className={'mr15'} onClick={handleAdd}>
                    新增
                </Button>
                <Button type={'primary'} icon={'reload'} onClick={handleRefresh}>
                    刷新
                </Button>
                <Divider />
                <Table
                    loading={loading}
                    dataSource={workSheets}
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
                    <Column dataIndex={'id'} title={'ID'} />
                    <Column dataIndex={'startTime'} title={'开始时间'} />
                    <Column dataIndex={'endTime'} title={'结束时间'} />
                    <Column dataIndex={'maxOrder'} title={'最大预约数'} />
                    <Column
                        title={'操作'}
                        dataIndex={''}
                        render={record => <a onClick={() => handleEdit(record)}>编辑</a>}
                    />
                </Table>
            </div>
        </Layout>
    )
}

export default WorkSheet
