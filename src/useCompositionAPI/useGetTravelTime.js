import {useGetAxios} from '@/useCompositionAPI/useGetAxios.js'
import {ref} from 'vue'


export function getTravelTime () {
  const TravelTime = ref(null)
  const {data} = useGetAxios('https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/S2STravelTime/KRTC?%24format=JSON')

  TravelTime.value = data

  return {TravelTime}
}