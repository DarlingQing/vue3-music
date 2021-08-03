<template>
  <h1>Reactive Demo</h1>
  <div @click="handleCount">点我加1: {{ data.counter }}</div>
  <div>我是计算值: doubleCounter: {{ data.doubleCounter }}---thirdCounter: {{ thirdCounter }}</div>
   <div>Mouse position: x {{ x }} / y {{ y }}</div>
</template>

<script>
import {
  reactive,
  computed,
  onMounted,
  onUpdated,
  onUnmounted
} from 'vue'
import { x, y } from './utils/useMousePosition'
// import useMousePosition from './utils/useMousePosition'
export default {
  setup(props, { attrs, slots, emit }) {
    const data = reactive({
      counter: 1,
      doubleCounter: computed(() => data.counter * 2)
    })

    const thirdCounter = computed(() => data.counter * 3)

    // const { x, y } = useMousePosition()

    const handleCount = () => {
      data.counter++
    }

    // 以下是生命周期
    // 相当于之前的mounted
    onMounted(() => {
      console.log('onMounted start!!!')
    })

    // 相当于之前的updated
    onUpdated(() => {
      console.log('onUpdated!!')
    })

    // 相当于之前的destory
    onUnmounted(() => {
      console.log('onUnmounted end!!')
    })

    return {
      data,
      thirdCounter,
      x,
      y,
      handleCount
    }
  }
}
</script>
