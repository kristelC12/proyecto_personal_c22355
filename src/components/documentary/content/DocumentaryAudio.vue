<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  src: { type: String, required: true },
})
</script>

<template>
  <aside class="documentary-audio">
    <div class="audio-header">🎧 Narración</div>
    <p class="audio-desc">{{ description }}</p>
    <audio controls>
      <source :src="src" type="audio/mpeg" />
    </audio>
  </aside>
</template>

<style scoped>
.documentary-audio {
  max-width: 600px;
  margin: 2rem auto 0;
  padding: 1.25rem 1.5rem;

  background: rgba(20, 12, 8, 0.6);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  z-index: 5;
}

.audio-header {
  font-weight: 700;
  color: var(--secondary-color, #c79a5b);
  margin-bottom: 0.5rem;
  letter-spacing: 0.5px;
}

.audio-desc {
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
  line-height: 1.6;
}

.documentary-audio audio {
  width: 100%;
  filter: invert(0.05);
}
</style>
