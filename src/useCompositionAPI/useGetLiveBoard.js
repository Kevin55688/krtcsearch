import {useGetAxios} from '@/useCompositionAPI/useGetAxios.js'
import {ref} from 'vue'


export function getLiveBoard () {
  const LiveBoard = ref(null)
  const {data} = useGetAxios('https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/LiveBoard/KRTC?%24format=JSON')

  LiveBoard.value = data

  return {LiveBoard}
}