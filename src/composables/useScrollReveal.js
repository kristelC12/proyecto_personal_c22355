import { onBeforeUnmount, onMounted } from 'vue'

export function useScrollReveal(callback) {
  const handleScroll = () => {
    callback()
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleScroll)
  })
}
