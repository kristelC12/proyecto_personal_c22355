<script setup>
defineProps({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    sources: {
        type: Array,
        required: true,
    }
})
</script>

<template>
    <footer class="footer documentary-footer">
        <p>{{ text }}</p>
        <p>Autor: {{ author }}</p>
        <p>Fuentes: {{ sources.join(', ') }}</p>
    </footer>
</template>

<style scoped>
.documentary-footer {
    margin-top: 0;
}
</style>