<template>
	<div class="shop_content_right">
		<div class="fr right_info">
			<a href="javascript:;" @click="addToCar()" class="cart_btn">加入购物车</a>
			<span v-if="price"><i>￥</i>{{price | fmoney}}</span>
		</div>
		<el-tabs type="border-card" class="card_commont" style="width: 990px;">
		  <el-tab-pane label="商品详情">
				<!-- <ul class="parameter clearfix">
					<li>商品名称：爱他美（Aptamil） 【含税】英国Aptamil爱他美 婴儿/婴幼儿 进口奶粉 白金版婴幼儿奶粉1段(0-6个月）日期到19年2月</li>
					<li>商品编号：1994069606</li>
					<li>店铺：<a href="" target="_blank">HIUK母婴海外旗舰店</a></li>
					<li>商品毛重：1.0kg</li>
					<li>商品产地：英国</li>
					<li>货号：YIAP001 </li>
					<li>适用年龄：0-6个月</li>
					<li>净含量：801-1000g</li>
					<li>国产/进口：进口</li>
					<li>奶源地：英国</li>
					<li>段位：1段</li>
				</ul> -->
				<div class="real_content" v-html="product.goods_desc"></div>
		  </el-tab-pane>
		  <el-tab-pane label="评价">
				<div class="comment clearfix">
					<div class="rate fl">
						<p class="tit">好评度</p>
						<strong>100<span>%</span></strong>
						<p>100人评价</p>
					</div>
					<div class="percent fl">
						<dl>
							<dt>好评<span>（100%）</span></dt>
							<dd><el-progress :percentage="80" :stroke-width="12" :show-text="false" color="#67c23a"></el-progress></dd>
						</dl>
						<dl>
							<dt>中评<span>（0%）</span></dt>
							<dd><el-progress :percentage="10" :stroke-width="12" :show-text="false" color="#67c23a"></el-progress></dd>
						</dl>
						<dl>
							<dt>差评<span>（0%）</span></dt>
							<dd><el-progress :percentage="10" :stroke-width="12" :show-text="false" color="#67c23a"></el-progress></dd>
						</dl>
					</div>
					
				</div>
				<el-tabs type="border-card" class="card_commont2" style="width: 990px;" @tab-click="toTab">
				  <el-tab-pane label="全部评价">
						<ul class="commont_list" v-if="comments && comments.length>0">
							<li class="clearfix" :key="comment.id" v-for="comment in comments">
								<div class="column column1">
									<p>{{comment.created_at | formatDate}}</p>
								</div>
								<div class="column column2">{{comment.content|| '&nbsp;'}}</div>
								<div class="column column3">{{comment.is_anonymous ? '匿名用户' : comment.author.nickname}}</div>
							</li>
						</ul>
						<div class="no_commont" v-else>暂无评价</div>
						<el-pagination class="page" v-if="comments && comments.length>0"
						  @current-change="handleCurrentChange"
						  background
						  :page-size="per_page"
						  layout="prev, pager, next"
						  :total="total">
						</el-pagination>
				  </el-tab-pane>
				  <el-tab-pane label="好评">
						<ul class="commont_list" v-if="comments && comments.length>0">
							<li class="clearfix" :key="comment.id" v-for="comment in comments">
								<div class="column column1">
									<p>{{comment.created_at | formatDate}}</p>
								</div>
								<div class="column column2">{{comment.content|| '&nbsp;'}}</div>
								<div class="column column3">{{comment.is_anonymous ? '匿名用户' : comment.author.nickname}}</div>
							</li>
						</ul>
						<div class="no_commont" v-else>暂无评价</div>
						<el-pagination class="page" v-if="comments && comments.length>0"
						  @current-change="handleCurrentChange"
						  background
						  :page-size="per_page"
						  layout="prev, pager, next"
						  :total="total">
						</el-pagination>
				  </el-tab-pane>
				  <el-tab-pane label="中评">
						<ul class="commont_list" v-if="comments && comments.length>0">
							<li class="clearfix" :key="comment.id" v-for="comment in comments">
								<div class="column column1">
									<p>{{comment.created_at | formatDate}}</p>
								</div>
								<div class="column column2">{{comment.content|| '&nbsp;'}}</div>
								<div class="column column3">{{comment.is_anonymous ? '匿名用户' : comment.author.nickname}}</div>
							</li>
						</ul>
						<div class="no_commont" v-else>暂无评价</div>
						<el-pagination class="page" v-if="comments && comments.length>0"
						  @current-change="handleCurrentChange"
						  background
						  :page-size="per_page"
						  layout="prev, pager, next"
						  :total="total">
						</el-pagination>
				  </el-tab-pane>
				  <el-tab-pane label="差评">
						<ul class="commont_list" v-if="comments && comments.length>0">
							<li class="clearfix" :key="comment.id" v-for="comment in comments">
								<div class="column column1">
									<p>{{comment.created_at | formatDate}}</p>
								</div>
								<div class="column column2">{{comment.content|| '&nbsp;'}}</div>
								<div class="column column3">{{comment.is_anonymous ? '匿名用户' : comment.author.nickname}}</div>
							</li>
						</ul>
						<div class="no_commont" v-else>暂无评价</div>
						<el-pagination class="page" v-if="comments && comments.length>0"
						  @current-change="handleCurrentChange"
						  background
						  :page-size="per_page"
						  layout="prev, pager, next"
						  :total="total">
						</el-pagination>
				  </el-tab-pane>
				</el-tabs>
		  </el-tab-pane>
		  <el-tab-pane class="service_info" label="服务说明">
		  	<h3>这里是标题</h3>
				<el-collapse v-model="activeNames" @change="handleChange">
				  <el-collapse-item title="一致性 Consistency" name="1">
				    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
				    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
				  </el-collapse-item>
				  <el-collapse-item title="反馈 Feedback" name="2">
				    <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
				    <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
				  </el-collapse-item>
				  <el-collapse-item title="效率 Efficiency" name="3">
				    <div>简化流程：设计简洁直观的操作流程；</div>
				    <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
				    <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
				  </el-collapse-item>
				  <el-collapse-item title="可控 Controllability" name="4">
				    <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
				    <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
				  </el-collapse-item>
				</el-collapse>
		  </el-tab-pane>
		  <el-tab-pane class="shop_recommend" label="同店推荐">
				<ul class="clearfix">
					<li>
						<a href="" target="_blank">
							<img src="static/images/17.jpg" />
							<p>爱他美（Aptamil） 澳洲 爱他美金装新生儿//婴幼儿进口奶粉900g 新西兰可瑞康 金装3段（1-2岁)900g日期到19年1月</p>
							<span>￥108.00</span>
						</a>
					</li>
					<li>
						<a href="" target="_blank">
							<img src="static/images/17.jpg" />
							<p>爱他美（Aptamil） 澳洲 爱他美金装新生儿//婴幼儿进口奶粉900g 新西兰可瑞康 金装3段（1-2岁)900g日期到19年1月</p>
							<span>￥108.00</span>
						</a>
					</li>
					<li>
						<a href="" target="_blank">
							<img src="static/images/17.jpg" />
							<p>爱他美（Aptamil） 澳洲 爱他美金装新生儿//婴幼儿进口奶粉900g 新西兰可瑞康 金装3段（1-2岁)900g日期到19年1月</p>
							<span>￥108.00</span>
						</a>
					</li>
					<li>
						<a href="" target="_blank">
							<img src="static/images/17.jpg" />
							<p>爱他美（Aptamil） 澳洲 爱他美金装新生儿//婴幼儿进口奶粉900g 新西兰可瑞康 金装3段（1-2岁)900g日期到19年1月</p>
							<span>￥108.00</span>
						</a>
					</li>
					<li>
						<a href="" target="_blank">
							<img src="static/images/17.jpg" />
							<p>爱他美（Aptamil） 澳洲 爱他美金装新生儿//婴幼儿进口奶粉900g 新西兰可瑞康 金装3段（1-2岁)900g日期到19年1月</p>
							<span>￥108.00</span>
						</a>
					</li>
					<li>
						<a href="" target="_blank">
							<img src="static/images/17.jpg" />
							<p>爱他美（Aptamil） 澳洲 爱他美金装新生儿//婴幼儿进口奶粉900g 新西兰可瑞康 金装3段（1-2岁)900g日期到19年1月</p>
							<span>￥108.00</span>
						</a>
					</li>
				</ul>
		  </el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import '@/utils/directive'
export default {
	data() {
		return {
			activeNames: ['1'],
			comments: [],
			page: 1,
			per_page: 1,
			total: 0
		}
	},
	computed: {
		price() { return this.$store.state.cart.price },
		product() { return this.$store.state.cart.product }
	},
	mounted() {
		this.getComment()
	},
	methods: {
		...mapActions(['addToCar']),
		getComment(i) {
			this.$API.ProductComment({
				product: this.$route.params.id,
        grade: i,
        page: this.page,
        per_page: this.per_page
			}).then((response)=>{
				// console.log(response)
				if (response.data.error_code == 0) {
					this.comments = response.data.reviews
					this.total = response.data.paged.total
				}
			})
		},
		handleCurrentChange(val) {
			this.page = val
			this.getComment()
		},
		toTab(tab) {
			let i = 0
			if (tab.index == 1) {
				i = 3
			}else if(tab.index == 2) {
				i = 2
			}else if(tab.index == 3) {
				i = 1
			}else{
				i = 0 
			}
			this.getComment(i)
		},
		handleChange(val) {
		  console.log(val);
		}
	}
}
</script>
<style scoped lang="scss">
.shop_content_right{
	float: right; position: relative;
	.right_info{
		position: absolute; right: 0; top: 0; z-index: 5;
		span{
			margin-right: 8px; color: #dc1d20; font-size: 26px; font-weight: bold; line-height: 58px; float: right;
			i{
				font-size: 18px;
			}
		}
		.cart_btn{
			display: inline-block; height: 58px; line-height: 58px; width: 200px; text-align: center; color: #fff; background: #e33d3f; float: right; font-size: 18px;
		}
	}
	
	.parameter{
		border-bottom: 1px solid #eee; padding-bottom: 25px;
		li{
			white-space: nowrap; text-overflow: ellipsis; overflow: hidden;width: 300px; padding-left: 20px; float: left; margin-bottom: 5px; color: #666;
		}
	}
	.real_content{
		padding-top: 25px; overflow: hidden;
		table{
			width: 100%!important;
		}
	}
	.comment{
		margin-left: 15px;
		.rate{
			width: 200px; padding-left: 15px;
			p{
				color: #999;
			}
			p.tit{
				color: #35383a; font-weight: bold; margin-bottom: 10px;
			}
			strong{
				font: normal 46px/30px arial; color: #24991E;
				span{
					font-size: 24px;
				}
			}
		}
		.percent{
			width: 300px;
			dl{
				line-height: 28px; font-size: 14px;
			}
			dt{
				width: 100px; display: inline-block;
				span{
					color: #9C9A9C;
				}
			}
			dd{
				width: 100px; display: inline-block;
			}
		}
	}
	.card_commont2{
		margin-top: 50px;
		.no_commont{
			text-align: center; font-size: 14px; color: #333;
		}
		.commont_list{
			li{
				border-bottom: 1px solid #eee; padding-bottom: 20px; padding-top: 20px;
				.column{
					float: left; margin-right: 15px; line-height: 20px; 
				}
				.column1{
					width: 180px; color: #999;
					p{
						margin-bottom: 10px;
					}
				}
				.column2{
					width: 570px;
				}
				.column3{
					width: 130px; color: #777;
					img{
						width: 25px; height: 25px; border-radius: 50%; margin-right: 10px;
					}
				}
			}
		}
	}
	.service_info{
		h3{
			height: 50px; line-height: 50px;  font-weight: bold; font-size: 16px;
		}
	}
	.shop_recommend{
		ul{
			li{
				float: left; width: 226px; height: 320px; border: 1px solid #eee; margin-right: 18px; margin-bottom: 10px;
				img{
					width: 224px; height: 224px; margin: 0 auto 15px;
				}
				p{
					height: 36px; line-height: 20px; overflow: hidden; color: #999; padding: 0 10px;
				}
				span{
					color: #ca1927; padding: 0 10px; font-size: 14px; margin-top: 10px; display: block;
				}
				&:nth-child(4n){
					margin-right: 0;
				}
				&:hover{
					border: 1px solid #e4393c;
				}
				&:hover p{
					color: #e4393c;
				}
			}
		}
	}
}

</style>
<style type="text/css">
.shop_content_right .el-tabs__item{
	height: 58px; line-height: 58px;
}
.card_commont>.el-tabs__content{
	padding: 15px 0;
}
.card_commont .el-tab-pane{
	padding: 15px;
}
.card_commont .el-tabs__content > .el-tab-pane:nth-child(2){
	padding: 15px 0;
}
.card_commont2{
	border-left: 0; border-right: 0; border-bottom: 0; box-shadow: none;
}
.card_commont2 .page{
	text-align: right; margin-top: 30px;
}
</style>