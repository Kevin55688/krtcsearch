<template>
  <div>
    <div class="estimateTime" v-if="getProps.personalTravel.value.isSearch">
      <div class="title">預計乘車時間</div>
      <span>{{estimateTime}}分鐘</span>
    </div>
  </div>
</template>



<script>
  import {getTravelTime} from '@/useCompositionAPI/useGetTravelTime.js'
import { computed,toRefs,watch} from 'vue'

export default {
  name: 'get-travel-time',
  props:["personalTravel"],
  setup (props ,{ emit }) {
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
      let getTime
      let departureStationStopTime
      if (getProps.personalTravel.value.passStation.departureStation > getProps.personalTravel.value.passStation.arrivalStation) {
        getTime = selectLineTravelTime.value.slice(selectLineTravelTime.value.length - getProps.personalTravel.value.passStation.departureStation , selectLineTravelTime.value.length - getProps.personalTravel.value.passStation.arrivalStation).map((item) => {
          return item.RunTime - item.StopTime
        }).reduce((a,b) => a+b)

        departureStationStopTime = selectLineTravelTime.value.slice(selectLineTravelTime.value.length - getProps.personalTravel.value.passStation.departureStation , selectLineTravelTime.value.length - getProps.personalTravel.value.passStation.arrivalStation)[0].StopTime
      } else {
        getTime = selectLineTravelTime.value.slice(getProps.personalTravel.value.passStation.departureStation , getProps.personalTravel.value.passStation.arrivalStation).map((item) => {
          return item.RunTime - item.StopTime
        }).reduce((a,b) => a+b)
        departureStationStopTime = selectLineTravelTime.value.slice(getProps.personalTravel.value.passStation.departureStation , getProps.personalTravel.value.passStation.arrivalStation)[0].StopTime
      }

      return Math.ceil((getTime + departureStationStopTime) / 60)
    })
      watch(() => getProps.personalTravel.value.passStation ,
            () => {
              emit("estimateTime" ,estimateTime.value)
            })

    return {TravelTime,filterTravelTime,direction,getProps,selectLineTravelTime,estimateTime}
  }
}
</script>

<style lang="scss" scoped>
.estimateTime{
  border-top: solid 1px gray;
  border-bottom: solid 1px gray;
  background-color: rgba(202, 193, 193, 0.119);
  display: flex;
  padding: 10px;
  >span{
    font-weight:bold;
   margin-left: 10px;
  }
}


</style>