<template>
    <div class="contacts block">
        <div class="contacts__info">
            <div class="contacts__tag">Наш адрес:</div>
            <div class="contacts__text">High St Easton PA 18042-1768, USA</div>
            <div class="contacts__tag">Email:</div>
            <div class="contacts__text">example@verbify.com</div>
            <div class="contacts__tag">Телефон:</div>
            <div class="contacts__text">+1-000-000-0000</div>
            <div class="contacts__tag">Время работы:</div>
            <div class="contacts__text">Пн‒Пт 9:00‒18:00</div>
        </div>
        <div class="contacts__description">
            <p>
                Наша команда всегда стремится к улучшению качества наших услуг и
                продуктов, поэтому мы очень ценим обратную связь и предложения
                наших клиентов и пользователей. Мы готовы выслушать любые
                комментарии, замечания, критику и пожелания, которые могут
                помочь нам стать лучше.
            </p>
            <p>
                Если у вас есть какие-то идеи, как мы можем улучшить нашу
                работу, пожалуйста, поделитесь ими с нами. Мы готовы рассмотреть
                любые предложения по улучшению качества нашего сервиса,
                функциональности нашего продукта или любых других аспектов нашей
                работы.
            </p>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
    .contacts {
        display: flex;
        flex-direction: column;
        padding: 52px 30px;

        &__info {
            display: grid;
            grid-template-columns: 116px 1fr;
            row-gap: 30px;
            border-bottom: 1px solid var(--c-shade);
            padding-bottom: 40px;
        }

        &__tag {
            font-size: 16px;
            font-weight: var(--fw-bold);
        }

        &__text {
            margin-left: 20px;
        }

        &__description {
            font-size: 16px;
            margin-top: 40px;
        }

        &__description p:not(:first-child) {
            margin-top: 15px;
        }
    }
</style>
