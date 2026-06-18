<script setup>
import { ref, computed } from 'vue'

const activeYear = ref(0)

const props = defineProps({
  timeline: { type: Array, default: () => [] },
})

const current = computed(() => props.timeline[activeYear.value] || {})
</script>

<template>
  <section class="timeline-section">
    <h2>La Historia del Café en Costa Rica</h2>

    <div class="timeline-years">
      <button
        v-for="(item, index) in props.timeline"
        :key="item.year"
        @click="activeYear = index"
        :class="{ active: activeYear === index }"
      >
        {{ item.year }}
      </button>
    </div>

    <Transition name="fade" mode="out-in">
      <div :key="current.year" class="timeline-content">
        <div class="timeline-media">
          <img :src="current.image" :alt="current.title" />
        </div>

        <div class="timeline-text">
          <h3>{{ current.title }}</h3>
          <p>{{ current.description }}</p>
          <audio controls>
            <source :src="current.audio" type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.timeline-section {
  max-width: 1100px;
  margin: 4rem auto;
  padding: 3rem 2rem;

  background: rgba(20, 12, 8, 0.5);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 22px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.45);
}

.timeline-section h2 {
  text-align: center;
  margin-bottom: 2.5rem;
  color: var(--primary-color);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
}

.timeline-years {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 3rem;
}

.timeline-years button {
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  padding: 0.7rem 1.4rem;
  border-radius: 999px;
  cursor: pointer;
  transition: 0.3s;
}

.timeline-years button:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.timeline-years button.active {
  background: var(--primary-color);
  color: #fff;
  transform: scale(1.08);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
}

.timeline-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 850px;
  margin: 0 auto;
}

.timeline-media {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
}

.timeline-media img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  object-position: center;
  display: block;
}

.timeline-text {
  text-align: center;
}

.timeline-text h3 {
  font-size: 1.6rem;
  margin-bottom: 1rem;
  color: var(--secondary-color, #c79a5b);
}

.timeline-text p {
  max-width: 700px;
  margin: 0 auto 1.5rem;
}

.timeline-text audio {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .timeline-media img {
    height: 240px;
  }
}
</style>
