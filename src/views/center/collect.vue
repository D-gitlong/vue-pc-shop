<template>
	<div class="collect">
		<div class="tit">关注的商品</div>
		<ul v-if="likeList.length > 0" class="clearfix">
			<li :key="item.id" v-if="item" v-for="(item,index) in likeList">
				<div class="del" @click="del(item.id,index)"><i class="el-icon-delete"></i></div>
				<router-link :to="{name: 'Details', params: {id: item.id}}" tag="a" target="_blank">
					<div class="img">
						<img :src="item.default_photo.large" />
					</div>
					<p>{{item.name}}</p>
					<p class="price">￥{{item.price | fmoney}}</p>
				</router-link>
			</li>
		</ul>
		<div v-else>暂无关注商品</div>
	</div>
</template>
<script>
import '../../utils/directive'
export default {
	data() {
		return {
			likeList: []
		}
	},
	mounted() {
		this.$API.LikeList({
			page: 1,
			per_page: 10
		}).then((response)=>{
			if (response.data.error_code == 0) {
				this.likeList = response.data.products
			}
		})
	},
	methods: {
		del(id,index) {
			this.$API.UnLike({
				product: id
			}).then((response)=>{
				if (response.data.error_code == 0) {
					this.likeList.splice(index,1)
				}
			})
		}
	}
}
</script>
<style scoped lang="scss">
.collect{
	.tit{
		height: 50px; line-height: 50px; font-size: 14px; padding-left: 10px; font-weight: bold; margin-bottom: 20px; border-bottom: 1px solid #24991E;
	}
	ul{
		li{
			width: 150px; position: relative; float: left; margin: 0 9px 15px;
			&:hover .del{
				display: block;
			}
			.del{
				display: none; position: absolute; z-index: 10; right: 0; top: 0; cursor: pointer; background: #000; opacity: .5; padding: 5px;
				i{
					font-size: 18px; color: #fff;
				}
			}
			a{
				display: block;
			}
			.img{
				width: 150px; height: 150px; border: 1px solid #eee; margin-bottom: 10px;
			}
			p{
				line-height: 23px; height: 23px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 0 5px; color: #3c3c3c;
			}
			.price{
				font-size: 16px; color: #d2191e;
			}
		}
	}
}
</style>