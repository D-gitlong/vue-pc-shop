<template>
	<div class="orderlist">
		<div class="table">
			<table class="thead">
				<tbody>
					<tr>
						<th width="400">商品</th>
						<th width="110">单价</th>
						<th width="58">数量</th>
						<th width="110">商品操作</th>
						<th width="110">实付款</th>
						<th width="110">交易状态</th>
						<th width="110">交易操作</th>
					</tr>
				</tbody>
			</table>
			<div class="tablelist">
				<table class="tablecontent" :key="item.id" v-if="list.length > 0" v-for="(item,index) in list">
					<tbody class="tbodyHead">
						<tr>
							<td>
								<span><strong>{{item.created_at | formatDate}}</strong></span>
								<span>订单号：{{item.sn}}</span>
							</td>
							<td style="text-align: center;" width="100">店铺名</td>
							<td colspan="4"></td>
							<td style="text-align: right; padding-right: 20px;" v-if="(item.status == 3) || (item.status == 4) || (item.status == 5)"><i class="el-icon-delete" style="font-size: 20px;cursor: pointer;" @click="touchDelOrder(item,index)"></i></td>
							<td v-else></td>
						</tr>
					</tbody>
					<tbody class="tbodyContent">
						<tr :key="goods.id" v-if="item.goods && item.goods.length > 0" v-for="(goods,index) in item.goods">
							<td width="400" style="border-right: 0;">
								<router-link :to="{name: 'Details', params: {id: goods.id}}" tag="a" class="alink clearfix" target="_blank">
									<div class="fl" v-if="goods && goods.product && goods.product.photos.length>0">
										<img :src="goods.product.photos[0].thumb" />
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
							<td width="110">
								<router-link to="" tag="a" target="_blank">退款/退换货</router-link>
								<router-link to="" tag="a" target="_blank">投诉商家</router-link>
							</td>
							<td rowspan="2" width="110" v-if="index == 0">
								<p><strong>￥{{item.total | fmoney}}</strong></p>
								<p>(含运费:￥0.00)</p>
							</td>
							<td rowspan="2" width="110" v-if="index == 0">
								<p v-if="item.status == 0">等待买家付款</p>
								<p v-else-if="item.status == 1">等待卖家发货</p>
								<p v-else-if="item.status == 2">等待买家收货</p>
								<p v-else-if="item.status == 3">交易成功</p>
								<p v-else-if="item.status == 4">交易成功</p>
								<p v-else-if="item.status == 5">交易取消</p>

								<router-link :to="{name: 'OrderInfo', params: {id: item.id}}" tag="a" target="_blank">订单详情</router-link>
								<router-link to="" tag="a" v-if="(item.status == 2) || (item.status == 3) || (item.status == 4)" target="_blank" class="deliveried">查看物流</router-link>
							</td>
							<td rowspan="2" width="110" style="border-right: 0;" v-if="index == 0">
								<el-button v-if="item.status == 0" type="success" size="mini">付款</el-button>
								<el-button v-if="item.status == 2" type="success" size="mini" @click="touchConfirm(item)">确认收货</el-button>
								<el-button v-if="item.status == 3" size="mini">评价</el-button>
								<el-button v-if="item.status == 0" size="mini" @click="touchCancel(item)">取消订单</el-button>
							</td>
						</tr>
					</tbody>
				</table>
				<table v-if="list.length == 0">
					<tbody style="height: 60px; line-height: 60px;">
						<tr>
							<td colspan="7" style="text-align: center">暂无相关信息</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <span>{{tips}}</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="touchDialogConfirm">确 定</el-button>
		    <el-button @click="dialogVisible = false">取 消</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
import '../../utils/directive'
export default {
	props: {
		list: Array
	},
	data() {
		return {
			dialogVisible: false,
			item: null,
			tips: '',
			isDel: false,
			index: 0
		}
	},
	mounted() {
		
	},
	methods: {
		touchConfirm(item) {
			// this.$API.ConfirmOrder()

		},
		touchCancel(item) {
			this.item = item
			this.tips = '您确定要取消该订单吗？'
			this.dialogVisible = true
		},
		touchDialogConfirm() {
			if (this.isDel) {
				this.$API.DelOrder({
					order: this.item.id,
				}).then((response)=>{
					this.$nextTick(()=>{
						this.list.splice(this.index,1)
					})
					this.dialogVisible = false
				})
			}else{
				this.$API.CancelOrder({
					order: this.item.id,
					reason: 1
				}).then((response)=>{
					if (response.data.error_code == 0) {
						this.dialogVisible = false
						this.$router.go(0)
					}
				})
			}
		},
		touchDelOrder(item,index) {
			this.item = item
			this.index = index
			this.isDel = true
			this.tips = '您确定要删除该订单吗？'
			this.dialogVisible = true
		}
	}
}
</script>
<style scoped lang="scss">
.orderlist{
	.table{
		table{
			width: 100%;
		}
		.thead{
			height: 40px; line-height: 40px; background: #f7f7f7;
		}
		.tablecontent{
			margin-top: 10px; border: 1px solid #e4fee7;
			.tbodyHead{
				height: 40px; line-height: 40px; background: #f7fef9; border-bottom: 1px solid #e4fee7;
				td{
					text-align: left; color: #3c3c3c; font-size: 13px;
					span{
						margin-left: 15px;
					}
				}
			}
			.tbodyContent{
				.alink{
					display: block; text-align: left;
					.fl{
						width: 80px; height: 80px; margin-right: 15px; margin-left: 20px;
					}
					.shopTit{
						color: #3c3c3c; line-height: 22px;
						.property{
							color: #9e9e9e; margin-top: 5px;
						}
					}
				}
				td{
					padding: 15px 0; border-width: 1px 1px 0 0; border-style: solid; border-color: #e4fee7; color: #3c3c3c;
					p{
						line-height: 22px;
					}
					a{
						display: block;line-height: 22px;
					}
					.deliveried{
						color: #24991E;
					}
					.el-button{
						margin-bottom: 10px;
					}
				}
			}
			td{
				text-align: center; vertical-align: top;
			}
			&:hover{
				border-color: #24991E;
			}
			a:hover, a:hover p{
				color: #24991E;
			}
		}
	}
}

</style>
<style lang="scss">
.orderlist{
	.el-table tr .isBg{
		background: #f3f3f3;
	}
}	
</style>