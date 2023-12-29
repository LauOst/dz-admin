<template>
  <div class="table-box">
    <SimpleTable
      ref="simpleTable"
      title="菜单列表"
      row-key="id"
      highlight-current-row
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
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" icon="plus" @click="openDialog('新增')">新增</el-button>
      </template>

      <!-- 类型插槽 -->
      <template #type="scope">
        <el-tag v-if="scope.row.type === MenuTypeEnum.CATALOG" type="warning">目录</el-tag>
        <el-tag v-if="scope.row.type === MenuTypeEnum.MENU" type="success">菜单</el-tag>
        <el-tag v-if="scope.row.type === MenuTypeEnum.BUTTON" type="danger">按钮</el-tag>
        <el-tag v-if="scope.row.type === MenuTypeEnum.EXTLINK" type="info">外链</el-tag>
      </template>

      <!-- 表格操作 -->
      <template #operation="scope">
        <el-button type="primary" link icon="editPen" size="small" @click="openDialog('编辑', scope.row)">
          编辑
        </el-button>
        <el-button type="primary" link icon="plus" size="small" @click="openDialog('新增', scope.row)">新增</el-button>
        <el-button type="primary" link icon="delete" size="small" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </SimpleTable>
    <MenuDialog ref="dialogRef" />
  </div>
</template>

<script lang="tsx" setup name="Menu">
import { listMenus, addMenu, updateMenu, deleteMenu } from '@/api/menu'
import { ColumnProps } from '@/components/SimpleTable/interface'
import { MenuTypeEnum } from '@/enums/MenuTypeEnum'
import { useHandleData } from '@/hooks/useHandleData'
import { Menu } from '@/api/menu/types'
import MenuDialog from './MenuDialog.vue'

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
  {
    prop: 'type',
    label: '类型',
  },
  { prop: 'path', label: '路由路径' },
  { prop: 'component', label: '组件路径' },
  { prop: 'perm', label: '权限表标识' },
  {
    prop: 'visible',
    label: '状态',
    render: (scope: { row: any }) => {
      return <>{scope.row.visible === 1 ? <el-tag type="success">显示</el-tag> : <el-tag type="info">隐藏</el-tag>}</>
    },
  },
  { prop: 'sort', label: '排序' },
  { prop: 'operation', label: '操作', fixed: 'right', width: 200 },
]

// // 删除菜单信息
const handleDelete = async (row: Menu.ResMenuList) => {
  await useHandleData(deleteMenu, { id: row.id }, `删除【${row.name}】菜单`)
  simpleTable.value.getTableList()
}

// 打开 dialog(新增、查看、编辑)
const dialogRef = ref()
const openDialog = (title: string, rowData: Partial<Menu.ResMenuList> = {}) => {
  let params = {
    title,
    width: '600px',
    rowData: { ...rowData },
    menuId: title === '新增' ? undefined : title === '编辑' ? rowData.id : '',
    isView: title === '查看',
    api: title === '新增' ? addMenu : title === '编辑' ? updateMenu : '',
    getTableList: simpleTable.value.getTableList,
  }
  dialogRef.value.acceptParams(params)
}
</script>

<style lang="scss" scoped></style>
