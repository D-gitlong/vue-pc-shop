<template>
	<div class="w1210">
	  <el-main class="seller_main">
			<section class="hot_shopping">
				<ul class="clearfix">
					<li>
						<div class="li_img">
							<a href="" target="_blank"><img src="static/images/3.jpg" /></a>
						</div>
						<p class="shop_name"><a href="" target="_blank">樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分</a></p>
						<p class="hot_price clearfix">
							<strong class="fl"><i>￥</i>169.00</strong>
							<a href="" class="fr" target="_blank"><i class="iconfont icon-cart"></i></a>
						</p>
					</li>
					<li>
						<div class="li_img">
							<a href="" target="_blank"><img src="static/images/3.jpg" /></a>
						</div>
						<p class="shop_name"><a href="" target="_blank">樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分</a></p>
						<p class="hot_price clearfix">
							<strong class="fl"><i>￥</i>169.00</strong>
							<a href="" class="fr" target="_blank"><i class="iconfont icon-cart"></i></a>
						</p>
					</li>
					<li>
						<div class="li_img">
							<a href="" target="_blank"><img src="static/images/3.jpg" /></a>
						</div>
						<p class="shop_name"><a href="" target="_blank">樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分</a></p>
						<p class="hot_price clearfix">
							<strong class="fl"><i>￥</i>169.00</strong>
							<a href="" class="fr" target="_blank"><i class="iconfont icon-cart"></i></a>
						</p>
					</li>
					<li>
						<div class="li_img">
							<a href="" target="_blank"><img src="static/images/3.jpg" /></a>
						</div>
						<p class="shop_name"><a href="" target="_blank">樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分</a></p>
						<p class="hot_price clearfix">
							<strong class="fl"><i>￥</i>169.00</strong>
							<a href="" class="fr" target="_blank"><i class="iconfont icon-cart"></i></a>
						</p>
					</li>
					<li>
						<div class="li_img">
							<a href="" target="_blank"><img src="static/images/3.jpg" /></a>
						</div>
						<p class="shop_name"><a href="" target="_blank">樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分</a></p>
						<p class="hot_price clearfix">
							<strong class="fl"><i>￥</i>169.00</strong>
							<a href="" class="fr" target="_blank"><i class="iconfont icon-cart"></i></a>
						</p>
					</li>
					<li>
						<div class="li_img">
							<a href="" target="_blank"><img src="static/images/3.jpg" /></a>
						</div>
						<p class="shop_name"><a href="" target="_blank">樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分樱花树12公分</a></p>
						<p class="hot_price clearfix">
							<strong class="fl"><i>￥</i>169.00</strong>
							<a href="" class="fr" target="_blank"><i class="iconfont icon-cart"></i></a>
						</p>
					</li>
				</ul>
			</section>
	  </el-main>
  </div>
</template>

<script>
export default {
  name: 'sellerMains',
  data () {
    return {
      
    }
  },
  methods: {
  	handleClick() {

  	}
  }
}
</script>

<style lang="scss">
.seller_main{
	.hot_shopping{
		position: relative; margin-bottom: 30px;
		ul{
			li{
				width: 232px; float: left; margin-right: 12px; margin-bottom: 15px;
				&:hover p{
					color: #D21A1E;
				}
				&:nth-child(5n){
					margin-right: 0;
				}
				.li_img{
					margin-bottom: 10px; width: 232px; height: 232px;
				}
				p{
					font-size: 13px; padding: 0 5px;
					strong{
						color: #ea0000; font-size: 16px;
						i{
							font-weight: normal;
						}
					}
				}
				p.shop_name{
					height: 40px; line-height: 20px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; overflow: hidden;
					&:hover a{
						color: #ea0000;
					}
				}
				p.hot_price{
					line-height: 28px;
					a{
						color: #ea0000; font-size: 20px; font-weight: bold;
						i{
							font-size: 20px;
						}
					}
				}
			}
		}
	}
}
.seller_main{
	padding: 0; overflow: inherit; margin-top: 30px;
}
</style>