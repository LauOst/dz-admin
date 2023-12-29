<!--<template>-->
<!--  <div class="login-container flex justify-center grid-items-center">-->
<!--    <div class="login-mask flex justify-center grid-items-center">-->
<!--      <div class="login-box">-->
<!--        <el-form ref="loginFormRef" :model="loginData" :rules="loginRules" class="login-form">-->
<!--          <div class="flex text-dark items-center py-4">-->
<!--            <span class="text-2xl flex-1 text-center">{{ $t('login.title') }}</span>-->
<!--            <lang-select class="text-white! cursor-pointer" />-->
<!--          </div>-->

<!--          <el-form-item prop="username">-->
<!--            <div class="p-2 text-dark">-->
<!--              <svg-icon icon-class="user" />-->
<!--            </div>-->
<!--            <el-input-->
<!--              ref="username"-->
<!--              v-model="loginData.username"-->
<!--              class="flex-1"-->
<!--              size="large"-->
<!--              :placeholder="'111'"-->
<!--              name="username"-->
<!--            />-->
<!--          </el-form-item>-->

<!--          <el-tooltip :disabled="isCapslock === false" content="Caps lock is On" placement="right">-->
<!--            <el-form-item prop="password">-->
<!--              <span class="p-2 text-dark">-->
<!--                <svg-icon icon-class="password" />-->
<!--              </span>-->
<!--              <el-input-->
<!--                v-model="loginData.password"-->
<!--                class="flex-1"-->
<!--                placeholder="密码"-->
<!--                :type="passwordVisible === false ? 'password' : 'input'"-->
<!--                size="large"-->
<!--                name="password"-->
<!--                @keyup="checkCapslock"-->
<!--                @keyup.enter="handleLogin"-->
<!--              />-->
<!--              <span class="mr-2" @click="passwordVisible = !passwordVisible">-->
<!--                <svg-icon-->
<!--                  :icon-class="passwordVisible === false ? 'eye' : 'eye-open'"-->
<!--                  class="text-dark cursor-pointer"-->
<!--                />-->
<!--              </span>-->
<!--            </el-form-item>-->
<!--          </el-tooltip>-->

<!--          &lt;!&ndash; 验证码 &ndash;&gt;-->
<!--          <el-form-item prop="verifyCode">-->
<!--            <span class="p-2 text-dark">-->
<!--              <svg-icon icon-class="verify_code" />-->
<!--            </span>-->
<!--            <el-input-->
<!--              v-model="loginData.verifyCode"-->
<!--              auto-complete="off"-->
<!--              :placeholder="`222`"-->
<!--              class="w-[60%]"-->
<!--              @keyup.enter="handleLogin"-->
<!--            />-->

<!--            <div class="captcha">-->
<!--              <img :src="captchaBase64" @click="getCaptcha" />-->
<!--            </div>-->
<!--          </el-form-item>-->

<!--          <el-button size="default" :loading="loading" type="primary" class="w-full" @click.prevent="handleLogin">-->
<!--            login-->
<!--          </el-button>-->

<!--          &lt;!&ndash; 账号密码提示 &ndash;&gt;-->
<!--          <div class="mt-4 text-white text-sm">-->
<!--            <span>username: admin</span>-->
<!--            <span class="ml-4"> password: 123456</span>-->
<!--          </div>-->
<!--        </el-form>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { LocationQueryValue, useRoute } from 'vue-router'-->
<!--import { ElForm } from 'element-plus'-->
<!--import router from '@/router'-->
<!--// import LangSelect from '@/components/LangSelect/index.vue'-->
<!--import SvgIcon from '@/components/SvgIcon/index.vue'-->

<!--// 状态管理依赖-->
<!--import { useUserStore } from '@/store/modules/user'-->

<!--// API依赖-->
<!--import { getCaptchaApi } from '@/api/auth'-->
<!--// import { LoginData } from '@/api/auth/types'-->

<!--const userStore = useUserStore()-->
<!--const route = useRoute()-->

<!--/**-->
<!-- * 按钮loading-->
<!-- */-->
<!--const loading = ref(false)-->
<!--/**-->
<!-- * 是否大写锁定-->
<!-- */-->
<!--const isCapslock = ref(false)-->
<!--/**-->
<!-- * 密码是否可见-->
<!-- */-->
<!--const passwordVisible = ref(false)-->
<!--/**-->
<!-- * 验证码图片Base64字符串-->
<!-- */-->
<!--const captchaBase64 = ref()-->

<!--/**-->
<!-- * 登录表单引用-->
<!-- */-->
<!--const loginFormRef = ref(ElForm)-->

<!--const loginData = ref<any>({-->
<!--  username: 'admin',-->
<!--  password: '123456',-->
<!--})-->

<!--const loginRules = {-->
<!--  username: [{ required: true, trigger: 'blur' }],-->
<!--  password: [{ required: true, trigger: 'blur', validator: passwordValidator }],-->
<!--  verifyCode: [{ required: true, trigger: 'blur' }],-->
<!--}-->

<!--/**-->
<!-- * 密码校验器-->
<!-- */-->
<!--function passwordValidator(rule: any, value: any, callback: any) {-->
<!--  if (value.length < 6) {-->
<!--    callback(new Error('The password can not be less than 6 digits'))-->
<!--  } else {-->
<!--    callback()-->
<!--  }-->
<!--}-->

<!--/**-->
<!-- * 检查输入大小写状态-->
<!-- */-->
<!--function checkCapslock(e: any) {-->
<!--  const { key } = e-->
<!--  isCapslock.value = key && key.length === 1 && key >= 'A' && key <= 'Z'-->
<!--}-->

<!--/**-->
<!-- * 获取验证码-->
<!-- */-->
<!--function getCaptcha() {-->
<!--  getCaptchaApi().then(({ data }) => {-->
<!--    const { verifyCodeBase64, verifyCodeKey } = data-->
<!--    loginData.value.verifyCodeKey = verifyCodeKey-->
<!--    captchaBase64.value = verifyCodeBase64-->
<!--  })-->
<!--}-->

<!--/**-->
<!-- * 登录-->
<!-- */-->
<!--function handleLogin() {-->
<!--  loginFormRef.value.validate((valid: boolean) => {-->
<!--    if (valid) {-->
<!--      loading.value = true-->
<!--      userStore-->
<!--        .login(loginData.value)-->
<!--        .then(() => {-->
<!--          const { query } = route-->

<!--          const redirect = (query.redirect as LocationQueryValue) ?? '/'-->

<!--          const otherQueryParams = Object.keys(query).reduce((acc: any, cur: string) => {-->
<!--            if (cur !== 'redirect') {-->
<!--              acc[cur] = query[cur]-->
<!--            }-->
<!--            return acc-->
<!--          }, {})-->

<!--          router.push({ path: redirect, query: otherQueryParams })-->
<!--        })-->
<!--        .catch(() => {-->
<!--          // 验证失败，重新生成验证码-->
<!--          getCaptcha()-->
<!--        })-->
<!--        .finally(() => {-->
<!--          loading.value = false-->
<!--        })-->
<!--    }-->
<!--  })-->
<!--}-->

<!--onMounted(() => {-->
<!--  getCaptcha()-->
<!--})-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.login-container {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  overflow: hidden;-->
<!--  position: relative;-->
<!--  background: #475f81;-->
<!--  //background-image: linear-gradient(180deg, #2e323f 0%, #0a061a 100%);-->
<!--  &:before {-->
<!--    content: '';-->
<!--    position: absolute;-->
<!--    left: 0;-->
<!--    top: 0;-->
<!--    height: 100%;-->
<!--    width: 100%;-->
<!--    background: #fff;-->
<!--    clip-path: polygon(0 0, 35% 0, 65% 100%, 0 100%);-->
<!--  }-->

<!--  .login-mask {-->
<!--    height: 75%;-->
<!--    width: 85%;-->
<!--    background: #fff;-->
<!--    z-index: 9999;-->
<!--    position: absolute;-->
<!--    border-radius: 10px;-->
<!--    overflow: hidden;-->
<!--    box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);-->
<!--    &:before {-->
<!--      content: '';-->
<!--      position: absolute;-->
<!--      left: 0;-->
<!--      top: 0;-->
<!--      height: 100%;-->
<!--      width: 100%;-->
<!--      background: url('../../assets/images/dzds-11.jpg') no-repeat;-->
<!--      background-size: 90% 100%;-->
<!--      background-position: -200px 0;-->
<!--      //background: #ccc;-->
<!--      clip-path: polygon(0 0, 36.8% 0, 63.2% 100%, 0 100%);-->
<!--    }-->
<!--    &:after {-->
<!--      content: '';-->
<!--      position: absolute;-->
<!--      right: 0;-->
<!--      top: 0;-->
<!--      height: 100%;-->
<!--      width: 100%;-->
<!--      //background: red;-->
<!--      clip-path: polygon(36.8% 0, 100% 0, 100% 100%, 63.2% 100%);-->
<!--      background: url('../../assets/images/dzds-9.jpeg') no-repeat;-->
<!--      background-size: 90% 100%;-->
<!--      background-position: 535px 0;-->
<!--    }-->
<!--    .login-box {-->
<!--      width: 450px;-->
<!--      height: 320px;-->
<!--      background: #fff;-->
<!--      padding: 20px;-->
<!--      z-index: 9999;-->
<!--      border-radius: 10px;-->
<!--      box-shadow: 0 0 50px rgba(0, 0, 0, 0.4);-->
<!--    }-->
<!--  }-->
<!--  .login-form {-->
<!--    width: 520px;-->
<!--    max-width: 100%;-->
<!--    //padding: 160px 35px 0;-->
<!--    //margin: 0 auto;-->
<!--    overflow: hidden;-->

<!--    .captcha {-->
<!--      position: absolute;-->
<!--      top: 0;-->
<!--      right: 0;-->

<!--      img {-->
<!--        width: 120px;-->
<!--        height: 48px;-->
<!--        cursor: pointer;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->

<!--.el-form-item {-->
<!--  //background: rgb(0 0 0 / 10%);-->
<!--  //border: 1px solid rgb(255 255 255 / 10%);-->
<!--  border: 1px solid rgb(0 05 0 / 10%);-->
<!--  border-radius: 5px;-->
<!--}-->

<!--.el-input {-->
<!--  background: transparent;-->

<!--  // 子组件 scoped 无效，使用 :deep-->
<!--  :deep(.el-input__wrapper) {-->
<!--    padding: 0;-->
<!--    background: transparent;-->
<!--    box-shadow: none;-->

<!--    .el-input__inner {-->
<!--      //color: #fff;-->
<!--      color: #333;-->
<!--      background: transparent;-->
<!--      border: 0;-->
<!--      border-radius: 0;-->
<!--      //caret-color: #fff;-->
<!--      caret-color: #333;-->

<!--      &:-webkit-autofill {-->
<!--        box-shadow: 0 0 0 1000px transparent inset !important;-->
<!--        -webkit-text-fill-color: #fff !important;-->
<!--      }-->

<!--      // 设置输入框自动填充的延迟属性-->
<!--      &:-webkit-autofill,-->
<!--      &:-webkit-autofill:hover,-->
<!--      &:-webkit-autofill:focus,-->
<!--      &:-webkit-autofill:active {-->
<!--        transition:-->
<!--          color 99999s ease-out,-->
<!--          background-color 99999s ease-out;-->
<!--        transition-delay: 99999s;-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->

<!--<template>-->
<!--  <div class="login-container">Login</div>-->
<!--</template>-->
<!--<style>-->
<!--.login-container {-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  overflow: hidden;-->
<!--  position: relative;-->
<!--  background: url('../../assets/images/dzds-1.jpeg') no-repeat;-->
<!--  background-size: 100% 100%;-->
<!--  &:after {-->
<!--    content: '';-->
<!--    position: absolute;-->
<!--    right: 0;-->
<!--    top: 0;-->
<!--    height: 100%;-->
<!--    width: 100%;-->
<!--    background: rgba(0, 0, 0, 0.2);-->
<!--    backdrop-filter: blur(8px);-->
<!--  }-->
<!--}-->
<!--</style>-->
<template>
  <div class="login-container">
    <el-form ref="loginFormRef" :model="loginData" :rules="loginRules" class="login-form">
      <div class="flex text-white items-center py-4">
        <span class="text-2xl flex-1 text-center">{{ $t('login.title') }}</span>
        <lang-select class="text-white! cursor-pointer" />
      </div>

      <el-form-item prop="username">
        <div class="p-2 text-white">
          <svg-icon icon-class="user" />
        </div>
        <el-input
          ref="username"
          v-model="loginData.username"
          class="flex-1"
          size="large"
          :placeholder="'111'"
          name="username"
        />
      </el-form-item>

      <el-tooltip :disabled="isCapslock === false" content="Caps lock is On" placement="right">
        <el-form-item prop="password">
          <span class="p-2 text-white">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            v-model="loginData.password"
            class="flex-1"
            placeholder="密码"
            :type="passwordVisible === false ? 'password' : 'input'"
            size="large"
            name="password"
            @keyup="checkCapslock"
            @keyup.enter="handleLogin"
          />
          <span class="mr-2" @click="passwordVisible = !passwordVisible">
            <svg-icon :icon-class="passwordVisible === false ? 'eye' : 'eye-open'" class="text-white cursor-pointer" />
          </span>
        </el-form-item>
      </el-tooltip>

      <!-- 验证码 -->
      <el-form-item prop="verifyCode">
        <span class="p-2 text-white">
          <svg-icon icon-class="verify_code" />
        </span>
        <el-input
          v-model="loginData.verifyCode"
          auto-complete="off"
          :placeholder="`222`"
          class="w-[60%]"
          @keyup.enter="handleLogin"
        />

        <div class="captcha">
          <img :src="captchaBase64" @click="getCaptcha" />
        </div>
      </el-form-item>

      <el-button size="default" :loading="loading" type="primary" class="w-full" @click.prevent="handleLogin">
        login
      </el-button>

      <!-- 账号密码提示 -->
      <div class="mt-4 text-white text-sm">
        <span>username: admin</span>
        <span class="ml-4"> password: 123456</span>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { LocationQueryValue, useRoute } from 'vue-router'
import { ElForm } from 'element-plus'
import router from '@/router'
// import LangSelect from '@/components/LangSelect/index.vue'
import SvgIcon from '@/components/SvgIcon/index.vue'

// 状态管理依赖
import { useUserStore } from '@/store/modules/user'

// API依赖
import { getCaptchaApi } from '@/api/auth'
// import { LoginData } from '@/api/auth/types'

const userStore = useUserStore()
const route = useRoute()

/**
 * 按钮loading
 */
const loading = ref(false)
/**
 * 是否大写锁定
 */
const isCapslock = ref(false)
/**
 * 密码是否可见
 */
const passwordVisible = ref(false)
/**
 * 验证码图片Base64字符串
 */
const captchaBase64 = ref()

/**
 * 登录表单引用
 */
const loginFormRef = ref(ElForm)

const loginData = ref<any>({
  username: 'admin',
  password: '123456',
})

const loginRules = {
  username: [{ required: true, trigger: 'blur' }],
  password: [{ required: true, trigger: 'blur', validator: passwordValidator }],
  verifyCode: [{ required: true, trigger: 'blur' }],
}

/**
 * 密码校验器
 */
function passwordValidator(rule: any, value: any, callback: any) {
  if (value.length < 6) {
    callback(new Error('The password can not be less than 6 digits'))
  } else {
    callback()
  }
}

/**
 * 检查输入大小写状态
 */
function checkCapslock(e: any) {
  const { key } = e
  isCapslock.value = key && key.length === 1 && key >= 'A' && key <= 'Z'
}

/**
 * 获取验证码
 */
function getCaptcha() {
  getCaptchaApi().then(({ data }) => {
    const { captchaBase64, captchaKey } = data
    // loginData.value.verifyCodeKey = verifyCodeKey
    // captchaBase64.value = verifyCodeBase64
    loginData.value.captchaKey = captchaKey
    captchaBase64.value = captchaBase64
  })
}

/**
 * 登录
 */
function handleLogin() {
  loginFormRef.value.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      userStore
        .login(loginData.value)
        .then(() => {
          const { query } = route

          const redirect = (query.redirect as LocationQueryValue) ?? '/'

          const otherQueryParams = Object.keys(query).reduce((acc: any, cur: string) => {
            if (cur !== 'redirect') {
              acc[cur] = query[cur]
            }
            return acc
          }, {})

          router.push({ path: redirect, query: otherQueryParams })
        })
        .catch(() => {
          // 验证失败，重新生成验证码
          getCaptcha()
        })
        .finally(() => {
          loading.value = false
        })
    }
  })
}

onMounted(() => {
  getCaptcha()
})
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #2d3a4b;

  .login-form {
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    .captcha {
      position: absolute;
      top: 0;
      right: 0;

      img {
        width: 120px;
        height: 48px;
        cursor: pointer;
      }
    }
  }
}

.el-form-item {
  background: rgb(0 0 0 / 10%);
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 5px;
}

.el-input {
  background: transparent;

  // 子组件 scoped 无效，使用 :deep
  :deep(.el-input__wrapper) {
    padding: 0;
    background: transparent;
    box-shadow: none;

    .el-input__inner {
      color: #fff;
      background: transparent;
      border: 0;
      border-radius: 0;
      caret-color: #fff;

      &:-webkit-autofill {
        box-shadow: 0 0 0 1000px transparent inset !important;
        -webkit-text-fill-color: #fff !important;
      }

      // 设置输入框自动填充的延迟属性
      &:-webkit-autofill,
      &:-webkit-autofill:hover,
      &:-webkit-autofill:focus,
      &:-webkit-autofill:active {
        transition:
          color 99999s ease-out,
          background-color 99999s ease-out;
        transition-delay: 99999s;
      }
    }
  }
}
</style>
