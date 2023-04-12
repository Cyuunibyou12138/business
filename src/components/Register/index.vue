<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" v-model="form.phone" placeholder="请输入你的手机号">
        <span class="error-msg">手机</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" v-model="form.code" placeholder="请输入验证码">
        <span><button @click="getCodeBtn">获取验证码</button></span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="text" v-model="form.password" placeholder="请输入你的登录密码">
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="text" v-model="form.password2" @blur="qrmm" placeholder="请输入确认密码">
        <span class="error-msg"  v-text="pwdMsg2"></span>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox">
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg"></span>
      </div>
      <div class="btn">
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
      <div class="beian">京ICP备19006430号
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        form:{
          phone:'',
          password:'',
          password2:'',
          code:'',
        },
        code:'',
        pwdMsg2:''
      }
    },
    mounted(){
    },
    methods:{
      // 获取验证码
      getCode(){
        this.axios.get('/api/user/passport/sendCode/'+this.phone).then(res=>{
          console.log(res)
          this.code = res.code
        })
      },
      // 点击获取验证码
      getCodeBtn(){
        let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if(reg.test(this.form.phone)){
          this.getCode()
        }else{
          alert('请输入正确的手机号码')
        }
      },
      // 确认密码
      qrmm(){
        if(this.form.password!==this.form.password2){
          this.pwdMsg2='两次密码不一致'
        }else{
          this.pwdMsg2=''
        }
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
        // padding-left: 390px;
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
          margin-bottom: 15px;
        }
        

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 90%;
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