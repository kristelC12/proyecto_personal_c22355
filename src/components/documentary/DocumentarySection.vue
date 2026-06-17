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
})
</script>

<template>
    <article>
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
}
</style>