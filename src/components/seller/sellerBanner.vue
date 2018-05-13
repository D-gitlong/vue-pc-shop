<template>
	<div class="banner">
		<el-carousel trigger="click" height="744px">
      <el-carousel-item v-for="item in 4" :key="item">
        <a href="" target="_blank"><img src="static/images/7.jpg" /></a>
      </el-carousel-item>
    </el-carousel>
	</div>
</template>
<script>
export default {
	name: 'sellerBanner',
	data() {
		return {

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