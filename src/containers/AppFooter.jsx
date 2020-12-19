import React from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

export default () => <Footer className='footer'>元乐拉伸后台管理系统 &copy;2020 - {new Date().getFullYear()}</Footer>
