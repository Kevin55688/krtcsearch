<template>
  <div class="home">
    <div class="selectLine">
      <select  v-model="selectStationOfLine">
        <option  disabled="true" value="2">請選擇搭乘路線</option>
        <option value="0">橘線</option>
        <option value="1">紅線</option>
      </select>
    </div>
    <GetLine :stationOfLine="stationOfLine" :selectStationOfLine="selectStationOfLine" @personalTravel="searchHandler"/>
    <GetRoute :station="personalTravel.station" :passStation="personalTravel.passStation" :departureStation="personalTravel.departureStation" :arrivalStation="personalTravel.arrivalStation" :isSearch="personalTravel.isSearch"/>
    <GetTravelTime :personalTravel="personalTravel"/>
    <GetStationTimeTable :personalTravel="personalTravel" :selectStationOfLine="selectStationOfLine"/>
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

<style lang="scss" scoped>
.home {
  >.selectLine{
    width: 100%;
    margin: 30px 0 10px;
    >select{
      width: auto;
      margin: 20px 0px;
      padding: 0 20%;
      font-size: 16px;
      border: solid 3px gray;
      border-radius: 10px;
      >option{
        text-align: center;
        width: 100%;
      }
    }
  }

}

</style>
