import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { onMounted, onUnmounted, ref } from 'vue'

BScroll.use(Slide)

export default function useSlider(wappperRef) {
  const slider = ref(null)
  const currentPageIndex = ref(0)

  onMounted(() => {
    const sliderVal = slider.value = new BScroll(wappperRef.value, {
      click: true,
      // 横向滚动
      scrollX: true,
      scrollY: false,
      // 用来避免惯性动画带来的快速滚动时的闪烁的问题和快速滑动时一次滚动多页的问题
      momentum: false,
      // 循环衔接的时候出现闪烁
      bounce: false,
      probeType: 2,
      slide: true
    })

    sliderVal.on('slideWillChange', page => {
      currentPageIndex.value = page.pageX
    })
  })

  onUnmounted(() => {
    slider.value.destory()
  })

  return {
    slider,
    currentPageIndex
  }
}
