<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  stats: {
    type: Array,
    default: () => []
  }
})

const animatedValues = ref([])

onMounted(() => {
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
})
</script>

<template>
  <section class="stats-section">

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
}

.stats-section h2 {
  text-align: center;
  margin-bottom: 4rem;
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
  background: rgba(255, 255, 255, .9);
}

.number {
  display: block;
  font-size: 3rem;
  font-weight: bold;
}
</style>
