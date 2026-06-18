<script setup>
import { ref } from 'vue'
const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  hotspots: {
    type: Array,
    default: () => [],
  },
})
const selected = ref(null)
const openHotspot = (item) => {
  selected.value = item
}
</script>
<template>
  <section class="farm-explorer">
    <h2>Explora un Cafetal</h2>
    <div class="farm-container">
      <img :src="props.image" alt="Cafetal" class="farm-image" />
      <button
        v-for="item in props.hotspots"
        :key="item.id"
        class="hotspot"
        :style="{
          left: item.x,
          top: item.y,
        }"
        @click="openHotspot(item)"
      >
        📍
      </button>
      <Transition name="fade">
        <div
          v-if="selected"
          class="info-card"
          :style="{
            left: selected.x,
            top: selected.y,
          }"
        >
          <button class="close" @click="selected = null">✕</button>
          <h3>{{ selected.title }}</h3>
          <p>
            {{ selected.text }}
          </p>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.farm-explorer {
  padding: 6rem 2rem;
}
.farm-explorer h2 {
  text-align: center;
  margin-bottom: 3rem;
  color: var(--secondary-color);
}
.farm-container {
  position: relative;
  max-width: 1200px;
  height: 60%;
  margin: auto;
}
.farm-image {
  width: 100%;
  height: 30%;
  border-radius: 20px;
}
.hotspot {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 3px solid white;
  background: #d97706;
  cursor: pointer;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.7);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(217, 119, 6, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(217, 119, 6, 0);
  }
}
.info-card {
  position: absolute;
  width: 320px;
  max-width: 90vw;
  background: white;
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
  transform: translate(40px, -50%);
  z-index: 20;
}
.info-card h3 {
  margin-bottom: 1rem;
}
.info-card p {
  line-height: 1.6;
}
.close {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.2rem;
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
