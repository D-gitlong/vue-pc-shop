<template>
	<div class="shop_content w1210 clearfix">
		<shop-content-left></shop-content-left>
		<shop-content-right></shop-content-right>
	</div>
</template>
<script>
import ShopContentLeft from './shopContentLeft'
import ShopContentRight from './shopContentRight'
export default {
	data() {
		return{

		}
	},
	components: {
		ShopContentLeft,
		ShopContentRight
	}
}
</script>
<style scoped lang="scss">
.shop_content{
	margin-top: 50px; margin-bottom: 100px;
}
</style>