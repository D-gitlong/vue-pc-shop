webpackJsonp([4],{"2qb4":function(e,t){},IUQl:function(e,t){},K31e:function(e,t,o){"use strict";var r=o("4YfN"),i=o.n(r),s=o("9rMa"),a={name:"childLogin",data:function(){return{form:{user:"",pwd:""},rules:{user:[{required:!0,validator:function(e,t,o){t?/^1[3|4|5|7|8][0-9]\d{8}$/.test(t)?o():o(new Error("请输入正确的手机号")):o(new Error("请输入已验证手机"))},trigger:"blur"}],pwd:[{required:!0,message:"请输入密码",trigger:"blur"},{min:4,message:"密码长度不能小于4位",trigger:"blur"}]},isShowBox:!1,logining:!1,tips:""}},methods:i()({},Object(s.b)(["setToken"]),{goLogin:function(){this.$router.push("login")},onLogin:function(e){var t=this,o=!0;if(this.$refs[e].validate(function(e){if(!e)return o=!1,!1;t.logining=!0}),!o)return!1;var r="";localStorage.getItem("equipId")&&(r=localStorage.getItem("equipId")),this.$API.Login({username:this.form.user,password:this.form.pwd,equipId:r}).then(function(e){0==e.data.error_code?(t.logining=!0,t.setToken(e.data.token),t.$API.setHeader(e.data.token),t.$nextTick(function(){t.$router.push("/")})):(t.tips="账号或密码错误",t.logining=!1)})}}),mounted:function(){"Register"==this.$route.name&&(this.isShowBox=!0)}},n={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"login"},[o("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowBox,expression:"isShowBox"}],staticClass:"gologin"},[o("h3",[e._v("已有账号？")]),e._v(" "),o("el-button",{attrs:{size:"medium"},on:{click:function(t){e.goLogin()}}},[e._v("登录")])],1),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:!e.isShowBox,expression:"!isShowBox"}],staticClass:"nowlogin"},[o("h3",[e._v("欢迎回来！")]),e._v(" "),o("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form}},[o("el-form-item",{attrs:{prop:"user"}},[o("el-input",{attrs:{type:"text",placeholder:"已验证手机"},model:{value:e.form.user,callback:function(t){e.$set(e.form,"user",e._n(t))},expression:"form.user"}})],1),e._v(" "),o("el-form-item",{attrs:{prop:"pwd"}},[o("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:e.form.pwd,callback:function(t){e.$set(e.form,"pwd",t)},expression:"form.pwd"}})],1),e._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"success",loading:e.logining},on:{click:function(t){e.onLogin("form")}}},[e._v("立即登录")]),e._v(" "),e.tips?o("label",{staticClass:"error",domProps:{textContent:e._s(e.tips)}}):e._e()],1),e._v(" "),o("el-form-item",[o("a",{staticClass:"forget",attrs:{href:"",target:"_blank"}},[e._v("忘记密码？")])])],1)],1)])},staticRenderFns:[]};var l=o("Z0/y")(a,n,!1,function(e){o("eTX8"),o("2qb4")},"data-v-59432c17",null);t.a=l.exports},Lf8n:function(e,t){},VFiV:function(e,t){},W2Q3:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o("0C6y"),i=o("ID4T"),s=o("q3Wa"),a=o("K31e"),n={name:"login",components:{Headers:r.a,Footers:i.a,Registers:s.a,Logins:a.a}},l={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("headers"),this._v(" "),t("div",{staticClass:"line"}),this._v(" "),t("div",{staticClass:"w1210 login_wrap clearfix"},[t("logins"),this._v(" "),t("registers")],1),this._v(" "),t("footers")],1)},staticRenderFns:[]};var c=o("Z0/y")(n,l,!1,function(e){o("Lf8n")},"data-v-0ad82775",null);t.default=c.exports},eTX8:function(e,t){},q3Wa:function(e,t,o){"use strict";var r=o("aozt"),i=o.n(r),s={name:"childRegister",data:function(){return{form:{mobile:"",code:"",pwd:"",realName:""},rules:{mobile:[{required:!0,validator:function(e,t,o){t?/^1[3|4|5|7|8][0-9]\d{8}$/.test(t)?o():o(new Error("请输入正确的手机号")):o(new Error("请输入手机号"))},trigger:"blur"}],code:[{required:!0,message:"请输入验证码",trigger:"blur"}],pwd:[{required:!0,message:"请输入密码",trigger:"blur"},{min:6,max:25,message:"密码长度为6~25位",trigger:"blur"}],realName:[{required:!0,message:"请输入真实姓名",trigger:"blur"}]},dialogFormVisible:!1,isShowBox:!0,strHtml:"",isCode:!0,tips:"",paraclass:"mobile-code",paracont:"60s",paraevent:!0,flag:!0}},methods:{goRegister:function(){this.$router.push("register")},getUserProtocolUrl:function(){var e=this;this.$API.UserProtocol().then(function(t){var o=t.data.site_info.terms_url;e.getUserProtocol(o)})},getUserProtocol:function(e){var t=this;i.a.get(e).then(function(e){t.strHtml=e.data})},cacel:function(){this.$router.push("login"),this.dialogFormVisible=!1},mobileCode:function(){var e=this;if(!this.flag)return!1;if(!this.form.mobile||!/^1[3|4|5|7|8][0-9]\d{8}$/.test(this.form.mobile))return!1;this.flag=!1;var t={};t.mobile=this.form.mobile,t.code="86",this.$API.MobileVerify(t).then(function(o){o?e.$API.SendCode(t).then(function(t){0==t.data.error_code?e.timeout():e.tips=t.data.error_desc}):(e.flag=!0,e.tips="该手机号已被注册")})},timeout:function(){var e=60,t=void 0,o=this;t=setInterval(function(){e<=0?(clearInterval(t),t=void 0,e=60,o.paracont="重新获取",o.paraclass="mobile-code",o.paraevent=!0,this.flag=!0):(o.isCode=!1,o.paracont=e+"s",o.paraclass="mobile-code not-mobile-code",o.paraevent=!1,e--)},1e3,100)},onRegister:function(){var e={};e.mobile=this.form.mobile,e.code=this.form.code,e.password=this.form.password,e.realName=this.form.realName,localStorage.getItem("equipId")&&localStorage.getItem("equipId"),this.$API.Signup(e).then(function(e){0==e.data.error_code&&console.log("成功")})}},mounted:function(){"Login"==this.$route.name&&(this.isShowBox=!1),"Register"==this.$route.name&&(this.dialogFormVisible=!0),this.getUserProtocolUrl()}},a={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{staticClass:"register"},[o("div",{directives:[{name:"show",rawName:"v-show",value:!e.isShowBox,expression:"!isShowBox"}],staticClass:"goregister"},[o("h3",[e._v("注册账号？")]),e._v(" "),o("el-button",{attrs:{size:"medium"},on:{click:function(t){e.goRegister()}}},[e._v("注册")])],1),e._v(" "),o("div",{directives:[{name:"show",rawName:"v-show",value:e.isShowBox,expression:"isShowBox"}],staticClass:"nowregister"},[o("h3",[e._v("欢迎注册！")]),e._v(" "),o("el-form",{ref:"form",attrs:{rules:e.rules,model:e.form}},[o("el-form-item",{attrs:{prop:"mobile"}},[o("el-input",{attrs:{type:"text",placeholder:"建议常用手机号"},model:{value:e.form.mobile,callback:function(t){e.$set(e.form,"mobile",t)},expression:"form.mobile"}})],1),e._v(" "),o("el-form-item",{attrs:{prop:"code"}},[e.isCode?o("el-button",{on:{click:function(t){e.mobileCode()}}},[e._v("单击按钮进行验证")]):o("el-input",{attrs:{type:"text",placeholder:"点击按钮进行验证"},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}},[o("template",{slot:"prepend"},[e._v("手机验证码")]),e._v(" "),o("template",{slot:"append"},[o("a",{class:e.paraclass},[e._v(e._s(e.paracont))])])],2)],1),e._v(" "),o("el-form-item",{attrs:{prop:"pwd"}},[o("el-input",{attrs:{type:"password",placeholder:"密码"},model:{value:e.form.pwd,callback:function(t){e.$set(e.form,"pwd",t)},expression:"form.pwd"}})],1),e._v(" "),o("el-form-item",{attrs:{prop:"realName"}},[o("el-input",{attrs:{type:"text",placeholder:"请输入真实姓名"},model:{value:e.form.realName,callback:function(t){e.$set(e.form,"realName",t)},expression:"form.realName"}})],1),e._v(" "),o("el-form-item",[o("el-button",{attrs:{type:"success"},on:{click:function(t){e.onRegister()}}},[e._v("立即注册")]),e._v(" "),e.tips?o("label",{staticClass:"error",domProps:{textContent:e._s(e.tips)}}):e._e()],1)],1)],1)]),e._v(" "),o("el-dialog",{attrs:{title:"凯联健康用户注册协议",center:!0,visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[o("div",{staticClass:"user_protocol",domProps:{innerHTML:e._s(e.strHtml)}}),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.cacel()}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("同意并继续")])],1)])],1)},staticRenderFns:[]};var n=o("Z0/y")(s,a,!1,function(e){o("IUQl"),o("VFiV")},"data-v-049dcef8",null);t.a=n.exports}});