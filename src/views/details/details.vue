<template>
	<div>
		<headers></headers>
		<div class="details">
			<div class="d_header">
				<div class="w1210">
					<a href="" target="_blank" class="shop_name"><i class="iconfont icon-dianpu"></i>旗舰店</a>
					<span>商品 9.39<i class="iconfont icon-jiantoushangsheng"></i></span>
					<span>服务 9.39<i class="iconfont icon-jiantouxiajiang"></i></span>
					<span>时效 9.39<i class="iconfont icon-jiantouxiajiang"></i></span>
					<span class="line"></span>
					<a href="javascript:;" class="fav"><i class="iconfont icon-add"></i>关注店铺</a>
					<!-- <a href="javascript:;" class="fav"><i class="iconfont icon-add"></i>已关注</a> -->
				</div>
			</div>
			<shop-info></shop-info>
			<hot-shop></hot-shop>
			<shop-content></shop-content>
		</div>
		<footers></footers>
		<side-nav></side-nav>
	</div>
</template>
<script>
import ShopInfo from '@/components/details/shopInfo'
import HotShop from '@/components/details/hotShop'
import ShopContent from '@/components/details/shopContent'
import Headers from '@/components/header/headers'
import Footers from '@/components/footers'
import SideNav from '@/components/sideNav'
export default {
	name: 'detail',
	data() {
		return{

		}
	},
	components: {
		ShopInfo,
		HotShop,
		ShopContent,
		Headers,
		Footers,
		SideNav
	},
	mounted() {
		
	}
}
</script>
<style scoped lang="scss">
.details{
	.d_header{
		border-bottom: 2px solid #24991E; height: 40px; line-height: 40px;
		.shop_name{
			font-weight: bold; margin-right: 10px;
			i{
				margin-right: 5px;
			}
			&:hover{
				color: #24991E;
			}
		}
		.fav{
			display: inline-block; border: 1px solid #dedede; height: 24px; line-height: 24px; padding: 0 10px;
			i{
				vertical-align: -1px; font-size: 12px; font-weight: bold; margin-right: 5px; color: #24991E;
			}
			&:hover{
				color: #24991E;
			}
		}
		span{
			color: #999; margin-right: 10px; display: inline-block;
			i{
				color: #24991E;
			}
		}
		span.line{
			display: inline-block; width: 1px; height: 12px; background: #dcdcdc;
		}
		.w1210{
			text-align: right;
		}
	}
}	
</style>