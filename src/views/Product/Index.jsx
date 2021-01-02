import React, { useEffect, useState, Fragment, memo } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Table, Button, Popconfirm, message } from 'antd'

import axios from '../../api/index'
import { API } from '../../api/config'
import { SUCCESS } from '../../constants'
import { useHistory } from 'react-router-dom'

const { Column } = Table

const Product = props => {
    const history = useHistory()

    const [total, setTotal] = useState(0)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        localStorage.removeItem('editProduct')
    })

    useEffect(() => {
        axios
            .post(API.PRODUCT.READ, { beginPage: currentPage, pageSize: 10 })
            .then(res => {
                setLoading(false)
                if (res.code === SUCCESS) {
                    setProducts(res.data.res)
                    setTotal(res.data.total * 10)
                }
            })
            .catch(err => {})
    }, [currentPage])

    const handleDelete = id => {
        setLoading(true)
        axios
            .post(API.PRODUCT.DELETE, { id })
            .then(res => {
                res.code === SUCCESS && setLoading(false) && message.success('删除成功')
            })
            .catch(err => {
                message.error(err.message)
            })
    }

    const handleRefresh = () => {
        setLoading(true)
        axios
            .post(API.PRODUCT.READ, { beginPage: currentPage, pageSize: 10 })
            .then(res => {
                if (res.code === SUCCESS) {
                    setProducts(res.data.res)
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
        history.push(`/product/${record.id}`)
        localStorage.setItem('editProduct', JSON.stringify(record))
    }

    const handleAdd = () => {
        history.push(`/product/-1`)
    }

    return (
        <Layout className={'button animated fadeIn'}>
            <div>
                <CustomBreadcrumb arr={['产品管理']}></CustomBreadcrumb>
            </div>
            <div className={'base-style'}>
                <Button type={'primary'} className={'mr15'} onClick={handleAdd}>
                    新增产品
                </Button>
                <Button type={'primary'} icon={'reload'} onClick={handleRefresh}>
                    刷新
                </Button>
                <Divider />
                <Table
                    loading={loading}
                    dataSource={products}
                    rowKey={record => record.id}
                    pagination={{
                        pageSize: 10,
                        total: total,
                        current: currentPage,
                        onChange: (page, pageSize) => {
                            setLoading(true)
                            setCurrentPage(page)
                        }
                    }}
                    expandedRowRender={record => <p>{record.prodDesc}</p>}>
                    <Column title={'ID'} dataIndex={'id'} />
                    <Column title={'名称'} dataIndex={'prodName'} width={'280px'} />
                    <Column
                        title={'图片'}
                        dataIndex={'prodImgUrl'}
                        render={(text, record) => (
                            <img src={record.prodImgUrl} style={{ width: '100px', height: '50px' }} alt={'产品图片'} />
                        )}
                    />
                    <Column title={'价格'} dataIndex={'prodPrice'} />
                    <Column title={'时长'} dataIndex={'timeService'} render={record => <span>{record} 分钟</span>} />
                    <Column
                        title={'操作'}
                        dataIndex={''}
                        render={record => (
                            <Fragment>
                                <Popconfirm
                                    cancelText={'取消'}
                                    okText={'确定'}
                                    title={`确定删除 ${record.prodName} ?`}
                                    onConfirm={() => handleDelete(record)}>
                                    <a>删除</a>
                                </Popconfirm>
                                <Divider type={'vertical'} />
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
