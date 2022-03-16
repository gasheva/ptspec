<template>
    <div class="notificator" :class="type">
        <span>{{ message }}</span>
    </div>
</template>

<script>
import {LEVELS} from '@/constants/levels';

export default {
    name:  'Notificator',
    props: {
        type:    {
            type:    String,
            default: () => 'error',
            validator(value) {
                return Object.values(LEVELS).indexOf(value) !== -1;
            },
        },
        message: {
            type:    String,
            default: () => '',
        },
    },
};
</script>

<style scoped>
.notificator {
    color: white;
    font-weight: bold;
    text-align-last: left;
    padding: 0.5rem 0.5rem 0.5rem 1rem;
}

.error {
    background-color: red;
}

.info {
    background-color: blue;
}

.success {
    background-color: green;
}
</style>