<template>
	<div class="trade-container">
		<h3 class="title">填写并核对订单信息</h3>
		<div class="content">
			<h5 class="receive">
				收件人信息
				<a href="javascript:" style="float: right; margin-right: 50px" @click="addAddress">新增地址</a>
			</h5>
			<div class="address clearFix" v-for="(item, index) in addressList" :key="item.id">
				<span @click="changeAddress(index)" :class="{ username: 1, selected: classIndex === index }">
					{{ item.consignee }}
				</span>
				<p>
					<span class="s1">{{ item.fullAddress }}</span>
					<span class="s2">{{ item.phoneNum }}</span>
					<span class="s3" v-if="item.isDefault === '1'">默认地址</span>
				</p>
				<div style="margin-left: auto; width: 100px">
					<a href="javascript:">删除</a>
					&nbsp; &nbsp; &nbsp;
					<a href="javascript:">修改</a>
				</div>
			</div>
			<!-- !添加地址 -->
			<el-dialog :title="title" :visible.sync="dialogFormVisible">
				<el-form :model="form">
					<el-form-item label="收货人" :label-width="formLabelWidth">
						<el-input v-model="form.consignee" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="联系电话" :label-width="formLabelWidth">
						<el-input v-model="form.phoneNum" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="收货地址" :label-width="formLabelWidth">
						<el-input v-model="form.userAddress" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="是否设置为默认地址" :label-width="formLabelWidth">
						<el-checkbox v-model="form.isDefault" true-label="1" false-label="0"></el-checkbox>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogFormVisible = false">取 消</el-button>
					<el-button type="primary" @click="submitAdd">确 定</el-button>
				</div>
			</el-dialog>
			<!-- !添加地址 -->
			<div class="line"></div>
			<h5 class="pay">支付方式</h5>
			<div class="address clearFix">
				<span :class="{ selected: selectedClass === 0, username: true }" @click="selectedClass = 0">在线支付</span>
				<span
					:class="{ selected: selectedClass === 1, username: true }"
					@click="selectedClass = 1"
					style="margin-left: 5px">
					货到付款
				</span>
			</div>
			<div class="line"></div>
			<h5 class="pay">送货清单</h5>
			<div class="way">
				<h5>配送方式</h5>
				<div class="info clearFix">
					<span class="s1">天天快递</span>
					<p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
				</div>
			</div>
			<div class="detail">
				<h5>商品清单</h5>

				<ul class="list clearFix" v-for="item in tradeList" :key="item.skuId">
					<li>
						<img :src="item.imgUrl" alt="" width="100" />
					</li>
					<li>
						<p>Apple iPhone 6s (A1700) 64G 玫瑰金色 移动联通电信4G手机硅胶透明防摔软壳 本色系列</p>
						<h4>7天无理由退货</h4>
					</li>
					<li>
						<h3>￥{{ item.orderPrice | buling }}</h3>
					</li>
					<li>X{{ item.skuNum }}</li>
					<li>有货</li>
				</ul>
			</div>
			<div class="bbs">
				<h5>买家留言：</h5>
				<textarea
					placeholder="建议留言前先与商家沟通确认"
					class="remarks-cont"
					v-model="address.orderComment"></textarea>
			</div>
			<div class="line"></div>
			<div class="bill">
				<h5>发票信息：</h5>
				<div>普通发票（电子） 个人 明细</div>
				<h5>使用优惠/抵用</h5>
			</div>
		</div>
		<div class="money clearFix">
			<ul>
				<li>
					<b>
						<i>{{ count }}</i>
						件商品，总商品金额
					</b>
					<span>¥{{ price | buling }}</span>
				</li>
				<li>
					<b>返现：</b>
					<span>0.00</span>
				</li>
				<li>
					<b>运费：</b>
					<span>0.00</span>
				</li>
			</ul>
		</div>
		<div class="trade">
			<div class="price">
				应付金额:　
				<span>¥5399.00</span>
			</div>
			<div class="receiveInfo">
				寄送至:
				<span>{{ addressList[classIndex].fullAddress }}</span>
				收货人：
				<span>{{ addressList[classIndex].consignee }}</span>
				<span>{{ addressList[classIndex].phoneNum }}</span>
			</div>
		</div>
		<div class="sub clearFix">
			<a class="subBtn" @click="submitOrder">提交订单</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Trade',
		data() {
			return {
				tradeList: [],
				addressList: [{
          fullAddress:'',
          consignee:'',
          phoneNum:''
        }],
				count: 0,
				price: 0,
				selectedClass: 0,
				formLabelWidth: '140px',
				title: '',
				dialogFormVisible: false,
				classIndex: 0,
				form: {
					consignee: '',
					isDefault: '0',
					phoneNum: '',
					provinceId: 25,
					regionId: 4,
					userAddress: ''
				},
				address: {
					traderNo: '',
					consignee: '',
					consigneeTel: '',
					deliveryAddress: '',
					paymentWay: 'ONLINE',
					orderComment: '',
					orderDetailList: []
				}
			}
		},
		mounted() {
			this.getTradeList()
		},
		methods: {
			submitOrder() {
				this.address.deliveryAddress = this.addressList[this.classIndex].fullAddress
				this.address.consigneeTel = this.addressList[this.classIndex].phoneNum
				this.address.consignee = this.addressList[this.classIndex].consignee
				this.address.orderDetailList = this.tradeList
        if(!this.address.orderComment.length) {
          this.address.orderComment = '未填写备注'
        }
				this.axios.post(`/api/order/auth/submitOrder?tradeNo=${this.address.traderNo}`, this.address).then(res => {
					console.log(JSON.parse(JSON.stringify(res)))
          if(res.code===200){
            this.$router.push(`/pay/${res.data}`)
          }
				})
			},
			changeAddress(index) {
				this.classIndex = index
			},
			submitAdd() {
				this.dialogFormVisible = false
				this.axios.post('/api/user/userAddress/auth/save', this.form).then(res => {
					console.log(res)
					if (res.code === 200) {
						this.$message.success('添加成功')
					} else {
						this.$message.success(res.message)
					}
				})
			},
			addAddress() {
				this.dialogFormVisible = true
				this.title = '新增地址'
			},
			getTradeList() {
				this.axios.get('/api/order/auth/trade').then(res => {
					console.log(JSON.parse(JSON.stringify(res)))
					this.tradeList = res.data.detailArrayList
					this.addressList = res.data.userAddressList
					this.classIndex = this.addressList.findIndex(item => {
						return item.isDefault === '1'
					})
					this.address.traderNo = res.data.tradeNo
					let count = 0
					let price = 0
					this.tradeList.forEach(item => {
						count += item.skuNum
						price += item.orderPrice
					})
					this.count = count
					this.price = price
				})
			}
		},
		// 保留两位小数
		filters: {
			buling(num) {
				return num.toFixed(2)
			}
		}
	}
</script>

<style lang="less" scoped>
	.trade-container {
		.title {
			width: 1200px;
			margin: 0 auto;
			font-size: 14px;
			line-height: 21px;
		}

		.content {
			width: 1200px;
			margin: 10px auto 0;
			border: 1px solid rgb(221, 221, 221);
			padding: 25px;
			box-sizing: border-box;

			.receive,
			.pay {
				line-height: 36px;
				margin: 18px 0;
			}

			.address {
				padding-left: 20px;
				margin-bottom: 15px;
				display: flex;
				.username {
					float: left;
					width: 100px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					border: 1px solid #ddd;
					position: relative;
				}

				.username::after {
					content: '';
					display: none;
					width: 13px;
					height: 13px;
					position: absolute;
					right: 0;
					bottom: 0;
					background: url(./images/choosed.png) no-repeat;
				}

				.username.selected {
					border-color: #e1251b;
				}

				.username.selected::after {
					display: block;
				}

				p {
					width: 610px;
					float: left;
					line-height: 30px;
					margin-left: 10px;
					padding-left: 5px;
					cursor: pointer;

					.s1 {
						float: left;
					}

					.s2 {
						float: left;
						margin: 0 5px;
					}

					.s3 {
						float: left;
						width: 56px;
						height: 24px;
						line-height: 24px;
						margin-left: 10px;
						background-color: #878787;
						color: #fff;
						margin-top: 3px;
						text-align: center;
					}
				}

				p:hover {
					background-color: #ddd;
				}
			}

			.line {
				height: 1px;
				background-color: #ddd;
			}

			.way {
				width: 1080px;
				height: 110px;
				background: #f4f4f4;
				padding: 15px;
				margin: 0 auto;

				h5 {
					line-height: 50px;
				}

				.info {
					margin-top: 20px;

					.s1 {
						float: left;
						border: 1px solid #ddd;
						width: 120px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						margin-right: 10px;
					}

					p {
						line-height: 30px;
					}
				}
			}

			.detail {
				width: 1080px;

				background: #feedef;
				padding: 15px;
				margin: 2px auto 0;

				h5 {
					line-height: 50px;
				}

				.list {
					display: flex;
					justify-content: space-between;

					li {
						line-height: 30px;

						p {
							margin-bottom: 20px;
						}

						h4 {
							color: #c81623;
							font-weight: 400;
						}

						h3 {
							color: #e12228;
						}
					}
				}
			}

			.bbs {
				margin-bottom: 15px;

				h5 {
					line-height: 50px;
				}

				textarea {
					width: 100%;
					border-color: #e4e2e2;
					line-height: 1.8;
					outline: none;
					resize: none;
				}
			}

			.bill {
				h5 {
					line-height: 50px;
				}

				div {
					padding-left: 15px;
				}
			}
		}

		.money {
			width: 1200px;
			margin: 20px auto;

			ul {
				width: 220px;
				float: right;

				li {
					line-height: 30px;
					display: flex;
					justify-content: space-between;

					i {
						color: red;
					}
				}
			}
		}

		.trade {
			box-sizing: border-box;
			width: 1200px;
			padding: 10px;
			margin: 10px auto;
			text-align: right;
			background-color: #f4f4f4;
			border: 1px solid #ddd;

			div {
				line-height: 30px;
			}

			.price span {
				color: #e12228;
				font-weight: 700;
				font-size: 14px;
			}

			.receiveInfo {
				color: #999;
			}
		}

		.sub {
			width: 1200px;
			margin: 0 auto 10px;

			.subBtn {
				float: right;
				width: 164px;
				height: 56px;
				font: 700 18px '微软雅黑';
				line-height: 56px;
				text-align: center;
				color: #fff;
				background-color: #e1251b;
			}
		}
	}
</style>
