export default {
    name: 'ContentColumn',
    props: {
        row: Object
    },
    methods: {
        formatStaticUrl(val) {
            return /^https:\/\/|http:\/\//.test(val) ? val : `${process.env.VUE_APP_BASE_STATIC_URL}${val}`
        }
    },
    render() {
        const { formatStaticUrl } = this
        const row = this.row.witkey ? this.row.witkey : this.row
        const { imgAddr, serve, attribute, name, content } = row
        return (
            <div>
                <div class="flex items-center">
                    { imgAddr ? <el-image class="flex-shrink-0 rounded mr-2 w-8 h-8" 
                        fit="cover"
                        preview-src-list={formatStaticUrl(imgAddr[0])}
                        src={formatStaticUrl(imgAddr[0])}>
                        <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                        </div>
                        </el-image> : ''
                    } 
                    <div>
                        <div class="text-left truncate">标题:
                            <span class="font-bold ml-2"><Ellipsis class="truncate" length={30}>{name}</Ellipsis></span>
                        </div>
                        <Ellipsis class="truncate" length={30}>详情介绍: {content}</Ellipsis>
                    </div>
                </div>
                <div class="flex justify-between je-mt5">
                    <div class="primary">
                        服务数: <span class="font-bold">{serve.length || '--'}</span>
                    </div>
                    <div class="success">
                        配套数: <span class="font-bold">{attribute.length || '--'}</span>
                    </div>
                </div>
            </div>
        )
    }
}