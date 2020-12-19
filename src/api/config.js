// 考虑到网站可能有好几个域名，所以单独提出来

export const API = {
    /**
     * 登录
     */
    LOGIN: '/sysUser/loginBackstage',
    /**
     * 产品
     */
    PRODUCT: {
        /**
         * 新增产品
         */
        CREATE: '/product/sys/add',
        /**
         * 获取产品
         */
        READ: '/product/sys/getList',
        /**
         * 更新产品
         */
        UPDATE: '/product/sys/update',
        /**
         * 删除产品
         */
        DELETE: '/product/sys/delete'
    },
    /**
     * 工作表
     */
    WORKSHEET: {
        /**
         * 新增工作表
         */
        CREATE: '/worksheet/insertWorksheet',
        /**
         * 查询工作表
         */
        READ: '/worksheet/queryWorksheet',
        /**
         * 修改工作表
         */
        UPDATE: '/worksheet/updateWorksheet'
    },
    /**
     * 门店信息
     */
    STORE: {},
    /**
     * 预约管理
     */
    RESERVATION: {}
}

export const URLAPI = ''
