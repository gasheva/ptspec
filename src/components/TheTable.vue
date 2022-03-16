<template>
    <div>
        <notificator v-show="notificator.notificatorMessage!==''" :message="notificator.notificatorMessage"
                     class="table__notificator"/>
        <add-person-form @post="postPerson"/>
        <table>
            <tr>
                <th>First Name</th>
                <th>Second Name</th>
            </tr>
            <the-table-row v-for="person in persons" :key="person.uuid" :person="person"
                           @save="saveRow" @remove="removeRow"
            />
        </table>
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
.table__notificator {
    margin-bottom: 1rem;
}

.add-panel {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-bottom: 1rem;
}

</style>