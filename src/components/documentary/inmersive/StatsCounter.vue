<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  stats: {
    type: Array,
    default: () => [],
  },
})

const animatedValues = ref([])
const sectionRef = ref(null)
let observer = null

const startCounting = () => {
  props.stats.forEach((stat, index) => {
    animatedValues.value[index] = 0

    const increment = stat.value / 100

    const interval = setInterval(() => {
      if (animatedValues.value[index] >= stat.value) {
        animatedValues.value[index] = stat.value
        clearInterval(interval)
      } else {
        animatedValues.value[index] += increment
      }
    }, 20)
  })
}

onMounted(() => {
  animatedValues.value = props.stats.map(() => 0)

  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        startCounting()
        observer.disconnect()
      }
    },
    { threshold: 0.3 },
  )

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section ref="sectionRef" class="stats-section">
    <h2>El café en cifras</h2>

    <div class="stats-grid">
      <div v-for="(stat, index) in stats" :key="stat.label" class="stat-card">
        <span class="number">
          {{ Math.floor(animatedValues[index] || 0) }}
        </span>

        <p>{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  padding: 8rem 2rem;
  margin: 0 auto;
  box-sizing: border-box;
}

.stats-section h2 {
  text-align: center;
  margin-bottom: 4rem;
  color: var(--secondary-color, #c79a5b);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
}

.number {
  display: block;
  font-size: 3rem;
  font-weight: bold;
}

@media (max-width: 768px) {
  .stats-section {
    padding: 5rem 1.5rem;
  }
}

@media (max-width: 480px) {
  .stats-section {
    padding: 3.5rem 1rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .number {
    font-size: 2.25rem;
  }
}
</style>
