import Vue from 'vue'

const vueFiles = require.context('./', true, /component\.vue$/)
vueFiles.keys().forEach(key => {
    const component = vueFiles(key).default
    // console.log(component.name)
    Vue.component(component.name, component)
})

const jsFiles = require.context('./', true, /component\.js$/)
jsFiles.keys().forEach(key => {
    const component = jsFiles(key).default
    // console.log(component.name)
    Vue.component(component.name, component)
})

const jsxFiles = require.context('./', true, /component\.jsx$/)
jsxFiles.keys().forEach(key => {
    const component = jsxFiles(key).default
    // console.log(component.name)
    Vue.component(component.name, component)
})

import Q7Card from './card/Q7Card'
import Q7CardSection from './card/Q7CardSection'
import Q7CardActions from './card/Q7CardActions'

Vue.component(Q7Card.name, Q7Card)
Vue.component(Q7CardSection.name, Q7CardSection)
Vue.component(Q7CardActions.name, Q7CardActions)

import Q7Item from './list/Q7Item'
import Q7ItemSection from './list/Q7ItemSection'
import Q7ItemLabel from './list/Q7ItemLabel'

Vue.component(Q7Item.name, Q7Item)
Vue.component(Q7ItemSection.name, Q7ItemSection)
Vue.component(Q7ItemLabel.name, Q7ItemLabel)
