import store from '@/store'
import { cloneDeep, isNull, isEmpty } from 'lodash'

export function format (name, value) {
	if (isNull(value) && isEmpty(value)) return
	
	const dict = cloneDeep(store.state.q7admin.dict.dicts).find(e => e.name === name)
	
	const result = ((dict && dict.value) || []).filter(item => {
		return item.value === value
	})[0]

	return result && result.label
}

export function formatServe (value = []) {
	if (isNull(value)) return
	return value.toString()
}