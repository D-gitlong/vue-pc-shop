<template>
	<div>
		<headers></headers>
		<div class="line"></div>
		<div class="w1210 login_wrap clearfix">
			<logins></logins>
			<registers></registers>
		</div>
		<footers></footers>
	</div>
</template>
<script>
import Headers from '@/components/header/headers'
import Footers from '@/components/footers'
import Registers from '@/components/register'
import Logins from '@/components/login'
export default {
	name: 'register',
	components: {
		Headers,
		Footers,
		Registers,
		Logins
	}
}
</script>
<style scoped lang="scss">
.line{
	border-bottom: 2px solid #24991E;
}
.login_wrap{
	margin-top: 50px; margin-bottom: 500px;
	.el-button{
		width: 100%; font-size: 16px; padding: 15px 20px;
	}
}
</style>
