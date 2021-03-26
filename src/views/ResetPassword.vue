<template>
  <el-container style="height: 100%;">
    <el-header height="55px">
      <header-bar></header-bar>
    </el-header>
    <el-main>
      <div class="reset-form">
        <div class="title">修改密码</div>
        <div class="input-groups">
          <label class="input-group">
            <input type="password" v-focus-style placeholder="原密码" v-model="form.oldPassword">
          </label>
          <label class="input-group">
            <input type="password" v-focus-style placeholder="设置新密码：6-16位字符，包含字母和数字" v-model="form.newPassword">
          </label>
          <label class="input-group">
            <input type="password" v-focus-style placeholder="再次输入新密码" v-model="form.rePassword">
          </label>
        </div>
        <button class="commit-btn" @click="commit">提交</button>
        <span class="cancel-btn" @click="$router.back()">取消</span>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import {defineComponent, reactive} from 'vue'
import {ElMessage} from 'element-plus'
import {useRouter} from 'vue-router'
import HeaderBar from "@/components/view-part/HeaderBar";

export default defineComponent({
  name: "ResetPassword",
  components: {
    HeaderBar
  },
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
      oldPassword: '',
      newPassword: '',
      rePassword: ''
    })
    const commit = () => {
      if (!form.oldPassword) {
        return ElMessage.error('请输入原密码')
      }
      if (!form.newPassword) {
        return ElMessage.error('请设置新密码：6-16位字符，包含字母和数字')
      }
      if (!form.rePassword) {
        return ElMessage.error('请再次输入新密码')
      }
      if (form.newPassword !== form.rePassword) {
        return ElMessage.error('两次密码输入不一致')
      }
      ElMessage.success('密码修改成功')
      router.back()
    }
    return {
      form,
      commit
    }
  }
})
</script>

<style scoped lang="scss">
.el-header {
  padding: 0 20px;
  background-color: #FFFFFF;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
}

.el-main {
  display: flex;
  justify-content: center;
  align-items: center;

  .reset-form {
    width: 980px;
    padding: 120px 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFFFFF;
    border-radius: 4px;

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
      }
    }

    .commit-btn {
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

    .cancel-btn {
      margin-top: 30px;
      font-size: 14px;
      color: #101010;
      cursor: pointer;
    }
  }
}
</style>