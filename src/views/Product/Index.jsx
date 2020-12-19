import React, { useEffect, useState } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout, Divider, Table, Button } from 'antd'

import axios from '../../api/index'
import { API } from '../../api/config'
import { SUCCESS } from '../../constants'

const { Column } = Table

const Product = () => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)

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

    return (
        <Layout className={'button animated fadeIn'}>
            <div>
                <CustomBreadcrumb arr={['产品管理']}></CustomBreadcrumb>
            </div>
            <div className={'base-style'}>
                <Button type={'primary'}>新增产品</Button>
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
                            setCurrentPage(page)
                        }
                    }}
                    expandedRowRender={record => <p>{record.prodDesc}</p>}>
                    <Column title={'ID'} dataIndex={'id'} />
                    <Column title={'名称'} dataIndex={'prodName'} />
                    <Column
                        title={'图片'}
                        dataIndex={'prodImgUrl'}
                        render={(text, record) => (
                            <img src={record.prodImgUrl} style={{ width: '100px', height: '50px' }} />
                        )}
                    />
                    <Column title={'价格'} dataIndex={'prodPrice'} />
                    <Column title={'时长'} dataIndex={'timeService'} render={record => <span>{record} 分钟</span>} />
                    <Column title={'操作'} dataIndex={''} render={() => <a>删除</a>} />
                </Table>
            </div>
        </Layout>
    )
}

export default Product
