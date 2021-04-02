<template>
  <div class="header-bar">
    <img src="/favicon.ico" alt="云界跨境电商" class="logo">
    <div class="right-menu">
      <!--      <div class="menu-item">-->
      <!--        <el-badge :value="12" :max="99" type="danger">-->
      <!--          <el-icon class="el-icon-message-solid"></el-icon>-->
      <!--        </el-badge>-->
      <!--        <span style="margin-left: 5px;">通知</span>-->
      <!--      </div>-->
      <div class="menu-item">
        <img src="/favicon.ico" alt="云界跨境电商" class="portrait">
        <el-dropdown trigger="click" v-if="$route.path !== '/resetPassword'">
          <span style="color: #919191;">
            <span>admin</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <router-link to="/resetPassword" custom v-slot="{navigate}">
                  <div @click="navigate">修改密码</div>
                </router-link>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span v-else>admin</span>
      </div>
      <div class="menu-item" @click="logout">
        <el-icon class="el-icon-s-unfold"></el-icon>
        <span style="margin-left: 5px;">退出</span>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {ElMessage, ElMessageBox} from 'element-plus'
import {useRouter} from 'vue-router'

export default defineComponent({
  name: "HeaderBar",
  setup() {
    const router = useRouter()
    const logout = () => {
      ElMessageBox.confirm('确定退出登录？', {type: 'warning'}).then(() => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('permission')
        router.replace('/login')
      }).catch((err) => {
        console.log(err);
      })
    }
    return {
      logout
    }
  }
})
</script>

<style scoped lang="scss">
.header-bar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;

  .logo {
    max-height: 38px;
  }

  .right-menu {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #919191;

    .menu-item {
      display: flex;
      align-items: center;
      height: 18px;
      line-height: 18px;
      padding: 0 10px;
      border-right: 1px solid #999999;
      cursor: pointer;

      &:last-child {
        border-right: none;
      }

      .portrait {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        border-radius: 50%;
      }
    }
  }
}
</style>