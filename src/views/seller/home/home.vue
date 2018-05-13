<template>
	<div class="sellerHome">
		<headers></headers>
		<seller-menus></seller-menus>
		<seller-banner></seller-banner>
		<seller-mains></seller-mains>
		<footers></footers>
	</div>
</template>
<script>
import Headers from '@/components/header/headers'
import SellerMenus from '@/components/seller/sellerMenus'
import SellerBanner from '@/components/seller/sellerBanner'
import SellerMains from '@/components/seller/sellerMains'
import Footers from '@/components/footers'

export default {
	name: 'Seller',
	data() {
		return {

		}
	},
	components: {
		Headers,
		SellerMenus,
		SellerBanner,
		SellerMains,
		Footers
	}
}
</script>
<style scoped lang="scss">
.sellerHome{
	width: 100%;
}
</style>