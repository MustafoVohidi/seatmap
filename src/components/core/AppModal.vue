<template>
    <div class="modal" v-if="isOpenModal" @click.stop="closeModal">
        <div  @click.stop class="modal-content"
        :class="
       {'modal-xl':size=='large',
       'modal-md':size=='medium',
       'modal-xs':size=='small',}
        ">
            <div class="modal-head">
                <h4>{{title}}</h4>
                <button @click.stop="closeModal">X</button>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: String,
        isOpenModal: Boolean,
        size:String,
    },
    data() {
        return {
            // isOpenModal:false,
        }
    },
    methods: {
        closeModal() {
            this.$emit("close", false)
        }
    },
}
</script>
<style lang="scss">
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0005;
    padding: 0 10%;
    box-sizing: border-box;
    z-index: 999;
}

.modal-content {
    padding: 10px;
    border-radius: 10px;
    background-color: #fff;
    min-width: 500px;
}
.modal-xl{
    width: 100%;
}
.modal-md{
    max-width: 920px;
}
.modal-xs{
    max-width: 520px;
}
.modal-head {
    display: flex;
    align-items:center;
    justify-content:space-between;
}
</style>