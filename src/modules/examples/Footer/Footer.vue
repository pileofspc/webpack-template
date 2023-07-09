<template>
    <footer class="footer">
        <div class="_container">
            <div class="footer__inner">
                <nav class="footer__nav">
                    <a href="#" class="footer__link">Свяжитесь с нами</a>
                    <a href="#" class="footer__link">Telegram</a>
                </nav>
                <div>
                    Copyright © {{ new Date().getFullYear() }} - Онлайн тест на словарный запас Английского языка.
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
    .footer {
        padding-top: 30px;
        padding-bottom: 30px;

        background-color: var(--c-bright);
        border-top: 1px solid var(--c-shade);
        box-shadow: var(--block-shadow);

        &__nav {
            display: flex;
            gap: 10px;
        }

        &__link:hover {
            color: var(--c-accent);
        }
    }
</style>