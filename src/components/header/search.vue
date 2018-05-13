<template>
	<div class="search w1210">
		<el-row>
		  <el-col :span="5">
				<a href="/" target="_blank" class="logo"><img src="../../assets/images/logo.png"></a>
		  </el-col>
		  <el-col :span="14" class="search_middle">
				<div class="search_input">
					<input type="text" placeholder="输入搜索关键词" v-model="currentKeyword" name="search" @keyup.enter="Search()" />
					<button @click="Search()">搜 索</button>
				</div>
				<div class="hot_search a999">
					热门搜索：
					<router-link 
						v-for="(keyword,index) in keywords" 
						:key="index" 
						tag="a" 
						target="_blank" 
						:to="{path:'/product',query:{sortKey: 0, sortValue: 0, keyword: keyword.content, category: null, navTitle: keyword.content, navStyle: 'search'}}"
						>{{keyword.content}}
					</router-link>
				</div>
		  </el-col>
		  <el-col :span="5" align="right">
		  	<div class="my_info">
		  		<router-link to="/center" class="my_order" tag="a" target="_blank"><i class="iconfont icon-account"></i>我的订单</router-link>
		  		<router-link to="/cart" tag="a" class="my_cart" target="_blank"><i class="iconfont icon-cart"></i>购物车</router-link>
		  	</div>
		  </el-col>
		</el-row>
	</div>
</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      keywords: [],
      currentKeyword: ''
    }
  },
  methods: {
  	SearchKeyword() {
  		this.$API.SearchKeyword().then((response)=>{
  			if (response.data.error_code == 0) {
  				this.keywords = response.data.keywords
  			}
  			
  		})
  	},
  	Search() {
  		if (!this.currentKeyword || this.currentKeyword.length < 1) {
				return false;
			}
			let routeData = this.$router.resolve({ 
        path: 'product', 
        query: { 
          sortKey: 0,
          sortValue: 0,
          keyword: this.currentKeyword,
          category: null,
          navTitle: this.currentKeyword,
          navStyle: 'search'
        } 
      })
      window.open(routeData.href, '_blank')
  	}
  },
  mounted() {
  	this.SearchKeyword()
  }
}
</script>
<style scoped lang="scss">
.search{
	height: 126px;
	.logo{
		display: block; width: 115px; margin-top: 12px;
	}
	.search_middle{
		margin-top: 50px;
	}
	.search_input{
		width: 580px; height: 38px; border: 2px solid #e33d3f;
		input{
			border: 0; outline: none; width: 499px; height: 34px; line-height: 34px; padding: 0 10px; background: transparent; vertical-align: top;
		}
		button{
			outline: none; border: 0; background: #e33d3f; color: #fff; width: 77px; float: right; height: 34px; line-height: 34px; font-size: 15px; text-align: center; cursor: pointer;
		}
	}
	.hot_search{
		font-size: 13px; line-height: 35px; width: 580px; overflow: hidden; height: 35px;
		a{
			color: #999; margin: 0 5px;
			&:hover{
				color: #D21A1E;
			}
		}
	}
	.my_info{
		position: absolute; top: 50px; right: 0;
		.my_order, .my_cart{
			display: inline-block; width: 100px; height: 45px; line-height: 45px; text-align: center; font-size: 13px; float: left;
			i{
				margin-right: 5px;
			}
		}
		.my_order{
			background: #f5f5f5; border: 1px solid #e7e7e7; border-right: 0;
		}
		.my_cart{
			background: #e33d3f; color: #fff;
		}
	}
}
</style>