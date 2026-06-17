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
    <article class="documentary-section">
        <div class="documentary-section__text">
            <h2>{{ title }}</h2>
            <p>{{ content }}</p>
            <p v-if="highlight" class="highlight">{{ highlight }}</p>
        </div>

        <img v-if="image" :src="image" :alt="title" class="documentary-section__image" />
    </article>
</template>


<style scoped>
.documentary-section {
    display: flex;
    gap: 2.5rem;
    align-items: flex-start;
}

.documentary-section__text {
    flex: 1;
}

.documentary-section__image {
    width: 380px;
    max-width: 45%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    flex-shrink: 0;
}

@media (max-width: 768px) {
    .documentary-section {
        flex-direction: column;
    }

    .documentary-section__image {
        width: 100%;
        max-width: 100%;
        height: 220px;
    }
}
</style>