<template>
	<div>
		<headers></headers>
		<menus></menus>
		<div class="center w1210">
			<el-row>
			  <el-col :span="3" style="margin-right: 20px;">
					<el-menu
						style="overflow: hidden;"
						router 
			      class="el-menu-vertical-demo" 
			      :default-openeds="arr" 
			      @select="selectIndex"
			      :default-active="activeIndex">
					  <el-submenu index="1">
					    <template slot="title">订单中心</template>
					    <el-menu-item index="/center">
					    	我的订单
					    </el-menu-item>
					  </el-submenu>
					  <el-submenu index="2">
					    <template slot="title">关注中心</template>
					    <el-menu-item index="/center/collect">
								关注的商品
					    </el-menu-item>
					  </el-submenu>
					  <el-submenu index="3">
					    <template slot="title">设置</template>
					    <el-menu-item index="/center/personalInfo">
								个人信息
					    </el-menu-item>
					    <el-menu-item index="/">
					    	收货地址
					    </el-menu-item>
					  </el-submenu>
			    </el-menu>
			  </el-col>
			  <el-col :span="20">
					<router-view></router-view>
			  </el-col>
			</el-row>
		</div>
		<footers></footers>
	</div>
</template>
<script>
import Headers from '@/components/header/headers'
import Menus from '@/components/menus'
import Footers from '@/components/footers'
export default {
	data() {
		return {
			activeIndex: '/center',
			arr: ['1','2','3']
		}
	},
	components: {
		Headers,
		Menus,
		Footers
	},
	mounted() {
		this.activeIndex = this.$route.path
	},
	methods: {
		selectIndex(i) {
			this.activeIndex = i
		}
	}
}
</script>
<style scoped lang="scss">
.center{
	min-height: 500px; margin: 40px auto 100px;
	.el-menu{
		border: 0;
	}
}
</style>