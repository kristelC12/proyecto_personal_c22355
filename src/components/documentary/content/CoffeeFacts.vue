<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  facts: {
    type: Array,
    default: () => [],
  },
})

const currentIndex = ref(0)

const changeFact = () => {
  if (props.facts.length <= 1) return

  let random
  do {
    random = Math.floor(Math.random() * props.facts.length)
  } while (random === currentIndex.value)

  currentIndex.value = random
}

let interval

onMounted(() => {
  interval = setInterval(changeFact, 8000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <aside class="coffee-facts">
    <span class="icon">☕</span>
    <h4>¿Sabías que...?</h4>

    <Transition name="fact-text" mode="out-in">
      <p :key="currentIndex">{{ facts[currentIndex]?.text }}</p>
    </Transition>

    <button class="fact-button" @click="changeFact">Descubrir otra curiosidad</button>
  </aside>
</template>

<style scoped>
.coffee-facts {
  max-width: 600px;
  margin: 2rem auto 0;
  padding: 2rem 2.25rem;
  text-align: center;

  background: rgba(20, 12, 8, 0.6);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
}

.icon {
  font-size: 2.25rem;
  display: block;
  margin-bottom: 0.5rem;
}

.coffee-facts h4 {
  margin-bottom: 1rem;
  color: var(--secondary-color, #c79a5b);
  font-size: 1.2rem;
  letter-spacing: 0.5px;
}

.coffee-facts p {
  line-height: 1.8;
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.92);
  min-height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fact-button {
  margin-top: 1.5rem;
  padding: 0.8rem 1.8rem;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  background: var(--primary-color);
  color: #fff;
  cursor: pointer;
  font-size: 0.95rem;
  transition: 0.3s;
}

.fact-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
}

/* Transición del texto al cambiar de curiosidad */
.fact-text-enter-active,
.fact-text-leave-active {
  transition: all 0.4s ease;
}

.fact-text-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fact-text-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
