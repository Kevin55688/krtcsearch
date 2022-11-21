<template>
<div>
  <div v-for="time in getTimeTable" :key="time.Sequence" v-show="getProps.personalTravel.value.isSearch">{{time.ArrivalTime}}</div>
</div>
</template>



<script>
import {getStationTimeTable} from '@/useCompositionAPI/useGetStationTimeTable.js'
import { computed,toRefs} from 'vue'

export default {
name: "get-station-time-table",
props : ["personalTravel","selectStationOfLine"],
setup (props) {
  const {StationTimeTable} = getStationTimeTable()
  const getProps =  toRefs(props)
  const today = computed(() => {
      let week = new Date().getDay()
      let hour = new Date().getHours()
      let minute = new Date().getMinutes()
      let arr = ['假日','平日','平日','平日','平日','平日','平日']
      return {ServiceTag: arr[week],
              hour      : hour     ,
              minute    : minute 
                                              }

  })
  const filterTimeTable = computed (() => {
    if (!StationTimeTable.value.value) {
      return 
    } else {
      return  StationTimeTable.value.value.filter((item) => {
        return item.StationName.Zh_tw  === getProps.personalTravel.value.departureStation &&
                item.DestinationStationName.Zh_tw  == getProps.personalTravel.value.direction  &&
                item.ServiceDay.ServiceTag === today.value.ServiceTag
      })
    }
    
  })
  const getTimeTable = computed(() => {
    if (!filterTimeTable.value) {
      return 
    } else {
      return filterTimeTable.value[0].Timetables.filter((item) => {
        return item.ArrivalTime.slice(0,2) >= today.value.hour
      }).filter((item)=>{
          if(item.ArrivalTime.slice(0,2) == today.value.hour) {
            return item.ArrivalTime.slice(-2)  >  today.value.minute
          } else {
            return true
          }
      })
    }
  })

  return {StationTimeTable,filterTimeTable,getProps,today,getTimeTable}

}
}

</script>