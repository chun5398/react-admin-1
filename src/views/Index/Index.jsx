import React from 'react'
import { Layout, Row, Col, Icon, Divider } from 'antd'
import screenfull from 'screenfull'
import '@/style/view-style/index.scss'

const Index = () => {
    const fullToggle = () => {
        if (screenfull.isEnabled) {
            screenfull.request(document.getElementById('bar'))
        }
    }
    return (
        <Layout className='index animated fadeIn'>
            <Row gutter={24} className='index-header'></Row>
        </Layout>
    )
}

export default Index
