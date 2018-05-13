<template>
	<div>
		<headers></headers>
		<menus></menus>
		<div class="w1210">
			<div class="product">
				<div class="filter_wrap clearfix">
					<div class="filter fl">
						<a @click="sortDefault()" :class="{active : currentSortKey == 0}">综合排序</a>
						<a @click="sortSale()" :class="{active : currentSortKey == 4}">销量</a>
						<a @click="sortDate()" :class="{active : currentSortKey == 5}">新品</a>
						<a @click="sortPrice()" :class="{active : currentSortKey == 1}">价格
							<i class="iconfont" :class="{'icon-jiantouxiajiang' : currentSortKey == 1 && (currentSortValue == 0 || currentSortValue == 1)}"></i>
							<i class="iconfont" :class="{'icon-jiantoushangsheng': currentSortKey == 1 && (currentSortValue == 2)}"></i>
						</a>
						<a @click="sortCredit()" :class="{active : currentSortKey == 3}">信用</a>
					</div>
					
				</div>
				<div class="product_list clearfix" v-if="prolist && prolist.length > 0">
					<div class="item" v-for="item in prolist" :key="item.id">
						<a :href="'#/details/'+item.id" target="_blank">
							<img v-lazy="item.default_photo.thumb" />
							<p class="price">￥{{item.current_price|fmoney}}</p>
							<p class="name">{{item.name}}</p>
						</a>
						<a href="" class="go_cart"><i class="iconfont icon-cart"></i>加入购物车</a>
					</div>
				</div>
				<div class="page2" v-if="!isContent">
					<el-pagination
			      @current-change="handleCurrentChange"
			      :current-page.sync="page"
			      :page-size="per_page"
			      background
			      layout="prev, pager, next"
			      :total="page2_total">
			    </el-pagination>
				</div>
				<!-- <div class="page2" v-if="!isContent">
					<el-pagination
					  background
					  layout="prev, pager, next"
					  :total="page2_total">
					</el-pagination>
				</div> -->
				<div class="not-content" v-if="isContent">没有相关产品</div>
			</div>
		</div>
		<footers></footers>
		<side-nav></side-nav>
	</div>
</template>
<script>
import Menus from '@/components/menus'
import Headers from '@/components/header/headers'
import Footers from '@/components/footers'
import SideNav from '@/components/sideNav'
import '@/utils/directive.js'
export default {
	name: 'product',
	data() {
		return {
			currentPage: 1,
			isContent: false,
			prolist: [],
			page: 1,
			per_page: 2,
			page2_total: null,
			currentSortKey: 0,
			currentSortValue: 0,
			currentKeyword: 0,
			navTitle: '',
			navStyle: '',
			flag: false
		}
	},
	components: {
		Headers,
		Footers,
		Menus,
		SideNav
	},
	methods: {
		sortDefault() {
			let key = 0, val = 0
			this.flag = true
      if (key != this.currentSortKey || val != this.currentSortValue) {
        this.currentSortKey = key
        this.currentSortValue = val
        this.getProList(this.flag)
      }
		},
		sortSale() {
			let key = 4, val = 2
			this.flag = true
      if (key != this.currentSortKey || val != this.currentSortValue) {
        this.currentSortKey = key
        this.currentSortValue = val
        this.getProList(this.flag)
      }
		},
		sortDate() {
			let key = 5, val = 2
			this.flag = true
      if (key != this.currentSortKey || val != this.currentSortValue) {
        this.currentSortKey = key
        this.currentSortValue = val
        this.getProList(this.flag)
      }
		},
		sortPrice() {
			let key = 1, val = 2
			this.flag = true
      if (this.currentSortKey == 1) {
        if (this.currentSortValue == 0 || this.currentSortValue == 1) {
          key = 1
          val = 2
        } else {
          key = 1
          val = 1
        }
      } else {
        key = 1
        val = 2
      }

      if (key != this.currentSortKey || val != this.currentSortValue) {
        this.currentSortKey = key
        this.currentSortValue = val
        this.getProList(this.flag)
      }
		},
		sortCredit() {
			let key = 3, val = 2
			this.flag = true
      if (key != this.currentSortKey || val != this.currentSortValue) {
        this.currentSortKey = key
        this.currentSortValue = val
        this.getProList(this.flag)
      }
		},
		getProList(flag) {
			
			if (this.$route.query.type) {
				this.$API.ProductTypeList({
          type: this.$route.query.type
        })
        .then((response)=>{
          if (response.data.error_code == 0) {
						if(response.data.products.length == 0){
							this.isContent = true
							return false;
						}else{
							this.isContent = false
						}
						this.page2_total = response.data.paged.total
		    		this.prolist = response.data.products
		    	}
				})
			}else{
				if (!flag) {
					this.currentSortKey = this.$route.query.sortKey ? this.$route.query.sortKey : 0
					this.currentSortValue = this.$route.query.sortValue ? this.$route.query.sortValue : 0
				}
				
				this.currentKeyword = this.$route.query.keyword ? this.$route.query.keyword : 0
				this.navTitle = this.$route.query.navTitle
				this.navStyle = this.$route.query.navStyle ? this.$route.query.navStyle : 'default'
				let currentCategory = this.$route.query.category
				let params = {}
				if (currentCategory) {
					params.category = currentCategory
				}
				if (this.currentKeyword) {
					params.keyword = this.currentKeyword
				}
				params.sort_key = this.currentSortKey
        params.sort_value = this.currentSortValue
        params.page = this.page
        params.per_page = this.per_page

				this.$API.ProductList(params)
				.then((response)=>{
					if (response.data.error_code == 0) {
						if(response.data.products.length == 0){
							this.isContent = true
							return false;
						}else{
							this.isContent = false
						}
						this.page2_total = response.data.paged.total
		    		this.prolist = response.data.products
		    	}
				})
			}
		},
		handleCurrentChange(val) {
			this.page = val
			this.getProList()
		}
	},
	watch: {
		'$route' (to, from) {
			if ( (to.query.category && from.query.category) && to.query.category != from.query.category || this.$route.query.type) {
				this.page = 1
				this.prolist = []
				this.getProList()
			}
	  }
	},
	mounted() {
		this.getProList()
	}
}
</script>
<style scoped lang="scss">
.product{
	margin: 20px auto 150px;
	.not-content{
		text-align: center; font-size: 16px; color: #111; margin-top: 100px;
	}
	.filter_wrap{
		height: 40px; line-height: 24px; background: #f5f5f5; padding: 8px 20px; margin: 20px 0;
		.filter{
			a{
				display: inline-block; float: left; padding: 0 10px; height: 22px; border: 1px solid #fff; background: #FFF; cursor: pointer;
				i{
					vertical-align: -2px;
				}
				&:hover{
					border-color: #24991E;
				}
				&.active{
					background: #24991E; color: #fff; border: 0; padding: 0 10px;
				}
			}
		}
	}
	.page{
		margin-top: -2px;
	}
	.product_list{
		margin-top: 20px;
		.item{
			width: 295px; border: 1px solid #eee; float: left; margin-right: 10px; margin-bottom: 10px;
			&:nth-child(4n){
				margin-right: 0;
			}
			&:hover{
				border-color: #24991E;
			}
			a{
				display: block;
				img{
					width: 295px; height: 295px; margin-bottom: 10px;
				}
				p{
					padding: 0 10px;
				}
			}
			p{
				line-height: 20px; font-size: 14px; color: #666;
			}
			p.name{
				height: 40px; overflow: hidden; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2;
			}
			p.price{
				font-size: 24px; color: #d2191e; margin-bottom: 10px;
			}
			.go_cart{
				width: 100%; height: 50px; line-height: 50px; color: #24991E; text-align: center; font-size: 20px; border-top: 1px solid #eee; margin-top: 10px;
				i{
					font-size: 20px; margin-right: 5px;
				}
				&:hover{
					background: #24991E; color: #fff; border-top-color: #24991E;
				}
			}
		}
	}
	.page2{
		text-align: right; margin-top: 100px;
	}
}
</style>
<style type="text/css">
.page .el-pagination .btn-prev{
	padding-right: 5px; margin-right: 5px;
}
.page .el-pagination .btn-next{
	padding-left: 5px;
}
</style>