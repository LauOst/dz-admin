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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="dialogProps.rowData.name" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="dialogProps.rowData.code" placeholder="请输入角色编码" />
        </el-form-item>
        <el-form-item label="数据权限" prop="dataScope">
          <el-select v-model="dialogProps.rowData.dataScope">
            <el-option :key="0" label="全部数据" :value="0" />
            <el-option :key="1" label="部门及子部门数据" :value="1" />
            <el-option :key="2" label="本部门数据" :value="2" />
            <el-option :key="3" label="本人数据" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="dialogProps.rowData.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="dialogProps.rowData.sort" controls-position="right" :min="0" style="width: 100px" />
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
import { getRoleForm } from '@/api/role'

const rules = reactive({
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
  dataScope: [{ required: true, message: '请选择数据权限', trigger: 'blur' }],
  status: [{ required: true, message: '请选择状态', trigger: 'blur' }],
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
  // 获取角色详情
  getRoleForm(params.rowData.id).then(({ data }) => {
    dialogProps.value = params
    Object.assign(dialogProps.value.rowData, data)
    dialogVisible.value = true
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
