<script setup>
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import DocumentaryAudio from '../components/documentary/DocumentaryAudio.vue'
import DocumentaryFooter from '../components/documentary/DocumentaryFooter.vue'
import DocumentaryGallery from '../components/documentary/DocumentaryGallery.vue'
import DocumentaryHero from '../components/documentary/DocumentaryHero.vue'
import DocumentarySection from '../components/documentary/DocumentarySection.vue'
import { useScrollReveal } from '../composables/useScrollReveal'


const documentary = ref(null)
const loading = ref(true)
const error = ref('')

const sectionRefs = ref([])
const galleryRef = ref(null)

const visibility = reactive({
    sections: [],
    gallery: false,
    footer: false,
})

const fallbackVideo = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'
const fallbackAudio = 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3'

const setSectionRef = (index) => (element) => {
    if (element) {
        sectionRefs.value[index] = element
    }
}

const applyVisibility = () => {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight
    const revealPoint = viewportHeight * 0.8

    sectionRefs.value.forEach((element, index) => {
        if (!element) {
            return
        }

        const rect = element.getBoundingClientRect()
        visibility.sections[index] = rect.top < revealPoint && rect.bottom > 0
    })

    if (galleryRef.value) {
        const galleryRect = galleryRef.value.getBoundingClientRect()
        visibility.gallery = galleryRect.top < revealPoint && galleryRect.bottom > 0
    }

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
const gallery = computed(() => documentary.value?.gallery ?? [])
const hero = computed(() => documentary.value?.hero ?? {})
const title = computed(() => documentary.value?.title ?? 'Mini documental')
const subtitle = computed(() => documentary.value?.subtitle ?? '')
const footer = computed(() => documentary.value?.footer ?? {})
</script>

<template>
    <main class="documentary-page">
        <div v-if="loading" class="documentary-state">Cargando documental...</div>
        <div v-else-if="error" class="documentary-state documentary-state--error">{{ error }}</div>

        <template v-else-if="documentary">
            <DocumentaryHero :eyebrow="hero.eyebrow" :title="title" :subtitle="subtitle"
                :video-src="hero.videoSrc || fallbackVideo" :poster="hero.poster || ''" />

            <section v-for="(section, index) in sections" :key="section.id" :id="`section-${section.id}`"
                :ref="setSectionRef(index)"
                :class="['section', 'documentary-section', 'hidden', { show: visibility.sections[index] }]">
                <div class="section-content">
                    <DocumentarySection :index="section.id" :title="section.title" :image="section.img?.src"
                        :alt="section.img?.alt" :content="section.content" :highlight="section.highlight" />

                    <DocumentaryAudio :title="section.title"
                        :description="section.audio?.description || section.highlight"
                        :src="section.audio?.src || fallbackAudio" />
                </div>
            </section>

            <div ref="galleryRef" :class="['hidden', { show: visibility.gallery }]">
                <DocumentaryGallery :items="gallery" />
            </div>

            <div :class="['hidden', { show: visibility.footer }]">
                <DocumentaryFooter :text="footer.text || ''" :author="footer.author || ''"
                    :sources="footer.sources || []" />
            </div>
        </template>
    </main>
</template>

<style scoped>
.documentary-page {
    min-height: 100vh;
    background: var(--background-color);
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

.documentary-section {
    width: 100%;
}
</style>