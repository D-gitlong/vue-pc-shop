<template>
	<nav class="menu">
		<div class="w1210">
			<div class="classify">
				<label>全部分类</label>
				<ul class="sub_menu">
					<li v-for="item in cateList" :key="item.id" @mouseover="getPositionTop($event)">
						<h3><a @click="toProduct(item)" target="_blank">{{item.name}}</a></h3>
						<p>
							<a v-for="subItem in item.categories" :key="subItem.id" @click="toProduct(subItem)" target="_blank">{{subItem.name}}</a>
						</p>
						<div class="sub_cate" ref="subCate">
							<dl class="fl" :key="subItem.id" v-for="subItem in item.categories">
								<dt><a @click="toProduct(subItem)" target="_blank">{{subItem.name}}</a></dt>
								<dd v-if="subItem.categories.length == 0">
									<a href="javascript:;"></a>
								</dd>
								<dd v-for="sItemsub in subItem.categories" v-else :key="sItemsub.id">
									<a @click="toProduct(sItemsub)" target="_blank">{{sItemsub.name}}</a>
								</dd>
							</dl>
						</div>
					</li>
				</ul>
			</div>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				<el-menu-item index="0"><a href="/" target="_blank">首页</a></el-menu-item>
			  <el-menu-item index="{item.id}" :key="item.id" v-for="item in menus">
			  	<a :href="'#/'+item.url" v-if="item.opennew == 0">{{item.name}}</a>
			  	<a :href="'#/'+item.url" v-if="item.opennew == 1" target="_blank">{{item.name}}</a>
			  </el-menu-item>
			</el-menu>
		</div>
	</nav>
</template>
<script>
export default {
	data() {
		return {
			activeIndex: '0',
			menus: [],
			cateList: []
		}
	},
	created() {
		this.getMenus()
		this.getCateList()
	},
	methods: {
		getPositionTop(e) {
			for(let i in this.$refs.subCate){
				let stop = document.body.scrollTop || document.documentElement.scrollTop
				this.$refs.subCate[i].style.top = e.currentTarget.getBoundingClientRect().top-197 + document.documentElement.scrollTop + 'px'
			}
		},
		getMenus() {
			this.$API.Menus().then((response)=>{
				if (response.data.error_code == 0) {
					this.menus = response.data.list
				}
			})
		},
		getCateList() {
			this.$API.Cate({
				page: 1,
				per_page: 1000
			}).then((response)=>{
				if (response.data.error_code == 0) {
					this.cateList = response.data.categories.slice(0,8)
				}
			})
		},
		toProduct(m) {
			let routeData = this.$router.resolve({ 
        path: '/product', 
        query: { 
          sortKey: 0,
          sortValue: 0,
          keyword: null,
          category: m.id,
          title:    m.name,
          navTitle: m.name,
          navStyle: 'default'
        } 
      })
      window.open(routeData.href, '_blank')
		},
		handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
	}
}
</script>
<style scoped lang="scss">
.menu{
	width: 100%; height: 40px; background: #24991E;
	.el-menu{
		background: #24991E; margin-left: 222px;
	}
	.el-menu--horizontal>.el-submenu, .el-menu--horizontal>.el-menu-item{
		height: 40px; line-height: 40px; font-size: 16px;
	}
  .classify{
  	position: relative; float: left; width: 222px; height: 40px;
  	&:hover .sub_menu{
			display: block;
  	}
  	label{
  		background: url(../assets/images/bg/nav_c1.png) center no-repeat; width: 222px; height: 45px; line-height: 45px; position: absolute; left: 0; top: -5px; text-align: center; font-size: 15px; color: #fff; cursor: pointer;
  	}
  	.sub_menu{
  		display: none; position: absolute; left: 0; top: 40px; width: 220px; height: 520px; background: #1d9438; z-index: 100;
  		&>li{
  			height: 65px; overflow: hidden; padding: 0 15px; cursor: pointer;
	  		a{
	  			color: #fff; margin-right: 5px;
	  		}
  			h3{
  				font-size: 15px; line-height: 36px; font-weight: bold;
  				a{
  					display: block;
  				}
  			}
  			p{
  				font-size: 12px; height: 20px; line-height: 20px; overflow: hidden;
  			}
  			&:hover{
					background: #fff!important;
					h3 a, p a{
						color: #1A8231!important;
					}
					.sub_cate{
						display: block;
					}
				}
				&:nth-child(2n){
					background: #1b8231;
				}
				.sub_cate{
					display: none; position: absolute; left: 220px; top: 0; background: #fff; width: 802px; height: 322px; border: 1px solid #1A8231; border-left: 0; padding: 20px 20px 20px 0; overflow: hidden;
					dl{
						width: 100%; display: table; line-height: 25px; margin-bottom: 6px;
						dt{
							 width: 120px; text-align: right; display: table-cell; padding-right: 10px;
							a{
								font-size: 14px; color: #1A8231; font-weight: bold; display: block;
							}
						}
						dd{
							display: inline-block; margin: 0 10px;
							a{
								font-size: 12px; color: #666;
							}
							&:hover a{
								text-decoration: underline; color: #1A8231;
							}
						}
					}
				}
  		}
  	}
	}
}
</style>
<style>
.menu .el-menu--horizontal>.el-submenu .el-submenu__title{
	height: 40px; line-height: 40px; font-size: 16px;
}
.menu .el-submenu__title, .menu .el-menu--horizontal>.el-submenu .el-submenu__title, .menu .el-menu-item.is-active, .menu .el-menu-item{
	color: #fff;
}
.menu .el-menu--horizontal>.el-menu-item.is-active{
	background: #60AE00; border-bottom: 0;
}
.menu .el-menu--horizontal>.el-menu-item, .menu .el-menu{
	border-bottom: 0;
}
.menu .el-menu--horizontal>.el-menu-item{
	margin-left: 10px;
}
.menu .el-menu--horizontal>.el-menu-item a{
	display: block; color: #fff;
}
.menu .el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .menu .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{
	color: #fff; background: #60AE00;
}

</style>