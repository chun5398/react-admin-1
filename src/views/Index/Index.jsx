import React from 'react'
import { Layout, Row } from 'antd'
import '@/style/view-style/index.scss'

const Index = () => {
    return (
        <Layout className='index animated fadeIn'>
            <Row gutter={24} className='index-header'></Row>
        </Layout>
    )
}

export default Index
