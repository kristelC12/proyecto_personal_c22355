<script setup>
defineProps({
    eyebrow: {
        type: String,
        default: '',
    },
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
        default: '',
    },
    videoSrc: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
        default: '',
    },
})
</script>

<template>
    <section class="hero documentary-hero">
        <video class="documentary-hero__video" :poster="poster" autoplay muted loop playsinline>
            <source :src="videoSrc" type="video/mp4" />
        </video>

        <div class="hero-overlay documentary-hero__overlay">
            <p v-if="eyebrow" class="documentary-hero__eyebrow">{{ eyebrow }}</p>
            <h1>{{ title }}</h1>
            <p>{{ subtitle }}</p>
        </div>
    </section>
</template>

<style scoped>
.documentary-hero {
    position: relative;
    min-height: 100vh;
}

.documentary-hero__video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.documentary-hero__overlay {
    background: linear-gradient(180deg, rgba(20, 12, 6, 0.35), rgba(20, 12, 6, 0.7));
}

.documentary-hero__eyebrow {
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-size: 0.8rem;
    margin-bottom: 1rem;
    color: var(--secondary-color);
}
</style>