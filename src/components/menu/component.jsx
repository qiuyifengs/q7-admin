import { throttle } from 'lodash'

export default {
	name: 'q7-menu',
	props: {
		options: {
			type: Array,
			required: true
		},
		mode: {
			type: String,
			required: false,
			default: 'vertical'
		},
		asideCollapse: {
			type: Boolean,
			required: false,
			default: false
		},
		asideTransition: {
			type: Boolean,
			required: false,
			default: true
		},
		layout: {
			type: String,
			required: true,
			default: 'side'
		}
	},
	render (h) {
		return <div>
			{ this.mode === 'vertical' ? this.createMenu(h) : this.createHorizontalScrollMenu(h) }
		</div>
	},
	data () {
		return {
			selectedKey: '',
			isScroll: false,
			isDetailPage: false,
			scrollWidth: 0,
			contentWidth: 0,
			currentTranslateX: 0,
			throttledCheckScroll: null,
		}
	},
	watch: {
		'$route.matched': {
			handler (val) {
				this.updateMenu(val)
			},
			immediate: true
		},
		$route(to) {
			this.isDetailPage = to.path.indexOf('detail') > -1 ? true : false
    },
	},
	created () {
		if (this.options.length > 0 && !this.options[0].fullPath) {
			this.formatOptions(this.options, '')
		}
	},
	methods: {
		createHorizontalScrollMenu (h) {
			return <div class={ { 'hy-theme-header-menu': true, 'is-scrollable': this.isScroll } } ref="page">
				<div
					ref="content"
					class="hy-theme-header-menu__content">
					<div
						class="hy-theme-header-menu__scroll"
						style={ { transform: `translateX(${this.currentTranslateX}px)` } }
						ref="scroll">
						{ this.createMenu(h) }
					</div>
				</div>
				{
					this.isScroll
					? [
							<div
								class="hy-theme-header-menu__prev"
								onClick={ () => this.scroll('left') }>
								<i class="el-icon-arrow-left"></i>
							</div>,
							<div
								class="hy-theme-header-menu__next"
								onClick={ () => this.scroll('right') }>
								<i class="el-icon-arrow-right"></i>
							</div>
						]
					: []
				}
			</div>
		},
		createMenu(h) {
			return <div class={ this.isDetailPage ? 'q7-menu q7-menu-detail' : 'q7-menu' }>
				<el-menu
					mode = { this.mode }
					collapse = { this.asideCollapse }
					uniqueOpened = { true }
					collapseTransition={ this.asideTransition }
					defaultActive = { this.selectedKey }
					backgroundColor = { this.layout === 'side' ? '#001529' : '' }
					textColor = { this.layout === 'side' ? '#fff' : '' }
					activeTextColor = { this.layout === 'side' ? '#409EFF' : '' }
					ref="menu"
					onSelect={ this.handleMenuSelect }>
					{ this.renderMenu(h, this.options) }
				</el-menu>
				{
					this.options.length === 0 && !this.asideCollapse
					? <div class="q7-menu-empty">
							<i class="el-icon-takeaway-box"></i>
							<span>??????????????????</span>
					</div>
					: null
				}
			</div>
		},
		scroll (direction) {
			if (direction === 'left') {
				// ????????????
				this.currentTranslateX = 0
			} else {
				// ????????????
				if (this.contentWidth * 2 - this.currentTranslateX <= this.scrollWidth) {
					this.currentTranslateX -= this.contentWidth
				} else {
					this.currentTranslateX = this.contentWidth - this.scrollWidth
				}
			}
		},
		checkScroll () {
			let contentWidth = this.$refs.content && this.$refs.content.clientWidth
			let scrollWidth = this.$refs.scroll && this.$refs.scroll.clientWidth
			if (this.isScroll) {
				// ????????????????????????????????????????????????width
				if (this.contentWidth - this.scrollWidth === this.currentTranslateX) {
					// currentTranslateX ??????????????????????????????????????????????????????
					this.currentTranslateX = contentWidth - scrollWidth
					// ??????????????????????????????????????????????????????contentWidth???????????????????????????????????????
					if (this.currentTranslateX > 0) {
						this.currentTranslateX = 0
					}
				}
				// ??????????????????
				this.contentWidth = contentWidth
				this.scrollWidth = scrollWidth
				// ????????????????????????
				if (contentWidth === scrollWidth) {
					this.isScroll = false
				}
			}
			// ????????????????????????: ???scroll < content
			if (!this.isScroll && contentWidth < scrollWidth) {
				this.isScroll = true
				// ????????????isScroll??????true?????????????????????????????????????????????
				this.$nextTick(() => {
					contentWidth = this.$refs.content.clientWidth
					scrollWidth = this.$refs.scroll.clientWidth
					this.contentWidth = contentWidth
					this.scrollWidth = scrollWidth
					this.currentTranslateX = 0
				})
			}
		},
		renderIcon (h, icon) {
			return h('q7-icon-svg', { attrs: { name: icon } })
		},
		renderMenuItem (h, menu) {
			return h(
				'el-menu-item', { props: { index: menu.path }, key: menu.path },
				[
					this.renderIcon(h, menu.meta.icon ? menu.meta.icon : 'icon-menu-child'),
					h('span', { slot: 'title' }, menu.meta.title)
				]
			)
		},
		renderItem (h, menu) {
			const meta = menu.meta
			if (!meta || !meta.invisible) {
				let renderChildren = false
				const children = menu.children
				if (children !== undefined) {
					for (let i = 0; i < children.length; i++) {
						const childMeta = children[i].meta
						if (!childMeta || !childMeta.invisible) {
							renderChildren = true
							break
						}
					}
				}
				return (menu.children && renderChildren) ? this.renderSubMenu(h, menu) : this.renderMenuItem(h, menu)
			}
		},
		renderSubMenu (h, menu) {
			const _self = this
			let subItem = [h('div', { slot: 'title', class: 'hy-subment-title' },
				[
					this.renderIcon(h, menu.meta ? menu.meta.icon : 'icon-menu-child'),
					h('span', { slot: 'title' }, menu.meta.title)
				]
			)]
			let itemArr = []
			menu.children.forEach(item => {
				itemArr.push(_self.renderItem(h, item))
			})
			return h('el-submenu', { props: { index: menu.path }, key: menu.path },
				subItem.concat(itemArr)
			)
		},
		renderMenu: function (h, menuTree) {
			const _self = this
			let menuArr = []
			menuTree.forEach(function (menu, i) {
				menuArr.push(_self.renderItem(h, menu, '0', i))
			})
			return menuArr
		},
		formatOptions (options, parentPath) {
			options.forEach(route => {
				let isFullPath = route.path.substring(0, 1) === '/'
				route.fullPath = isFullPath ? route.path : parentPath + '/' + route.path
				if (route.children) {
					this.formatOptions(route.children, route.fullPath)
				}
			})
		},
		updateMenu (route) {
			const menuRoutes = (route.filter(item => item.path !== '')).map(item => item.path)
			if (this.mode === 'horizontal') {
				this.selectedKey = menuRoutes[0]
			} else {
				this.selectedKey = menuRoutes[menuRoutes.length - 1]
			}
		},
		getSelectedKey (route) {
			return route.matched.map(item => item.path)
		},
		handleMenuSelect (index) {
			if (/^admin-menu-empty-\d+$/.test(index) || index === undefined) {
				this.$message.warning('????????????')
			} else if (/^https:\/\/|http:\/\//.test(index)) {
				console.log(index)
			} else {
				this.$router.push({
					path: index
				})
			}
		}
	},
	mounted () {
			if (this.layout === 'mix') {
					// ???????????????
					// ????????????????????????????????????????????????????????????????????????????????????
					this.checkScroll()
					// ??????????????????????????????????????????????????????????????????????????????isScroll?????????
					this.throttledCheckScroll = throttle(this.checkScroll, 300)
					window.addEventListener('resize', this.throttledCheckScroll)
			}
	},
	beforeDestroy () {
			if (this.layout === 'mix') {
					window.removeEventListener('resize', this.throttledCheckScroll)
			}
	}
}
