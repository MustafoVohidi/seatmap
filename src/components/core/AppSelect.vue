<template>
    <select @change="onChange($event)">
        <option v-for="option in options" :key="option.value" :value="option.value">{{option.name}}</option>
    </select>
</template>
<script>
export default {
    props:{
        options:Array,
    },
    methods: {
        onChange(event) {
            this.$emit("select", event.target.value)
        }
    }
}
</script>
<style lang="">
    
</style>