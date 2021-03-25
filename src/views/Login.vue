<template>
  <div class="login-page">
    <div class="header">
      <img src="/favicon.ico" alt="云界跨境电商" class="logo">
    </div>
    <div class="cont-wrapper">
      <div class="cont">
        <img src="/favicon.ico" alt="云界跨境电商" class="cover">
        <div class="login-form">
          <div class="title">登录</div>
          <div class="input-groups">
            <label class="input-group">
              <input type="text" v-focus-style placeholder="账号" v-model="form.account">
            </label>
            <label class="input-group">
              <input type="password" v-focus-style placeholder="密码" v-model="form.password">
            </label>
            <label class="input-group">
              <input type="text" v-focus-style placeholder="验证码" v-model="form.code" @keyup.enter.prevent="login">
              <el-tooltip class="item" effect="dark" content="点击更换" placement="top-end">
                <img src="/favicon.ico" alt="" class="verification-img">
              </el-tooltip>
            </label>
          </div>
          <button class="login-btn" @click="login">登录</button>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="company">
        <span class="dash">——</span>
        <span>四川云界 ● 跨境电商</span>
        <span class="dash">——</span>
      </div>
      <div class="address">蜀ICP备2020027197号-1 Copyright © 2020 四川云界跨境电商服务有限公司</div>
    </div>
  </div>
</template>

<script>
import {defineComponent, reactive} from 'vue'
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'
import dynamicRoutes from "@/router/dynamic";
import router from "@/router";

export default defineComponent({
  name: 'Login',
  directives: {
    focusStyle: {
      beforeMount(el) {
        el.onfocus = () => {
          el.parentElement.style.borderColor = '#F9612E'
        }
        el.onblur = () => {
          el.parentElement.style.borderColor = '#D4D9E2'
        }
      }
    }
  },
  setup() {
    const router = useRouter()
    const form = reactive({
      account: 'asda',
      password: 'asdas',
      code: 'asdasd'
    })
    const login = () => {
      if (!form.account) {
        return ElMessage.error('请输入正确的账号')
      }
      if (!form.password) {
        return ElMessage.error('请输入密码')
      }
      if (!form.code) {
        return ElMessage.error('请输入验证码')
      }
      ElMessage.success('登陆成功')
      router.addRoute('Main', dynamicRoutes[0])
      router.replace('/')
    }
    return {
      form,
      login
    }
  }
})
</script>

<style scoped lang="scss">
.login-page {
  width: 100%;
  height: 100%;
  padding: 50px 230px 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    display: flex;

    .logo {
      max-height: 50px;
    }
  }

  .cont-wrapper {
    display: flex;
    justify-content: center;

    .cont {
      width: 1000px;
      height: 550px;
      display: flex;
      background-color: #FFFFFF;

      .cover {
        width: 480px;
        height: 100%;
        background-color: #F9612E;
      }

      .login-form {
        width: 520px;
        padding: 80px 70px 100px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .title {
          line-height: 32px;
          font-size: 18px;
          color: #101010;
          border-bottom: 2px solid #F9612E;
        }

        .input-groups {
          width: 100%;
          margin-top: 55px;

          .input-group {
            width: 100%;
            height: 36px;
            margin-top: 36px;
            display: flex;
            align-items: center;
            font-size: 14px;
            border-bottom: 1px solid #EDEDED;

            &:first-child {
              margin-top: 0;
            }

            input {
              flex-grow: 1;
              font-size: 14px;
              color: #555555;
              border: none;
              outline: none;

              &::-webkit-input-placeholder {
                color: #D4D9E2;
              }
            }

            .verification-img {
              flex-shrink: 0;
              margin-left: 10px;
              width: 100px;
              height: 100%;
              cursor: pointer;
            }
          }
        }

        .login-btn {
          margin-top: 45px;
          width: 100%;
          height: 56px;
          line-height: 56px;
          border-radius: 28px;
          font-size: 16px;
          color: #FFFFFF;
          border: none;
          outline: none;
          background-color: #F9612E;
          cursor: pointer;

          &:active {
            opacity: 0.88;
          }
        }
      }
    }
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1;
    font-size: 12px;
    color: #999999;

    .company {
      display: flex;

      .dash {
        transform: scaleY(2.2) translateY(-1px);
        padding: 0 15px;
        vertical-align: top;
      }
    }

    .address {
      margin-top: 10px;
    }
  }
}
</style>
