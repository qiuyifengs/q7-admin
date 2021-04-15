import { isVNode, Fragment } from 'vue'
/**
 * components util
 */

/**
 * 清理空值，对象
 * @param children
 * @returns {*[]}
 */
export function filterEmpty (children = []) {
  return children.filter(c => c.tag || (c.text && c.text.trim() !== ''))
}

/**
 * 获取字符串长度，英文字符 长度1，中文字符长度2
 * @param {*} str
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    return pre + 2
  }, 0)

/**
 * 截取字符串，根据 maxLength 截取后返回
 * @param {*} str
 * @param {*} maxLength
 */
export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    if (showLength <= maxLength) {
      return pre + cur
    }
    return pre
  }, '')
}

// export const getOptionProps = instance => {
//   const res = {};
//   if (instance.$ && instance.$.vnode) {
//     const props = instance.$.vnode.props || {};
//     Object.keys(instance.$props).forEach(k => {
//       const v = instance.$props[k];
//       const hyphenateKey = hyphenate(k);
//       if (v !== undefined || hyphenateKey in props) {
//         res[k] = v; // 直接取 $props[k]
//       }
//     });
//   } else if (isVNode(instance) && typeof instance.type === 'object') {
//     const originProps = instance.props || {};
//     const props = {};
//     Object.keys(originProps).forEach(key => {
//       props[camelize(key)] = originProps[key];
//     });
//     const options = instance.type.props || {};
//     Object.keys(options).forEach(k => {
//       const v = resolvePropValue(options, props, k, props[k]);
//       if (v !== undefined || k in props) {
//         res[k] = v;
//       }
//     });
//   }
//   return res;
// }