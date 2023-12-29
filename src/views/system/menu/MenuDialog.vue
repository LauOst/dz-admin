<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :destroy-on-close="true"
      :width="dialogProps.width"
      :title="`${dialogProps.title}菜单`"
    >
      <el-form
        ref="ruleFormRef"
        label-width="100px"
        :rules="rules"
        :disabled="dialogProps.isView"
        :model="dialogProps.rowData"
        style="width: 92%; margin-left: 2%"
      >
        <el-form-item label="上级菜单" prop="parentId">
          <el-tree-select
            v-model="dialogProps.rowData.parentId"
            :data="menuOptions"
            placeholder="选择上级菜单"
            filterable
            check-strictly
            :render-after-expand="false"
          />
        </el-form-item>
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="dialogProps.rowData.name" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item label="菜单类型" prop="type">
          <div class="radio-wrap">
            <el-radio-group v-model="dialogProps.rowData.type" @change="handleMenuType">
              <el-radio label="CATALOG">目录</el-radio>
              <el-radio label="MENU">菜单</el-radio>
              <el-radio label="BUTTON">按钮</el-radio>
              <el-radio label="EXTLINK">外链</el-radio>
            </el-radio-group>
          </div>
        </el-form-item>

        <el-form-item v-if="dialogProps.rowData.type == 'EXTLINK'" label="外链地址" prop="path">
          <el-input v-model="dialogProps.rowData.path" placeholder="请输入外链完整路径" />
        </el-form-item>

        <el-form-item
          v-if="dialogProps.rowData.type == MenuTypeEnum.CATALOG || dialogProps.rowData.type == MenuTypeEnum.MENU"
          label="路由地址"
          prop="path"
        >
          <el-input
            v-if="dialogProps.rowData.type == MenuTypeEnum.CATALOG"
            v-model="dialogProps.rowData.path"
            placeholder="system"
          />
          <el-input v-else v-model="dialogProps.rowData.path" placeholder="user" />
        </el-form-item>

        <!-- 组件页面完整路径 -->
        <el-form-item v-if="dialogProps.rowData.type == MenuTypeEnum.MENU" prop="component">
          <template #label>
            <span class="icon-label">
              <el-tooltip content="访问的组件路径，如：`system/user/index`，默认在`views`目录下" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
              组件路径
            </span>
          </template>

          <el-input v-model="dialogProps.rowData.component" placeholder="system/user/index" style="width: 95%">
            <template v-if="dialogProps.rowData.type == MenuTypeEnum.MENU" #prepend>src/views/</template>
            <template v-if="dialogProps.rowData.type == MenuTypeEnum.MENU" #append>.vue</template>
          </el-input>
        </el-form-item>

        <el-form-item v-if="dialogProps.rowData.type == 'BUTTON'">
          <template #label>
            <span class="icon-label">
              <el-tooltip
                content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)"
                placement="top"
              >
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
              权限标识
            </span>
          </template>
          <el-input v-model="dialogProps.rowData.perm" placeholder="请输入权限标识" maxlength="50" />
        </el-form-item>

        <el-form-item v-if="dialogProps.rowData.type !== 'BUTTON'" label="菜单图标" prop="icon">
          <!-- 图标选择器 -->
          <icon-select v-model="dialogProps.rowData.icon" />
          <!--          <el-input v-model="dialogProps.rowData.icon" placeholder="请输入菜单图标" />-->
        </el-form-item>

        <el-form-item v-if="dialogProps.rowData.type == MenuTypeEnum.CATALOG" label="跳转路由">
          <el-input v-model="dialogProps.rowData.redirect" placeholder="跳转路由" />
        </el-form-item>

        <el-form-item v-if="dialogProps.rowData.type !== 'BUTTON'">
          <template #label>
            <span class="icon-label">
              <el-tooltip content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
              显示状态
            </span>
          </template>
          <el-radio-group v-model="dialogProps.rowData.visible">
            <el-radio :label="0">隐藏</el-radio>
            <el-radio :label="1">显示</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="dialogProps.rowData.sort" style="width: 100px" controls-position="right" :min="0" />
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
import { resetForm } from '@/utils/validate'
import { listMenuOptions } from '@/api/menu'
import { MenuTypeEnum } from '@/enums/MenuTypeEnum'

const rules = reactive({
  parentId: [{ required: true, message: '请选择顶级菜单', trigger: 'blur' }],
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  type: [{ required: true, message: '请选择菜单类型', trigger: 'blur' }],
  path: [{ required: true, message: '请输入路由路径', trigger: 'blur' }],
  component: [{ required: true, message: '请输入组件完整路径', trigger: 'blur' }],
})

interface DialogProps {
  title: string
  width: string
  menuId?: number
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
  width: '960px',
  rowData: {},
})

// 接收父组件传过来的参数
const acceptParams = async (params: DialogProps) => {
  if (params.menuId) {
    console.log('编辑')
    dialogProps.value = { ...params }
  } else {
    console.log('新增')
    reset()
    dialogProps.value.rowData.parentId = params.rowData.id ?? 0
  }
  await getTableList()
  dialogVisible.value = true
}

// 提交数据（新增/编辑）
const ruleFormRef = ref<FormInstance>()
const handleSubmit = () => {
  ruleFormRef.value!.validate(async (valid) => {
    if (!valid) return
    try {
      await dialogProps.value.api!(dialogProps.value.rowData)
      ElMessage.success({ message: `${dialogProps.value.title}菜单成功！` })
      await dialogProps.value.getTableList
      dialogVisible.value = false
    } catch (error) {
      console.log(error)
    }
  })
}

// 查询菜单下拉树结构
// const menuOptions = ref<any[]>([{ menuId: '0', menuName: '主类目', children: [] }])
const menuOptions = ref<OptionType[]>([])
const getTableList = async () => {
  menuOptions.value = []
  await listMenuOptions().then(({ data }) => {
    menuOptions.value = [{ value: 0, label: '主类目', children: data }]
  })
}

// 清楚表单验证结果
const handleMenuType = () => {
  ruleFormRef.value!.clearValidate()
}

// 表单重置
const reset = () => {
  dialogProps.value.rowData = {
    parentId: 0,
    visible: 1,
    sort: 1,
    type: MenuTypeEnum.MENU,
  }
  resetForm(ruleFormRef)
}

defineExpose({
  acceptParams,
})
</script>

<style lang="scss" scoped></style>
