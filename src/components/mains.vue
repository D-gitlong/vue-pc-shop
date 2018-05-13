<template>
	<div class="w1210">
	  <el-main>
			<section class="hot_shopping">
				<a :href="'#/product?type='+act" target="_blank" class="hot_more">更多>></a>
				<el-tabs v-model="act" @tab-click="handleClick">
			    <el-tab-pane label="热卖商品" name="hot">
						<ul class="clearfix">
							<li v-for="item in hotProduct" :key="item.id">
								<a :href="'#/details/'+item.id" target="_blank">
									<div class="li_img"><img class="img-center" v-lazy="item.default_photo.large" /></div>
									<p class="hot_price"><strong><i>￥</i>{{item.current_price | fmoney}}</strong></p>
									<p>{{item.name}}</p>
								</a>
							</li>
						</ul>
			    </el-tab-pane>
			    <el-tab-pane label="精品推荐" name="good">
						<ul class="clearfix">
							<li v-for="item in goodProduct" :key="item.id">
								<a :href="'#/details/'+item.id" target="_blank">
									<div class="li_img"><img class="img-center" v-lazy="item.default_photo.large" /></div>
									<p class="hot_price"><strong><i>￥</i>{{item.current_price | fmoney}}</strong></p>
									<p>{{item.name}}</p>
								</a>
							</li>
						</ul>
			    </el-tab-pane>
			  </el-tabs>
			</section>
			<section class="cate clearfix" v-for="(item,index) in typeList" :key="item.id">
				<h3><strong>{{index+1}}F</strong>{{item.name}}</h3>
				<div class="cate_left fl">
					<div class="sub_cate">
						<div class="sub_cate_link">
							<a href="javascript:;" @click="searchKey(childItem)" :key="childItem.id" v-for="childItem in item.hot_keyword">{{childItem}}</a>
						</div>
						<!-- <a href="javascript:;" @click="searchKey(item)" class="sub_cate_more">更多</a> -->
					</div>
					<div class="recommend">
						<a :href="'#/details/'+item.first_goods.id" target="_blank">
							<div class="info">
								<p class="tit">{{item.first_goods.name}}</p>
								<p class="re_price">￥{{item.first_goods.current_price | fmoney}}</p>
							</div>
							<div class="re_img">
								<img class="img-center" v-lazy="item.first_goods.default_photo.large">
							</div>
						</a>
					</div>
				</div>
				<div class="cate_middle fl">
					<a :href="'#/details/'+item.latest_goods.id" target="_blank">
						<div class="m_img"><img class="img-center" v-lazy="item.latest_goods.default_photo.large" /></div>
						<div class="m_info">
							<p>{{item.latest_goods.name}}</p>
							<p class="m_price"><i>￥</i>{{item.latest_goods.current_price | fmoney}}</p>
						</div>
					</a>
				</div>
				<ul class="cate_right fl">
					<li v-for="p in item.list" :key="p.id">
						<a :href="'#/details/'+p.id" target="_blank">
							<div class="r_img"><img class="img-center" v-lazy="p.default_photo.large" /></div>
							<p class="product_name">{{p.name}}</p>
							<p class="r_price">价格：<i>￥</i><span>{{p.current_price | fmoney}}</span></p>
						</a>
					</li>
				</ul>
			</section>
			
	  </el-main>
  </div>
</template>

<script>
import '../utils/directive.js'
export default {
  name: 'mains',
  data () {
    return {
      act: 'hot',
      hotProduct: [],
      goodProduct: [],
      typeList: []
    }
  },
  created() {
  	this.getRecommentProduct()
  	this.getTypeList()
  },
  methods: {
  	handleClick() {

  	},
  	toProduct(m) {
			let routeData = this.$router.resolve({ 
        path: 'product', 
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
      window.open(routeData.href, '_blank');
		},
  	searchKey(keys) {
			let routeData = this.$router.resolve({ 
        path: 'product', 
        query: { 
          sortKey: 0,
          sortValue: 0,
          keyword: keys,
          category: null,
          navTitle: keys,
          navStyle: 'search'
        } 
      })
      window.open(routeData.href, '_blank')
  	},
  	getRecommentProduct() {
  		this.$API.RecommentProduct()
  		.then((response)=>{
  			if (response.data.error_code == 0) {
  				this.hotProduct = response.data.hot_products.slice(0,5)
  				this.goodProduct = response.data.good_products.slice(0,5)
  			}
  		})
  	},
  	getTypeList() {
  		this.$API.TypeList()
  		.then((response)=>{
  			if (response.data.error_code == 0) {
  				this.typeList = response.data.list
  			}
  			// console.log(response)
  		})
  	}
  }
}
</script>

<style scoped lang="scss">

</style>
<style lang="scss">
.hot_shopping{
	position: relative; margin-bottom: 30px;
	.hot_more{
		position: absolute; right: 0; top: 0; display: block; height: 40px;line-height: 40px; font-size: 16px;width: 70px;text-align: center; z-index: 5;
		&:hover{
			color: #24991E;
		}
	}
	.el-tabs__item{
		font-size: 19px;
	}
	.el-tabs__nav-wrap::after{
		background: url(../assets/images/bg/t1b.jpg) repeat-x;
	}
	.el-tab-pane{
		ul{
			li{
				width: 232px; float: left; margin-right: 12px;
				&:hover p{
					color: #D21A1E;
				}
				&:last-child{
					margin-right: 0;
				}
				.li_img{
					margin-bottom: 10px; width: 232px; height: 232px;
				}
				p{
					text-align: center; height: 25px; line-height: 25px; font-size: 13px;
					strong{
						min-width: 115px; padding: 0 12px; background: #60ae00; border-radius: 25px; display: inline-block; color: #fff; font-size: 16px;
						i{
							font-weight: normal;
						}
					}
				}
				p.hot_price{
					background: url(../assets/images/bg/t1b.jpg) center repeat-x; margin-bottom: 5px;
				}
			}
		}
	}
}
.cate{
	position: relative; margin-bottom: 30px;
	h3{
		padding-bottom: 8px; border-bottom: 1px solid #60ae00; font-size: 19px; color: #404040;
		strong{
			font-size: 28px; color: #333; font-family: "黑体"; vertical-align: middle; margin-right: 12px;
		}
	}
	.cate_left{
		width: 220px; position: relative; overflow: hidden;
		.sub_cate{
			padding: 20px;
			.sub_cate_link{
				height: 138px; overflow: hidden; margin-bottom: 10px;
				a{
					color: #555; font-size: 14px; display: inline-block; margin: 0 5px; padding: 0 5px; line-height: 28px;
					&:hover{
						color: #24991E;
					}
				}
			}
			.sub_cate_more{
				width: 130px; height: 30px; line-height: 30px; border-radius: 2px; display: block; text-align: center; border: 1px solid #60ae00; color: #24991E; font-size: 14px; margin: 0 auto;
				&:hover{
					color: #fff; background: #60ae00;
				}
			}
		}
		.recommend{
			position: relative; left: 0; top: 0; width: 220px; height: 377px; border: 1px solid #eee; border-top: 0; overflow: hidden;
			a{
				display: block; transition: all .5s; position: relative; left: 0;
				&:hover{
					left: -5px;
				}
			}
			.info{
				position: absolute; left: 20px; top: 20px; 
				p{
					line-height: 28px;
				}
				.tit{
					font-size: 16px; font-weight: bold;
				}
				.sub_tit{
					color: #555; font-size: 14px;
				}
				.re_price{
					font-size: 16px; color: #e60e08; font-weight: bold;
				}
			}
			.re_img{
				width: 220px; height: 376px;
			}
		}
	}
	.cate_middle{
		width: 330px; height: 565px; border: 1px solid #eee; border-left: 0; position: relative; overflow: hidden;
		&:hover a{
			left: -5px;
		}
		a{
			display: block; transition: all .5s; position: relative; left: 0; top: 0;
			.m_img{
				width: 330px; height: 565px;
			}
			.m_info{
				position: absolute; right: 20px; bottom: 60px;
				p{
					font-size: 16px; font-weight: bold; line-height: 32px;
				}
				p.m_price{
					color: #e60e08; font-size: 22px;
				}
			}
		}
	}
	.cate_right{
		width: 660px;
		li{
			float: left; width: 221px; height: 283px; margin-bottom: -1px; margin-left: -1px;
			&:hover .r_img{
				margin-left: -5px;
			}
			a{
				display: block; width: 221px; height: 283px; border: 1px solid #eee; overflow: hidden;
				&:hover .product_name{
					color: #EA0000;
				}
				.r_img{
					width: 219px; height: 219px; transition: all .5s;
				}
				p{
					line-height: 25px; height: 25px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 13px; padding: 0 20px;
				}
				p.product_name{
					margin: 5px 0 0 0;
				}
				.r_price{
					color: #999;
					i{
						font-size: 16px;color: #EA0000;
					}
					span{
						font-size: 18px;color: #EA0000;
					}
				}
			}
		}
	}
}
.w1210 .el-main{
	padding: 0; overflow: inherit; margin-top: 30px; margin-bottom: 100px;
}
</style>