<template>
  <div>
    <el-dialog v-model="dialogVisible" :destroy-on-close="true" :title="`${dialogProps.title}用户`">
      <el-form
        ref="ruleFormRef"
        label-width="100px"
        label-suffix=" :"
        :rules="rules"
        :disabled="dialogProps.isView"
        :model="dialogProps.rowData"
      >
        <el-form-item label="用户账号" prop="username">
          <el-input v-model="dialogProps.rowData.username" placeholder="请输入用户名称" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="dialogProps.rowData.genderLabel" placeholder="请选择">
            <el-option label="未知" :value="0" />
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="dialogProps.rowData.roleIds" multiple placeholder="请选择">
            <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" v-show="!dialogProps.isView" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, FormInstance } from 'element-plus'
import { listRoleOptions } from '@/api/role'

const rules = reactive({
  username: [{ required: true, message: '请填写用户姓名' }],
  password: [
    { required: true, message: '请填写用户密码' },
    {
      validator: (rule: any, value: any, callback: any) => {
        value.length < 6 ? callback(new Error()) : callback()
      },
      message: '密码不能小于6位数',
      trigger: 'blur',
    },
  ],
})

interface DialogProps {
  title: string
  isView: boolean
  rowData?: any
  api?: (params: any) => Promise<any>
  getTableList?: () => Promise<any>
}
// drawer框状态
const dialogVisible = ref(false)
const dialogProps = ref<DialogProps>({
  isView: false,
  title: '',
})

// 接收父组件传过来的参数
const acceptParams = async (params: DialogProps) => {
  await getRoleOptions()
  dialogProps.value = params
  dialogVisible.value = true
}

// 获取角色列表
const roleList = ref()

const getRoleOptions = () => {
  listRoleOptions().then((r) => {
    roleList.value = r.data
  })
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      await dialogProps.value.api!(dialogProps.value.rowData)
      ElMessage.success({ message: `${dialogProps.value.title}用户成功！` })
      dialogProps.value.getTableList!()
      dialogVisible.value = false
    } catch (error) {
      console.log('我是catch', error)
    }
  })
}

defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
