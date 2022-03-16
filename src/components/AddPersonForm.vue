<template>
    <div class="add-panel">
        <input type="text" :class="{'border-danger':isFirstNameEmpty}" v-model.trim="newPerson.firstName"
               placeholder="Имя">
        <input type="text" :class="{'border-danger':isSecondNameEmpty}" v-model.trim="newPerson.secondName"
               placeholder="Фамилия">
        <button class="button" @click="postPerson">Add</button>
    </div>
</template>

<script>
import server from '@/services/requests';

export default {
    name: 'AddPersonForm',
    data() {
        return {
            newPerson:         {
                secondName: '',
                firstName:  '',

            },
            isFirstNameEmpty:  false,
            isSecondNameEmpty: false,
        };
    },
    watch:   {
        newPerson: {
            deep: true,
            handler() {
                this.isFirstNameEmpty  = false;
                this.isSecondNameEmpty = false;
            },
        },
    },
    methods: {
        async postPerson() {
            if (this.newPerson.firstName === '' || this.newPerson.secondName === '') {
                this.isFirstNameEmpty  = this.newPerson.firstName === '';
                this.isSecondNameEmpty = this.newPerson.secondName === '';
                return;
            }
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
.add-panel {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 1rem;
}

@media screen and (max-width: 540px) {
    .add-panel {
        padding: .5rem;
    }
}
</style>