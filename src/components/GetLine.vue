<template>
  <div>
    <select v-model="propsDepartureStation" v-show="propsSelectStationOfLine <= 1">
      <option disabled="true" value="0">請選擇起始站</option>
      <option :value="station" v-for="station in propsStation" :key="station">{{station}}</option>
    </select>
    <button @click="changeHandler" v-show="propsSelectStationOfLine <= 1" > &lt;=>  </button>
    <select v-model="propsArrivalStation" v-show="propsSelectStationOfLine <= 1">
      <option disabled="true" value="0">請選擇抵達站</option>
      <option :value="station" v-for="station in propsStation" :key="station">{{station}}</option>
    </select>
    <button @click="propsSearch" v-show="propsSelectStationOfLine <= 1">搜尋</button>
  </div>
</template>


<script>
import {toRefs, computed,ref,watch} from 'vue';

export default {
name: "get-line" ,
props : ["stationOfLine","selectStationOfLine"]
,
setup (props, { emit }) {
    const propsDepartureStation = ref ('0')
    const propsArrivalStation = ref ('0')
    const isSearch = ref (false)
    const getProps =  toRefs(props)
    const propsSelectStationOfLine = computed (() => {
      return getProps.selectStationOfLine.value
    })
    const propsStation = computed(() => {
      if (propsSelectStationOfLine.value > 1) {
        return 
      } else {
        return getProps.stationOfLine.value[propsSelectStationOfLine.value].Stations.map((item) => {
        return item.StationName.Zh_tw
        
      })
      }
    })
    const propsSearch = (()=> {
      isSearch.value = true
      emit("personalTravel" , [propsDepartureStation, propsArrivalStation,direction,passStation,isSearch,propsStation])
    })
    const direction = computed(() => {
      if (propsSelectStationOfLine.value == "0") {
        return propsStation.value.indexOf(propsDepartureStation.value) > propsStation.value.indexOf(propsArrivalStation.value) ? "西子灣" : "大寮"
      } else if (propsSelectStationOfLine.value == "1") {
      return  propsStation.value.indexOf(propsDepartureStation.value) > propsStation.value.indexOf(propsArrivalStation.value) ? "小港" : "南岡山"
      } else {
        return []
      }
    })
    const passStation = computed(() =>{
      return {
              departureStation :propsStation.value.indexOf(propsDepartureStation.value),
              arrivalStation   : propsStation.value.indexOf(propsArrivalStation.value),
                                                                                            }
    })
    const changeHandler = (() => {
      [propsDepartureStation.value,propsArrivalStation.value] = 
      [propsArrivalStation.value,propsDepartureStation.value]
    })

    const isSearchFalse = (() => {
      isSearch.value = false
    })
    watch(() => [propsDepartureStation.value, propsArrivalStation.value] , () => {
      isSearchFalse()
    })
  return {getProps,propsSelectStationOfLine,propsStation,propsDepartureStation,propsArrivalStation,propsSearch,direction,passStation,changeHandler,isSearch,isSearchFalse}
}




}

</script>