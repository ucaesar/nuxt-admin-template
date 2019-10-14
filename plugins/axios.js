import $t from '@/utils/t'

export default function({ $axios, store }) {
    $axios.interceptors.request.use(
        config => {
            config.timeout = 120000
            return config
        },
        error => {
            return Promise.reject(error)
        }
    )

    $axios.interceptors.response.use(
        response => {
            // 这段代码很多场景下没用
            if (response.data && response.data.success === false) {
                // 根据实际情况的一些处理逻辑...
                return Promise.reject(response)
            }
            return response
        },
        error => {
            // 此处报错可能因素比较多
            // 1.需要授权处用户还未登录，因为路由段有验证是否登陆，此处理论上不会出现
            // 2.需要授权处用户登登录过期
            // 3.请求错误 4xx
            // 5.服务器错误 5xx
            // 关于鉴权失败，与后端约定状态码为401，由具体业务代码处理
            window.console.log(error)

            if (
                error.code === 'ECONNABORTED' &&
                error.message.includes('timeout')
            ) {
                window.console.log('timeout!')
                store.dispatch('message/showMessage', {
                    text: $t('axios.error.timeout'),
                    color: 'error'
                })
                return Promise.reject(error)
            }

            const code = parseInt(error.response && error.response.status)
            switch (code) {
                case 403: // access denied
                    store.dispatch('message/showMessage', {
                        text: $t('axios.error["403"]'),
                        color: 'error'
                    })
                    break
                case 404: // not found
                    store.dispatch('message/showMessage', {
                        text: $t('axios.error["404"]'),
                        color: 'error'
                    })
                    break
                case 500: // inner server error
                    store.dispatch('message/showMessage', {
                        text: $t('axios.error["500"]'),
                        color: 'error'
                    })
                    break
                default:
                    // 状态码辣么多，按需配置...
                    store.dispatch('message/showMessage', {
                        text: $t('axios.error.unknownError'),
                        color: 'error'
                    })
                    break
            }

            return Promise.reject(error)
        }
    )
}
