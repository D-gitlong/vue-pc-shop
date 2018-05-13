<template>
	<div class="home">
		<headers></headers>
		<menus></menus>
		<banner></banner>
		<mains></mains>
		<footers></footers>
		<side-nav></side-nav>
	</div>
</template>
<script>
	import Headers from '@/components/header/headers'
	import Menus from '@/components/menus'
	import Banner from '@/components/banner'
	import Mains from '@/components/mains'
	import Footers from '@/components/footers'
	import SideNav from '@/components/sideNav'
	export default {
		name: 'Home',
		data() {
			return {
				
			}
		},
		components: {
			Headers,
			Menus,
			Banner,
			Mains,
			Footers,
			SideNav
		}
	}
</script>
<style scoped lang="scss">
.home{
	width: 100%;
}
</style>