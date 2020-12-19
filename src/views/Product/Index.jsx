import React, { useEffect, useState } from 'react'
import CustomBreadcrumb from '@/components/CustomBreadcrumb'
import { Layout } from 'antd'

import axios from '../../api/index'
import { API } from '../../api/config'

const Product = () => {
    const [products, setProducts] = useState([])
    const [pageNum, setPageNum] = useState(1)

    useEffect(() => {
        axios
            .post(API.PRODUCT.READ, { beginPage: pageNum, pageSize: 10 })
            .then(res => {})
            .catch(err => {})
    }, [])

    useEffect(() => {}, [pageNum])

    return (
        <Layout className={'button animated fadeIn'}>
            <div>
                <CustomBreadcrumb arr={['产品管理']}></CustomBreadcrumb>
            </div>
            <div className={'base-style'}>
                <h3>产品管理</h3>
            </div>
        </Layout>
    )
}

export default Product
