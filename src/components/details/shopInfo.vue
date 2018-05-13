<template>
	<div class="shop_info clearfix">
		<div class="w1210">
			<div class="shop_left fl">
				<div class="bigimg" v-if="product.photos && product.photos.length>0">
					<ul>
						<li v-for="(item,index) in product.photos"
							:key="index"
							v-show="index == i">
							<img-zoom :src="item.large" width="448" height="448" :bigsrc="item.large" :configs="configs"></img-zoom>
						</li>
					</ul>
				</div>
				<div class="slide">
					<a @click="isPrevDisabled && prev()" class="prev"><i class="el-icon-caret-left"></i></a>
					<div class="slide_inner">
						<ul class="clearfix" ref="ulW" v-if="product.photos && product.photos.length>0">
							<li v-for="(item,index) in product.photos"
								:key="index"
								@mouseover="imgHover(index)"
								@mouseout="imgOut(index)">
								<img :src="item.thumb">
							</li>
						</ul>
					</div>
					<a @click="isNextDisabled && next()" class="next"><i class="el-icon-caret-right"></i></a>
				</div>
			</div>
			<div class="shop_middle fl">
				<h3 v-cloak>{{product.name}}</h3>
				<div class="info_box">
					<dl class="price">
						<dt>价&nbsp;&nbsp;&nbsp;格</dt>
						<dd><i>￥</i>{{price | fmoney}}</dd>
					</dl>
					<dl>
						<dt>税&nbsp;&nbsp;&nbsp;费</dt>
						<dd>商家承担</dd>
					</dl>
					<dl>
						<dt>优&nbsp;&nbsp;&nbsp;惠</dt>
						<dd><span class="bg">加价购</span>满49元以折扣价在购物车换购热销商品，满59元以折车换购热销商品，满59元以折</dd>
					</dl>
				</div>
				<div class="info_bottom">
					<dl class="address_box">
						<dt>库存量</dt>
						<dd v-if="currentStock">{{currentStock.stock_number}}</dd>
						<dd v-else>{{product.good_stock}}</dd>
					</dl>
					<dl class="line">
						<dt>运费</dt>
						<dd>包邮</dd>
					</dl>
					<dl class="item_box clearfix" :key="property.id" v-if="product.properties && product.properties.length>0" v-for="property in product.properties">
						<dt>{{property.name}}</dt>
						<dd>
							<div class="item" @click="touchAttr(value,property)" :class="{selected: isAttrSelected(value)}" :key="value.id" v-for="value in property.attrs">
								<b></b>
								<a href="javascript:;">
									<span>{{value.attr_name}}</span>
								</a>
							</div>
						</dd>
					</dl>
					<div class="cart_box">
						<el-input-number v-model="num" controls-position="right" :min="1" size="small"></el-input-number>
						<a href="javascript:;" @click="addToCar()" class="cart_btn">加入购物车</a>
					</div>
					<dl class="clearfix line">
						<dt>服务</dt>
						<dd>
							<ol>
								<li><i class="iconfont icon-1011"></i>正品保障</li>
								<li><i class="iconfont icon-qian"></i>假一赔十</li>
								<li><i class="iconfont icon-101"></i>售后保障</li>
							</ol>
						</dd>
					</dl>
					<dl class="clearfix">
						<dt>说明</dt>
						<dd>
							<ol>
								<li><i class="iconfont icon-pingbi1"></i>不支持7天无理由退款</li>
								<li><i class="iconfont icon-gouhao"></i>京东全球购售后服务</li>
							</ol>
						</dd>
					</dl>
				</div>
				
			</div>
			<div class="shop_right fr">
				<div class="tit">
					<h3>看了还看</h3> <span></span>
				</div>
				<ul>
					<li>
						<a href="" target="_blank">
							<img src="static/images/13.jpg" />
							<i>￥135.00</i>
							<p>爱他美（Aptamil） 【含税】 德国爱他美Aptamil新生儿/婴儿婴幼儿配方进口牛奶奶粉 Pre段（0-3个月 800g）日期19年1月</p>
						</a>
					</li>
					<li>
						<a href="" target="_blank">
							<img src="static/images/13.jpg" />
							<i>￥135.00</i>
							<p>爱他美（Aptamil） 【含税】 德国爱他美Aptamil新生儿/婴儿婴幼儿配方进口牛奶奶粉 Pre段（0-3个月 800g）日期19年1月</p>
						</a>
					</li>
					<li>
						<a href="" target="_blank">
							<img src="static/images/13.jpg" />
							<i>￥135.00</i>
							<p>爱他美（Aptamil） 【含税】 德国爱他美Aptamil新生儿/婴儿婴幼儿配方进口牛奶奶粉 Pre段（0-3个月 800g）日期19年1月</p>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState ,mapActions } from 'vuex'
import imgZoom from '../imgZoom'
import '@/utils/directive'
export default {
	data() {
		return{
			configs: {
        width:542,
        height:542,
        maskWidth:200,
        maskHeight:200,
        maskColor:'#000',
        maskOpacity:0.5,
        id: '.bigimg',
      },
      index: 0,
      i: 0,
      isPrevDisabled: true,
      isNextDisabled: true,
      price: 0,
      cartAmount: 0,
      currentStock: null,
      product: {},
      num: 1,
      currentAttrs: [],
      optionalAttrs: []
		}
	},
	components: {
		imgZoom
	},
	mounted() {
		this.getDetails()
	},
	updated() {
		this.$store.state.cart.num = this.num
	},
	methods: {
		...mapActions(['addToCar']),
		getDetails() {
			this.$API.ProductDetails({
				product: this.$route.params.id
			}).then((response)=>{
				if (response.data.error_code == 0) {
					// console.log(response.data.product)
					this.product = response.data.product
					this.$store.state.cart.product = response.data.product
					this.$nextTick(() => {
            this.silde()
            this.$refs.ulW.children[this.i].style.opacity = 1
          });
          this.product.properties.sort(function(a, b){
            return a.is_multiselect - b.is_multiselect;
          })
		    	let defaultAttrIds = [];
          let defaultAttrStock = null;
          
          for ( let i = 0; i < this.product.properties.length; ++i ) {
            let property = this.product.properties[i];
             
            if ( !property.is_multiselect ) {
              defaultAttrIds.push( property.attrs[0].id );
            }
          }

          defaultAttrIds.sort(function(a, b){
            return a - b;
          })

          if ( defaultAttrIds.length ) {
            let stockSelector = defaultAttrIds.join('|');
            for ( let i = 0; i < this.product.stock.length; ++i ) {

              let goods_attr = this.product.stock[i].goods_attr;
              let goods_attr_array =  goods_attr.split("|");

              goods_attr_array.sort(function(a, b){
                return a - b;
              })
              
             let goods_attr_str = goods_attr_array.join('|');
              if ( goods_attr_str == stockSelector ) {
                defaultAttrStock = this.product.stock[i]
                break;
              }
            }
          }
          this.currentAttrs = defaultAttrIds
          this.currentStock = defaultAttrStock
          this.$store.state.cart.currentAttrs = defaultAttrIds
          this.$store.state.cart.currentStock = defaultAttrStock
				}
				this.refreshPrice()
			})
		},
		isAttrSelected(attr) {
			if ( attr.is_multiselect ) {
        return this.optionalAttrs.indexOf(attr.id) == -1 ? false : true;
      } else {
        return this.currentAttrs.indexOf(attr.id) == -1 ? false : true;
      }
		},
		refreshPrice() {
			let attrs = [].concat(this.currentAttrs).concat(this.optionalAttrs)
      this.price = parseFloat(this.product.current_price)

      for ( let i = 0; i < this.product.properties.length; ++i ) {
        let property = this.product.properties[i];
        for ( let j in property.attrs ) {              
          let index = attrs.indexOf( property.attrs[j].id )
          if ( -1 != index && property.attrs[j].attr_price)  {
          	this.price += parseFloat(property.attrs[j].attr_price)
          	
          }              
        }
      }
      this.$store.state.cart.price = this.price
		},
		touchAttr(attr,property) {
			if (!this.product) return false
			let product = this.product
			if ( attr.is_multiselect ) {
        var attrs = [].concat( this.optionalAttrs );
        var index = attrs.indexOf( attr.id );
        if ( -1 == index ) {
          attrs.push( attr.id );
        } else {
          attrs.splice( index, 1 );
        }
        this.optionalAttrs = attrs;
        this.$store.state.cart.optionalAttrs = attrs
        this.refreshPrice();
      } 
      else {
        let stock = null;
        let attrs = [].concat( this.currentAttrs );
        let index = attrs.indexOf( attr.id );
        attrs.push( attr.id );
        for ( let i in property.attrs ) {
          if ( property.attrs[i].id != attr.id ) {
            let index = attrs.indexOf( property.attrs[i].id );
            if ( -1 != index ) {
              attrs.splice( index, 1 );
            }
          }
        }
        attrs = attrs.filter(function( attr, index, self ){
          return self.indexOf(attr) === index;
        });
        attrs.sort(function(a, b){
          return a - b;
        })
        if ( attrs.length ) {
          let key = attrs.join('|');
          for ( let i = 0; i < product.stock.length; ++i ) {
            let goods_attr = product.stock[i].goods_attr;
            let goods_attr_array =  goods_attr.split("|");

            goods_attr_array.sort(function(a, b){
              return a - b;
            })
            let goods_attr_str = goods_attr_array.join('|');
            if ( goods_attr_str == key ) {
              stock = product.stock[i];
              break;
            }
          }
        }
        this.currentAttrs = attrs;
        this.currentStock = stock;
        this.$store.state.cart.currentAttrs = attrs
        this.$store.state.cart.currentStock = stock
        this.refreshPrice();
      }
		},
		silde() {
			let len = this.$refs.ulW.children.length,
					liW = this.$refs.ulW.children[0].clientWidth
			this.$refs.ulW.style.width = (len * liW) + 'px'
		},
		prev() {
			let len = this.$refs.ulW.children.length
			if (len <= 5) { return false }
			this.index--
			let left = this.$refs.ulW.children[0].clientWidth * this.index
			this.$refs.ulW.style.left = -left + 'px'
			if (this.index == 0) {
				this.isPrevDisabled = false
			}
			this.isNextDisabled = true
		},	
		next() {
			let len = this.$refs.ulW.children.length
			if (len <= 5) { return false }
			this.index++
			let left = this.$refs.ulW.children[0].clientWidth * this.index
			this.$refs.ulW.style.left = -left + 'px'
			if (this.index == (len-5)) {
				this.isNextDisabled = false
			}
			this.isPrevDisabled = true
		},
		imgHover(j) {
			for (var i = 0; i < this.$refs.ulW.children.length; i++) {
				this.$refs.ulW.children[i].style.opacity = '0.5'
			}
			this.$refs.ulW.children[j].style.opacity = 1
			this.i = j
		},
		imgOut(j) {
			for (var i = 0; i < this.$refs.ulW.children.length; i++) {
				this.$refs.ulW.children[i].style.opacity = '0.5'
			}
			this.$refs.ulW.children[j].style.opacity = 1
		}
	}
}
</script>
<style scoped lang="scss">
.shop_info{
	margin: 30px 0 0 0;
	.shop_left{
		margin-right: 15px;
	}
	.bigimg{
		width: 450px; height: 450px; border: 1px solid #eee; position: relative;
		li{
			position: absolute; left: 0; top: 0; cursor: move;
		}
	}
	.slide{
		width: 450px; height: 75px; position: relative; margin-top: 15px;
		.prev, .next{
			display: inline-block; position: absolute; top: 0; width: 16px; height: 75px; background: #f8f8f8; border: 1px solid #eee; padding-top: 32px; cursor: pointer; z-index: 5;
		}
		.prev{
			left: 0;
		}
		.next{
			right: 0;
		}
		.slide_inner{
			width: 404px; height: 75px; overflow: hidden; position: relative; left: 23px;
			ul{
				position: absolute; left: 0; top: 0;
				li{
					float: left; width: 81px; height: 75px; padding: 0 3px; cursor: pointer; opacity: .5;
				}
			}
		}
	}
	.shop_middle{
		width: 525px;
		h3{
			font-size: 16px; font-weight: 700; color: #000; line-height: 24px; margin-bottom: 20px;
		}
		.info_box{
			padding: 20px 20px 8px; margin-bottom: 10px; background: #f8f8f8;
		}
		dl{
			margin-bottom: 10px;
			dt{
				float: left; width: 50px; color: #939393; line-height: 25px;
			}
			dd{
				margin-left: 50px; line-height: 25px;
				.bg{
					color: #fff; background: #e33d3f; padding: 2px 3px; margin-right: 10px; display: inline-block; line-height: 15px;
				}
			}
		}
		.price{
			dt{
				height: 35px; line-height: 35px;
			}
			dd{
				font-weight: 700; color: #dc1d20; font-size: 30px; line-height: normal;
				i{
					font-size: 26px;
				}
			}
		}
		dl.line{
			border-bottom: 1px solid #eee; padding-bottom: 15px;
			dd{ font-size: 14px; }
		}
		.info_bottom{
			padding-left: 20px;
			dl{
				margin-bottom: 15px;
			}
			.address_box{
				dd{ font-size: 14px;}
			}
			.item_box{
				margin-top: 18px; margin-bottom: 30px;
				dt{
					line-height: 44px;
				}
				.item{
					float: left; color: #666; background-color: #FFF; margin-right: 7px; margin-bottom: 4px; position: relative;
					b{
						display: none; position: absolute; bottom: 1px; right: 1px; width: 10px; height: 10px; background: url(../../assets/images/bg/bg.png) 0 0 no-repeat;
					}
					a{
						border: 1px solid #ccc; display: block; white-space: nowrap; text-decoration: none; padding: 1px;
						img{
							width: 40px; height: 40px;
						}
						span{
							margin: 0 8px;
						}
					}
					&:hover a{
						padding: 0; border: 2px solid #24991E;
					}
				}
				.item.selected{
					b{
						display: block;
					}
					a{
						border: 2px solid #24991E; padding: 0;
					}
				}
			}
			.cart_box{
				margin-bottom: 15px;
				.cart_btn{
					display: inline-block; height: 50px; line-height: 50px; padding: 0 50px; font-size: 18px; background-color: #e33d3f; color: #fff; border-radius: 2px;
				}
			}
			ol{
				li{
					float: left; margin-right: 20px; color: #939393;
					i{
						vertical-align: middle; margin-right: 2px;
					}
				}
			}
		}
	}
	.shop_right{
		width: 170px; padding: 18px 20px 16px; border: 1px solid #dadada;
		.tit{
			position: relative; line-height: 16px; font-size: 12px; color: #000; font-weight: 400; text-align: center;
			h3{
				position: relative; z-index: 2; display: inline-block; background: #fff; padding: 0 10px; font-size: 14px; font-weight: bold;
			}
			span{
				position: absolute; z-index: 1; left: 0; right: 0; top: 8px; height: 1px; background: #f2f2f2;
			}
		}
		ul{
			li{
				position: relative; padding: 10px 0;
				a{
					display: block;
					img{
						width: 128px; height: 128px;
					}
					i{
						position: absolute; left: 0; top: 118px; line-height: 20px; background: #fff; opacity: 0.9; padding: 0 10px;
					}
					p{
						padding-top: 16px; height: 51px; overflow: hidden;
					}
					&:hover p{
						color: #24991E;
					}
				}
			}
		}
	}
}
</style>
<style>
.shop_middle .el-input__inner{
	border-radius: 2px;
}
.cart_box .el-input-number--small{
	width: 100px; float: left; margin-right: 10px;
}
.cart_box .el-input-number--small .el-input-number__decrease, .cart_box .el-input-number--small .el-input-number__increase{
	font-size: 24px;
}
.cart_box .el-input--small .el-input__inner{
	height: 50px; line-height: 50px;
}
.shop_middle .el-input--suffix .el-input__inner{
	padding-right: 10px;
}
</style>