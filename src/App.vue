<template>
	<div id="app" class="outer">
		<!-- 头部 -->
		<header class="header">
			<!-- 头部的第一行 -->
			<div class="top">
				<div class="container">
					<div class="loginList">
						<p>尚品汇欢迎您！</p>
						<p v-if="$store.state.token">
							{{ nickName }}
							<a href="###" @click.prevent="logout">退出</a>
						</p>
						<p v-else>
							<span>请</span>
							<a href="###" @click.prevent="$router.push('/login')">登录</a>
							<a href="###" class="register" @click.prevent="$router.push('/register')">免费注册</a>
						</p>
					</div>
					<div class="typeList">
						<router-link :to="'/center'">我的订单</router-link>
						<router-link :to="'/shopcart'">我的购物车</router-link>
						<a href="###">我的尚品汇</a>
						<a href="###">尚品汇会员</a>
						<a href="###">企业采购</a>
						<a href="###">关注尚品汇</a>
						<a href="###">合作招商</a>
						<a href="###">商家后台</a>
					</div>
				</div>
			</div>
			<!--头部第二行 搜索区域-->
			<div class="bottom">
				<h1 class="logoArea">
					<router-link class="logo" title="尚品汇" :to="'/home'">
						<img src="./images/logo.png" alt="" />
					</router-link>
				</h1>
				<div class="searchArea">
					<form action="#" class="searchForm">
						<input
							type="text"
							id="autocomplete"
							@keydown.prevent.enter="search"
							class="input-error input-xxlarge"
							v-model="txt"
							placeholder="手机" />
						<button class="sui-btn btn-xlarge btn-danger" type="button" @click.prevent="search">搜索</button>
					</form>
				</div>
			</div>
		</header>
		<router-view />
	</div>
</template>
<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				txt: ''
			}
		},
		computed: {
			...mapGetters(['nickName']),
			keyword() {
				if (this.txt.trim().length === 0) {
					return '手机'
				}
				return this.txt
			}
		},
		mouted(){
			if(sessionStorage.getItem('token')){
				this.changeFlag(true)
			}
		},
		
		methods: {
			// 获取登陆状态
			...mapMutations(['changeFlag','gettoken']),
			// 退出登录
			logout() {
				sessionStorage.removeItem('token')
				sessionStorage.removeItem('name')
				this.changeFlag(false)
				this.gettoken(null)
				this.$router.push('/login')
			},
			// 搜索
			search() {
				// 判断当前的路由名称是不是search，判断当前页面是不是搜索
				if (this.$route.name == 'search' && this.keyword == this.$route.params.keyword) {
					// 如果文本框中的搜索关键字和路由中的关键字一致的话，则不用响应
					console.log(this.$route.name, this.keyword, this.$route.params.keyword)
				} else {
					this.$router.push('/search/' + this.keyword)
				}
			}
		}
	}
</script>
<style>
	.outer .toolbar {
		position: fixed;
		z-index: 999;
		width: 300px;
		height: 100%;
		background-color: #7a6e6e;
		transition: right 0.3s ease-in-out 0s;
	}
	.outer .toolbar.toolbar-out {
		top: 0px;
		right: 0px;
	}
	.outer .toolbar.toolbar-wrap {
		top: 0px;
		right: -294px;
	}
	.outer .toolbar .content {
		position: relative;
		left: 6px;
		width: 294px;
		background-color: bisque;
		height: 100%;
		z-index: 99;
	}
	.outer .toolbar .but {
		position: relative;
		width: 35px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		margin-bottom: 1px;
		cursor: pointer;
		background-color: #7a6e6e;
		border-radius: 3px 0 0 3px;
		position: absolute;
		top: 0;
		/*right: -6px;*/
		left: -29px;
	}
	.outer .toolbar .but.list {
		background-image: url(./images/list.png);
		background-repeat: no-repeat;
		background-size: cover;
	}
	.outer .toolbar .but.pull-wrap {
		background-image: url(./images/cross.png);
		background-repeat: no-repeat;
		background-size: cover;
	}
	.outer .toolbar .toolist {
		position: absolute;
		top: 50%;
		left: -29px;
		width: 35px;
		margin-top: -80px;
		/*background-color: cadetblue;*/
	}
	.outer .toolbar .toolist .pull {
		position: relative;
		width: 35px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		margin-bottom: 1px;
		cursor: pointer;
		background-color: #7a6e6e;
		border-radius: 3px 0 0 3px;
		z-index: 66;
	}
	.outer .toolbar .toolist .pull .vip {
		background-image: url(./images/toolbars.png);
		background-position: -88px -175px;
	}
	.outer .toolbar .toolist .pull .cart {
		background-image: url(./images/toolbars.png);
		background-position: -50px 0;
	}
	.outer .toolbar .toolist .pull .follow {
		background-image: url(./images/toolbars.png);
		background-position: -50px -50px;
	}
	.outer .toolbar .toolist .pull .history {
		background-image: url(./images/toolbars.png);
		background-position: -50px -100px;
	}
	.outer .toolbar .toolist .pull .message {
		background-image: url(./images/toolbars.png);
		background-position: -190px -150px;
	}
	.outer .toolbar .toolist .pull .jimi {
		background-image: url(./images/toolbars.png);
		background-position: -50px -150px;
	}
	.outer .toolbar .toolist .pull .top {
		background-image: url(./images/toolbars.png);
		background-position: -50px -250px;
	}
	.outer .toolbar .toolist .pull .tab-text {
		width: 62px;
		height: 35px;
		line-height: 35px;
		color: #fff;
		text-align: center;
		font-family: 微软雅黑;
		position: absolute;
		/*position: relative;*/
		z-index: 1;
		left: 35px;
		top: 0;
		background-color: #7a6e6e;
		border-radius: 3px 0 0 3px;
		font-style: normal;
		-webkit-transition: left 0.3s ease-in-out 0.1s;
		transition: left 0.3s ease-in-out 0.1s;
	}
	.outer .toolbar .toolist .pull .tab-ico {
		display: inline-block;
		position: relative;
		/*background-image: url(img/toolbars.png);*/
		background-color: #7a6e6e;
		border-radius: 3px 0 0 3px;
		z-index: 2;
		width: 35px;
		height: 35px;
	}
	.outer .toolbar > .pull {
		position: relative;
		width: 35px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		margin-bottom: 1px;
		cursor: pointer;
		background-color: #7a6e6e;
		border-radius: 3px 0 0 3px;
		z-index: 66;
	}
	.outer .toolbar > .pull .tab-ico {
		display: inline-block;
		position: relative;
		/*background-image: url(img/toolbars.png);*/
		background-color: #7a6e6e;
		border-radius: 3px 0 0 3px;
		z-index: 2;
		width: 35px;
		height: 35px;
	}
	.outer .toolbar > .pull .top {
		background-image: url(./images/toolbars.png);
		background-position: -50px -250px;
	}
	.outer .toolbar > .pull .tab-text {
		width: 62px;
		height: 35px;
		line-height: 35px;
		color: #fff;
		text-align: center;
		font-family: 微软雅黑;
		position: absolute;
		/*position: relative;*/
		z-index: 1;
		left: 35px;
		top: 0;
		background-color: #7a6e6e;
		border-radius: 3px 0 0 3px;
		font-style: normal;
		-webkit-transition: left 0.3s ease-in-out 0.1s;
		transition: left 0.3s ease-in-out 0.1s;
	}
	.outer .toolbar > .back {
		position: absolute;
		bottom: 0;
		/*right: -6px;*/
		left: -29px;
		display: inline-block;
		background-image: url(./images/toolbars.png);
	}
	.outer .header > .top {
		background-color: #eaeaea;
		height: 30px;
		line-height: 30px;
	}
	.outer .header > .top .container {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
	}
	.outer .header > .top .container .loginList {
		float: left;
	}
	.outer .header > .top .container .loginList p {
		float: left;
		margin-right: 10px;
	}
	.outer .header > .top .container .loginList p .register {
		border-left: 1px solid #b3aeae;
		padding: 0 5px;
		margin-left: 5px;
	}
	.outer .header > .top .container .typeList {
		float: right;
	}
	.outer .header > .top .container .typeList a {
		padding: 0 10px;
	}
	.outer .header > .top .container .typeList a + a {
		border-left: 1px solid #b3aeae;
	}
	.outer .header > .bottom {
		width: 1200px;
		margin: 0 auto;
		overflow: hidden;
	}
	.outer .header > .bottom .logoArea {
		float: left;
	}
	.outer .header > .bottom .logoArea .logo img {
		width: 175px;
		margin: 25px 45px;
	}
	.outer .header > .bottom .searchArea {
		float: right;
		margin-top: 35px;
	}
	.outer .header > .bottom .searchArea .searchForm {
		overflow: hidden;
	}
	.outer .header > .bottom .searchArea .searchForm input {
		box-sizing: border-box;
		width: 490px;
		height: 32px;
		padding: 0px 4px;
		border: 2px solid #ea4a36;
		float: left;
	}
	.outer .header > .bottom .searchArea .searchForm input:focus {
		outline: none;
	}
	.outer .header > .bottom .searchArea .searchForm button {
		height: 32px;
		width: 68px;
		background-color: #ea4a36;
		border: none;
		color: #fff;
		float: left;
		cursor: pointer;
	}
	.outer .header > .bottom .searchArea .searchForm button:focus {
		outline: none;
	}
	.outer .typeNav {
		border-bottom: 2px solid #e1251b;
	}
	.outer .typeNav .container {
		width: 1200px;
		margin: 0 auto;
		display: flex;
	}
	.outer .typeNav .container .all {
		width: 210px;
		height: 45px;
		background-color: #e1251b;
		line-height: 45px;
		text-align: center;
		color: #fff;
		font-size: 14px;
		font-weight: bold;
	}
	.outer .typeNav .container .nav a {
		height: 45px;
		margin: 0 22px;
		line-height: 45px;
		font-size: 16px;
		color: #333;
	}
	.outer .footer {
		background-color: #eaeaea;
	}
	.outer .footer .footer-container {
		width: 1200px;
		margin: 0 auto;
		padding: 0 15px;
	}
	.outer .footer .footer-container .footerList {
		padding: 20px;
		border-bottom: 1px solid #e4e1e1;
		border-top: 1px solid #e4e1e1;
		overflow: hidden;
		padding-left: 40px;
	}
	.outer .footer .footer-container .footerList .footerItem {
		width: 16.6666667%;
		float: left;
	}
	.outer .footer .footer-container .footerList .footerItem h4 {
		font-size: 14px;
	}
	.outer .footer .footer-container .footerList .footerItem .footerItemCon li {
		line-height: 18px;
	}
	.outer .footer .footer-container .footerList .footerItem:last-child img {
		width: 121px;
	}
	.outer .footer .footer-container .copyright {
		padding: 20px;
	}
	.outer .footer .footer-container .copyright .helpLink {
		text-align: center;
	}
	.outer .footer .footer-container .copyright .helpLink li {
		display: inline;
	}
	.outer .footer .footer-container .copyright .helpLink li .space {
		border-left: 1px solid #666;
		width: 1px;
		height: 13px;
		background: #666;
		margin: 8px 10px;
	}
	.outer .footer .footer-container .copyright p {
		margin: 10px 0;
		text-align: center;
	}
</style>
