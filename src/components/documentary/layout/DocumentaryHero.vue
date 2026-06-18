<script setup>
defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  videoSrc: { type: String, required: true },
  poster: { type: String, default: '' },
})
</script>

<template>
  <section class="documentary-hero">
    <video
      class="documentary-hero__video"
      :poster="poster"
      autoplay
      muted
      loop
      playsinline
      aria-hidden="true"
    >
      <source :src="videoSrc" type="video/mp4" />
    </video>

    <div class="documentary-hero__overlay">
      <p v-if="eyebrow" class="documentary-hero__eyebrow">{{ eyebrow }}</p>
      <h1>{{ title }}</h1>
      <p v-if="subtitle" class="documentary-hero__subtitle">{{ subtitle }}</p>
      <div class="scroll-indicator" aria-hidden="true">Desliza para explorar</div>
    </div>
  </section>
</template>

<style scoped>
.documentary-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.documentary-hero__video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.documentary-hero__overlay {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1.5rem;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(20, 12, 6, 0.35), rgba(20, 12, 6, 0.7));
}

.documentary-hero__eyebrow {
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 1rem;
  color: var(--secondary-color);
}

.documentary-hero__overlay h1 {
  font-size: clamp(2.5rem, 7vw, 5rem);
  line-height: 1.1;
  color: #fff;
  margin-bottom: 1rem;
}

.documentary-hero__subtitle {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.85);
  max-width: 600px;
}

.scroll-indicator {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, 10px);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .documentary-hero__overlay {
    padding: 2rem 1.25rem;
  }

  .scroll-indicator {
    bottom: 2rem;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .documentary-hero__overlay {
    padding: 2rem 1rem;
  }

  .scroll-indicator {
    letter-spacing: 1px;
  }
}
</style>
