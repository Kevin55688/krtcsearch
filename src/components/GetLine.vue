<template>
  <div class="selectStation-container" v-show="propsSelectStationOfLine <= 1">
    <div class="selectStation-table" >
      <div class="selectStation-item">
        <div class="title">出發</div>
        <div class="stationName">
          <select v-model="propsDepartureStation" >
            <option disabled="true" value="0">請選擇起始站</option>
            <option :value="station" v-for="station in propsStation" :key="station">{{station}}</option>
          </select>
        </div>
      </div>
      <div class="selectStation-item">
        <button @click="changeHandler"  ><img src="@/components/pic/istockphoto-1360180965-612x612.jpg"></button>
      </div>
      <div class="selectStation-item">
        <div class="title">抵達</div>
        <div class="stationName">
          <select v-model="propsArrivalStation" >
            <option disabled="true" value="0">請選擇抵達站</option>
            <option :value="station" v-for="station in propsStation" :key="station">{{station}}</option>
          </select>
        </div>

      </div>
    </div>
  <div class="selectStation-search">
    <button @click="propsSearch" >搜尋</button>
  </div>
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
      if (propsDepartureStation.value == 0 || propsArrivalStation.value== 0) {
        alert("請選擇起始站及抵達站")
        return 
      } else {
      isSearch.value = true
      emit("personalTravel" , [propsDepartureStation, propsArrivalStation,direction,passStation,isSearch,propsStation])
      }

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
    watch(() => [propsDepartureStation.value, propsArrivalStation.value] , 
          () => {
            isSearchFalse()
          })

    watch(() => propsSelectStationOfLine.value,
          () => {
            propsDepartureStation.value = 0
            propsArrivalStation.value   = 0
          })
  return {getProps,propsSelectStationOfLine,propsStation,propsDepartureStation,propsArrivalStation,propsSearch,direction,passStation,changeHandler,isSearch,isSearchFalse}
}
}
</script>

<style lang="scss" scoped>
.selectStation-container{
  padding: 0 20px;
  >.selectStation-table{
    display: flex;
    width: 100%;
    justify-content: space-around;
    border: solid 1px gray;
    padding: 30px 0 50px;
    border-radius: 10px;
    >.selectStation-item{
      margin: 5px;
      &:nth-child(2) {
        display: flex;
        align-items: end;
        border: none;
        margin: 0;
        button{
          width: 100%;
          border: none;
          background-color:transparent;
          &:active{
            border: 1px solid gray;
            border-radius: 10px;
          }
          
        }
        img{
          width: 100%;
          mix-blend-mode: multiply;
          background-color:transparent;
          object-fit: cover;
        }
        }
      >.title{
        margin-bottom:15px;
        color: gray;

      }
      >.stationName{
        >select{
          padding: 15px;
          outline:none;
          border-radius: 10px;
          font-size: 14px;
        }
      }
    }
  }
  >.selectStation-search{
    width: 100%;
    margin-top: 10px;
    border: none;
    >button{
      width: 90%;
      padding: 10px;
      background-color:rgb(85, 85, 237);
      color: white;
      font-size: 20px;
      text-shadow: -1px -1px 0 black,
                    1px -1px 0 black,
                    -1px 1px 0 black,
                    1px 1px 0  black;
      border-radius: 5px;
    }
  }
}

</style>