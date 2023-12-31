<template>
  <div class="card filter">
    <h4 class="title sle" v-if="title">{{ title }}</h4>
    <el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
    <el-scrollbar max-height="600px">
      <el-tree
        ref="treeRef"
        v-loading="loading"
        :node-key="id"
        :data="multiple ? treeData : treeAllData"
        :show-checkbox="multiple"
        :check-strictly="false"
        :current-node-key="!multiple ? selected : ''"
        :highlight-current="!multiple"
        :expand-on-click-node="false"
        :check-on-click-node="multiple"
        :props="defaultProps"
        :filter-node-method="filterNode"
        :default-checked-keys="multiple ? selected : []"
        @node-click="handleNodeClick"
        @check="handleCheckChange"
      >
        <template #default="scope">
          <span class="el-tree-node__label">
            <slot :row="scope">
              {{ scope.node.label }}
            </slot>
          </span>
        </template>
      </el-tree>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup name="">
// 接收父组件参数并设置默认值

import { ElTree } from 'element-plus'

interface TreeFilterProps {
  requestApi?: (data?: any) => Promise<any> // 请求分类数据的 api ==> 非必传
  data?: { [key: string]: any }[] // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
  title?: string // treeFilter 标题 ==> 非必传
  id?: string // 选择的id ==> 非必传，默认为 “id”
  label?: string // 显示的label ==> 非必传，默认为 “label”
  multiple?: boolean // 是否为多选 ==> 非必传，默认为 false
  defaultValue?: any // 默认选中的值 ==> 非必传
}

const props = withDefaults(defineProps<TreeFilterProps>(), {
  id: 'value',
  label: 'label',
  multiple: false,
})

const defaultProps = {
  children: 'children',
  label: props.label,
}

const treeRef = ref<InstanceType<typeof ElTree>>()
const treeData = ref<{ [key: string]: any }[]>([])
const treeAllData = ref<{ [key: string]: any }[]>([])

const selected = ref()
const loading = ref(false)

const setSelected = () => {
  if (props.multiple) selected.value = Array.isArray(props.defaultValue) ? props.defaultValue : [props.defaultValue]
  else selected.value = typeof props.defaultValue === 'string' ? props.defaultValue : ''
}

onBeforeMount(async () => {
  setSelected()

  if (props.requestApi) {
    loading.value = true
    const { data } = await props.requestApi!()
    loading.value = false
    treeData.value = data
    treeAllData.value = [{ id: '', [props.label]: '全部' }, ...data]
  }
})

// 使用 nextTick 防止打包后赋值不生效
watch(
  () => props.defaultValue,
  () => nextTick(() => setSelected()),
  { deep: true, immediate: true },
)

watch(
  () => props.data,
  () => {
    if (props.data?.length) {
      treeData.value = props.data
      treeAllData.value = [{ id: '', [props.label]: '全部' }, ...props.data]
    }
  },
  { deep: true, immediate: true },
)

const filterText = ref('')
watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

// 过滤
const filterNode = (value: string, data: { [key: string]: any }, node: any) => {
  if (!value) return true
  let parentNode = node.parent
  let labels = [node.label]
  let level = 1
  while (level < node.level) {
    labels = [...labels, parentNode.label]
    parentNode = parentNode.parent
    level += 1
  }
  return labels.some((label) => label.indexOf(value) !== -1)
}

interface FilterEmits {
  (e: 'change', value: any): void
}
const emit = defineEmits<FilterEmits>()

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
  if (props.multiple) return
  emit('change', data[props.id])
}

// 多选
const handleCheckChange = () => {
  emit('change', treeRef.value?.getCheckedKeys())
}

// 暴露给父组件使用
defineExpose({ treeData, treeAllData, treeRef })
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
