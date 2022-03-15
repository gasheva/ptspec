<template>
    <tr>
        <td>
            <input type="text" v-model.trim="personDisplay.firstName" :class="{'read-only': !isEditing}">
        </td>
        <td>
            <input type="text" v-model.trim="personDisplay.secondName" :class="{'read-only': !isEditing}">
        </td>
        <td>
            <button @click="$emit('remove', personDisplay.id)">Remove</button>
            <button @click="editOrSave">{{ isEditing ? 'Save' : 'Edit' }}</button>
            <button @click="cancel" v-show="isEditing">Cancel</button>
        </td>
    </tr>
</template>

<script>
import api from '@/services/api';

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
        editOrSave() {
            //  if edit
            if (!this.isEditing) {
                this.isEditing = true;
                return;
            }
            //  if save
            this.save();
        },
        save() {
            this.isEditing = true;
            // const resp = api.put()
            const resp     = {
                uuid:       'wqe12312-qwaereqr-123qwqe-qweqwe',
                firstName:  'Ivan',
                secondName: 'Ivanovich',
            };
            this.isEditing = false;
            this.$emit('save', resp);
        },
        cancel() {
            this.personDisplay = Object.assign({}, this.person);
            this.isEditing     = false;
        },
    },
};
</script>

<style scoped>
.read-only {
    pointer-events: none;
}

</style>