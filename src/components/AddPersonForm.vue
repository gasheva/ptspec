<template>
    <div class="add-panel">
        <input type="text" v-model.trim="newPerson.firstName">
        <input type="text" v-model.trim="newPerson.secondName">
        <button @click="postPerson">Add</button>
    </div>
</template>

<script>
import server from '@/services/requests';

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
            const resp = await server.postPerson(this.newPerson);
            if (resp === undefined) {
                return;
            }
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