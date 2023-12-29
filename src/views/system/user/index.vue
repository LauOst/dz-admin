<template>
  <div class="table-box">
    <SimpleTable
      ref="simpleTable"
      title="用户列表"
      :columns="columns"
      :request-api="getTableList"
      :init-param="initParam"
      :data-callback="dataCallback"
    >
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" icon="plus" @click="openDialog('新增')">新增用户</el-button>
      </template>
      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link icon="editPen" size="small" @click="openDialog('编辑', scope.row)">
          编辑
        </el-button>
        <el-button type="primary" link icon="refresh" size="small" @click="resetPass(scope.row)"> 重置密码 </el-button>
        <el-button type="primary" link icon="delete" size="small" @click="deleteAccount(scope.row)"> 删除 </el-button>
      </template>
    </SimpleTable>
    <UserDialog ref="dialogRef" />
  </div>
</template>

<script lang="tsx" setup name="User">
import { ElMessageBox, ElMessage } from 'element-plus'
import { ColumnProps } from '@/components/SimpleTable/interface'
import { deleteUsers, getUserPage, updateUser, updateUserPassword, updateUserStatus } from '@/api/user'
import { useHandleData } from '@/hooks/useHandleData'
import UserDialog from './UserDialog.vue'
import { User } from '@/api/user/types'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const simpleTable = ref()
// 初始化请求参数
const initParam = reactive({
  // dateRange: [],
})

const getTableList = (params: any) => {
  return getUserPage(params)
}

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 datalist && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
const dataCallback = (data: any) => {
  return {
    datalist: data.data.list,
    total: data.data.total,
  }
}
// 表格配置项
const columns: ColumnProps[] = [
  { type: 'index', label: '#', width: 60 },
  { prop: 'keywords', label: '用户名/昵称/手机号', search: { el: 'input' }, isShow: false },
  { prop: 'username', label: '用户名' },
  { prop: 'nickname', label: '用户昵称' },
  { prop: 'genderLabel', label: '性别' },
  { prop: 'deptName', label: '部门' },
  { prop: 'mobile', label: '手机号码' },
  {
    prop: 'status',
    label: '状态',
    render: (scope: { row: User.ResUserList }) => {
      return (
        <>
          <el-switch
            size="small"
            model-value={scope.row.status}
            active-text={scope.row.status ? '启用' : '禁用'}
            active-value={1}
            inactive-value={0}
            onClick={() => handleStatusChange(scope.row)}
          />
        </>
      )
    },
  },
  { prop: 'createTime', label: '创建时间' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 230 },
]

// 重置密码
const resetPass = (row: { [key: string]: any }) => {
  ElMessageBox.prompt(`请输入用户「${row.username}」的新密码`, '重置密码', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
    .then(({ value }) => {
      if (!value) {
        ElMessage.warning('请输入新密码')
        return false
      }
      updateUserPassword(row.id, value).then(() => {
        ElMessage.success(`密码重置成功，新密码是：${value}`)
      })
    })
    .catch(() => {})
}

// 删除用户信息
const deleteAccount = async (row: User.ResUserList) => {
  await useHandleData(deleteUsers, { ids: row.id }, `删除【${row.username}】角色`)
  simpleTable.value.getTableList()
}

// 切换用户状态
const handleStatusChange = async (row: User.ResUserList) => {
  await useHandleData(
    updateUserStatus,
    { id: row.id, status: row.status === 1 ? 0 : 1 },
    `切换【${row.username}】用户状态`,
  )
  simpleTable.value.getTableList()
}

// 打开 dialog(新增、查看、编辑)
const dialogRef = ref()
const openDialog = (title: string, rowData: Partial<User.ResUserList> = {}) => {
  let params = {
    title,
    rowData: { ...rowData },
    isView: title === '查看',
    api: title === '新增' ? '' : title === '编辑' ? updateUser : undefined,
    getTableList: simpleTable.value.getTableList,
  }
  dialogRef.value.acceptParams(params)
}
</script>

<style lang="scss" scoped></style>
