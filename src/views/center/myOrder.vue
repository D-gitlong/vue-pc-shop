<template>
	<div class="myOrder">
		<div class="tit">我的订单</div>
		<el-tabs v-model="activeName" @tab-click="handleClick">
	    <el-tab-pane name="all">
	    	<span slot="label">
		    	所有订单
	    	</span>
				<order-list :list="list"></order-list>
	    </el-tab-pane>
	    <el-tab-pane name="0">
	    	<span slot="label">
		    	待付款
	    	</span>
				<order-list :list="list"></order-list>
	    </el-tab-pane>
	    <el-tab-pane name="1">
	    	<span slot="label">
		    	待发货
	    	</span>
				<order-list :list="list"></order-list>
	    </el-tab-pane>
	    <el-tab-pane name="2">
	    	<span slot="label">
		    	待收货
	    	</span>
				<order-list :list="list"></order-list>
	    </el-tab-pane>
	    <el-tab-pane name="3">
	    	<span slot="label">
		    	待评价
	    	</span>
				<order-list :list="list"></order-list>
	    </el-tab-pane>
	  </el-tabs>
		<div class="page">
			<el-pagination
				@current-change="handleCurrentChange"
				:current-page.sync="page"
			  :page-size="per_page"
			  background
			  layout="prev, pager, next"
			  :total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import OrderList from '@/components/myOrder/orderlist'
export default {
	name: 'myOrder',
	data() {
		return {
			activeName: 'all',
			list: [],
			page: 1,
			per_page: 2,
			total: null,
			status: null
		}
	},
	components: {
		OrderList
	},
	mounted() {
		this.getOrder()
	},
	methods: {
		handleClick(tab,event) {
			if (tab.name == 'all') {
				this.status = null
			}else{
				this.status = tab.name
			}
			this.page = 1
			this.getOrder()
		},
		handleCurrentChange(val) {
			this.page = val
			this.getOrder()
		},
		getOrder() {
			let params = {
				page: this.page,
				per_page: this.per_page
			}
			if (null != this.status) {
				params.status = this.status;
			}
			this.$API.MyOrder(params).then((response)=>{
				if (response.data.error_code == 0) {
					this.list = response.data.orders
					this.total = response.data.paged.total
				}
			})

		}
	}
}
</script>
<style scoped lang="scss">
.myOrder{
	.page{
		margin-top: 20px; text-align: right;
	}
	.tit{
		height: 50px; line-height: 50px; font-size: 14px; padding-left: 10px; font-weight: bold; margin-bottom: 20px; border-bottom: 1px solid #24991E;
	}
	.el-tabs{
		padding-left: 10px;
	}
}
</style>
<style type="text/css">

</style>