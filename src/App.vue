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

.button {
    background-color: white;
    border-color: gray;
    cursor: pointer;
    box-shadow: none;
    border-radius: 5px;
    padding: .5rem;
}

.button:hover {
    background-color: #c5e1f3;
    box-shadow: 1px 1px 1px;
}

input {
    padding: .5rem;
}

.border-danger {
    border-color: red;
}


.lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
}
.lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #fff;
    border-color: #fff transparent #fff #c5e1f3;
    animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}




@media screen and (max-width: 540px) {
    input {
        max-width: 150px;
    }
}
</style>
