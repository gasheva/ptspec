<template>
    <div class="add-panel">
        <input type="text" v-model.trim="newPerson.firstName">
        <input type="text" v-model.trim="newPerson.secondName">
        <button @click="postPerson">Add</button>
    </div>
</template>

<script>
import api from '@/services/api';

export default {
    name: 'AddPersonForm',
    data() {
        return {
            newPerson: {
                secondName: '',
                firstName:  '',

            },
        };
    },
    methods: {
        async postPerson() {
            // const resp = await api.post();
            const resp = {firstName: 'fds', secondName: '123124', id: Date.now().toString()};
            this.reset();
            this.$emit('post', resp);
        },
        reset() {
            this.newPerson.firstName  = '';
            this.newPerson.secondName = '';
        },
    },
};
</script>

<style scoped>

</style>