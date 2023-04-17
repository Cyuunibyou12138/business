<template>
	<div class="cart">
		<h4>全部商品</h4>
		<div class="cart-main">
			<div class="cart-th">
				<div class="cart-th1">全部</div>
				<div class="cart-th2">商品</div>
				<div class="cart-th3">单价（元）</div>
				<div class="cart-th4">数量</div>
				<div class="cart-th5">小计（元）</div>
				<div class="cart-th6">操作</div>
			</div>
			<div class="cart-body">
				<ul class="cart-list" v-for="(cartInfo, index) in cartList" :key="cartInfo.skuId">
					<li class="cart-list-con1">
						<input
							type="checkbox"
							name="chk_list"
							v-model="cartInfo.isChecked"
							@change="changeChecked(cartInfo.skuId, cartInfo.isChecked)" />
					</li>
					<li class="cart-list-con2">
						<img :src="cartInfo.imgUrl" />
						<div class="item-msg">{{ cartInfo.skuName }}</div>
					</li>
					<li class="cart-list-con3">
						<div class="item-txt">语音升级款</div>
					</li>
					<li class="cart-list-con4">
						<span class="price">{{ cartInfo.skuPrice | buling }}</span>
					</li>
					<li class="cart-list-con5">
						<a href="javascript:;" class="mins" @click="jian(cartInfo.skuId, index)">-</a>
						<input
							autocomplete="off"
							type="text"
							minnum="1"
							class="itxt"
							v-model.number="cartInfo.skuNum"
							@blur="nownum(cartInfo.skuId, cartInfo.skuNum)"
							@focus="oldnum = cartInfo.skuNum" />
						<a href="javascript:;" class="plus" @click="add(cartInfo.skuId, index)">+</a>
					</li>
					<li class="cart-list-con6">
						<span class="sum">{{ cartInfo.skuPrice * cartInfo.skuNum }}</span>
					</li>
					<li class="cart-list-con7">
						<a href="#none" class="sindelet" @click="del(cartInfo.skuId)">删除</a>
						<br />
						<a href="#none">移到收藏</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="cart-tool">
			<div class="select-all">
				<input class="chooseAll" type="checkbox" v-model="isAll" />
				<span>全选</span>
			</div>
			<div class="option">
				<a href="#none">删除选中的商品</a>
				<a href="#none">移到我的关注</a>
				<a href="#none">清除下柜商品</a>
			</div>
			<div class="money-box">
				<div class="chosed">
					已选择
					<span>{{ count }}</span>
					件商品
				</div>
				<div class="sumprice">
					<em>总价（不含运费） ：</em>
					<i class="summoney">{{ price }}</i>
				</div>
				<div class="sumbtn">
					<router-link class="sum-btn" :to="'/trade'" >结算</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ShopCart',
		data() {
			return {
				cartList: [],
				count: 0,
				price: 0,
				oldnum: 0,
			}
		},
		mounted() {
			this.getCartList()
		},
		methods: {
			// 
			// 获取购物车列表
			getCartList() {
				this.axios.get('/api/cart/cartList').then(res => {
					console.log(res)
					this.cartList = res.data[0].cartInfoList
				})
			},
			// 更换选中状态
			changeChecked(skuId, isChecked) {
				isChecked = isChecked ? 1 : 0
				this.axios.get(`/api/cart/checkCart/${skuId}/${isChecked}`).then(res => {})
			},
			// 失去焦点
			nownum(skuId, nowNum) {
				this.changeNum(skuId, nowNum - this.oldnum)
			},
			add(skuId, index) {
				this.cartList[index].skuNum++
				this.changeNum(skuId, 1)
			},
			jian(skuId, index) {
				this.cartList[index].skuNum--
				this.changeNum(skuId, -1)
			},
			// 提交修改数量
			changeNum(skuId, skuNum) {
				this.axios.post(`/api/cart/addToCart/${skuId}/${skuNum}`).then(res => {})
			},
			del(skuId) {
				this.axios.delete(`/api/cart/deleteCart/${skuId}`).then(res => {
					console.log(res)
					this.getCartList()
				})
			}
		},
		computed: {
			isAll: {
				//小选框影响全选框
				get() {
					//判断数组里的每一个对象的c属性 它是不是等于true, 就是判断每一个小选框的状态, 只要有一个小选框的状态不为true 就是没有被勾上, 那就返回false , 全选框的状态就是false
					// every口诀: 查找数组里"不符合"条件, 直接原地返回false

					if (this.cartList.length) return this.cartList.every(obj => obj.isChecked === true || obj.isChecked === 1)
				},
				//全选影响小选
				set(val) {
					//set(val) 设置全选的状态(true/ false)
					//我们手动设置了全选框的状态,就遍历数组里的每个对象的c属性, 也就是遍历看每个小选框的状态,让它的状态改为 val 全选框的状态
					this.cartList.forEach(obj => (obj.isChecked = val))
				}
			}
		},
		watch: {
			cartList: {
				handler(newList, oldList) {
					let count = 0
					let price = 0
					newList.forEach(item => {
						if (item.skuNum < 1 || isNaN(item.skuNum)) {
							item.skuNum = 1
						}
						if (item.isChecked) {
							count += item.skuNum
							price += item.skuPrice * item.skuNum
						}
					})
					this.count = count
					this.price = price
				},
				deep: true
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
	.cart {
		width: 1200px;
		margin: 0 auto;

		h4 {
			margin: 9px 0;
			font-size: 14px;
			line-height: 21px;
		}

		.cart-main {
			.cart-th {
				background: #f5f5f5;
				border: 1px solid #ddd;
				padding: 10px;
				overflow: hidden;

				& > div {
					float: left;
				}

				.cart-th1 {
					width: 25%;

					input {
						vertical-align: middle;
					}

					span {
						vertical-align: middle;
					}
				}

				.cart-th2 {
					width: 25%;
				}

				.cart-th3,
				.cart-th4,
				.cart-th5,
				.cart-th6 {
					width: 12.5%;
				}
			}

			.cart-body {
				margin: 15px 0;
				border: 1px solid #ddd;

				.cart-list {
					padding: 10px;
					border-bottom: 1px solid #ddd;
					overflow: hidden;

					& > li {
						float: left;
					}

					.cart-list-con1 {
						width: 4.1667%;
					}

					.cart-list-con2 {
						width: 25%;

						img {
							width: 82px;
							height: 82px;
							float: left;
						}

						.item-msg {
							float: left;
							width: 150px;
							margin: 0 10px;
							line-height: 18px;
						}
					}

					.cart-list-con3 {
						width: 20.8333%;

						.item-txt {
							text-align: center;
						}
					}

					.cart-list-con4 {
						width: 12.5%;
					}

					.cart-list-con5 {
						width: 12.5%;

						.mins {
							border: 1px solid #ddd;
							border-right: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8px;
						}

						input {
							border: 1px solid #ddd;
							width: 40px;
							height: 33px;
							float: left;
							text-align: center;
							font-size: 14px;
						}

						.plus {
							border: 1px solid #ddd;
							border-left: 0;
							float: left;
							color: #666;
							width: 6px;
							text-align: center;
							padding: 8px;
						}
					}

					.cart-list-con6 {
						width: 12.5%;

						.sum {
							font-size: 16px;
						}
					}

					.cart-list-con7 {
						width: 12.5%;

						a {
							color: #666;
						}
					}
				}
			}
		}

		.cart-tool {
			overflow: hidden;
			border: 1px solid #ddd;

			.select-all {
				padding: 10px;
				overflow: hidden;
				float: left;

				span {
					vertical-align: middle;
				}

				input {
					vertical-align: middle;
				}
			}

			.option {
				padding: 10px;
				overflow: hidden;
				float: left;

				a {
					float: left;
					padding: 0 10px;
					color: #666;
				}
			}

			.money-box {
				float: right;

				.chosed {
					line-height: 26px;
					float: left;
					padding: 0 10px;
				}

				.sumprice {
					width: 200px;
					line-height: 22px;
					float: left;
					padding: 0 10px;

					.summoney {
						color: #c81623;
						font-size: 16px;
					}
				}

				.sumbtn {
					float: right;

					a {
						display: block;
						position: relative;
						width: 96px;
						height: 52px;
						line-height: 52px;
						color: #fff;
						text-align: center;
						font-size: 18px;
						font-family: 'Microsoft YaHei';
						background: #e1251b;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>
