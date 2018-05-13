<template>
  <el-header height="auto">
    <top></top>
    <search></search>
  </el-header>
</template>

<script>
import Top from './top'
import Search from './search'
export default {
  name: 'Headers',
  data () {
    return {
      
    }
  },
  components: {
    Top,
    Search
  }
}
</script>

<style scoped lang="scss">
.el-header{
  padding: 0;
}
</style>
