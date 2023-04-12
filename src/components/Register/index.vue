<template>
	<div class="register-container">
		<!-- 注册内容 -->
		<div class="register">
			<h3>
				注册新用户
				<span class="go">
					我有账号，去
					<a href="login.html" target="_blank">登陆</a>
				</span>
			</h3>
			<div class="content">
				<label>手机号:</label>
				<input type="text" v-model="regform.phone" @focus="phoneMsg = ''" placeholder="请输入你的手机号" />
				<span class="error-msg">{{ regform.phone | phoneRule(that) }}</span>
			</div>
			<div class="content">
				<label>验证码:</label>
				<input type="text" placeholder="请输入验证码" v-model="regform.code">
				<span><button :disabled="phoneErr" @click="getCode">获取验证码</button></span>
				<span class="error-msg" v-text="codeMsg"></span>
			</div>
			<div class="content">
				<label>登录密码:</label>
				<input type="text" v-model="regform.password" placeholder="请输入你的登录密码" />
				<span class="error-msg">{{ regform.password | pwd1Rule(that) }}</span>
			</div>
			<div class="content">
				<label>确认密码:</label>
				<input type="text" v-model="password2" placeholder="请输入确认密码"/>
				<span class="error-msg">{{ password2 | pwd2Rule(that) }}</span>
			</div>
			<div class="controls">
				<input name="m1" type="checkbox" v-model="choose" />
				<span>同意协议并注册《尚品汇用户协议》</span>
				<span class="error-msg" v-text="agreeMsg"></span>
			</div>
			<div class="btn" @click="submit">
				<button>完成注册</button>
			</div>
		</div>

		<!-- 底部 -->
		<div class="copyright">
			<ul>
				<li>关于我们</li>
				<li>联系我们</li>
				<li>联系客服</li>
				<li>商家入驻</li>
				<li>营销中心</li>
				<li>手机尚品汇</li>
				<li>销售联盟</li>
				<li>尚品汇社区</li>
			</ul>
			<div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
			<div class="beian">京ICP备19006430号</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Register',
		data() {
			return {
				regform: {
					phone: '13117572920',
					password: 'Wydxb74110',
					code: ''
				},
				password2: 'Wydxb74110',
				code: '',
				pwdMsg2: '',
				codeMsg: '',
				agreeMsg: '',
				phoneErr: true,
				choose: false,
				rules: {
					phone: false,
					pwd1: false,
					pwd2: false
				},
				that: this
			}
		},

		filters: {
			phoneRule(val, that) {
				let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
				if (val.trim().length === 0) {
					that.phoneErr = true
					that.rules.phone = false
					return ''
				}
				if (reg.test(val)) {
					that.phoneErr = false
					that.rules.phone = true
					return ''
				} else {
					that.rules.phone = false
					return '手机号码格式不正确'
				}
			},
			pwd1Rule(val, that) {
				let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=])[a-zA-Z\d!@#$%^&*()_+-=]{8,16}$/
				if (reg.test(val)) {
					that.rules.pwd1 = true
					return ''
				} else {
					that.rules.pwd1 = false
					return '密码必须包含三种以上符号，长度8-16位'
				}
			},
			// 确认密码
			pwd2Rule(val, that) {
				let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=])[a-zA-Z\d!@#$%^&*()_+-=]{8,16}$/
				if (reg.test(val)) {
					if (val !== that.regform.password) {
						that.rules.pwd2 = false
						return '两次密码不一致'
					} else {
						that.rules.pwd2 = true
						return '密码一致'
					}
				} else {
					that.rules.pwd2 = false
					return '密码必须包含三种以上符号，长度8-16位'
				}
			}
		},
		methods: {
			// 提交
			submit() {
				let rule = Object.values(this.rules)
				let flag = rule.every(item => {
					return item
				})
				if (!flag) {
					return this.agreeMsg == '信息填写不正确'
				}
				if (!this.choose) {
					return (this.agreeMsg = '请勾选用户协议')
				}
				if (this.regform.code.length === 0) {
					return (this.codeMsg = '请填写验证码')
				}
				if (this.regform.code != this.code) {
					return (this.codeMsg = '验证码错误')
				}

				this.axios({
					url: '/api/user/passport/register',
					method: 'post',
					data: this.regform
				}).then(res => {
					console.log(res)
					if(res.code===200){
						this.$message.success('注册成功！')
						setTimeout(() => {
							this.$router.push('/login')
						}, 2000);
					}else{
						this.$message.error(res.message)
					}
				})
			},
			// 获取验证码
			getCode() {
				this.axios.get('/api/user/passport/sendCode/' + this.regform.phone).then(res => {
					console.log(res)
					this.code = res.data
					alert('验证码为' + this.code)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.register-container {
		.register {
			width: 1200px;
			height: 445px;
			border: 1px solid rgb(223, 223, 223);
			margin: 0 auto;

			h3 {
				background: #ececec;
				margin: 0;
				padding: 6px 15px;
				color: #333;
				border-bottom: 1px solid #dfdfdf;
				font-size: 20.04px;
				line-height: 30.06px;

				span {
					font-size: 14px;
					float: right;

					a {
						color: #e1251b;
					}
				}
			}

			div:nth-of-type(1) {
				margin-top: 40px;
			}

			.content {
				padding-left: 390px;
				margin-bottom: 18px;
				position: relative;

				label {
					font-size: 14px;
					width: 96px;
					text-align: right;
					display: inline-block;
				}

				input {
					width: 270px;
					height: 38px;
					padding-left: 8px;
					box-sizing: border-box;
					margin-left: 5px;
					outline: none;
					border: 1px solid #999;
				}

				img {
					vertical-align: sub;
				}

				.error-msg {
					position: absolute;
					top: 100%;
					left: 495px;
					color: red;
				}
			}

			.controls {
				text-align: center;
				position: relative;

				input {
					vertical-align: middle;
				}

				.error-msg {
					position: absolute;
					top: 100%;
					left: 495px;
					color: red;
				}
			}

			.btn {
				text-align: center;
				line-height: 36px;
				margin: 17px 0 0 55px;

				button {
					outline: none;
					width: 270px;
					height: 36px;
					background: #e1251b;
					color: #fff !important;
					display: inline-block;
					font-size: 16px;
				}
			}
		}

		.copyright {
			width: 1200px;
			margin: 0 auto;
			text-align: center;
			line-height: 24px;

			ul {
				li {
					display: inline-block;
					border-right: 1px solid #e4e4e4;
					padding: 0 20px;
					margin: 15px 0;
				}
			}
		}
	}
</style>
