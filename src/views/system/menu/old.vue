<template>
  <div class="table-box">
    <SimpleTable
      ref="simpleTable"
      title="菜单列表"
      row-key="id"
      :tree-props="{
        children: 'children',
        hasChildren: 'hasChildren',
      }"
      :columns="columns"
      :request-api="getTableList"
      :init-param="initParam"
      :data-callback="dataCallback"
      :pagination="false"
    >
      <!--      &lt;!&ndash; 表格 header 按钮 &ndash;&gt;-->
      <!--      <template #tableHeader>-->
      <!--        <el-button type="primary" icon="plus" @click="openDialog('新增')">新增</el-button>-->
      <!--      </template>-->
      <!--      &lt;!&ndash; 表格操作 &ndash;&gt;-->
      <!--      <template #operation="scope">-->
      <!--        <el-button type="primary" size="small" @click="openDialog('编辑', scope.row)">编辑</el-button>-->
      <!--        <el-button type="success" size="small" @click="openDialog('新增', scope.row)">新增</el-button>-->
      <!--        &lt;!&ndash;        <el-button type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>&ndash;&gt;-->
      <!--      </template>-->
    </SimpleTable>
  </div>
</template>

<script lang="tsx" setup name="Menu">
import { listMenus } from '@/api/menu'
import { ColumnProps } from '@/components/SimpleTable/interface'
// import { useHandleData } from '@/hooks/useHandleData'
// import { Menu } from '@/api/menu/types'

// 获取 ProTable 元素，调用其获取刷新数据方法（还能获取到当前查询参数，方便导出携带参数）
const simpleTable = ref()

// 初始化请求参数
const initParam = reactive({
  // dateRange: [],
})

const getTableList = (params: any) => {
  return listMenus(params)
}

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 datalist && total && pageNum && pageSize 这些字段，那么你可以在这里进行处理成这些字段
const dataCallback = (data: any) => {
  return data.data
}

// 表格配置项
const columns: ColumnProps[] = [
  { prop: 'name', label: '菜单名称', align: 'left' },
  {
    prop: 'icon',
    label: '图标',
    render: (scope: { row: any }) => {
      return (
        <>
          <svg-icon icon-class={scope.row.icon ? scope.row.icon : ''} />
        </>
      )
    },
  },
  { prop: 'type', label: '类型' },
  { prop: 'path', label: '路由路径' },
  { prop: 'component', label: '组件路径' },
  { prop: 'perm', label: '权限表标识' },
  { prop: 'visible', label: '状态' },
  { prop: 'sort', label: '排序' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 240 },
]

// // 删除菜单信息
// const handleDelete = async (row: Menu.ResMenuList) => {
//   await useHandleData(undefined, { _id: row._id }, `删除【${row.menuName}】菜单`)
//   simpleTable.value.getTableList()
// }

// 打开 dialog(新增、查看、编辑)
// const dialogRef = ref()
// const openDialog = (title: string, rowData: Partial<Menu.ResMenuList> = {}) => {
//   let params = {
//     title,
//     width: '600px',
//     rowData: { ...rowData },
//     isView: title === '查看',
//     api: title === '新增' ? undefined : title === '编辑' ? undefined : '',
//     getTableList: simpleTable.value.getTableList,
//   }
//   dialogRef.value.acceptParams(params)
// }
</script>

<style lang="scss" scoped></style>
