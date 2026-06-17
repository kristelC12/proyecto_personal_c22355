<script setup>
defineProps({
    index: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    highlight: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    }
})
</script>

<template>
    <article>
        <img v-if="image" :src="image" :alt="title" class="documentary-section-image" />
        <h2>{{ title }}</h2>
        <p>{{ content }}</p>
        <p v-if="highlight" class="highlight">{{ highlight }}</p>
    </article>
</template>

<style scoped>
.documentary-section__kicker {
    text-transform: uppercase;
    letter-spacing: 0.12em;
    font-size: 0.8rem;
    color: var(--secondary-color);
    margin-bottom: 0.75rem;

    /**
     * width: 100%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 16px;
    margin-bottom: 2rem;
     */
}
</style>