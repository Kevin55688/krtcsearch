import { ref, isRef, unref, watchEffect } from 'vue'
import axios from 'axios'

export function useGetAxios (url) {
  const data = ref(null)
  const error = ref(null)
  function doGet() {
    data.value = null
    error.value = null
    axios.get(unref(url))
    .then((res) => {
      data.value = res.data
    })
    .catch((res)=> {
      error.value = res
    })
  }

  if(isRef(url)) {
    watchEffect(doGet)
  } else {
    doGet()
  }


  return {data,error}
}