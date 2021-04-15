<template>
    <li class="hy-list-item">
        <div class="hy-list-item-meta">
            <div class="hy-list-item-meta-avatar">
                <slot name="avatar"></slot>
            </div>
            <div class="hy-list-item-meta-content">
                <h4 class="hy-list-item-meta-title">
                    <slot name="title"></slot>
                </h4>
                <div class="hy-list-item-meta-description">
                    <slot name="desc"></slot>
                </div>
                <div class="text-base text-black">
                    <slot name="detail"></slot>
                </div>
            </div>
        </div>
    </li>
</template>

<script>
export default {
    name: 'CurrencyListItem'
}
</script>
<style lang="less">
.hy-list {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0,0,0,.65);
    font-size: 14px;
    line-height: 1.5;
    list-style: none;
    position: relative;

    * {
        outline: none;
    }

    &-items {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 0;

        &-content {
            color: #999;
        }

        &-meta {
            display: flex;
            flex: 1;
            align-items: flex-start;
            font-size: 0;

            &-avatar {
                margin-right: 16px;
            }
            
            &-content {
                flex: 1 0;
            }

            &-title {
                margin-bottom: 4px;
                color: rgba(0,0,0,.65);
                font-size: 16px;
                line-height: 22px;
                font-weight: 500;
                > a {
                    color: rgba(0,0,0,.65);
                    transition: all 0.3s;
                    &:hover {
                        color: #1890ff;
                    }
                }
            }
            &-description {
                color: rgba(0,0,0,.45);
                font-size: 14px;
                line-height: 22px;
            }
        }
    }

    &-split &-item {
        border-bottom: 1px solid #e8e8e8;
        &:last-child {
            border-bottom: none;
        }
    }
}

</style>