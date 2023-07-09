<template>
    <div class="map block">
        <iframe
            class="map__frame"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12091.88002868027!2d-75.25974218895618!3d40.740685481744364!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c469520dca5855%3A0x7da987c082a8f5c0!2zSGlnaCBTdCwgVGF0YW15LCBQQSAxODA4NSwg0KHQqNCQ!5e0!3m2!1sru!2sfr!4v1683978446495!5m2!1sru!2sfr"
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
        >
        </iframe>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
    .map {
        padding: 16px;
        margin-top: 20px;

        &__frame {
            min-height: 460px;
            width: 100%;
            border: none;
        }
    }
</style>
