<script setup>
defineProps({
    text: {
        type: String,
        required: true,
    },
})
</script>

<template>
    <footer class="footer documentary-footer">
        <p>{{ text }}</p>
    </footer>
</template>

<style scoped>
.documentary-footer {
    margin-top: 0;
}
</style>