import loadable from '@/utils/loadable'

// 门店管理
const Index = loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index/Store'))
// 产品管理
const Product = loadable(() => import(/* webpackChunkName: 'product' */ '@/views/Product/Index'))
const Detail = loadable(() => import(/* webpackChunkName: 'productForm' */ '@/views/Product/Detail'))
// 工作表管理
const WorkSheet = loadable(() => import(/* webpackChunkName: 'worksheet' */ '@/views/WorkSheet/Index'))
// 工作表管理
const WorkSheetForm = loadable(() => import(/* webpackChunkName: 'worksheetForm' */ '@/views/WorkSheet/Detail'))
// 预约管理
const Reservation = loadable(() => import(/* webpackChunkName: 'reservation' */ '@/views/Reservation/Index'))
// 用户管理
const User = loadable(() => import(/* webpackChunkName: 'user' */ '@/views/User/User'))
// 用户编辑
const UserEdit = loadable(() => import(/* webpackChunkName: 'userEdit' */ '@/views/User/UserEdit'))

const routes = [
    { path: '/index', exact: true, name: '门店', component: Index },
    { path: '/product', exact: true, name: '产品', component: Product },
    { path: '/product/:id', exact: true, name: '产品', component: Detail },
    { path: '/worksheet', exact: true, name: '工作表', component: WorkSheet },
    { path: '/worksheet/:id', exact: true, name: '工作表详情', component: WorkSheetForm },
    { path: '/reservation', exact: true, name: '预约', component: Reservation },
    { path: '/user', exact: true, name: '用户管理', component: User },
    { path: '/user/:id', exact: true, name: '用户详情', component: UserEdit }
]

export default routes
