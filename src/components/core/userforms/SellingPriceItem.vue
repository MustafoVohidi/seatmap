<template>
    <div class="selling-item">
        <span class="id-selling">{{index+1}}.</span>
        <input type="text" v-model.number="item.price" />
        <span class="color" @click="installColor" :style="{background:'#'+item.color}"></span>
        <button @click="editColor">ред.</button>
        <button @click="removeItem">x</button>
    </div>
</template>
<script>
export default {
    props: {
        item: Object,
        index: Number,
    },
    methods: {
        editColor() {
            this.$emit('edit', this.index, this.item)
        },
        removeItem() {
            this.$emit('remove', this.index)
        },
        installColor() {
            console.log(this.index, this.item)
        }
    },
}
</script>
<style lang="scss" scoped>
.selling-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    box-sizing: border-box;

    button {
        padding: 5px 7px;
        box-sizing: border-box;
        min-height: 30px;
        border: 1px solid;
        margin-left: 3px;
    }

    input {
        max-width: 40%;
        min-height: 30px;
        box-sizing: border-box;
        padding: 0 5px;
    }
}

.color {
    min-width: 30px;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid;
    margin-left: 3px;
    display: block;
    cursor: pointer;
}

.id-selling {
    font-weight: 700;
}
</style>