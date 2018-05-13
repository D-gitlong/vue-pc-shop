<template>
	<nav class="menu">
		<div class="w1210">
			<div class="classify">
				<label>全部分类</label>
				<ul class="sub_menu">
					<li v-for="item in menuList" :key="item.id" @mouseover="getPositionTop($event)">
						<h3><a href="" target="_blank">{{item.name}}</a></h3>
						<p>
							<a v-for="subItem in item.cate" :key="subItem.id" href="" target="_blank">{{subItem.name}}</a>
						</p>
						<div class="sub_cate" ref="subCate">
							<dl class="fl" :key="sItem.id" v-for="sItem in item.subCate">
								<dt><a href="" target="_blank">{{sItem.name}}</a></dt>
								<dd v-for="sItemsub in sItem.subCatesub" :key="sItemsub.id">
									<a href="" target="_blank">{{sItemsub.name}}</a>
								</dd>
							</dl>
						</div>
					</li>
				</ul>
			</div>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
			  <el-menu-item index="7"><a href="" target="_blank">首页</a></el-menu-item>
			  <el-menu-item index="2"><a href="" target="_blank">热销产品</a></el-menu-item>
			  <el-menu-item index="3"><a href="" target="_blank">精品推荐</a></el-menu-item>
			  <el-menu-item index="4"><a href="" target="_blank">商家展示</a></el-menu-item>
			  <el-menu-item index="5"><a href="" target="_blank">关于我们</a></el-menu-item>
			  <el-menu-item index="6"><a href="" target="_blank">联系我们</a></el-menu-item>
			</el-menu>
		</div>
	</nav>
</template>
<script>
export default {
	name: 'sellerMenus',
	data() {
		return {
			activeIndex: '7',
			menuList: [
				{
					id: 1,
					name: '果蔬罐头',
					cate: [
						{
							id: 2,
							name: '熊掌罐头',
						},
						{
							id: 3,
							name: '卤肉罐头',
						}
					],
					subCate: [
						{
							id: 4,
							name: '小份罐头',
							subCatesub: [
								{
									id: 5,
									name: '苹果罐头'
								},
								{
									id: 6,
									name: '橘子罐头'
								}
							]
						},
						{
							id: 7,
							name: '肉罐头',
							subCatesub: [
								{
									id: 8,
									name: '熊掌罐头'
								},
								{
									id: 9,
									name: '卤肉罐头'
								}
							]
						}
					]
				},
				{
					id: 10,
					name: '调味酱',
					cate: [
						{
							id: 11,
							name: '大肉酱',
						},
						{
							id: 12,
							name: '牛肉酱',
						},
						{
							id: 13,
							name: '火腿肉酱',
						}
					],
					subCate: [
						{
							id: 14,
							name: '辣椒酱',
							subCatesub: [
								{
									id: 15,
									name: '油香辣子'
								},
								{
									id: 16,
									name: '油香辣子2'
								}
							]
						},
						{
							id: 17,
							name: '豆瓣酱',
							subCatesub: [
								{
									id: 18,
									name: '原味香菇'
								},
								{
									id: 19,
									name: '香辣香菇酱'
								}
							]
						}
					]
				}
			]
		}
	},
	mounted() {
	},
	methods: {
		getPositionTop(e) {
			for(let i in this.$refs.subCate){
				this.$refs.subCate[i].style.top = e.currentTarget.getBoundingClientRect().top-197 + 'px'
			}
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
  		background: url(../../assets/images/bg/nav_c1.png) center no-repeat; width: 222px; height: 45px; line-height: 45px; position: absolute; left: 0; top: -5px; text-align: center; font-size: 15px; color: #fff; cursor: pointer;
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