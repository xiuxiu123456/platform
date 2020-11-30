import store from '@/store';

// 根据父级查询子级 区域
const getChildAreaBySuperId = (superId) => {
  let children = [];
  store.getters.getChildArea.forEach(child => {
    if (child.superAreaId === superId){
      children.push(child);
    }
  })
  return children;
}

// 根据子级查询 子级
const getChildArea = (areaId) => {
  let childer = {};
  store.getters.getChildArea.forEach(child => {
    if (child.areaId === areaId){
      childer = child;
    }
  })
  return childer;
}

// 根据子级查询 父级
const getSuperAraeByChildId = (areaId) => {
  let childer = getChildArea(areaId);
  let superArea = {};
  store.getters.getSuperArea.forEach(sup => {
    if (childer.superAreaId === sup.areaId){
      superArea = sup;
    }
  })
  return superArea;
}

// 根据字典名称，查询字典
const getDictByDictName = (dictName) => {
  let dict = store.getters.getDict;
  return dict[dictName];
}

// 根据字典名称， 字典item，返回字典
const getDictByItem = (dictName, dictValue) => {
  let dict = store.getters.getDict;
  let dictObj = {};
  dict[dictName].forEach(item => {
    if (item.dictValue === dictValue) {
      dictObj = item;
    }
  })
  return dictObj;
}

export {
  getChildArea,
  getSuperAraeByChildId,
  getChildAreaBySuperId,
  getDictByDictName,
  getDictByItem
}