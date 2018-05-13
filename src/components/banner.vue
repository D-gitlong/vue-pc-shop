<template>
	<div class="banner">
		<el-carousel trigger="click" height="360px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <a :href="'#/details/'+item.id" target="_blank">
					<img v-lazy="item.photo.large" />
        </a>
      </el-carousel-item>
    </el-carousel>
	</div>
</template>
<script>
export default {
	data() {
		return {
			bannerList: []
		}
	},
	created() {
		this.getBanner()
	},
	methods: {
		getBanner() {
			this.$API.Banner()
			.then((response)=>{
				if (response.data.error_code == 0) {
					this.bannerList = response.data.banners
				}
			})
		}
	}
}
</script>
<style scoped lang="scss">
.banner{
	.el-carousel__item a{
		display: block; width: 100%; text-align: center;
	}
}
</style>