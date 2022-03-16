<template>
    <tr class="table__row">
        <td class="table__column">
            <input type="text" v-model.trim="personDisplay.firstName"
                   :class="{'read-only': !isEditing, 'border-danger':isFirstNameEmpty}">
        </td>
        <td class="table__column">
            <input type="text" v-model.trim="personDisplay.secondName"
                   :class="{'read-only': !isEditing, 'border-danger':isSecondNameEmpty}">
        </td>
        <td class="table__column table__column--buttons table__column--no-border">
            <button class="button" v-show="!isEditing" @click="remove">Remove</button>
            <button class="button" @click="cancel" v-show="isEditing">Cancel</button>
            <button class="button" @click="editOrSave">{{ isEditing ? 'Save' : 'Edit' }}</button>
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
    data() {
        return {
            isEditing:         false,
            personDisplay:     {},
            isFirstNameEmpty:  false,
            isSecondNameEmpty: false,
        };
    },
    watch:   {
        person: {
            deep:      true,
            immediate: true,
            handler() {
                this.personDisplay = Object.assign({}, this.person);
                this.resetInputBorder();
            },
        },
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
            const isEmpty    = () => {
                if (this.personDisplay.firstName === '' || this.personDisplay.secondName === '') {
                    this.isFirstNameEmpty  = this.personDisplay.firstName === '';
                    this.isSecondNameEmpty = this.personDisplay.secondName === '';
                    return true;
                }
                return false;
            };
            const hasChanges = (oldPerson, updatePerson) => {
                return oldPerson.firstName !== updatePerson.firstName || oldPerson.secondName !== updatePerson.secondName;
            };
            if (isEmpty()) return;
            if (hasChanges(this.person, this.personDisplay)) {
                const resp = await server.updatePerson(this.personDisplay);
                resp && this.$emit('save', resp);
            }
            this.isEditing = false;
        },
        cancel() {
            this.personDisplay = Object.assign({}, this.person);
            this.resetInputBorder();
            this.isEditing = false;
        },
        async remove() {
            const resp = await server.removePerson(this.personDisplay.uuid);
            resp && this.$emit('remove', this.personDisplay.uuid);
        },
        resetInputBorder() {
            this.isFirstNameEmpty  = false;
            this.isSecondNameEmpty = false;
        },
    },
};
</script>

<style scoped>
.read-only {
    pointer-events: none;
}

.table__column {
    padding: 1rem 1rem 1rem 0;
    border-bottom: 2px solid #c5e1f3;
}

.table__column--no-border {
    display: flex;
    gap: 0.25rem;
}

tr > td:last-child {
    border: none;
}

@media screen and (max-width: 540px) {
    .table__column {
        max-width: 150px;
    }

    .table__column--buttons {
        flex-direction: column;
    }
}
</style>