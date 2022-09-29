<template>
    <button @click="addColor" :style="{ background: '#'+color}">
    </button>
</template>
<script>
export default {
    props:{
        color:String,
        index:Number,
    },
    methods: {
        addColor(){
            this.$emit("color", this.color, this.index)
        }
    },
}
</script>
<style lang="scss" scoped>
    button{
        width: 100%;
        height: 100%;
    }
</style>