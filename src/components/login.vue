<template>
	<div class="login">
		<div class="gologin" v-show="isShowBox">
			<h3>已有账号？</h3>
			<el-button size="medium" @click="goLogin()">登录</el-button>
		</div>
		<div class="nowlogin" v-show="!isShowBox">
			<h3>欢迎回来！</h3>
			<el-form ref="form" :rules="rules" :model="form">
				<el-form-item prop="user">
			    <el-input type="text" placeholder="已验证手机" v-model.number="form.user"></el-input>
			  </el-form-item>
			  <el-form-item prop="pwd">
			    <el-input type="password" placeholder="密码" v-model="form.pwd"></el-input>
			  </el-form-item>
			  <el-form-item>
			    <el-button type="success" :loading="logining" @click="onLogin('form')">立即登录</el-button>
			    <label class="error" v-if="tips" v-text="tips"></label>
			  </el-form-item>
			  <el-form-item>
			    <a href="" target="_blank" class="forget">忘记密码？</a>
			  </el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
	name: 'childLogin',
	data() {
		var validPhone=(rule, value,callback)=>{
      if (!value){
        callback(new Error('请输入已验证手机'))
      }else if (!isvalidPhone(value)){
        callback(new Error('请输入正确的手机号'))
      }else {
        callback()
      }
  	};
		function isvalidPhone(str) {
		  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
		  return reg.test(str)
		};
		return {
			form: {
				user: '',
				pwd: ''
			},
			rules: {
				user: [
          { required: true, validator: validPhone, trigger: 'blur' }
        ],
        pwd: [
        	{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, message: '密码长度不能小于4位', trigger: 'blur' }
        ]
			},
			isShowBox: false,
			logining: false,
			tips: ''
		}
	},
	methods: {
		...mapActions(['setToken']),
		goLogin() {
			this.$router.push('login')
		},
		onLogin(formName) {
			let flag = true
			this.$refs[formName].validate((valid) => {
        if (valid) {
        	this.logining = true
          
        } else {
        	flag = false
          return false
        }
      })
      if (!flag) { return false; }

			let equipId = ''
			if (localStorage.getItem('equipId')) {
        equipId = localStorage.getItem('equipId');
      }
      
			this.$API.Login({
				username: this.form.user,
        password: this.form.pwd,
        equipId: equipId
			}).then((response)=>{
				if(response.data.error_code == 0) {
					this.logining = true
        	this.setToken(response.data.token)
        	this.$API.setHeader(response.data.token)
        	this.$nextTick(() =>{
        		this.$router.push('/')
        	})
        }else{
        	this.tips = '账号或密码错误'
        	this.logining = false
        }
			})
		}
	},
	mounted() {
		if (this.$route.name == 'Register') {
			this.isShowBox = true
		}
	}
}
</script>
<style scoped lang="scss">
.login{
	width: 40%; float: left; margin-left: 5%;
	.el-button{
		width: 100%; font-size: 16px; padding: 15px 20px;
	}
	.gologin{
		padding: 20px;
		h3{
			font-size: 22px; font-weight: bold; margin-bottom: 15px;
		}
	}
	.forget{
		color: #000; font-size: 16px;
		&:hover{
			color: #24991E;
		}
	}
	.nowlogin{
		border-right: 1px solid #24991E; padding: 20px;
		h3{
			font-size: 22px; font-weight: bold; margin-bottom: 15px;
		}
	}
}
</style>
<style type="text/css">
.login .el-input__inner{
	height: 48px; line-height: 48px;
}
.login .error{
	color: #f56c6c; position: absolute; left: 0; top: 100%; line-height: 1; padding-top: 4px;
}
</style>