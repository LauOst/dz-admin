<template>
  <div class="table-box">
    <SimpleTable
      ref="simpleTable"
      title="角色列表"
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
        <el-button type="primary" link icon="position" size="small" @click="openMenuDialog('设置权限', scope.row)">
          分配权限
        </el-button>
        <el-button type="primary" link icon="editPen" size="small" @click="openDialog('编辑', scope.row)">
          编辑
        </el-button>

        <el-button type="primary" link icon="delete" size="small" @click="deleteAccount(scope.row)"> 删除 </el-button>
      </template>
    </SimpleTable>
    <RoleDialog ref="dialogRef" />
    <RoleMenuDialog ref="menuDialogRef" />
  </div>
</template>

<script lang="tsx" setup name="Role">
import { ColumnProps } from '@/components/SimpleTable/interface'
import { updateUserStatus } from '@/api/user'
import { useHandleData } from '@/hooks/useHandleData'
import { User } from '@/api/user/types'
import RoleMenuDialog from './RoleMenuDialog.vue'
import RoleDialog from './RoleDialog.vue'
import { addRole, deleteRoles, getRolePage, updateRole, updateRoleMenus } from '@/api/role'
import { Role } from '@/api/role/types'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const simpleTable = ref()
// 初始化请求参数
const initParam = reactive({
  // dateRange: [],
})

const name = '小甲'

const getTableList = (params: any) => {
  return getRolePage(params)
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
  { prop: 'keywords', label: '角色名称', search: { el: 'input' }, isShow: false },
  { prop: 'name', label: '角色名称' },
  { prop: 'code', label: '角色编码' },
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
  { prop: 'sort', label: '排序' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 230 },
]

// 删除用户信息
const deleteAccount = async (row: Role.ResRoleList) => {
  await useHandleData(deleteRoles, { id: row.id }, `删除【${row.name}】角色`)
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
    api: title === '新增' ? addRole : title === '编辑' ? updateRole : undefined,
    getTableList: simpleTable.value.getTableList,
  }
  dialogRef.value.acceptParams(params)
}

// 打开分配权限
const menuDialogRef = ref()
const openMenuDialog = (title: string, rowData: Partial<any> = {}) => {
  const params = {
    title,
    isView: title === '查看',
    rowData: { ...rowData },
    api: updateRoleMenus,
    getTableList: () => {},
  }
  menuDialogRef.value?.acceptParams(params)
}
</script>

<style lang="scss" scoped></style>
