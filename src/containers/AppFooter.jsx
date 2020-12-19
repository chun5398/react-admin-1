import React from 'react'
import { Layout } from 'antd'

const { Footer } = Layout

export default () => <Footer className='footer'>元乐拉伸 &copy; 2020 - {new Date().getFullYear()}</Footer>
