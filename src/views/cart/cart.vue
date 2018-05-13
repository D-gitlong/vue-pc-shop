<template>
	<div>
		<top></top>
		<div class="cartHead w1210">
			<a href="" target="_blank" class="logo"><img src="../../assets/images/logo.png"></a>
			<div class="steps">
				<el-steps align-center :active="active" finish-status="success">
				  <el-step icon="iconfont icon-yuan1" title="我的购物车"></el-step>
				  <el-step icon="iconfont icon-yuan" title="填写核对订单"></el-step>
				  <el-step icon="iconfont icon-yuan" title="成功提交订单"></el-step>
				</el-steps>
			</div>
		</div>
		<div class="cart w1210" v-if="getLoginStatus && cartData.length>0">
			<h3>全部商品{{goodsNumber}}</h3>
			<el-table
		    ref="multipleTable"
		    v-for="(good,index) in cartData"
		    :key="good.goods.id"
		    :data="good.goods"
		    style="width: 100%"
		    :header-cell-class-name="'isBg'"
		    @select="handleSelect"
		    @select-all="handleSelectAll"
		    @selection-change="handleSelectionChange">
		    <el-table-column
		      type="selection"
		      label="全选"
		      width="55">
		    </el-table-column>
		    <el-table-column
		      label="商品"
		      width="500">
		      <template slot-scope="scope">
		      	<router-link :to="{name: 'Details', params: {id: scope.row.goods_id}}" tag="a" target="_blank" class="goods clearfix">
		      		<div class="goods_img fl">
								<img :src="scope.row.product.default_photo.thumb" />
							</div>
							<div class="goods_name fl">{{scope.row.product.name}}</div>
		      	</router-link>
		      </template>
		    </el-table-column>
		    <el-table-column
		    	align="left"
		      width="120">
		      <template slot-scope="scope">{{scope.row.property}}</template>
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      label="单价"
		      width="120">
		      <template slot-scope="scope">￥{{scope.row.price|fmoney}}</template>
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      label="数量">
		      <template slot-scope="scope">
						<el-input-number :min="1" size="mini" @change="changNum(scope.row.id,scope.row.amount)" v-model="scope.row.amount"></el-input-number>
		      </template>
		    </el-table-column>
		    <el-table-column
		    	align="center"
		      label="小计(元)">
		      <template slot-scope="scope"><div class="subtotal">￥{{scope.row.price*scope.row.amount|fmoney}}</div></template>
		    </el-table-column>
		    <el-table-column
		      width="120"
		      label="操作">
		      <template slot-scope="scope">
						<p><a @click="touchDelete(scope.row.id)">删除</a></p>
						<p><a @click="touchFav(scope.row.goods_id)">加到我的关注</a></p>
		      </template>
		    </el-table-column>
		  </el-table>
	  	<div class="goodsBottom clearfix">
	  		<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="toggleSelection(checkAll)">全选</el-checkbox>
	  		<a @click="touchDelete">删除选中的商品</a>
	  		<a href="">加到我的关注</a>
	  		<a href="" class="clearAll">清理购物车</a>
				<div class="cartRight">
					<a @click="goSubmit()" class="goBalance fr">去结算</a>
					<div class="result fr">
						<div class="allPrice fr">
							<p><span>总价：</span><i>￥{{selectedPrice}}</i></p>
							<p><span>已节省：</span><em>-￥0.00</em></p>
						</div>
						<span class="fr">已选择<i>{{selectedAmount}}</i>件商品</span>
					</div>
				</div>
	    </div>
		</div>
		<div class="cart w1210" v-else>
			<div class="cart_empty" v-if="getLoginStatus">
				<p>购物车空空的哦~，去看看心仪的商品吧~</p>
				<p><a href="/" target="_blank">去购物></a></p>
			</div>
			<div class="cart_empty" v-else>
				<p>购物车内暂时没有商品，登录后将显示您之前加入的商品</p>
				<p>
					<a href="#/login" class="login_btn" target="_blank">登录</a>
					<a href="/" target="_blank">去购物></a>
				</p>
			</div>
		</div>
		<footers></footers>
		<side-nav></side-nav>
		<el-dialog
		  title="删除"
		  :visible.sync="dialogVisible"
		  width="30%">
		  <span>您确定要删除商品？</span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="cancel">取 消</el-button>
		    <el-button type="primary" @click="confirm">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import '@/utils/directive'
import Top from '@/components/header/top'
import Footers from '@/components/footers'
import SideNav from '@/components/sideNav'
export default {
	name: 'cart',
	data() {
		return {
			active: 0,
			num: 1,
			checkAll: false,
			isIndeterminate: false,
			cartData: [],
      isHigh: false,
      len: 0,
      selectedAmount: 0,
      selectedPrice: 0,
      selectedGoods: [],
      dialogVisible: false,
      deleteId: ''
		}
	},
	computed: {
    ...mapGetters(['getLoginStatus', 'goodsNumber']),
  },
	components: {
		Top,
		Footers,
		SideNav
	},
	created() {
		this.getCartList()
	},
	methods: {
		async getCartList() {
			await this.$API.Cart().then((response)=>{
				if (response.data.error_code == 0) {
					this.cartData = response.data.goods_groups
					this.len = response.data.goods_groups.length>0?response.data.goods_groups[0].goods.length:''
				}
			})
			this.checkAll =true
			this.toggleSelection()
		},
		changNum(goodsId,amount) {
			this.$API.CartUpdate({
				good: goodsId,
				amount: Number(amount)
			})
			this.recomputePrice()
			this.$store.dispatch('getCartAmount')
		},
		handleSelect(selection, row) {
			this.deleteId = row.id
			let selectedGoods = this.selectedGoods
			let targetIndex = -1
			for (let j = 0; j < selectedGoods.length; ++j) {
				let goods = selectedGoods[j]
				if (goods.id == row.id) {
					targetIndex = j
					break;
				}
			}
			if (-1 == targetIndex) {
				selectedGoods.push(row)
			} else {
				selectedGoods.splice(targetIndex, 1)
			}
			this.recomputePrice()
		},
		handleSelectAll(selection) {
			let selectedGoods = []
			let isSelectedAll = selection.length>0 ? true : false
			if (isSelectedAll) {
				for (let i = 0; i < selection.length; ++i) {
					let group = selection[i]
					selectedGoods.push(group)
				}
			}
			this.selectedGoods = selectedGoods
			this.recomputePrice()
		},
		recomputePrice() {
			let amount = 0
			let price = 0
			let goods = this.selectedGoods
			for (let i = 0; i < goods.length; ++i) {
				amount += Number(goods[i].amount)
				price += goods[i].amount * goods[i].price
			}
			this.selectedAmount = amount
			this.selectedPrice = price
		},
		toggleSelection() {
			let selectedGoods = []
			if (this.checkAll) {
				this.cartData.forEach((el)=>{
					el.goods.forEach(row => {
	          this.$refs.multipleTable[0].toggleRowSelection(row,true)
						selectedGoods.push(row)
	        })
				})
        this.checkAll = true
			}else{
				this.$refs.multipleTable[0].clearSelection()
			}
			this.selectedGoods = selectedGoods
			this.isIndeterminate = false
			this.recomputePrice()
    },
    handleSelectionChange(val) {
    	let checkedCount = val.length
    	this.checkAll = checkedCount === this.len
    	this.isIndeterminate = checkedCount > 0 && checkedCount < this.len
    	// this.deleteId = val.id
    },
    touchDelete(id) {
    	this.deleteId = id
    	this.dialogVisible = true
    },
    touchFav(id) {
    	this.$API.Like({
    		product: id
    	}).then((response)=>{
    		if (response.data.error_code == 0) {
    			this.$message({
    				type: 'success',
    				message: '成功加到我的关注',
        		customClass: 'com_tips'
    			})
    		}
    	})
    },
    cancel() {
    	this.dialogVisible = false
    	this.deleteId = null
    },
    confirm(){
    	this.dialogVisible = false
    	this.$API.Delete({
    		good: Number(this.deleteId)
    	}).then((response)=>{
    		if (response.data.error_code == 0) {
	    		this.cartData.forEach((el,index)=>{
						el.goods.splice(index,1)
	    		})
	    		this.deleteId = null
	    		this.$store.dispatch('getCartAmount')
	    		this.getCartList()
	    		this.recomputePrice()
	    	}
    	})
    },
    goSubmit() {
    	if (!this.selectedGoods || !this.selectedGoods.length) {
				this.$message({
          message: '请先选择商品',
          type: 'warning'
        })
				return false
			}
			let gs = this.selectedGoods;
			for (let i = 0; i < gs.length; ++i) {
				let goods = gs[i];
				if (gs[i].amount > gs[i].attr_stock) {
					this.$message({
	          message: '库存不足',
	          type: 'warning',
	          customClass: 'com_tips'
	        })
					return false
				}
			}
			this.$store.dispatch('goodsFun',this.selectedGoods)
			this.$router.push('ComfirmOrder')
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
.line{ border-bottom: 2px solid #24991E;}
.cart{
	margin-top: 10px; margin-bottom: 100px;
	.cart_empty{
		background: url(../../assets/images/bg/cart.png) no-repeat; height: 98px; padding-left: 80px; width: 440px; margin: 150px auto;
		p{
			font-size: 14px; line-height: 26px; color: #333;
			.login_btn{
				display: inline-block; height: 25px; line-height: 25px; padding: 0 10px; border-radius: 3px; color: #fff; background: #EA0000; margin-right: 5px;
			}
		}
	}
	h3{
		color: #e8393c; font-size: 18px; border-bottom: 2px solid #e8393c; padding: 0 10px; display: inline-block; line-height: 50px;
	}
	a{
		color: #666; cursor: pointer;
		&:hover{
			color: #e4393c;
		}
	}
	.goods{
		display: block; color: #666;
		.goods_img{
			width: 80px; height: 80px; margin-right: 10px;
		}
		.goods_name{
			width: 380px;
		}
	}
	.subtotal{
		font-weight: bold; color: #000;
	}
	.goodsBottom{
		margin-top: 20px; border: 1px solid #ebeef5; -webkit-transition: .3s; transition: .3s; position: relative; height: 52px; line-height: 52px; padding-left: 14px;
		a{
			margin-left: 25px;
		}
		.cartRight{
			float: right; line-height: normal;
			.result{
				color: #999;margin: 7px 0 0; line-height: 20px; font-size: 13px;
				p{
					text-align: right;
				}
				i{
					color: #e4393c; margin: 0 3px; font-weight: bold;
				}
				.allPrice{
					margin: 0 20px 0 10px;
					span{
						width: 60px; text-align: right; display: table-cell;
					}
						i{
							font-size: 18px; font-weight: bold; display: table-cell
						}
						em{
							display: table-cell
						}
					
					
				}
			}
		}
		.goBalance{
			float: right; width: 96px; height: 52px; line-height: 52px; font-size: 18px; background: #e54346; color: #fff; text-align: center; margin-left: 0;
			
		}
	}
}
</style>
<style lang="scss">
.cart{
	.el-table tr .isBg{
		background: #f7f7f7;
	}
}
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