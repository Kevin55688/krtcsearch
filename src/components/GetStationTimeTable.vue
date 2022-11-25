<template>
<div>
  <div class="timeTable" v-if="getProps.personalTravel.value.isSearch">
    <div class="title">
      <span>列車到站</span>
      <div class="direction-container">
        往 
        <span class="orange" v-if="getProps.selectStationOfLine.value == 0">橘線</span> 
        <span class="red"  v-else-if="getProps.selectStationOfLine.value == 1">紅線</span>
        <span class="direction">{{getProps.personalTravel.value.direction}}</span>
      </div>
    </div>
    <div class="timeTable-container">
        <div class="timeTable-item" v-for="(time,index) in getTimeTable.slice(0,10)" :key="time.Sequence" >
          <div class="time">{{time.ArrivalTime}}</div>
          <div class="time">{{estimateArrivedTime.slice(0,10)[index]}}</div>
        </div>
      <br>
    </div>
  </div>
</div>
</template>



<script>
import {getStationTimeTable} from '@/useCompositionAPI/useGetStationTimeTable.js'
import { computed,toRefs} from 'vue'

export default {
name: "get-station-time-table",
props : ["personalTravel","selectStationOfLine","estimateTime"],
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

  const estimateArrivedTime = computed(() => {
    const min = getTimeTable.value.map((item) => {
      return String(Number(item.ArrivalTime.slice(-2)) + getProps.estimateTime.value) - (Math.floor((Number(item.ArrivalTime.slice(-2)) + getProps.estimateTime.value)/60) * 60)
    })
    const hour = getTimeTable.value.map((item) => {
      return Number(item.ArrivalTime.slice(0,2)) + Math.floor((Number(item.ArrivalTime.slice(-2)) + getProps.estimateTime.value)/60)
    })
    const result = []
    for (let i = 0 ; i < hour.length ; i++) {
      if(min[i] < 10) {
        result.push(hour[i] + ":" + "0" + min[i])
      } else{
      result.push(hour[i] + ":" + min[i])
      }
    }

    return result
  })

  return {StationTimeTable,filterTimeTable,getProps,today,getTimeTable,estimateArrivedTime}

}
}

</script>


<style lang="scss" scoped>
.timeTable{
  padding: 10px;
  >.title{
    display: flex;
    justify-content: space-between;
    padding: 5px;
    >.direction-container{
      >.orange{
        background-color: orange;
        border-radius: 5px;
        padding: 5px;
        margin: 3px;
      }
      >.red{
        background-color: red;
        border-radius: 5px;
        padding: 5px;
        margin: 3px;
      }
      >.direction{
        font-weight: bold;
        margin: 3px;
      }
    }
  }
  >.timeTable-container{
    >.timeTable-item{
      // margin: 10px 42px;
      font-size: 20px;
      display: flex;
      justify-content: center;
      position: relative;
      &::before{
        content: "------>";
        position: absolute;
        top: 30px;
      }
      &:not(:nth-child(10)) {
        border-bottom: solid 1px gray;
      }

      >.time{
        margin: 30px 50px;
        &:nth-child(2n){
          font-weight: bold;
        }
      }
      
    }
  }
}

</style>