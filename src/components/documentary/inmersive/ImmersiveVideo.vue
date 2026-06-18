<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <Transition name="video-fade" mode="out-in">
    <div :key="src" class="immersive-video" aria-hidden="true">
      <video autoplay muted loop playsinline>
        <source :src="src" type="video/mp4" />
      </video>
      <div class="overlay" />
    </div>
  </Transition>
</template>

<style scoped>
.immersive-video {
  position: fixed;
  inset: 0;
  z-index: 0;
}

.immersive-video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
}

.video-fade-enter-from,
.video-fade-leave-to {
  opacity: 0;
}

.video-fade-enter-active,
.video-fade-leave-active {
  transition: opacity 1s ease;
}
</style>
