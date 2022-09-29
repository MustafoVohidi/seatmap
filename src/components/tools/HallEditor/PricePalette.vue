<template>
    <div class="price-palette-content">
        <h3 class="title-content">
            цветовая палитра:
        </h3>
        <div class="button-group">
            <button @click="addPrices" class="add-price" title="Добавить цветовую палитру">Добавить</button>
            <button @click="removePrices" class="remove-price" title="Обнулить цены">Обнулить цены</button>
            <button @click="savePrices" title="Сохранить цены" class="save-price">Сохранить цены</button>
        </div>
        <div class="selling-price">
            <SellingPriceItem v-for="(item, index) in sellingPrice" :key="item.id" :index="index" :item="item"
                @remove="removeItem" @edit="editColor" />
        </div>
        <AppModal :isOpenModal="openModal" :size="'large'" @close="closeModal" :title="titleColorPalette">
            <ColorPalette @cencel="closeModal" @choose="chooseColor" :error="errorColor" :thisColor="color" />
        </AppModal>
    </div>
</template>
<script>
import AppModal from "@/components/core/AppModal.vue"
import ColorPalette from "@/components/core/userforms/ColorPalette.vue";
import SellingPriceItem from "@/components/core/userforms/SellingPriceItem.vue"
export default {
    components: {
        AppModal,
        ColorPalette,
        SellingPriceItem
    },
    data() {
        return {
            openModal: false,
            titleColorPalette: 'Выбор цвета цветовой зоны',
            errorColor: false,
            sellingPrice: [
                // { id: 1, price: 100, color: "FF66CC" },
                // { id: 2, price: 150, color: "339966" },
                // { id: 3, price: 103, color: "CC33CC" },
            ],
            color: {
                id: "-1",
                color: ""
            }
        }
    },
    methods: {
        addPrices() {
            this.color.id=-1;
            this.color.color=""
            this.openModal = true;
        },
        closeModal() {
            this.openModal = false
        },
        removePrices() {
            this.sellingPrice.forEach(element => {
                element.price = 0;
            });
        },
        savePrices() {
            console.log(this.sellingPrice)
        },
        chooseColor(newColor) {
            let parsed = parseInt(newColor.color, 16);
            if (parsed > 4294967295 || newColor.color == '' || isNaN(parsed)) {
                this.errorColor = true;
            }
            else {
                this.openModal = false
            }
            if (newColor.id >= 0) {
                this.sellingPrice[newColor.id].color = newColor.color
            } else {
                this.sellingPrice.push({
                    id: Date.now(),
                    price: 0,
                    color: newColor.color,
                })
            }
            console.log(newColor)
        },
        removeItem(index) {
            console.log(index)
            this.sellingPrice.splice(index, 1)
        },
        editColor(index, item) {
            this.color.id=index;
            this.color.color=item.color;
            this.openModal = true;
            console.log(index, item)
        }
    },
}
</script>
<style lang="scss" scoped>
.button-group {
    button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        box-sizing: border-box;
        margin-bottom: 10px;
        min-height: 30px;
        border: 1px solid;
    }

    .add-price {}

    .remove-price {}

    .save-price {}
}
</style>