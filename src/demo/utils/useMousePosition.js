import { onMounted, onUnmounted, reactive, toRefs } from 'vue'

export default function useMousePosition() {
  // reactive定义的，因为是组合函数，所以必须保持对这个所返回的对象的引用来保持响应
  // (不能解构或者展开)，例如 const { x, y } = useMousePosition()或者return { ...useMousePosition() }
  const pos = reactive({
    x: 0,
    y: 0
  })

  const update = (e) => {
    pos.x = e.pageX
    pos.y = e.pageY
  }

  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  // 外层如果通过{ x, y}解构，这里需要toRefs()包裹一层，实际上是做了一层get和set
  // 它将响应式对象的每个 property 都转成了相应的 ref【把对象转成了ref】。
  return toRefs(pos)
}
