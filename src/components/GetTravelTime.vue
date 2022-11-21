<template>
  <div>
  </div>
</template>



<script>
  import {getTravelTime} from '@/useCompositionAPI/useGetTravelTime.js'
import { computed,toRefs } from 'vue'

export default {
  name: 'get-travel-time',
  props:["personalTravel"],
  setup (props) {
    const {TravelTime} = getTravelTime()
    const getProps =  toRefs(props)
    const filterTravelTime = computed(() => {
      return TravelTime.value.value.map((item) => {
        return item.TravelTimes.map((arr)=> {
          return {
                    RunTime : arr.RunTime,
                    StopTime: arr.StopTime,
                                            }
        })
      })
    })
    const direction = computed (() => {
        const obj = {
                      大寮 : "0",
                      西子灣 : "1",
                      南岡山 : "2",
                      小港 : "3",
                                    }
        return obj[getProps.personalTravel.value.direction]
    })

    const selectLineTravelTime = computed(() => {
      return filterTravelTime.value[direction.value]
    })

    const estimateTime = computed(() =>{
      const maxNum = Math.max(getProps.personalTravel.value.passStation.arrivalStation,getProps.personalTravel.value.passStation.departureStation)
      const minNum = Math.min(getProps.personalTravel.value.passStation.arrivalStation,getProps.personalTravel.value.passStation.departureStation)


      const getTime = selectLineTravelTime.value.slice(minNum, maxNum).map((item) => {
        return item.RunTime - item.StopTime
      }).reduce((a,b) =>a+b) + selectLineTravelTime.value[getProps.personalTravel.value.passStation.departureStation].StopTime 


      return Math.ceil(getTime/60)
    })
  
    return {TravelTime,filterTravelTime,direction,getProps,selectLineTravelTime,estimateTime}
  }
}
</script>