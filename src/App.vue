<template>
    <div id="app">
        <the-table/>
    </div>
</template>

<script>

import TheTable from '@/components/TheTable';

export default {
    name:       'App',
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
}

body {
    box-sizing: border-box;
}
</style>
