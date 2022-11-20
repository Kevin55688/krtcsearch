<template>
  <div class="home">
    <select  v-model="selectStationOfLine">
    <option  disabled="true" value="2">請選擇搭承路線</option>
    <option value="0">橘線</option>
    <option value="1">紅線</option>
    </select>
    <br>
    <GetLine :stationOfLine="stationOfLine" :selectStationOfLine="selectStationOfLine" @personalTravel="searchHandler"/>

    {{personalTravel}}
  </div>
</template>
<script>
  import GetLine from '@/components/GetLine.vue'
  import{ ref } from  'vue'
  import {getStationOfLine} from '@/useCompositionAPI/useGetStationOfLine.js'
  import {getTravelTime} from '@/useCompositionAPI/useGetTravelTime.js'
  import {getLiveBoard} from '@/useCompositionAPI/useGetLiveBoard.js'
  import {getStationTimeTable} from '@/useCompositionAPI/useGetStationTimeTable.js'
export default {
  components : {
    GetLine,
  },
  setup() {
    const selectStationOfLine = ref("2")
    const {stationOfLine} = getStationOfLine()
    const {TravelTime} = getTravelTime()
    const {LiveBoard} = getLiveBoard()
    const {StationTimeTable} = getStationTimeTable()
    const personalTravel = ref('')
    const searchHandler =((val) =>{
      personalTravel.value = {
                              departureStation : val[0],
                              arrivalStation : val[1],
                                                        }
    })
    return {stationOfLine,TravelTime,LiveBoard,StationTimeTable,selectStationOfLine,searchHandler,personalTravel}
    
  },
}
</script>
