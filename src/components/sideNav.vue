<template>
	<ul class="side_nav">
  	<li>
  		<router-link tag="a" to="/cart" target="_blank">
  			<el-badge :value="goodsNumber" :max="99" v-if="goodsNumber > 0"><i class="iconfont icon-cart"></i></el-badge>
  			<el-badge v-else><i class="iconfont icon-cart"></i></el-badge>
  		</router-link>
  	</li>
  	<li @click="goTop()">
  		<a href="javascript:void(0);"><i class="iconfont icon-less"></i><p>回顶部</p></a>
  	</li>
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'sideNav',
  computed: {
  	...mapGetters(['goodsNumber'])
  },
  mounted() {
  	this.getCartAmount()
  },
  methods: {
  	getCartAmount() {
			this.$API.Cart()
			.then((response)=>{
				if (response.data.error_code == 0) {
	    		let orderlist = response.data.goods_groups
	    		orderlist.forEach((el)=>{
	    			this.$store.dispatch('getCartCount', el.total_amount)
	    		})
				}
			})
		},
		goTop() {
			let timer = null
			clearInterval(timer);  
			timer = setInterval(function() {
				let curHeight = document.documentElement.scrollTop || document.body.scrollTop
				let now = curHeight
				let speed = (0 - now) / 6 
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)  
				if (curHeight === 0) {
					clearInterval(timer)
				}
				document.documentElement.scrollTop = curHeight + speed
				document.body.scrollTop = curHeight + speed
			}, 30) 
  	}
	}
}
</script>
<style scope lang="scss">
.side_nav{
	position: fixed; right: 50px; bottom: 100px; z-index: 200;
	li{
		width: 60px; height: 60px; border: 1px solid #ccc; background: #f6f6f6;
		&:hover{
			background: #e33d3f; border-color: #e33d3f;
			a{
				color: #fff;
			}
		}
		a{
			display: block; text-align: center; width: 58px; height: 58px; color: #666;
			.el-badge{
				margin-top: 13px;
			}
			i.icon-cart{
				font-size: 28px;
			}
			i.icon-less{
				font-size: 30px;
			}
		}
	}
	.el-badge__content{
		border: 0; background: #e33d3f;
	}
}
</style>