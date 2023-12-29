<template>
  <!-- 顶部导航栏 -->
  <div class="navbar">
    <!-- 左侧面包屑 -->
    <div class="flex">
      <Hamburger :is-active="appStore.sidebar.opened" @toggle-click="toggleSideBar" />
      <Breadcrumb />
    </div>
    <!-- 右侧导航设置 -->
    <div class="flex">
      <!-- 导航栏设置(窄屏隐藏)-->
      <div v-if="device !== 'mobile'" class="setting-container">
        <!--全屏 -->
        <div class="setting-item" @click="toggle">
          <svg-icon :icon-class="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
        </div>
        <!--模式切换-->
        <div class="setting-item">
          <SwitchIcon style="height: 100%; width: 100%" class="flex flex-justify-center items-center" />
        </div>
        <!--语言选择-->
        <lang-select class="setting-item" style="margin-right: 10px" />
      </div>

      <!--      <el-dropdown class="right-menu-item site-container">-->
      <!--        <el-button type="primary">-->
      <!--          当前站点: 大正-->
      <!--          &lt;!&ndash;          <el-icon class="el-icon&#45;&#45;right"><CaretBottom /></el-icon>&ndash;&gt;-->
      <!--        </el-button>-->
      <!--        <template #dropdown>-->
      <!--          <el-dropdown-menu>-->
      <!--            <el-dropdown-item>Action 1</el-dropdown-item>-->
      <!--            <el-dropdown-item>Action 2</el-dropdown-item>-->
      <!--            <el-dropdown-item>Action 3</el-dropdown-item>-->
      <!--            <el-dropdown-item>Action 4</el-dropdown-item>-->
      <!--            <el-dropdown-item>Action 5</el-dropdown-item>-->
      <!--          </el-dropdown-menu>-->
      <!--        </template>-->
      <!--      </el-dropdown>-->

      <ElDropdown class="avatar-container right-menu-item hover-effect" trigger="click" @command="handleClick">
        <div class="profile-container flex flex-row">
          <div class="avatar-wrapper">
            <img src="../../assets/images/dzics-2.png" class="user-avatar" alt="" />
          </div>
          <div class="user-wrapper">
            <span class="user-name">Admin</span>
            <span class="user-role">超级管理员</span>
          </div>
        </div>

        <template #dropdown>
          <ElDropdownMenu>
            <!--            <router-link to="/profile/index" >-->
            <!--              <ElDropdownItem>个人中心</ElDropdownItem>-->
            <!--            </router-link>-->
            <ElDropdownItem>狮子头</ElDropdownItem>
            <ElDropdownItem>螺蛳粉</ElDropdownItem>
            <ElDropdownItem disabled> 双皮奶 </ElDropdownItem>
            <ElDropdownItem divided command="logout">
              <span style="display: block">退出登录</span>
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SwitchIcon } from 'vue-dark-switch'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const appStore = useAppStore()
const route = useRoute()
const router = useRouter()

const { device } = storeToRefs(appStore) // 设备类型：desktop-宽屏设备 || mobile-窄屏设备
/**
 * 左侧菜单栏显示/隐藏
 */
const toggleSideBar = () => {
  appStore.toggleSidebar(false)
}
/**
 * vueUse 全屏
 */

const { isFullscreen, toggle } = useFullscreen()

// 用户信息下拉框
const handleClick = (command: string) => {
  if (command !== 'logout') return
  logout()
}
const logout = () => {
  userStore.logout().then(() => {
    router.push(`/login?redirect=${route.fullPath}`).catch((err) => console.warn(err))
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .setting-container {
    display: flex;
    align-items: center;
    .setting-item {
      display: inline-block;
      width: 32px;
      height: 50px;
      line-height: 50px;
      //color: #5a5e66;
      text-align: center;
      cursor: pointer;
      &:hover {
        //background: rgb(249 250 251 / 100%);
        background: rgba(0, 0, 0, 0.05);
      }
    }
  }
  .avatar-container {
    cursor: pointer;
    &:hover {
      //background: rgba(249, 250, 251, 0.08);
      background: rgba(0, 0, 0, 0.05);
    }
    .profile-container {
      height: 50px;
      padding: 0 15px;
      border-left: 1px solid var(--dz-divider-color-grey);
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
      .user-wrapper {
        display: flex;
        margin-left: 15px;
        padding: 4px 0;
        flex-direction: column;
        justify-content: space-around;
        .user-name {
          font-size: 16px;
          font-weight: 600;
          //color: #413c3c;
          color: var(--el-text-color-primary);
        }
        .user-role {
          font-size: 13px;
          color: #a9a8a8;
        }
      }
    }
  }
}
</style>
