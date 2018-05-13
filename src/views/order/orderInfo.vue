<template>
	<div>
		<headers></headers>
		<div class="line"></div>
		<div class="orderInfo w1210" v-if="order">
			<div class="detailPanel clearfix">
				<div class="fl panelLeft">
					<div class="tit">订单信息</div>
					<dl>
						<dt>收货地址：</dt>
						<dd>{{order.consignee.name}},{{order.consignee.mobile || order.consignee.tel}},{{order.consignee.regions}},{{order.consignee.address}}</dd>
					</dl>
					<dl>
						<dt>买家留言：</dt>
						<dd>快发货</dd>
					</dl>
					<dl>
						<dt>订单编号：</dt>
						<dd>{{order.sn}}</dd>
					</dl>
					<dl>
						<dt>商家：</dt>
						<dd>小禾旗舰店</dd>
					</dl>
				</div>
				<div class="fl panelRight">
					<div class="status">订单状态：
						<span v-if="order.status == 0">待买家付款</span>
						<span v-if="order.status == 1">待卖家发货</span>
						<span v-if="order.status == 2">待买家收货</span>
						<span v-if="order.status == 3 || order.status == 4">交易成功</span>
						<span v-if="order.status == 5">交易取消</span>
					</div>
					<div class="comfirmbtn">
						您可以 
						<el-button type="success" size="mini">确认收货</el-button>
						<el-button type="success" size="mini">评价</el-button>
						<router-link to="" tag="a" target="_blank">申请退款</router-link>
						<router-link to="" tag="a" target="_blank">延长收货时间</router-link>
					</div>
				</div>
			</div>
			<div class="table">
				<table class="thead">
					<tbody>
						<tr>
							<th width="400">商品</th>
							<th width="110">单价</th>
							<th width="58">数量</th>
							<th width="110">优惠</th>
							<th width="110">状态</th>
						</tr>
					</tbody>
				</table>
				<div class="tablelist">
					<table class="tablecontent">
						<tbody class="tbodyHead">
							<tr>
								<td>
									<span><strong>{{order.created_at | formatDate}}</strong></span>
									<span>订单号：{{order.sn}}</span>
								</td>
								<td colspan="6"></td>
							</tr>
						</tbody>
						<tbody class="tbodyContent">
							<tr :key="goods.id" v-if="order && order.goods && order.goods.length>0" v-for="goods in order.goods">
								<td width="400" style="border-right: 0;">
								<router-link :to="{name: 'Details', params: {id: goods.id}}" tag="a" class="alink clearfix" target="_blank">
									<div class="fl" v-if="goods && goods.product && goods.product.photos.length>0">
										<img src="goods.product.photos[0].thumb" />
									</div>
									<div class="fl" v-else>
										<img src="../../assets/images/error.png" />
									</div>
									<div class="shopTit">
										<p>{{goods.product.name}}</p>
										<p class="property">{{goods.property}}</p>
									</div>
								</router-link>
							</td>
							<td width="110" style="border-right: 0;">
								￥{{goods.product_price ||'0' | fmoney}}
							</td>
							<td width="58" style="border-right: 0;">{{goods.total_amount}}</td>
							<td></td>
							<td>
								<p>
									<span v-if="order.status == 0">待买家付款</span>
									<span v-if="order.status == 1">待卖家发货</span>
									<span v-if="order.status == 2">待买家收货</span>
									<span v-if="order.status == 3 || order.status == 4">交易成功</span>
									<span v-if="order.status == 5">交易取消</span>
								</p>
							</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div class="shopResult">
				<ul>
					<li v-for="promo in order.promos" :key="promo.id">
						<!-- <span class="tit">{{ promo.name }}：</span> -->
						<!-- <span>￥{{promo.price | fmoney}}</span> -->
					</li>
					<li>
						<span class="tit">运费：</span>
						<span>￥0.00</span>
					</li>
					<li>
						<span class="tit">订单总额：</span>
						<span>￥{{order.total | fmoney}}</span>
					</li>
					<li>
						<span class="tit"><strong>实付款：</strong></span>
						<span><strong>￥{{order.total | fmoney}}</strong></span>
					</li>
				</ul>
			</div>
		</div>
		<footers></footers>
	</div>
</template>
<script>
import '../../utils/directive'
import Headers from '@/components/header/headers'
import Footers from '@/components/footers'
export default {
	components: {
		Headers,
		Footers
	},
	data() {
		return {
			order: null
		}
	},
	mounted() {
		this.getOrderInfo()
	},
	methods: {
		getOrderInfo() {
			this.$API.OrderInfo({
				order: this.$route.params.id
			}).then((response)=>{
				if (response.data.error_code == 0) {
					this.order = response.data.order
				}
			})
		}
	}
}
</script>
<style scoped lang="scss">
.line{
	border-bottom: 2px solid #24991E;
}
.orderInfo{
	margin: 20px auto 100px;
}
</style>