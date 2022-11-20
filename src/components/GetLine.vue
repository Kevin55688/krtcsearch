<template>
  <div>
    <select v-model="propsDepartureStation" v-show="propsSelectStationOfLine <= 1">
      <option disabled="true" value="0">請選擇起始站</option>
      <option :value="station.StationName" v-for="station in propsStation" :key="station.StationName">{{station.StationName}}</option>
    </select>
    <select v-model="propsArrivalStation" v-show="propsSelectStationOfLine <= 1">
      <option disabled="true" value="0">請選擇抵達站</option>
      <option :value="station.StationName" v-for="station in propsStation" :key="station.StationName">{{station.StationName}}</option>
    </select>
    <button @click="propsSearch">搜尋</button>
  </div>
</template>


<script>
import {toRefs, computed,ref} from 'vue';



export default {
name: "get-line" ,
props : ["stationOfLine","selectStationOfLine"]
,
setup (props, { emit }) {
    const propsDepartureStation = ref ('0')
    const propsArrivalStation = ref ('0')
    const getProps =  toRefs(props)
    const propsSelectStationOfLine = computed (() => {
      return getProps.selectStationOfLine.value
    })
    const propsStation = computed(() => {
      if (propsSelectStationOfLine.value > 1) {
        return 
      } else {
        return getProps.stationOfLine.value[propsSelectStationOfLine.value].Stations.map((item) => {
        return {
          StationName : item.StationName.Zh_tw,
          StationID   : item.StationID
        }
      })
      }
    })
    const propsSearch = (()=> {
      emit("personalTravel" , [propsDepartureStation, propsArrivalStation])
    })
  return {getProps,propsSelectStationOfLine,propsStation,propsDepartureStation,propsArrivalStation,propsSearch}
}




}

</script>