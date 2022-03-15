<template>
    <div>
        <add-person-form @post="postPerson"/>
        <table>
            <tr>
                <th>First Name</th>
                <th>Second Name</th>
            </tr>
            <the-table-row v-for="person in persons" :key="person.id" :person="person"
                           @save="saveRow" @remove="removeRow"
            />
        </table>
    </div>
</template>

<script>
import AddPersonForm from '@/components/AddPersonForm';
import TheTableRow   from '@/components/TheTableRow';

export default {
    name:       'TheTable',
    components: {AddPersonForm, TheTableRow},
    data() {
        return {
            persons: null,
        };
    },
    async created() {
        this.persons = [{firstName: 'fds', secondName: '123124', id: '1'}, {
            firstName:  '2fds',
            secondName: '2.123124',
            id:         '2',
        }];
        // api.get()
    },
    methods: {
        saveRow(updatedPerson) {
            const indexToEdit = this.persons.findIndex(person => person.id === '1');
            updatedPerson.id  = '1';
            this.$set(this.persons, indexToEdit, updatedPerson);
        },
        removeRow(id) {
            const indexToRemove = this.persons.findIndex(person => person.id === id);
            this.persons.splice(indexToRemove, 1);
        },
        postPerson(person) {
            this.persons.push(person);
        },
    },
};
</script>

<style scoped>
.add-panel {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-bottom: 1rem;
}

</style>