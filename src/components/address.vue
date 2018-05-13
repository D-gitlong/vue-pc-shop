<template>
	<div>
		<h4>收货人信息<a href="javascript:;" class="fr" @click="addAddress">新增收货地址</a></h4>
		<ul>
			<li class="clearfix deliveryList" v-show="fun(consigneeId == consignee.id)" :key="consignee.id" v-for="(consignee,index) in consignees" ref="deliver">
				<div class="item fl" :class="{selected:consigneeId == consignee.id}" @click="selectConsignee(consignee)">
					<b></b>
					<a href="javascript:;">{{consignee.name}}</a>
				</div>
				<div class="deliveryInfo">
					<a href="javascript:;" class="fr" @click="deleteAddress(consignee.id,index)">删除</a>
					<a href="javascript:;" class="fr" @click="editAddress(consignee)">编辑</a>
					<a href="javascript:;" class="fr" v-show="!consignee.is_default" @click="setDefaultAddress(consignee)">设为默认地址</a>
					<div class="infoLeft">
						<span>{{consignee.name}}</span>
						<span :key="reg.id" v-if="index>0" v-for="(reg,index) in consignee.regions">{{reg.name}}</span>
						<span>{{consignee.mobile | fmobile}}</span>
						<span class="normal" v-show="consignee.is_default">默认地址</span>
					</div>
				</div>
			</li>
		</ul>
		<a href="javascript:;" class="moreAddress" v-if="!isShowAddress" @click="showAddress">更多地址<i class="el-icon-arrow-down"></i></a>
		<a href="javascript:;" class="moreAddress" v-else @click="showAddress">收起地址<i class="el-icon-arrow-up"></i></a>

		<el-dialog title="收货人信息" center width="35%" :visible.sync="dialogFormVisible">
		  <el-form :model="form" :rules="rules" ref="form">
		    <el-form-item label="收货人" required prop="name" :label-width="formLabelWidth">
		      <el-input v-model="form.name" style="width: 300px;"></el-input>
		    </el-form-item>
		    <el-form-item label="手机号码" required prop="mobile" :label-width="formLabelWidth">
		      <el-input v-model.number="form.mobile" style="width: 300px;"></el-input>
		    </el-form-item>
		    <el-form-item label="备用号码" required prop="otherMobile" :label-width="formLabelWidth">
		      <el-input v-model="form.otherMobile" style="width: 300px;"></el-input>
		    </el-form-item>
		    <el-form-item label="所在地区" required prop="regions" :label-width="formLabelWidth">
		      <el-cascader style="width: 300px;"
					  :options="form.regions"
					  v-model="defaultRegions"
					  @change="handleChange"
					  @focus="handleFocus"
					  ref="cascader"
					></el-cascader>
		    </el-form-item>
		    <el-form-item label="详细地址" required prop="textarea" :label-width="formLabelWidth">
		      <el-input v-model="form.textarea" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" resize="none" :rows="2" style="width: 300px;"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="save('form')">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>
import '../utils/directive'
import R from '../utils/api.region.js'
export default {
	data() {
		var validPhone=(rule, value, callback)=>{
      if (!value){
        callback(new Error('请输入手机号'))
      }else if (!isvalidPhone(value)){
        callback(new Error('请输入正确的手机号'))
      }else {
        callback()
      }
  	};
  	var validRegions=(rule, value, callback)=>{
      if (!value){
        callback(new Error('请选择所在地区'))
      }else {
        callback()
      }
  	};
		function isvalidPhone(str) {
		  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
		  return reg.test(str)
		};
		return {
			consignees: [],
			consigneeId: 0,
			defaultRegions: [],
			isShowAddress: false,
			dialogFormVisible: false,
			editId: '',
			formLabelWidth: '120px',
			form: {
				name: '',
				mobile: '',
				otherMobile: '',
				textarea: '',
				regions: R.children[0].children
			},
			allowSave : true,
			lastRegion: '',
			rules: {
				name: [{
					required: true, message: '请输入收货人'
				}],
					mobile: [{ required: true, validator: validPhone 
				}],
        otherMobile: [{
					required: true, message: '请输入备用号码'
				}],
        textarea: [{
					required: true, message: '请输入详细地址'
				}],
        regions: [{
					required: true, validator: validRegions
				}]
			} 
		}
	},
	created() {
		this.getConsignee()
	},
	methods: {
		getConsignee(callback) {
			this.$API.Consignee().then((response)=>{
				if (response.data.error_code == 0) {
					this.consignees = response.data.consignees
					if (response.data.consignees.length == 0) {
						this.dialogFormVisible = true
					}
					for (let key in this.consignees) {
						if (this.consignees[key].is_default) {
							this.consigneeId = this.consignees[key].id;
							this.$emit('consignee',this.consignees[key])
						}
					}
				}
				if (callback) {
					let arr = []
					this.consignees.forEach((el,i)=>{
						arr.push(el.id)
					})
					let maxid = Math.max.apply(Math, arr)
					this.consigneeId = maxid
					this.isShowAddress = true
				}
			})
		},
		selectConsignee(c) {
			this.consigneeId = c.id
			this.$emit('consignee',c)
		},
		setDefaultAddress(consignee) {
			this.$API.ConsigneeSetDefault({
				consignee: consignee.id
			}).then((response)=>{
				if ( response.data.error_code == 0 ) {
					this.consignees.forEach((val, index)=>{
						if (val.id == consignee.id) {
							val.is_default =  true
							this.consigneeId = consignee.id
						}else{
							val.is_default =  false
						}
					})
				}
			})
		},
		showAddress() {
			this.isShowAddress = !this.isShowAddress
		},
		fun(val) {
			if (!this.isShowAddress) {
				return val
			}else{
				return true
			}
		},
		addAddress() {
			this.editId = ''
			this.dialogFormVisible = true
			let obj = {}
			obj.stopPropagation = () =>{}
			setTimeout(()=>{
				this.$refs.form.resetFields()
				this.form.name=''
				this.form.mobile=''
				this.form.otherMobile=''
				this.form.textarea=''
				this.$refs.cascader.clearValue(obj)
			},50)

		},
		handleChange(val) {
			this.lastRegion = val
		},
		handleFocus(val) {
			this.form.regions = R.children[0].children
		},
		deleteAddress(cid,index) {
			this.$API.ConsigneeDelete({
				consignee: cid
			}).then((response)=>{
				if (response.data.error_code == 0) {
					this.consignees.splice(index,1)
					if (this.consigneeId == cid) {
						this.consigneeId = this.consignees[0].id
					}
				}else{
					this.$message({
						message: '删除失败',
						type: 'warning',
						customClass: 'com_tips'
					})
				}
			})
		},
		editAddress(consignee) {
			this.editId = consignee.id
			this.form.name = consignee.name
			this.form.mobile = consignee.mobile
			this.form.otherMobile = consignee.phone
			this.form.textarea = consignee.address
			let arr = []
			consignee.regions.forEach((el,i)=>{
				i != 0 ? arr.push(el.id) : ''
			})
			this.defaultRegions = arr
			this.dialogFormVisible = true
		},
		save(form) {
			this.$refs[form].validate((valid) => {
        if (!valid) {
          return false;
        }
      })
			let name = this.form.name
			let mobile = this.form.mobile
			let phone = this.form.otherMobile
			let address = this.form.textarea
			let regions = this.lastRegion[this.lastRegion.length - 1] || this.defaultRegions[this.defaultRegions.length-1]
			if (!regions) { return false }
			// 防止多次的保存
			if ( this.allowSave ) {
				this.allowSave = false;
			} else {
				return;
			}
			if (this.editId) {
				this.$API.ConsigneeUpdate({
					consignee: this.editId,
					name: name,
					mobile: mobile,
					phone: phone,
					tel: mobile,
					zip_code: '',
					region: regions,
					address: address
				}).then((res)=>{
					this.allowSave = true
					if (res.data.error_code == 0) {
						this.dialogFormVisible = false
						this.getConsignee()
					}
				})
      }else{
      	this.$API.ConsigneeAdd({
					name: name,
					mobile: mobile,
					phone: phone,
					tel: mobile,
					zip_code: '',
					region: regions,
					address: address
				}).then((res)=>{
					this.allowSave = true
					if (res.data.error_code == 0) {
						this.dialogFormVisible = false
						this.getConsignee(true)
					}
				})
      }
			
		}
	}
}
</script>
<style scoped lang="scss">
.moreAddress{
	margin-left: 20px; color: #666; font-size: 13px; margin-top: 5px; display: inline-block;
	i{
		margin-left: 5px;
	}
}
h4{
	font-size: 14px; height: 40px; line-height: 40px; font-weight: bold;
	.fr{
		color: #005ea7; font-weight: normal;
		&:hover{
			color: #e4393c;
		}
	}
}
ul{
	padding: 0 20px;
	.deliveryList{
		&:hover{
			background: #fff3f3;
		}
	}
	li{
		margin-bottom: 15px; color: #666;
		.item{
			position: relative; display: inline-block; background: #fff;
			b{
				display: none; position: absolute; bottom: 1px; right: 1px; width: 10px; height: 10px; background: url(../assets/images/bg/bg.png) no-repeat;
			}
			a{
				display: inline-block; min-width: 140px; border: 2px solid #eee; padding: 4px 10px; text-align: center; line-height: 18px; color: #666;
			}
			&.selected b{
				display: block;
			}
			&.selected a{
				border-color: #24991E;
			}
			&:hover a{
				border-color: #24991E;
			}
		}
		.deliveryInfo{
			line-height: 30px;
			.infoLeft{
				margin-left: 150px;
				span{
					margin-right: 10px;
				}
				span.normal{
					background-color: #999; color: #fff; padding: 3px 6px; line-height: 20px;
				}
			}
			a{
				color: #005ea7; margin: 0 8px;
				&:hover{
					color: #e4393c;
				}
			}
		}
	}
}

</style>