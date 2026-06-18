<script setup>
defineProps({
  index: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  highlight: { type: String, default: '' },
  image: { type: String, default: '' },
})
</script>

<template>
  <article class="documentary-section" :class="{ 'documentary-section--reverse': index % 2 === 0 }">
    <div class="documentary-section__text">
      <span class="section-index">0{{ index }}</span>
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
      <p v-if="highlight" class="highlight">{{ highlight }}</p>
    </div>

    <div v-if="image" class="documentary-section__media">
      <img :src="image" :alt="title" />
    </div>
  </article>
</template>

<style scoped>
.documentary-section {
  display: flex;
  gap: 2.5rem;
  align-items: stretch;
  max-width: 1100px;
  margin: 0 auto;
}

/* Tarjeta de texto "glass" */
.documentary-section__text {
  flex: 1;
  position: relative;
  padding: 2.5rem 2.75rem;

  background: rgba(20, 12, 8, 0.55);
  backdrop-filter: blur(14px) saturate(140%);
  -webkit-backdrop-filter: blur(14px) saturate(140%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.45),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.section-index {
  display: block;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 3px;
  color: var(--secondary-color, #c79a5b);
  margin-bottom: 0.75rem;
  opacity: 0.85;
}

.documentary-section h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: 1.25rem;
  color: var(--primary-color);
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
  line-height: 1.1;
}

.documentary-section p {
  font-size: 1.1rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.92);
}

.highlight {
  margin-top: 2rem;
  padding-left: 1.5rem;
  border-left: 4px solid var(--secondary-color);
  font-size: 1.25rem;
  font-style: italic;
  color: #fff !important;
}

/* Imagen con marco suave */
.documentary-section__media {
  width: 380px;
  max-width: 45%;
  flex-shrink: 0;
  height: 100%;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.documentary-section__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.documentary-section__media:hover img {
  transform: scale(1.05);
}

.documentary-section--reverse {
  flex-direction: row-reverse;
}

@media (max-width: 768px) {
  .documentary-section,
  .documentary-section--reverse {
    flex-direction: column;
  }

  .documentary-section__text {
    padding: 1.75rem;
  }

  .documentary-section__media {
    width: 100%;
    max-width: 100%;
    height: 260px;
  }
}
</style>
