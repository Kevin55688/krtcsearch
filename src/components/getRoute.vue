<template>
  <div>
    <div class="route" v-if="getProps.isSearch.value">
      <div class="title">行車路線</div>
      <div class="route-container">
        <div class="route-item">
          {{getProps.departureStation.value}}
        </div>
        <div class="route-item">
          <!-- <div>
            {{getRoute.length - 1 + '站 -'}}
          </div>
          <div class="passStation">
            <div class="station" v-for="(station,index) in getRoute.slice(1 , -1)" :key="getRoute[index]">
              {{station}}
            </div>
          </div> -->
          <span>
            {{getRoute.length - 1 + '站 -'}}
            <span class="station" v-for="(station,index) in getRoute.slice(1 , -1)" :key="getRoute[index]">
              {{station}}
            </span>
          </span>
        </div>
        <div class="route-item">
          {{getProps.arrivalStation.value}}
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import {computed, toRefs} from 'vue'
export default {
  name : 'get-route',
  props:["station","passStation","departureStation","arrivalStation","isSearch"],
  setup (props) {
    const getProps =  toRefs(props)
    const getRoute = computed(() => {
      const arr = getProps.station.value.slice()
      if (getProps.passStation.value.departureStation > getProps.passStation.value.arrivalStation){
        return arr.slice(getProps.passStation.value.arrivalStation, getProps.passStation.value.departureStation + 1).reverse()
      } else {
        return arr.slice(getProps.passStation.value.departureStation, getProps.passStation.value.arrivalStation + 1)
      }
    })


    return {getProps,getRoute}
  }
}

</script>

<style lang="scss" scoped>
.route{
  border-top: solid 1px gray;
  border-bottom: solid 1px gray;
  margin:20px 0px;
  background-color: rgba(61, 59, 59, 0.119);
  display: flex;
  flex-direction: column;
  // justify-content: start;
  >.title{
    text-align:start;
    margin: 10px;
  }
  >.route-container{
    margin: 10px 42px;

    .route-item{
      // border: solid 1px gray;
      text-align:start;
      font-size: 20px;
      font-weight:bold;
      position: relative;
      &:nth-child(1){
        &::before{
          content: '';
          position: absolute;
          height: 50%;
          width: 3px;
          background-color: black;
          top: 50%;
          left: -15px;
        }
        &::after{
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          top: 50%;
          left: -18px;
          background-color: black;
          border-radius: 50%;
        }
      }
      &:nth-child(2){
        &::before{
          content: '';
          position: absolute;
          height: 100%;
          width: 3px;
          background-color: black;
          top: 0;
          left: -15px;
        }
      }
      &:nth-child(3){
        &::before{
          content: '';
          position: absolute;
          height: 50%;
          width: 3px;
          background-color: black;
          top: 0;
          left: -15px;
          
        }
        &::after{
          content: '';
          position: absolute;
          width: 10px;
          height: 10px;
          top: 50%;
          left: -18px;
          background-color: black;
          border-radius: 50%;
        }
      }
      >span{
        color: gray;
        font-size: 14px;
        font-weight: normal;
        .station{
          &:not(:last-child) {
            &::after{
              content: '．'
            };
          }
        }
      }
    }
  }
}

</style>