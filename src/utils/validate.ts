/**
 * 判断url是否是http或https
 */
export function isHttp(url: string) {
  return url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1
}

/**
 * 判断path是否为外链
 */

export function isExternal(path: any) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 */
export function validUsername(str: string) {
  const validMap = ['admin', 'editor']
  return validMap.indexOf(str.trim()) >= 0
}

/**
 */
export function validURL(url: string) {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 */
export function validLowerCase(str: string) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 */
export function validUpperCase(str: string) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 */
export function validAlphabets(str: string) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @description:  是否为数组
 */
export function isArray(val: any): val is Array<any> {
  return val && Array.isArray(val)
}

/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
export function formatValue(callValue: any) {
  // 如果当前值为数组,使用 / 拼接（根据需求自定义）
  if (isArray(callValue)) return callValue.length ? callValue.join(' / ') : '--'
  return callValue ?? '--'
}

/**
 * @description 处理 prop 为多级嵌套的情况(列如: prop:user.name)
 * @param {Object} row 当前行数据
 * @param {String} prop 当前 prop
 * @return any
 * */
export function handleRowAccordingToProp(row: { [key: string]: any }, prop: string) {
  if (!prop.includes('.')) return row[prop] ?? '--'
  prop.split('.').forEach((item) => {
    row = row[item] ?? '--'
  })
  return row
}

/**
 * @description 根据枚举列表查询当需要的数据（如果指定了 label 和 value 的 key值，会自动识别格式化）
 * @param {String} callValue 当前单元格值
 * @param {Array} enumData 枚举列表
 * @param {String} type 过滤类型（目前只有 tag）
 * @return string
 * */
export function filterEnum(
  callValue: any,
  enumData: { [key: string]: any } | undefined,
  searchProps?: { [key: string]: any },
  type?: string,
): string {
  const value = searchProps?.value ?? 'value'
  const label = searchProps?.label ?? 'label'
  let filterData: { [key: string]: any } = {}
  if (Array.isArray(enumData)) filterData = enumData.find((item: any) => item[value] === callValue)
  if (type === 'tag') return filterData?.tagType ? filterData.tagType : ''
  return filterData ? filterData[label] : '--'
}

/**
 * @description 处理 prop，当 prop 为多级嵌套时 ==> 返回最后一级 prop
 * @param {String} prop 当前 prop
 * @return string
 * */
export function handleProp(prop: string) {
  const propArr = prop.split('.')
  if (propArr.length === 1) return prop
  return propArr[propArr.length - 1]
}

/**
 * @description 添加日期范围
 * @param {String} params 当前 搜索参数
 * @param {Array} dateRange 当前 时间数组
 * @param {String} propName 自定义参数名
 * @return string
 * */
export function addDateRange(params: any, dateRange: [string, string], propName?: string) {
  let search = params
  if (dateRange != null && dateRange.length) {
    if (typeof propName === 'undefined') {
      search.startTime = dateRange[0]
      search.endTime = dateRange[1]
    } else {
      search.propName = dateRange[0]
      search.propName = dateRange[1]
    }
  } else {
    search.startTime = undefined
    search.endTime = undefined
  }
  return search
}

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 * @param {*} rootId 根Id 默认 0
 */
export function handleTree(data: any, id: any, parentId?: any, children?: any, rootId: any = '0') {
  id = id || 'id'
  parentId = parentId || 'parentId'
  children = children || 'children'
  rootId =
    rootId ||
    Math.min(
      ...data.map((item: any) => {
        return item[parentId]
      }),
    ) ||
    '0'
  // 对源数据深度克隆
  const cloneData = JSON.parse(JSON.stringify(data))
  // 循环所有项
  const treeData = cloneData.filter((father: any) => {
    const branchArr = cloneData.filter((child: any) => {
      // 返回每一项的子级数组
      return father[id] === child[parentId]
    })
    branchArr.length > 0 ? (father.children = branchArr) : ''
    // 返回第一层
    return father[parentId] === rootId
  })

  return treeData !== '' ? treeData : data
}

// 表单重置
export function resetForm(refName: any) {
  if (refName.value) {
    refName.value.resetFields()
  }
}
