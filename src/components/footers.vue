<template>
	<div>
	  <el-footer height="auto">
	  	<div class="w1210">
	  		<el-row type="flex" class="ft_list" justify="center">
				  <el-col :span="3">
						<dl>
			  			<dt>关于我们</dt>
			  			<dd><a href="" target="_blank">公司简介</a></dd>
			  			<dd><a href="" target="_blank">商城公告</a></dd>
			  			<dd><a href="" target="_blank">新闻中心</a></dd>
			  			<dd><a href="" target="_blank">联系我们</a></dd>
			  		</dl>
				  </el-col>
				  <el-col :span="3">
						<dl>
			  			<dt>消费者保障</dt>
			  			<dd><a href="" target="_blank">保障范围</a></dd>
			  			<dd><a href="" target="_blank">退换货</a></dd>
			  		</dl>
				  </el-col>
				  <el-col :span="3">
						<dl>
			  			<dt>购物指南</dt>
			  			<dd><a href="" target="_blank">新手指南</a></dd>
			  			<dd><a href="" target="_blank">常见问题</a></dd>
			  			<dd><a href="" target="_blank">帮助中心</a></dd>
			  			<dd><a href="" target="_blank">用户协议</a></dd>
			  		</dl>
				  </el-col>
				  <el-col :span="3">
						<dl>
			  			<dt>售后服务</dt>
			  			<dd><a href="" target="_blank">售后保障</a></dd>
			  			<dd><a href="" target="_blank">正品承诺</a></dd>
			  		</dl>
				  </el-col>
				  <el-col :span="3">
						<dl>
			  			<dt>支付方式</dt>
			  			<dd><a href="" target="_blank">线上支付</a></dd>
			  			<dd><a href="" target="_blank">线下支付</a></dd>
			  		</dl>
				  </el-col>
				  <el-col :span="3">
						<dl>
			  			<dt>常见问题</dt>
			  			<dd><a href="" target="_blank">账户问题</a></dd>
			  			<dd><a href="" target="_blank">发票问题</a></dd>
			  			<dd><a href="" target="_blank">发票问题</a></dd>
			  			<dd><a href="" target="_blank">发票问题</a></dd>
			  			<dd><a href="" target="_blank">发票问题</a></dd>
			  		</dl>
				  </el-col>
				  <el-col :span="3">
						<dl>
			  			<dt>配送方式</dt>
			  			<dd><a href="" target="_blank">配送说明</a></dd>
			  			<dd><a href="" target="_blank">运费问题</a></dd>
			  		</dl>
				  </el-col>
				</el-row>
				<div class="ft_list2">
					<img src="static/images/f1.jpg" />
					<img src="static/images/f2.jpg" />
					<img src="static/images/f3.jpg" />
					<img src="static/images/f4.jpg" />
				</div>
	  	</div>
	  	<div class="ft_middle">
	  		<div class="w1210">
	  			<ul class="clearfix">
	  				<li><a href="" target="_blank">网站首页</a>|</li>
	  				<li><a href="" target="_blank">热销商品</a>|</li>
	  				<li><a href="" target="_blank">精品推荐</a>|</li>
	  				<li><a href="" target="_blank">关于我们</a>|</li>
	  				<li><a href="" target="_blank">联系我们</a></li>
	  			</ul>
	  		</div>
	  	</div>
	  	<div class="w1210 ft_bottom">
	  		<p>Copyright © 2015 版权所有 All Rights Reserved</p>
	  		<p>公网安备 34042102000118号</p>
	  		<p>
	  			<img src="static/images/ff1.jpg" />
	  			<img src="static/images/ff2.jpg" />
	  			<img src="static/images/ff3.jpg" />
	  			<img src="static/images/ff4.jpg" />
	  			<img src="static/images/ff5.jpg" />
	  		</p>
	  	</div>
	  </el-footer>
	</div>
</template>

<script>

export default {
  name: 'footers',
  data () {
    return {
      
    }
  }
}
</script>

<style scoped lang="scss">
.el-footer{
	background: #F6F6F6; padding: 0;
	.el-col-3{
		width: 14%;
	}
	.ft_middle{
		background: #e33d3f; height: 35px; line-height: 35px;
		ul{
			display: table; margin: 0 auto;
		}
		li{
			float: left;color: #fff;
			a{
				color: #fff; font-size: 14px; margin: 0 20px; vertical-align: middle;
				&:hover{
					text-decoration: underline;
				}
			}
		}
	}
	.ft_bottom{
		text-align: center; padding: 10px 0 20px;
		p{
			color: #4D4D4D; font-size: 14px; margin-bottom: 10px;
			img{
				margin: 0 5px;
			}
		}
	}
	.ft_list{
		padding: 30px 0;
		.el-col{
			border-right: 1px solid #eee;
			&:last-child{
				border-right: 0;
			}
			dl{
				display: table; margin: 0 auto;
				dt{
					color: #333; font-size: 15px; font-weight: bold; margin-bottom: 5px;
				}
				dd{
					color: #666; line-height: 24px;
					&:hover a{
						color: #EA0000;
					}
				}
			}
		}
	}
	.ft_list2{
		display: table; margin: 0 auto; padding-bottom: 30px;
		img{
			float: left;
		}
	}
}
</style>