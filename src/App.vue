<template>
  <div id="app">
  	<el-container>
    	<router-view/>
  	</el-container>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
.w1210{
	width: 1210px!important; margin: 0 auto;
}
.bg1{
	background: #F3F3F3;
}
.el-container>div{
  width: 100%;
}
.a999{
	color: #999;
}
.ml15{
	margin-left: 15px!important;
}
.img-center{
  position: relative; top: 50%; transform: translateY(-50%); display: block; margin: 0 auto;   
}
.com_tips{
  top: 50%; transform: translate(-50%);
}
[v-cloak] {
  display: none;
}
</style>
