<template>
  <div class="slider" ref="rootRef">
    <div class="slider-group">
      <div
        v-for="item in sliders"
        :key="item.id"
        class="slider-page"
      >
        <a :href="item.link">
          <img :src="item.pic"/>
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        v-for="(item, index) in sliders"
        :key="item.id"
        :class="{
          dot: true,
          'active': currentPageIndex === index
        }"
      >
      </span>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import useSlider from './use-slider'
  export default {
    name: 'slider',

    props: {
      // 轮播图数据
      sliders: {
        type: Array,
        default: () => {
          return []
        }
      }
    },

    setup() {
      // 拿到DOM节点
      const rootRef = ref(null)
      // useSlider不能传入.value,需要传入响应式的值，
      // 组件实例创建在setup函数执行之前，但是setup执行的时候，组件还没有mounted，不传入响应式的值时，刚开始是undefined，
      // 后面mounted之后获取DOM后，还会一直是undefined
      // const { currentPageIndex } = useSlider(rootRef.value)
      const { currentPageIndex } = useSlider(rootRef)

      return {
        rootRef,
        currentPageIndex
      }
    }
  }
</script>

<style lang="scss" scoped>
  .slider {
    min-height: 1px;
    font-size: 0;
    touch-action: pan-y;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-page {
        display: inline-block;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        a {
          display: block;
          width: 100%;
        }
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .dots-wrapper {
      position: absolute;
      left: 50%;
      bottom: 12px;
      line-height: 12px;
      transform: translateX(-50%);
      .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: $color-text-l;
        &.active {
          width: 20px;
          border-radius: 5px;
          background: $color-text-ll;
        }
      }
    }
  }
</style>
