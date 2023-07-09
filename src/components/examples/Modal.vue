<template>
    <Teleport to="body">
        <div class="modal" @mousedown.self="emit('close')">
            <slot></slot>
        </div>
    </Teleport>
</template>

<script setup>
    import { onMounted, onUnmounted } from "vue";

    const emit = defineEmits(["close"]);

    onMounted(() => {
        document.body.style.overflow = "hidden";
        document.querySelector(".app-wrapper").style.filter = "blur(4px)";
    });

    onUnmounted(() => {
        document.body.style.overflow = "";
        document.querySelector(".app-wrapper").style.filter = "";
    });
</script>

<style lang="scss" scoped>
    .modal {
        z-index: 5;
        background-color: var(--c-transparent);
        position: fixed;
        inset: 0;

        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
