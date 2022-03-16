<template>
    <tr>
        <td>
            <input type="text" v-model.trim="personDisplay.firstName" :class="{'read-only': !isEditing}">
        </td>
        <td>
            <input type="text" v-model.trim="personDisplay.secondName" :class="{'read-only': !isEditing}">
        </td>
        <td>
            <button @click="remove">Remove</button>
            <button @click="editOrSave">{{ isEditing ? 'Save' : 'Edit' }}</button>
            <button @click="cancel" v-show="isEditing">Cancel</button>
        </td>
    </tr>
</template>

<script>
import server from '@/services/requests';

export default {
    name:  'TheTableRow',
    props: {
        person: {
            type:     Object,
            required: true,
        },
    },
    watch: {
        person: {
            deep:      true,
            immediate: true,
            handler() {
                this.personDisplay = Object.assign({}, this.person);
            },
        },
    },
    data() {
        return {
            isEditing:     false,
            personDisplay: {},
        };
    },
    methods: {
        async editOrSave() {
            //  if edit
            if (!this.isEditing) {
                this.isEditing = true;
                return;
            }
            //  if save
            await this.save();
        },
        async save() {
            const hasChanges = (oldPerson, updatePerson) => {
                return oldPerson.firstName !== updatePerson.firstName || oldPerson.secondName !== updatePerson.secondName;
            };
            if (hasChanges(this.person, this.personDisplay)) {
                const resp = await server.updatePerson(this.personDisplay);
                resp && this.$emit('save', resp);
            }
            this.isEditing = false;
        },
        cancel() {
            this.personDisplay = Object.assign({}, this.person);
            this.isEditing     = false;
        },
        async remove() {
            const resp = await server.removePerson(this.personDisplay.uuid);
            resp && this.$emit('remove', this.personDisplay.uuid);
        },
    },
};
</script>

<style scoped>
.read-only {
    pointer-events: none;
}

</style>