<template>
	<div class="bg1 top">
    <el-row class="w1210 a999">
      <el-col :span="12">
        欢迎光临凯联健康
      </el-col>
      <el-col :span="12" align="right">
        <router-link to="" tag="a" target="_blank" class="line" v-if="getLoginStatus">{{user.nickname || user.username}}</router-link>
        <a @click="logout()" class="line" v-if="getLoginStatus">退出</a>
        <router-link to="/login" tag="a" target="_blank" class="line" v-if="!getLoginStatus">请登录</router-link>
        <router-link to="/register" tag="a" target="_blank" class="line" v-if="!getLoginStatus">免费注册</router-link>

        <router-link to="/center" tag="a" target="_blank" class="line"><i class="iconfont icon-account"></i>我的订单</router-link>
        <router-link to="/cart" tag="a" target="_blank" class="line"><i class="iconfont icon-cart"></i>购物车</router-link>
        <router-link to="/center/collect" tag="a" target="_blank" class="line"><i class="iconfont icon-favoritesfilling"></i>我的关注</router-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Top',
  data () {
    return {
      user: ''
    }
  },
  computed: {
    ...mapGetters(['getLoginStatus']),
  },
  methods: {
    getUserInfo() {
      this.$API.UserInfo().then((response)=>{
        if (response.data.error_code == 0) {
          this.user = response.data.user
        }
      })
    },
    logout() {
      if (this.getLoginStatus) {
        this.$store.dispatch('setSignOut')
        this.$router.push({ path: '/login' })
      }
    }
  },
  mounted() {
    if (this.getLoginStatus) {
      this.getUserInfo()
    }
  }
}
</script>

<style scoped lang="scss">
.top{
  width: 100%; height: 30px; line-height: 30px;
  .el-col a{
    color: #999; cursor: pointer;
    &:hover{
      color: #D21A1E;
    }
    .iconfont{
      font-size: 12px; margin-right: 5px;
    }

  }
  .line{
    border-right: 1px solid #ddd; padding: 0 10px;
    &:last-child{
      border-right: 0;
    }
  }
}
</style>