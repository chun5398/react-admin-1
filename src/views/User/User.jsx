import React, { useEffect, useState, Fragment, memo } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Table, Button, message } from 'antd'

import axios from '../../api/index'
import { API } from '../../api/config'
import { SUCCESS } from '../../constants'
import { useHistory } from 'react-router-dom'

const { Column } = Table

const Product = props => {
    const history = useHistory()

    const [total, setTotal] = useState(0)
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        localStorage.removeItem('editProduct')
    })

    useEffect(() => {
        axios
            .post(API.USER.READ, { beginPage: currentPage, pageSize: 10 })
            .then(res => {
                setLoading(false)
                if (res.code === SUCCESS) {
                    setUsers(res.data.res)
                    setTotal(res.data.total * 10)
                }
            })
            .catch(err => {})
    }, [currentPage])

    const handleRefresh = () => {
        setLoading(true)
        axios
            .post(API.USER.READ, { beginPage: currentPage, pageSize: 10 })
            .then(res => {
                if (res.code === SUCCESS) {
                    setUsers(res.data.res)
                    setTotal(res.data.total * 10)
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

    const handleEdit = record => {
        history.push(`/user/${record.id}`)
        localStorage.setItem('editUser', JSON.stringify(record))
    }

    return (
        <Layout className={'button animated fadeIn'}>
            <div>
                <CustomBreadcrumb arr={['用户管理']}></CustomBreadcrumb>
            </div>
            <div className={'base-style'}>
                <Button type={'primary'} icon={'reload'} onClick={handleRefresh}>
                    刷新
                </Button>
                <Divider />
                <Table
                    loading={loading}
                    dataSource={users}
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
                    <Column title={'昵称'} dataIndex={'nickName'} width={'280px'} />
                    <Column
                        title={'头像'}
                        dataIndex={'headImg'}
                        render={(text, record) => (
                            <img src={record.headImg} style={{ width: '100px', height: '50px' }} alt={'产品图片'} />
                        )}
                    />
                    <Column title={'备注'} dataIndex={'remark'} />
                    <Column title={'余额'} dataIndex={'amount'} render={record => <span>{record} 元</span>} />
                    <Column
                        title={'操作'}
                        dataIndex={''}
                        render={record => (
                            <Fragment>
                                <a onClick={() => handleEdit(record)}>编辑</a>
                            </Fragment>
                        )}
                    />
                </Table>
            </div>
        </Layout>
    )
}

const ProductScreen = memo(Product)

export default ProductScreen
