<script setup>
import DocumentaryAudio from './DocumentaryAudio.vue'

defineProps({
  index: { type: Number, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  highlight: { type: String, default: '' },
  image: { type: String, default: '' },
  imageInfo: { type: Object, default: null },
  audio: { type: Object, default: null },
})
</script>

<template>
  <article class="documentary-section" :class="{ 'documentary-section--reverse': index % 2 === 0 }">
    <div class="documentary-section__text">
      <span class="section-index">0{{ index }}</span>
      <h2>{{ title }}</h2>
      <p>{{ content }}</p>
      <p v-if="highlight" class="highlight">{{ highlight }}</p>
      <DocumentaryAudio
        v-if="audio"
        :title="title"
        :description="audio.description || highlight"
        :src="audio.src"
      />
    </div>

    <div v-if="image" class="interactive-card documentary-section__media">
      <div class="card-inner">
        <!-- FRENTE: imagen -->
        <div class="card-face card-front">
          <img :src="image" :alt="title" />
        </div>

        <!-- REVERSO: info -->
        <div class="card-face card-back">
          <div v-if="imageInfo" class="card-back__content">
            <h4>{{ imageInfo.factTitle }}</h4>
            <p>{{ imageInfo.factText }}</p>
          </div>
        </div>
      </div>
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

.documentary-section--reverse {
  flex-direction: row-reverse;
}

/* ── Contenedor de la carta ── */
.documentary-section__media {
  width: 380px;
  max-width: 45%;
  flex-shrink: 0;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.interactive-card {
  perspective: 1200px;
  cursor: pointer;
}

/* ── Motor del flip ── */
.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.interactive-card:hover .card-inner {
  transform: rotateY(180deg);
}

/* ── Caras compartidas ── */
.card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 18px;
  overflow: hidden;
}

/* ── Frente ── */
.card-front img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s ease;
}

.interactive-card:hover .card-front img {
  transform: scale(1.05);
}

/* ── Reverso ── */
.card-back {
  transform: rotateY(180deg);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: rgba(20, 12, 8, 0.92);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(199, 154, 91, 0.3);
}

.card-back__content h4 {
  font-size: 1.3rem;
  color: var(--secondary-color, #c79a5b);
  margin-bottom: 0.75rem;
  line-height: 1.3;
}

.card-back__content p {
  font-size: 1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.88);
}

/* ── Responsive ── */
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
    height: 300px;
  }
}
</style>
