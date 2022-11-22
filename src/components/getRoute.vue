<template>
  <div>fpsdajifpsjaf</div>
  {{getRoute}}
</template>


<script>
import {computed, toRefs} from 'vue'
export default {
  name : 'get-route',
  props:["station","passStation"],
  setup (props) {
    const getProps =  toRefs(props)
    const getRoute = computed(() => {
      const arr = getProps.station.value.slice()
      if (getProps.passStation.value.departureStation > getProps.passStation.value.arrivalStation){
        return arr.slice(getProps.passStation.value.arrivalStation, getProps.passStation.value.departureStation + 1).reverse()
      } else {
        return arr.slice(getProps.passStation.value.departureStation, getProps.passStation.value.arrivalStation + 1)
      }
    })

    const test = computed (() => {
      return getProps.passStation.value.departureStation > getProps.passStation.value.arrivalStation
    })

    return {getProps,getRoute,test}
  }
}

</script>