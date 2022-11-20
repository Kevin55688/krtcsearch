import {useGetAxios} from '@/useCompositionAPI/useGetAxios.js'
import {ref} from 'vue'


export function getStationOfLine () {
  const stationOfLine = ref(null)
  const {data} = useGetAxios('https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/StationOfLine/KRTC?%24format=JSON')

  stationOfLine.value = data

  return {stationOfLine}
}