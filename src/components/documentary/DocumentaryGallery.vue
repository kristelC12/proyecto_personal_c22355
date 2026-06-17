<script setup>
defineProps({
    items: {
        type: Array,
        default: () => [],
    },
})
</script>

<template>
    <section class="gallery documentary-gallery">
        <h2>Galería fotográfica</h2>
        <TransitionGroup name="gallery-fade" tag="div" class="gallery-grid documentary-gallery__grid">
            <article v-for="item in items" :key="item.title" class="gallery-item documentary-gallery__item">
                <img :src="item.src" :alt="item.alt" loading="lazy" />
                <div class="gallery-caption">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.credit }}</p>
                    <p class="documentary-gallery__license">{{ item.license }}</p>
                </div>
            </article>
        </TransitionGroup>
    </section>
</template>

<style scoped>
.documentary-gallery__item h3 {
    font-size: 1.05rem;
    margin-bottom: 0.35rem;
}

.documentary-gallery__license {
    font-size: 0.9rem;
    color: #6a645d;
}

.gallery-fade-enter-active,
.gallery-fade-leave-active {
    transition: opacity 0.7s ease, transform 0.7s ease;
}

.gallery-fade-enter-from,
.gallery-fade-leave-to {
    opacity: 0;
    transform: translateY(24px);
}
</style>