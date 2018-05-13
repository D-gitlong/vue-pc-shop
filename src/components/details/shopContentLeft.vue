<template>
	<div class="shop_content_left clearfix">
		<el-card class="box-card" style="width: 210px; float: left;">
		  <div slot="header" class="clearfix">
		    <a href="" target="_blank">旗舰店</a>
		  </div>
		  <div class="item">
		    <ul class="clearfix">
		    	<li>商品<br/><span>9.41<i class="iconfont icon-jiantouxiajiang"></i></span></li>
		    	<li>服务<br/><span>9.41<i class="iconfont icon-jiantouxiajiang"></i></span></li>
		    	<li>时效<br/><span>9.41<i class="iconfont icon-jiantouxiajiang"></i></span></li>
		    </ul>
		    <p>
		    	<a href="javascript:;" class="fav"><i class="iconfont icon-dianpu"></i>进店逛逛</a>
		    	<a href="javascript:;" class="fav"><i class="iconfont icon-add"></i>关注店铺</a>
		    </p>
		  </div>
		  
		</el-card>
	</div>
</template>
<script>
export default {

}
</script>
<style scoped lang="scss">
.shop_content_left{
	float: left;
	.item{
		li{
			float: left; color: #999; margin: 0 9px; text-align: center;
			span{
				color: #24991E;
			}
		}
		p{
			margin-top: 15px;
		}
	}
	.fav{
		display: inline-block; border: 1px solid #dedede; height: 24px; line-height: 24px; padding: 0 5px; margin: 0 6px;
		i{
			font-size: 12px; font-weight: bold; margin-right: 2px; color: #000;
		}
		&:hover,&:hover i{
			color: #24991E;
		}
	}
}
</style>
<style type="text/css">
.shop_content_left .el-card__header{
	background: #f5f7fa; padding: 10px 20px;
}
.shop_content_left .el-card__header a{
	font-size: 16px;
}
.shop_content_left .el-card__header a:hover{
	color: #24991E;
}
.shop_content_left .el-card__body{
	padding: 20px 15px;
}
</style>