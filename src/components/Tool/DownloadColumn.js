export default {
    name: 'DownloadColumn',
    props: {
        download: String
    },
    render () {
        const { download, handleDownloadClient } = this
        return (
            download ? <q7-button plain icon="el-icon-download" on-click={ () => handleDownloadClient(download) } /> : null
        )
    },
    methods: {
        // 点击下载客户端
        handleDownloadClient(download) {
            console.log(download)
            window.open(`${process.env.VUE_APP_BASE_STATIC_URL}${download}`)
        }
    }
}