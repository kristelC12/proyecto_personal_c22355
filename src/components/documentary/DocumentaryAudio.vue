<script setup>
defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    src: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <aside class="audio-container documentary-audio">
        <p class="documentary-audio__title">
            Escuchar: {{ title }}
        </p>
        <p class="documentary-audio__description">{{ description }}</p>
        <audio controls preload="none">
            <source :src="src" type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
        </audio>
    </aside>
</template>

<style scoped>
.documentary-audio {
    margin-top: 2rem;
    padding: 1.25rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.72);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.06);
}

.documentary-audio__title {
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.35rem;
}

.documentary-audio__description {
    margin-bottom: 1rem;
}

.documentary-audio audio {
    width: 100%;
}
</style>