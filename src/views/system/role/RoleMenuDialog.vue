<template>
  <div>
    <el-dialog v-model="drawerVisible" :destroy-on-close="true" :title="`${drawerProps.title}角色`">
      <TreeFilter
        title="菜单列表(多选)"
        multiple
        label="label"
        :requestApi="listMenuOptions"
        @change="changeTreeFilter"
        :defaultValue="drawerProps.rowData.permissionId"
      />
      <template #footer>
        <el-button @click="drawerVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { listMenuOptions } from '@/api/menu'
import { getRoleMenuIds } from '@/api/role'

interface DrawerProps {
  title: string
  rowData: any
  api?: (params: any) => Promise<any>
  getTableList?: () => void
}
// drawer框状态
const drawerVisible = ref(false)
const drawerProps = ref<DrawerProps>({
  title: '',
  rowData: {},
})

// 接收父组件传过来的参数
const acceptParams = (params: DrawerProps) => {
  const roleId = params.rowData.id
  drawerProps.value = params
  getCheckedMentIds(roleId)
  drawerVisible.value = true
}
// 获取所有的菜单
const getCheckedMentIds = (id) => {
  getRoleMenuIds(id).then(({ data }) => {
    drawerProps.value.rowData.permissionId = data
  })
}

// 值发生变化重新赋值
const changeTreeFilter = (value: any) => {
  drawerProps.value.rowData.permissionId = value
}
// 提交数据（新增/编辑）
const handleSubmit = async () => {
  try {
    await drawerProps.value.api!(drawerProps.value.rowData)
    ElMessage.success({ message: `${drawerProps.value.title}角色成功！` })
    drawerProps.value.getTableList!()
    drawerVisible.value = false
  } catch (error) {
    console.log('我是catch', error)
  }
}

defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
