<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
import DocumentaryFooter from '../components/documentary/layout/DocumentaryFooter.vue'
import DocumentaryHero from '../components/documentary/layout/DocumentaryHero.vue'
import DocumentarySection from '../components/documentary/content/DocumentarySection.vue'
import DocumentaryNav from '../components/documentary/layout/DocumentaryNav.vue'
import CoffeeFarmExplorer from '../components/documentary/content/CoffeeFarmExplorer.vue'
import ImmersiveVideo from '../components/documentary/inmersive/ImmersiveVideo.vue'
import StatsCounter from '../components/documentary/inmersive/StatsCounter.vue'
import CoffeeFacts from '../components/documentary/content/CoffeeFacts.vue'
import { useScrollReveal } from '../composables/useScrollReveal'

const VIDEO_MAP = {
  1: 'cultivo',
  2: 'tostadora',
  3: 'taza',
  4: 'plantacion',
  5: 'chorreado',
  6: 'paisaje',
}

const documentary = ref(null)
const loading = ref(true)
const error = ref('')
const activeSection = ref(1)
const sectionRefs = ref([])
const sectionVisibility = ref([])
const footerVisible = ref(false)

const setSectionRef = (index) => (el) => {
  if (el) sectionRefs.value[index] = el
}

const applyVisibility = () => {
  const vh = window.innerHeight || document.documentElement.clientHeight
  const revealPoint = vh * 0.8

  sectionRefs.value.forEach((el, index) => {
    if (!el) return
    const { top, bottom } = el.getBoundingClientRect()
    const isVisible = top < revealPoint && bottom > 0
    sectionVisibility.value[index] = isVisible
    if (isVisible) activeSection.value = sections.value[index]?.id
  })

  footerVisible.value = window.scrollY + vh >= document.documentElement.scrollHeight - 180
}

useScrollReveal(applyVisibility)

const loadDocumentary = async () => {
  loading.value = true
  error.value = ''
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/documentary.json`)
    if (!response.ok) throw new Error(`No se pudo cargar el JSON (${response.status})`)
    const data = await response.json()
    documentary.value = data
    sectionVisibility.value = new Array(data.sections.length).fill(false)
    await nextTick()
    applyVisibility()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Error inesperado al cargar'
  } finally {
    loading.value = false
  }
}

onMounted(loadDocumentary)

const sections = computed(() => documentary.value?.sections ?? [])
const hero = computed(() => documentary.value?.hero ?? {})
const title = computed(() => documentary.value?.title ?? 'Mini documental')
const subtitle = computed(() => documentary.value?.subtitle ?? '')
const footer = computed(() => documentary.value?.footer ?? {})
const facts = computed(() => documentary.value?.facts ?? [])
const stats = computed(() => documentary.value?.stats ?? [])
const farmExplorer = computed(() => documentary.value?.farmExplorer ?? {})

const immersiveVideo = computed(() => {
  const videos = documentary.value?.immersiveVideos
  if (!videos) return ''
  const key = VIDEO_MAP[activeSection.value] ?? 'granos'
  return videos[key] ?? ''
})
</script>

<template>
  <main class="documentary-page">
    <div v-if="loading" class="documentary-state">Cargando documental...</div>

    <div v-else-if="error" class="documentary-state documentary-state--error">
      {{ error }}
    </div>

    <template v-else-if="documentary">
      <ImmersiveVideo v-if="immersiveVideo" :src="immersiveVideo" />

      <DocumentaryNav :sections="sections" :active-section="activeSection" />

      <DocumentaryHero
        :eyebrow="hero.eyebrow"
        :title="title"
        :subtitle="subtitle"
        :video-src="hero.videoSrc"
        :poster="hero.poster"
      />

      <section
        v-for="(section, index) in sections"
        :key="section.id"
        :id="`section-${section.id}`"
        :ref="setSectionRef(index)"
        class="section documentary-section hidden"
        :class="{ show: sectionVisibility[index] }"
      >
        <div class="section-content">
          <DocumentarySection
            :index="section.id"
            :title="section.title"
            :image="section.img?.src"
            :alt="section.img?.alt"
            :content="section.content"
            :highlight="section.highlight"
            :image-info="section.img"
          />
        </div>

        <CoffeeFarmExplorer
          v-if="index === 0"
          :image="farmExplorer.image"
          :hotspots="farmExplorer.hotspots"
        />

        <CoffeeFacts v-if="index === 3" :facts="facts" />

        <StatsCounter v-if="index === 2" :stats="stats" />
      </section>

      <div class="hidden" :class="{ show: footerVisible }">
        <DocumentaryFooter
          :text="footer.text || ''"
          :author="footer.author || ''"
          :sources="footer.sources || []"
        />
      </div>
    </template>
  </main>
</template>

<style scoped>
.documentary-page {
  min-height: 100vh;
  background: transparent;
  position: relative;
  z-index: 1;
}

.documentary-state {
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-size: 1.1rem;
  color: var(--primary-color);
}

.documentary-state--error {
  color: #8c2f2f;
}

.section {
  padding: 5rem 1.5rem;
}

.section-content {
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

.documentary-section {
  width: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .section {
    padding: 3rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .section {
    padding: 2rem 0.75rem;
    gap: 1.5rem;
  }

  .documentary-state {
    font-size: 1rem;
    padding: 1rem;
    text-align: center;
  }
}
</style>
