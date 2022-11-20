import {useGetAxios} from '@/useCompositionAPI/useGetAxios.js'
import {ref} from 'vue'


export function getStationTimeTable () {
  const StationTimeTable = ref(null)
  const {data} = useGetAxios('https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/StationTimeTable/KRTC?%24format=JSON')

  StationTimeTable.value = data

  return {StationTimeTable}
}