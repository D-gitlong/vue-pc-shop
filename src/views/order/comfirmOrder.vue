<template>
	<div>
		<top></top>
		<div class="cartHead w1210">
			<a href="" target="_blank" class="logo"><img src="../../assets/images/logo.png"></a>
			<div class="steps">
				<el-steps align-center :active="active" finish-status="success">
				  <el-step icon="iconfont icon-yuan" title="我的购物车"></el-step>
				  <el-step icon="iconfont icon-yuan1" title="填写核对订单"></el-step>
				  <el-step icon="iconfont icon-yuan" title="成功提交订单"></el-step>
				</el-steps>
			</div>
		</div>
		<div class="w1210 comfirmOrder">
			<h3>填写并核对订单信息</h3>
			<div class="orderInfo">
				<section>
					<Address @consignee="getConsignee"></Address>
				</section>
				<section>
					<h4>支付方式</h4>
					<ul>
						<li>
							<div class="item selected">
								<b></b>
								<a href="javascript:;">在线支付</a>
							</div>
						</li>
					</ul>
				</section>
				<section class="clearfix">
					<h4>送货清单<router-link to="/cart" class="fr">返回修改购物车</router-link></h4>
					<div class="shippingWrap clearfix">
						<div class="shippingLeft fl">
							<h5>配送方式</h5>
							<ul>
								<li>
									<div class="item selected">
										<b></b>
										<a href="javascript:;">快递运输</a>
									</div>
								</li>
							</ul>
						</div>
						<div class="shippingRight fl">
							<div class="shippingTit clearfix">
								<span class="name fl">商家：wingo 海外旗舰店</span>
								<span class="price fl">商品价格</span>
								<span class="number fl">数量</span>
							</div>
							<div class="shipingInfo clearfix" v-for="good in goods" v-if="goods && goods.length > 0" :key="good.id">
								<div class="fl name">
									<router-link to="" tag="a" class="clearfix" target="_blank">
										<img class="fl" :src="good.product.default_photo.large" />
										<div class="fl tit">{{good.product.name}} {{good.property}}</div>
									</router-link>
								</div>
								<div class="fl price">￥{{good.price| fmoney}}</div>
								<div class="fl number">x{{good.amount}}</div>
							</div>
						</div>
					</div>
					<div class="orderRemark">
						<h5>添加订单备注</h5>
						<div class="remark">
							<el-input style="width: 600px;" v-model="input.remark" placeholder="请将购买需求在备注中做详细说明"></el-input>
							<span>提示：请勿填写有关支付、收货、发票方面的信息</span>
						</div>
					</div>
				</section>
				<section>
					<h4>消费积分</h4>
					<div class="score">
						<el-input-number v-model="input.score" style="width: 200px;" :min="0" @change="changeScore" placeholder="填写消费积分" :controls="false"></el-input-number>
						<span>您当前可用：{{scoreInfo}} 消费积分，本订单最多可以使用{{maxUseScore}}消费积分，每消费积分抵扣 1 元</span>
					</div>
				</section>
			</div>
			<div class="shopResult">
				<ul>
					<li>
						<span class="tit"><i>{{amount}}</i>件商品，商品总额：</span>
						<span v-if="priceInfo">￥{{priceInfo.total_price | fmoney}}</span>
					</li>
					<li>
						<span class="tit">消费积分：</span>
						<span>-￥{{input.score||'0' | fmoney}}</span>
					</li>
					<li>
						<span class="tit">运费：</span>
						<span>￥0.00</span>
					</li>
					<li>
						<span class="tit">订单总额：</span>
						<span>￥{{priceInfo.total_price | fmoney}}</span>
					</li>
					<li>
						<span class="tit">应付总额：</span>
						<span v-if="priceInfo">￥{{priceInfo.total_price - input.score | fmoney}}</span>
					</li>
				</ul>
			</div>
			<div class="address">
				<p>寄送至：
					<span :key="info.id" v-if="index>0" v-for="(info,index) in getAddressInfo.regions">{{info.name}}</span>
					<span>{{getAddressInfo.address}}</span>
				</p>
				<p>收货人：
					<span>{{getAddressInfo.name}}</span>
					<span>{{getAddressInfo.mobile | fmobile}}</span>
				</p>
			</div>
			<div class="total" v-if="priceInfo">
				应付总额：<span>￥{{priceInfo.total_price - input.score | fmoney}}</span>
				<a href="javascript:;" @click="touchSubmit">提交订单</a>
			</div>
		</div>
		<footers></footers>
		
	</div>
</template>
<script>
import '../../utils/directive'
import Top from '@/components/header/top'
import Footers from '@/components/footers'
import Address from '@/components/address'
export default {
	name: 'comfirmOrder',
	components: {
		Top,
		Footers,
		Address
	},
	data() {
		return {
			active: 1,
			remark: '',
			getAddressInfo: '',
			goods: [],
			input: {
				score: 0,
				remark: ''
			},
			priceInfo: null,
			maxUseScore: 0,
			amount: 0,
			scoreInfo: null
		}
	},
	mounted() {
		this.goods = this.$store.getters.getGoods
		this.getOrderPrice()
		this.getScroe()
	},
	methods: {
		getConsignee(c) {
			this.getAddressInfo = c
		},
		getOrderPrice() {
			let goods = this.goods
			if (!goods || !goods.length) {
				this.$message({
					message: '没有该商品信息',
					type: 'warning',
					customClass: 'com_tips'
				})
				return false
			}
			let products = [], amount = 0;
			for (let i = 0; i < goods.length; ++i) {
				products.push({
					goods_id: goods[i].product.id,
					property: goods[i].attrs.split(','),
					num: goods[i].amount
				});
				amount += goods[i].amount
			}
			this.amount =amount
			let params = {};
			params.order_product = JSON.stringify(products);
			params.shipping = 1;
			this.$API.orderPrice(params).then((response)=>{
				console.log(response)
				if (response.data.error_code == 0) {
					this.priceInfo = response.data.order_price
					this.maxUseScore = response.data.order_price.score
				}
			})
		},
		getScroe() {
			this.$API.Scroe().then((response)=>{
				if (response.data.error_code == 0) {
					this.scoreInfo = response.data.score
				}
			})
		},
		changeScore() {
			if (this.input.score > this.maxUseScore) {
				this.input.score = this.maxUseScore;
			}
		},
		touchSubmit() {
			let goods = this.goods
			let consignee = this.getAddressInfo
			let score = this.input.score
			let comment = this.input.remark
			let goodsIds = []

			if (!goods || !goods.length) {
				this.$message({
					message: '没有该商品信息',
					type: 'warning',
					customClass: 'com_tips'
				})
				return;
			}

			for (let i = 0; i < goods.length; ++i) {
				goodsIds.push(goods[i].id);
			}

			if (!goodsIds || !goodsIds.length) {
				this.$message({
					message: '没有该商品信息',
					type: 'warning',
					customClass: 'com_tips'
				})
				return;
			}

			if (!consignee) {
				this.$message({
					message: '请填写地址',
					type: 'warning',
					customClass: 'com_tips'
				})
				return;
			}
			let params = {
				shop: 1,
				consignee: consignee ? consignee.id : null,
				cart_good_id: goodsIds ? JSON.stringify(goodsIds) : null,
				shipping: 1,
				invoice_type: null,
				invoice_title: null,
				invoice_content: null,
				coupon: null,
				score: score,
				comment: comment
			};
			this.$API.SubmitOrder(params).then((response)=>{
				console.log(response)
				if (response.data.error_code == 0) {
					this.$message({
						message: '下单成功',
						type: 'success',
						customClass: 'com_tips'
					})
					this.$store.dispatch('goodsFun','')
				}
				
			})
		}
	}
}
</script>
<style scoped lang="scss">
.cartHead{
	position: relative;
	.logo{
		display: block; width: 115px; margin-top: 12px;
	}
}
.comfirmOrder{
	margin-top: 10px; margin-bottom: 100px;
	h3{
		font-size: 16px; height: 42px; line-height: 42px;
	}
	.orderInfo{
		section{
			border-bottom: 1px solid #eee; padding-bottom: 25px; padding-top: 10px;
			&:last-child{
				border-bottom: 0;
			}
		}
		padding: 0 20px; border: 1px solid #f0f0f0;
		h4{
			font-size: 14px; height: 40px; line-height: 40px; font-weight: bold;
			.fr{
				color: #005ea7; font-weight: normal;
				&:hover{
					color: #e4393c;
				}
			}
		}
		ul{
			padding: 0 20px;
			li{
				margin-bottom: 15px; color: #666;
				.item{
					position: relative; display: inline-block; background: #fff;
					b{
						display: none; position: absolute; bottom: 1px; right: 1px; width: 10px; height: 10px; background: url(../../assets/images/bg/bg.png) no-repeat;
					}
					a{
						display: inline-block; min-width: 140px; border: 2px solid #eee; padding: 4px 10px; text-align: center; line-height: 18px; color: #666;
					}
					&.selected b{
						display: block;
					}
					&.selected a{
						border-color: #24991E;
					}
					&:hover a{
						border-color: #24991E;
					}
				}
			}
		}
	}
	.shippingWrap{
		background: #f7f7f7; margin-bottom: 15px;
		&:last-child{
			margin-bottom: 0;
		}
	}
	.shippingLeft {
		width: 330px; padding: 10px 10px 10px 20px;
		h5{
			font-size: 13px; font-weight: bold; margin-bottom: 10px; line-height: 24px;
		}
		ul{
			padding: 0;
		}
	}
	.shippingRight{
		background: #f3fbfe; padding: 10px 20px; width: 838px; color: #666; line-height: 24px;
		.shippingTit {
			margin-bottom: 10px;
		}
		.name{
			font-weight: bold; display: inline-block; width: 470px; margin-right: 15px;
			.tit{
				width: 375px;
			}
		}
		.price{
			width: 149px; margin-right: 15px; text-align: center;
		}
		.number {
			width: 149px; text-align: center;
		}
		.shipingInfo {
			margin-bottom: 20px;
			.name{
				a{
					display: block;
				}
				img{
					margin-right: 10px; width: 80px; height: 80px; border: 1px solid #eee;
				}
			}
			.price{
				color: #e4393c; font-size: 15px; font-weight: bold;
			}
			.number{
				font-size: 15px;
			}
		}
	}
	.orderRemark, .score{
		margin-top: 30px;
		h5{
			font-size: 14px; margin-bottom: 10px;
		}
		.el-input, .el-input-number{
			margin-left: 20px; margin-right: 10px;
		}
		span{
			color: #999;
		}
	}
	.score{
		margin-top: 0;
	}
	.shopResult{
		text-align: right;
		ul{
			padding-right: 20px; margin-top: 20px; margin-bottom: 30px;
			li{
				line-height: 30px;
				span{
					width: 100px; display: inline-block; text-align: right; color: #333;
					i{
						color: #e4393c; margin: 0 3px; font-size: 14px;
					}
				}
				span.tit{
					width: 180px; color: #666;
				}
			}
		}
	}
	.address{
		text-align: right; padding: 20px 10px 20px 0; line-height: 20px; text-align: right; border-top: 1px solid #e6e6e6; color: #999; background-color: #f4f4f4;
		span{
			margin-right: 5px;
		}
	}
	.total{
		text-align: right; font-size: 14px; color: #666; line-height: 50px; margin-top: 10px; margin-right: 20px;
		span{
			color: #e4393c; font-size: 20px; vertical-align: middle; font-weight: 700;
		}
		a{
			display: inline-block; height: 36px; line-height: 36px; padding: 0 32px; font-size: 18px; background-color: #e33d3f; color: #fff; border-radius: 2px; margin-left: 20px;
		}
	}
}
</style>
<style lang="scss">
.steps{
	width: 400px; position: absolute; top: 50%; right: 0; transform: translateY(-50%);
	.iconfont{
		font-size: 14px; color: #24991E;
	}
	.el-step__icon.is-icon{
		width: 20px;
	}
}
</style>