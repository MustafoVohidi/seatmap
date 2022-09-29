<template>
    <div class="color-palette-content">
        <div class="color-palette-head">
            <ul>
                <li>
                    <button @click="openTabs(1)" :class="{'active':openTab==1}">Основная</button>
                </li>
                <li>
                    <button @click="openTabs(2)" :class="{'active':openTab==2}">Расширенная</button>
                </li>
            </ul>
        </div>
        <div class="color-palette-body">
            <div class="color-palette-body-base" v-if="openTab==1">
                <ul>
                    <li v-for="(color, index) in baseColor" :key="color" :class="{
                    //'active':activeColorBase==index
                    'active':thisColor.color==color
                    }">
                        <AppButtonColor :color="color" :index="index" @color="addFromBaseColor" />
                    </li>
                </ul>
            </div>
            <div class="color-palette-body-all" v-if="openTab==2">
                <ul>
                    <li v-for="(color, ind)  in allColors" :key="color" :class="{
                    // 'active':activeColorAll==ind
                    'active':thisColor.color==color
                    }">
                        <AppButtonColor :color="color" :index="ind" @color="addFromAllColor" />
                    </li>
                </ul>
            </div>

        </div>
        <div class="color-palette-footer">
            <div class="input-color">
                <span>Hex:</span>
                <input type="text" v-model="thisColor.color">
                <span v-if="error" class="warning">Выберите цвет или введите корректные данные</span>
            </div>
            <div class="buttin-group">
                <button @click="onSelect" class="choose">Выбрать</button>
                <button @click="onCencel" class="cencel">Отмена</button>
            </div>
        </div>
    </div>
</template>
<script>
import AppButtonColor from "@/components/core/AppButtonColor.vue"
export default {
    components: {
        AppButtonColor,
    },
    props: {
        error: Boolean,
        thisColor:Object,
    },
    data() {
        return {
            baseColor: [
                'FFCC66',
                'FF9900',
                'FFCC99',
                'FF6633',
                'FFCCCC',
                'CC9999',
                'FF6699',
                'FF99CC',
                'FF66CC',
                'FFCCFF',
                'CC99CC',
                'CC66FF',
                '9966CC',
                '9999CC',
                '3333FF',
                '6699FF',
                '0066FF',
                '66CCFF',
                '99CCCC',
                '66CC99',
                '33FF33',
                '66FF00',
                'CCCC66',
                'FFCC00',
                'FF9933',
                'FF9966',
                'CC3300',
                'FF9999',
                'CC6666',
                'FF3366',
                'FF3399',
                'FF00CC',
                'FF99FF',
                'CC66CC',
                'CC33FF',
                '9933CC',
                '9966FF',
                '9999FF',
                '6666FF',
                '3300FF',
                '3366FF',
                '0066CC',
                '3399FF',
                '33CCFF',
                '66CCCC',
                '66FFCC',
                '33CC99',
                '33FF99',
                '66FF66',
                '99CC99',
                '00FF33',
                '66FF33',
                'CCCC33',
                'FFCC33',
                'CC9966',
                'FF6600',
                'FF3300',
                'FF6666',
                'CC3333',
                'FF0066',
                'FF0099',
                'FF33CC',
                'FF66FF',
                'CC00CC',
                'CC00FF',
                '9933FF',
                '6600CC',
                '6633FF',
                '6666CC',
                '3300CC',
                '0000FF',
                '3366CC',
                '0099FF',
                '00CCFF',
                '339999',
                '33FFCC',
                '00CC99',
                '66CC66',
                '00FF00',
                '33FF00',
                '66CC00',
                '99CC66',
                '999966',
                'CC9900',
                'CC6600',
                'CC6633',
                'FF0000',
                'FF3333',
                '993333',
                'CC3366',
                'CC0066',
                'CC6699',
                'FF33FF',
                'CC33CC',
                '9900CC',
                '9900FF',
                '6633CC',
                '6600FF',
                '666699',
                '3333CC',
                '0000CC',
                '0033FF',
                '6699CC',
                '3399CC',
                '669999',
                '00FFCC',
                '339966',
                '33CC66',
                '00FF66',
                '669966',
                '00CC00',
                '99CC00',
                'CCCC99',
                '999933',
                'FFFF00',
                'CC9933',
                '996633',
                '993300',
                'CC0000',
                'FF0033',
                '990033',
                '996666',
                '993366',
                'CC0099',
                'FF00FF',
                '990099',
                '996699',
                '660099',
                '663399',
                '330099',
                '333399',
                '000099',
                '0033CC',
                '003399',
                '336699',
                '0099CC',
                '666666',
                '00FFFF',
                '33CCCC',
                '009966',
                '00CC66',
                '339933',
                '336633',
                '33CC33',
                '339900',
                '669933',
                '99CC33',
                '666633',
                '999900',
                'CCCC00',
                '996600',
                '663300',
                '660000',
                '990000',
                'CC0033',
                '330000',
                '663333',
                '660033',
                '990066',
                'CC3399',
                '993399',
                '660066',
                '663366',
                '330033',
                '330066',
                '333366',
                '000066',
                '000033',
                '003366',
                '006699',
                '003333',
                '336666',
                '00CCCC',
                '009999',
                '006633',
                '009933',
                '006600',
                '003300',
                '00CC33',
                '009900',
                '336600',
                '669900',
                '333300',
                '666600',
                'CC0C00',
                '5B0001',
                '009B0F',
                'FFBC21',
                '1C007A',
                'D10572',
                '59008E',
                '4A3826',
            ],
            allColors: [
                'FFCC66',
                'FF9900',
                'FFCC99',
                'FF6633',
                'FFCCCC',
                'CC9999',
                'FF6699',
                'FF99CC',
                'FF66CC',
                'FFCCFF',
                'CC99CC',
                'CC66FF',
                '9966CC',
                '9999CC',
                '3333FF',
                '6699FF',
                '0066FF',
                '66CCFF',
                '99CCCC',
                '66CC99',
                '33FF33',
                '66FF00',
                'CCCC66',
                'FFCC00',
                'FF9933',
                'FF9966',
                'CC3300',
                'FF9999',
                'CC6666',
                'FF3366',
                'FF3399',
                'FF00CC',
                'FF99FF',
                'CC66CC',
                'CC33FF',
                '9933CC',
                '9966FF',
                '9999FF',
                '6666FF',
                '3300FF',
                '3366FF',
                '0066CC',
                '3399FF',
                '33CCFF',
                '66CCCC',
                '66FFCC',
                '33CC99',
                '33FF99',
                '66FF66',
                '99CC99',
                '00FF33',
                '66FF33',
                'CCCC33',
                'FFCC33',
                'CC9966',
                'FF6600',
                'FF3300',
                'FF6666',
                'CC3333',
                'FF0066',
                'FF0099',
                'FF33CC',
                'FF66FF',
                'CC00CC',
                'CC00FF',
                '9933FF',
                '6600CC',
                '6633FF',
                '6666CC',
                '3300CC',
                '0000FF',
                '3366CC',
                '0099FF',
                '00CCFF',
                '339999',
                '33FFCC',
                '00CC99',
                '66CC66',
                '00FF00',
                '33FF00',
                '66CC00',
                '99CC66',
                '999966',
                'CC9900',
                'CC6600',
                'CC6633',
                'FF0000',
                'FF3333',
                '993333',
                'CC3366',
                'CC0066',
                'CC6699',
                'FF33FF',
                'CC33CC',
                '9900CC',
                '9900FF',
                '6633CC',
                '6600FF',
                '666699',
                '3333CC',
                '0000CC',
                '0033FF',
                '6699CC',
                '3399CC',
                '669999',
                '00FFCC',
                '339966',
                '33CC66',
                '00FF66',
                '669966',
                '00CC00',
                '99CC00',
                'CCCC99',
                '999933',
                'FFFF00',
                'CC9933',
                '996633',
                '993300',
                'CC0000',
                'FF0033',
                '990033',
                '996666',
                '993366',
                'CC0099',
                'FF00FF',
                '990099',
                '996699',
                '660099',
                '663399',
                '330099',
                '333399',
                '000099',
                '0033CC',
                '003399',
                '336699',
                '0099CC',
                '666666',
                '00FFFF',
                '33CCCC',
                '009966',
                '00CC66',
                '339933',
                '336633',
                '33CC33',
                '339900',
                '669933',
                '99CC33',
                '666633',
                '999900',
                'CCCC00',
                '996600',
                '663300',
                '660000',
                '990000',
                'CC0033',
                '330000',
                '663333',
                '660033',
                '990066',
                'CC3399',
                '993399',
                '660066',
                '663366',
                '330033',
                '330066',
                '333366',
                '000066',
                '000033',
                '003366',
                '006699',
                '003333',
                '336666',
                '00CCCC',
                '009999',
                '006633',
                '009933',
                '006600',
                '003300',
                '00CC33',
                '009900',
                '336600',
                '669900',
                '333300',
                '666600',
                'CC0C00',
                '5B0001',
                '009B0F',
                'FFBC21',
                '1C007A',
                'D10572',
                '59008E',
                '4A3826',
            ],
            openTab: 1,
            activeColorBase: -1,
            activeColorAll: -1,
            selectColor: '',
        }
    },
    methods: {
        addFromBaseColor(color, index) {
            this.thisColor.color = color;
            // this.selectColor = color;
            this.activeColorBase = index;
            // console.log(index)
        },
        addFromAllColor(color, index) {
            this.thisColor.color = color;
            // this.selectColor = color;
            this.activeColorAll = index;
            console.log(index)

        },
        onSelect() {
            let newColor={};
            newColor.id=this.thisColor.id;
            // newColor.color=this.selectColor
            newColor.color=this.thisColor.color
            this.$emit('choose', newColor)
        },
        onCencel() {
            this.$emit('cencel', false)
        },
        openTabs(tab) {
            this.openTab = tab;
        },

    },
    mounted() {
 
    },
}
</script>
<style lang="scss">
.color-palette-body {
    padding: 10px 3px;
    border-bottom: 1px solid;
    margin-bottom: 10px;
}

.color-palette-head {
    border-bottom: 1px solid;
    padding-bottom: 10px;

    ul {
        width: 100%;
        display: flex;
        align-items: center;

        li {
            margin-right: 5px;
        }
    }

    button {
        padding: 10px 15px;
        color: #000;
        background-color: #fff;
        border: 1px solid;

        &.active {
            transition: all 0.3s;
            border-color: #3300FF;
            color: #3300FF;
            box-shadow: 0px 0px 5px #3300ff6e;
        }
    }
}

.color-palette-body-base {
    ul {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 100%;
    }

    li {
        width: 50px;
        height: 50px;
        padding: 3px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;

        &.active {
            // transition: all 0.3s;
            border: 2px solid #141c38b8;
            background: #120c0cf2;
            box-shadow: 0px 0px 5px #4c559561;
        }
    }
}

.color-palette-body-all {
    ul {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        width: 100%;
    }

    li {
        width: 30px;
        height: 30px;
        padding: 3px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;

        &.active {
            // transition: all 0.3s;
            border: 2px solid #141c38b8;
            box-shadow: 0px 0px 5px #4c559561;
            background: #120c0cf2;
        }
    }
}

.color-palette-footer {
    display: flex;
    align-content: stretch;
    justify-content: space-between;

    button {
        padding: 10px 15px;
        margin-left: 5px;
    }

    .choose {
        background-color: #339900;
        color: #fff;
        border-color: #339900;
    }

    .cencel {
        background-color: #FF0033;
        color: #fff;
        border-color: #FF0033;
    }
}

.warning {
    color: #FF0033;
    margin-left: 10px;
}
</style>