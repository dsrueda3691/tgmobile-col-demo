import { onMounted, onUnmounted, ref } from 'vue'

export function useReveal() {
  const el = ref(null)
  let observer

  onMounted(() => {
    if (!el.value) return
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el.value)
  })

  onUnmounted(() => {
    if (observer && el.value) observer.disconnect()
  })

  return { el }
}
