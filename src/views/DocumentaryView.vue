<script setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import DocumentaryFooter from '../components/documentary/layout/DocumentaryFooter.vue'
import DocumentaryHero from '../components/documentary/layout/DocumentaryHero.vue'
import DocumentarySection from '../components/documentary/content/DocumentarySection.vue'
import { useScrollReveal } from '../composables/useScrollReveal'
import DocumentaryNav from '../components/documentary/layout/DocumentaryNav.vue'
import CoffeeFarmExplorer from '../components/documentary/content/CoffeeFarmExplorer.vue'
import ImmersiveVideo from '../components/documentary/inmersive/ImmersiveVideo.vue'
import StatsCounter from '../components/documentary/inmersive/StatsCounter.vue'
import CoffeeFacts from '../components/documentary/content/CoffeeFacts.vue'

const documentary = ref(null)
const loading = ref(true)
const error = ref('')

const sectionRefs = ref([])
const activeSection = ref(1)

const visibility = reactive({
  sections: [],
  footer: false,
})

const setSectionRef = (index) => (element) => {
  if (element) {
    sectionRefs.value[index] = element
  }
}

const applyVisibility = () => {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight
  const revealPoint = viewportHeight * 0.8

  sectionRefs.value.forEach((element, index) => {
    if (!element) return

    const rect = element.getBoundingClientRect()
    const isVisible = rect.top < revealPoint && rect.bottom > 0

    visibility.sections[index] = isVisible

    if (isVisible) {
      activeSection.value = sections.value[index]?.id
    }
  })

  if (document.documentElement) {
    const scrollBottom = window.scrollY + viewportHeight
    const pageHeight = document.documentElement.scrollHeight
    visibility.footer = scrollBottom >= pageHeight - 180
  }
}

useScrollReveal(applyVisibility)

const loadDocumentary = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch('/data/documentary.json')

    if (!response.ok) {
      throw new Error(`No se pudo cargar el JSON (${response.status})`)
    }

    const data = await response.json()
    documentary.value = data

    visibility.sections = new Array(data.sections.length).fill(false)

    await nextTick()
    applyVisibility()
  } catch (fetchError) {
    error.value = fetchError instanceof Error ? fetchError.message : 'Error inesperado al cargar'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadDocumentary()
})

const sections = computed(() => documentary.value?.sections ?? [])
const hero = computed(() => documentary.value?.hero ?? {})
const title = computed(() => documentary.value?.title ?? 'Mini documental')
const subtitle = computed(() => documentary.value?.subtitle ?? '')
const footer = computed(() => documentary.value?.footer ?? {})
const facts = computed(() => documentary.value?.facts ?? [])
const stats = computed(() => documentary.value?.stats ?? [])
const immersiveVideo = computed(() => {
  const videos = documentary.value?.immersiveVideos

  if (!videos) return ''

  switch (activeSection.value) {
    case 1:
      return videos.cultivo

    case 2:
      return videos.tostadora

    case 3:
      return videos.taza

    case 4:
      return videos.plantacion

    case 5:
      return videos.chorreado

    case 6:
      return videos.paisaje

    default:
      return videos.granos
  }
})
</script>

<template>
  <main class="documentary-page">
    <div v-if="loading" class="documentary-state">Cargando documental...</div>

    <div v-else-if="error" class="documentary-state documentary-state--error">
      {{ error }}
    </div>

    <template v-else-if="documentary">
      <!-- VIDEO DE FONDO -->
      <ImmersiveVideo v-if="immersiveVideo" :src="immersiveVideo" />

      <!-- NAVEGACIÓN -->
      <DocumentaryNav :sections="sections" :active-section="activeSection" />

      <!-- HERO -->
      <DocumentaryHero
        :eyebrow="hero.eyebrow"
        :title="title"
        :subtitle="subtitle"
        :video-src="hero.videoSrc"
        :poster="hero.poster"
      />

      <!-- SECCIONES -->
      <section
        v-for="(section, index) in sections"
        :key="section.id"
        :id="`section-${section.id}`"
        :ref="setSectionRef(index)"
        :class="[
          'section',
          'documentary-section',
          'hidden',
          {
            show: visibility.sections[index],
          },
        ]"
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
            :audio="section.audio"
          />
        </div>

        <!-- Línea de tiempo después de la primera sección -->
        <CoffeeFarmExplorer
          v-if="index === 0"
          :image="documentary.farmExplorer.image"
          :hotspots="documentary.farmExplorer.hotspots"
        />

        <!-- Curiosidades junto a la sección 4 -->
        <CoffeeFacts v-if="index === 3" :facts="facts" />

        <!-- Estadísticas después de la tercera sección -->
        <StatsCounter v-if="index === 2" :stats="stats" />
      </section>

      <!-- FOOTER -->
      <div :class="['hidden', { show: visibility.footer }]">
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
}

.documentary-section {
  width: 100%;
}

.parallax {
  height: 80vh;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>
