<template>
	<div>
		<div class="register">
			<div class="goregister" v-show="!isShowBox">
				<h3>注册账号？</h3>
				<el-button size="medium" @click="goRegister()">注册</el-button>
			</div>
			<div class="nowregister" v-show="isShowBox">
				<h3>欢迎注册！</h3>
				<el-form ref="form" :rules="rules" :model="form">
					<el-form-item prop="mobile">
				    <el-input type="text" placeholder="建议常用手机号" v-model="form.mobile"></el-input>
				  </el-form-item>
				  <el-form-item prop="code">
				  	<el-button v-if="isCode" @click="mobileCode()">单击按钮进行验证</el-button>
				    <el-input v-else type="text" placeholder="点击按钮进行验证" v-model="form.code">
					    <template slot="prepend">手机验证码</template>
					    <template slot="append"><a :class="paraclass" v-cloak>{{paracont}}</a></template>
					  </el-input>
				  </el-form-item>
				  <el-form-item prop="pwd">
				    <el-input type="password" placeholder="密码" v-model="form.pwd"></el-input>
				  </el-form-item>
				  <el-form-item prop="realName">
				    <el-input type="text" placeholder="请输入真实姓名" v-model="form.realName"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button type="success" :loading="logining" @click="onRegister('form')">立即注册</el-button>
				    <label class="error" v-if="tips" v-text="tips"></label>
				  </el-form-item>
				</el-form>
			</div>
		</div>
		<el-dialog title="凯联健康用户注册协议" :center="true" :visible.sync="dialogFormVisible">
		  <div class="user_protocol" v-html="strHtml"></div>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="cacel()">取 消</el-button>
		    <el-button type="primary" @click="dialogFormVisible = false">同意并继续</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
	name: 'childRegister',
	data() {
		var validPhone=(rule, value,callback)=>{
      if (!value){
        callback(new Error('请输入手机号'))
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
				mobile: '',
				code: '',
				pwd: '',
				realName: ''
			},
			rules: {
				mobile: [
          { required: true, validator: validPhone, trigger: 'blur' }
        ],
        code: [
        	{ required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        pwd: [ 
        	{required: true, message: '请输入密码', trigger: 'blur'},
        	{min: 6, max: 25, message: '密码长度为6~25位', trigger: 'blur'}
        ],
        realName: [{
        	required: true, message: '请输入真实姓名', trigger: 'blur'
        }]
			},
			dialogFormVisible: false,
			isShowBox: true,
			strHtml: '',
			isCode: true,
			tips: '',
			paraclass: 'mobile-code',
			paracont: '60s',
			paraevent: true,
			logining: false,
			flag: true
		}
	},
	methods: {
		...mapActions(['setToken']),
		goRegister() {
			this.$router.push('register')
		},
		getUserProtocolUrl() {
			this.$API.UserProtocol()
			.then((response)=>{
				let user_url = response.data.site_info.terms_url
				this.getUserProtocol(user_url)
			})
		},
		getUserProtocol(url) {
			this.$HTTP.get(url).then((response)=>{
				this.strHtml = response.data
			})
		},
		cacel() {
			this.$router.push('login')
			this.dialogFormVisible = false
		},
		mobileCode() {
			if (!this.flag) {
        return false;
      }
			const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
			if (!this.form.mobile || !reg.test(this.form.mobile)) {
				this.tips = '请输入手机号'
				return false;
			}
			this.flag = false
			let params = {}
      params.mobile = this.form.mobile
      params.code = "86"
      
			this.$API.MobileVerify(params)
			.then((res)=>{
				if (res) {
					this.$API.SendCode(params)
					.then((response)=>{
						if (response.data.error_code == 0) {
							this.timeout()
						}else{
							this.tips = response.data.error_desc
						}
					})
				}else{
					this.flag = true
					this.tips = response.data.error_desc
				}
			})
		},
		timeout() {
			let second = 60, timePromise = undefined; 
			let that = this
			timePromise = setInterval(function(){
        if(second<=0){
          clearInterval(timePromise);  
          timePromise = undefined;  
          second = 60;  
          that.paracont = "重新获取";  
          that.paraclass = "mobile-code";  
          that.paraevent = true;
          this.flag = true;
        }
        else
        {
        	that.isCode = false
          that.paracont = second + "s";  
          that.paraclass = "mobile-code not-mobile-code";  
          that.paraevent = false;
          second--;  
        }  
			},1000,100);
		},
		onRegister(form) {
			let flag = true
			this.$refs[form].validate((valid) => {
        if (valid) {
        	this.logining = true
        } else {
        	flag = false
          return false
        }
      })
      if (!flag) { return false; }

			let params = {}, equipId = '';
      params.mobile = this.form.mobile
      params.code = this.form.code
      params.password = this.form.pwd
      params.realName = this.form.realName;
      if (localStorage.getItem('equipId')) {
        equipId = localStorage.getItem('equipId');
      }

			this.$API.Signup(params)
			.then((response)=>{
				if (response.data.error_code == 0) {
					this.logining = true
					this.$API.Login({
						username:params.mobile, password:params.password, equipId: equipId
					}).then((response)=>{
						if (response.data.error_code == 0) {
							this.setToken(response.data.token)
        			this.$API.setHeader(response.data.token)
              this.$router.push('/')
            }
					})
				}else{
					this.logining = false
					this.tips = response.data.error_desc
				}
			})
		}
	},
	mounted() {
		if (this.$route.name == 'Login') {
			this.isShowBox = false
		}
		if (this.$route.name == 'Register') {
			this.dialogFormVisible = true
		}
		this.getUserProtocolUrl()
	}
}
</script>
<style scoped lang="scss">
.register{
	width: 40%; float: left;
	.el-button{
		width: 100%; font-size: 16px; padding: 15px 20px;
	}
	.mobile-code{
		width: 100px; height: 46px; line-height: 46px; display: inline-block; text-align: center; cursor: pointer;
	}
	.not-mobile-code{
		background: #f5f5f5; color: #999;
		&:hover{
			cursor: not-allowed;
		}
	}
	.goregister{
		padding: 20px;
		h3{
			font-size: 22px; font-weight: bold; margin-bottom: 15px;
		}
	}
	.nowregister{
		border-left: 1px solid #24991E; padding: 20px;
		h3{
			font-size: 22px; font-weight: bold; margin-bottom: 15px;
		}
	}
}
.user_protocol{
	height: 430px; overflow: hidden; overflow-y: scroll;
}
</style>
<style type="text/css">
.register .el-input__inner{
	height: 48px; line-height: 48px;
}
.register .error{
	color: #f56c6c; position: absolute; left: 0; top: 100%; line-height: 1; padding-top: 4px;
}
.register .el-input-group__append{
	padding: 0;
}
</style>