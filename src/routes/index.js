import loadable from '@/utils/loadable'

const Index = loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index'))

// 导航
// const DropdownView = loadable(() => import(/* webpackChunkName: 'dropdown' */ '@/views/NavView/Dropdown'))
// const MenuView = loadable(() => import(/* webpackChunkName: 'menu' */ '@/views/NavView/Menu'))
// const StepView = loadable(() => import(/* webpackChunkName: 'step' */ '@/views/NavView/Step'))

// 表单
// const FormBaseView = loadable(() => import(/* webpackChunkName: 'formBase' */ '@/views/FormView/FormBaseView'))
// const FormStepView = loadable(() => import(/* webpackChunkName: 'formStep' */ '@/views/FormView/FormStepView'))

// 展示
// const TableView = loadable(() => import(/* webpackChunkName: 'table' */ '@/views/ShowView/Table'))
// const CollapseView = loadable(() => import(/* webpackChunkName: 'collapse' */ '@/views/ShowView/Collapse'))
// const TreeView = loadable(() => import(/* webpackChunkName: 'tree' */ '@/views/ShowView/Tree'))
// const TabsView = loadable(() => import(/* webpackChunkName: 'tabs' */ '@/views/ShowView/Tabs'))

// 其它
// const ProgressView = loadable(() => import(/* webpackChunkName: 'progress' */ '@/views/Others/Progress'))
// const AnimationView = loadable(() => import(/* webpackChunkName: 'animation' */ '@/views/Others/Animation'))
// const EditorView = loadable(() => import(/* webpackChunkName: 'editor' */ '@/views/Others/Editor'))
// const UploadView = loadable(() => import(/* webpackChunkName: 'upload' */ '@/views/Others/Upload'))

// const Three = loadable(() => import(/* webpackChunkName: 'three' */ '@/views/TestView'))
// const About = loadable(() => import(/* webpackChunkName: 'about' */ '@/views/About'))

// 产品管理
const Product = loadable(() => import(/* webpackChunkName: 'list' */ '@/views/Product/Index'))

const routes = [
    { path: '/index', exact: true, name: '门店', component: Index },
    { path: '/product', exact: false, name: '产品', component: Product },
    { path: '/worksheet', exact: false, name: '工作表', component: null },
    { path: '/reservation', exact: false, name: '预约', component: null }
]

// { path: '/nav/dropdown', exact: false, name: '下拉菜单', component: DropdownView },
// { path: '/nav/menu', exact: false, name: '下拉菜单', component: MenuView },
// { path: '/nav/steps', exact: false, name: '步骤条', component: StepView },
// { path: '/form/base-form', exact: false, name: '表单', component: FormBaseView },
// { path: '/form/step-form', exact: false, name: '表单', component: FormStepView },
// { path: '/show/table', exact: false, name: '表格', component: TableView },
// { path: '/show/collapse', exact: false, name: '折叠面板', component: CollapseView },
// { path: '/show/tree', exact: false, name: '树形控件', component: TreeView },
// { path: '/show/tabs', exact: false, name: '标签页', component: TabsView },
// { path: '/others/progress', exact: false, name: '进度条', component: ProgressView, auth: [1] },
// { path: '/others/animation', exact: false, name: '动画', component: AnimationView, auth: [1] },
// { path: '/others/editor', exact: false, name: '富文本', component: EditorView, auth: [1] },
// { path: '/others/upload', exact: false, name: '上传', component: UploadView, auth: [1] },
// { path: '/one/two/three', exact: false, name: '三级', component: Three },
// { path: '/about', exact: false, name: '关于', component: About, auth: [1] }

export default routes
