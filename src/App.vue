<template>
    <div id="app">
        <the-table/>
    </div>
</template>

<script>

import TheTable from '@/components/TheTable';
import api      from '@/services/api';

export default {
    name: 'App',
    components: {TheTable},
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
