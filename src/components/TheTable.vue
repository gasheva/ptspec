<template>
    <div class="table-wrapper">
        <notificator v-show="notificator.notificatorMessage!==''" :message="notificator.notificatorMessage"
                     class="table-notificator"/>
        <div v-if="persons">
            <add-person-form @post="postPerson"/>
            <table class="table">
                <tr class="table__row">
                    <th class="table__header">Имя</th>
                    <th class="table__header">Фамилия</th>
                </tr>
                <the-table-row v-for="person in persons" :key="person.uuid" :person="person"
                               @save="saveRow" @remove="removeRow"
                />
            </table>
        </div>
        <div v-else class="lds-dual-ring"></div>
    </div>
</template>

<script>
import AddPersonForm from '@/components/AddPersonForm';
import Notificator   from '@/components/Notificator';
import TheTableRow   from '@/components/TheTableRow';
import server        from '@/services/requests';
import {EventBus}    from '@/eventBus';

export default {
    name:       'TheTable',
    components: {Notificator, AddPersonForm, TheTableRow},
    data() {
        return {
            persons:     null,
            notificator: {
                notificatorMessage: '',
                level:              'error',
            },
        };
    },
    async created() {
        this.persons = await server.fetchPersons();
        EventBus.$on('showMessage', msg => {
            this.notificator.notificatorMessage = msg.message;
            this.notificator.level              = msg.level;
            setTimeout(() => {
                this.notificator.notificatorMessage = '';
                this.notificator.level              = '';
            }, 4 * 1000);
        });
    },
    methods: {
        saveRow(updatedPerson) {
            const indexToEdit = this.persons.findIndex(person => person.uuid === updatedPerson.uuid);
            if (indexToEdit !== -1)
                this.$set(this.persons, indexToEdit, updatedPerson);
        },
        removeRow(uuid) {
            const indexToRemove = this.persons.findIndex(person => person.uuid === uuid);
            if (indexToRemove !== -1) {
                this.persons.splice(indexToRemove, 1);
            }
        },
        postPerson(person) {
            this.persons.push(person);
        },
    },
};
</script>

<style scoped>
.table-notificator {
    margin-bottom: 1rem;
}

.table {
    margin: 1rem;
    border-collapse: collapse;
    text-align: left;
}

tr > td:last-of-type {
    border: none;
}

.table__header {

}

.table__header {
    border-bottom: 2px solid #c5e1f3;
}


@media screen and (max-width: 540px) {
    .table {
        margin: .5rem;
    }
}

</style>