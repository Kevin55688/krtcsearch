<template>
  <div class="home">
    <select  v-model="selectStationOfLine">
    <option  disabled="true" value="2">請選擇搭承路線</option>
    <option value="0">橘線</option>
    <option value="1">紅線</option>
    </select>
    <br>
    <GetLine :stationOfLine="stationOfLine" :selectStationOfLine="selectStationOfLine" @personalTravel="searchHandler"/>

    <GetStationTimeTable :personalTravel="personalTravel" :selectStationOfLine="selectStationOfLine"/>
    <GetTravelTime :personalTravel="personalTravel"/>
    <GetRoute :station="personalTravel.station" :passStation="personalTravel.passStation"/>
  </div>
</template>
<script>
  // let week = new Date().getDay()
  // console.log(week);
  import GetLine from '@/components/GetLine.vue'
  import GetStationTimeTable from '@/components/GetStationTimeTable.vue'
  import GetTravelTime from '@/components/GetTravelTime.vue'
  import GetRoute from '@/components/getRoute.vue'
  import{ ref } from  'vue'
  import {getStationOfLine} from '@/useCompositionAPI/useGetStationOfLine.js'
  import {getTravelTime} from '@/useCompositionAPI/useGetTravelTime.js'
  import {getLiveBoard} from '@/useCompositionAPI/useGetLiveBoard.js'
export default {
  components : {
    GetLine,
    GetStationTimeTable,
    GetTravelTime,
    GetRoute,
  },
  setup() {
    const selectStationOfLine = ref("2")
    const {stationOfLine} = getStationOfLine()
    const {TravelTime} = getTravelTime()
    const {LiveBoard} = getLiveBoard()
    const personalTravel = ref('')
    const searchHandler =((val) =>{
      personalTravel.value = {
                              departureStation : val[0],
                              arrivalStation : val[1],
                              direction : val[2],
                              passStation : val[3].value,
                              isSearch    : val[4],
                              station      : val[5]
                                                        }
    })
    return {stationOfLine,TravelTime,LiveBoard,selectStationOfLine,searchHandler,personalTravel}
    
  },
}
</script>
