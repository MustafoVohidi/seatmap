<template>
  <h3 class="title-content">Создать блок</h3>
  <div class="sector-r-c">
    <div class="row">
      <div class="col-12 mb-10">
        <div class="create-figure">
          <select name="figure" id="figure" class="select" v-model="figure">
            <option value="1">Круг</option>
            <option value="2">Кольцо</option>
            <option value="3">Прямоугольник</option>
            <option value="4">Трапеция</option>
            <option value="5">Треугольник</option>
            <option value="6">Полилиния</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="figure==1" class="row circle">
      <!-- <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во рядов:</label>
          <input type="number" min="0" v-model="qtyRows" />
        </div>
      </div> -->
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>№ ряда</label>
          <input type="number" min="0" v-model="rows" v-focus />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во мест:</label>
          <input type="number" min="0" v-model="qtySeats" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>№ места</label>
          <input type="number" min="0" v-model="seats" />
        </div>
      </div>
    </div>
    <div v-if="figure==2" class="row ring">
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во рядов:</label>
          <input type="number" min="0" v-model="qtyRows" v-focus />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>№ ряда</label>
          <input type="number" min="0" v-model="rows" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во мест (первого ряда):</label>
          <input type="number" min="0" v-model="qtySeatsFirstRow" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во мест (последнего ряда):</label>
          <input type="number" min="0" v-model="qtySeats" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>№ места</label>
          <input type="number" min="0" v-model="seats" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Угол среза</label>
          <input type="number" min="0" v-model="cuttingAngle" />
        </div>
      </div>
    </div>
    <div v-if="figure==3" class="row rectangle">
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во рядов:</label>
          <input type="number" min="0" v-model="qtyRows" v-focus />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>№ ряда</label>
          <input type="number" min="0" v-model="rows" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во мест:</label>
          <input type="number" min="0" v-model="qtySeats" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>№ места</label>
          <input type="number" min="0" v-model="seats" />
        </div>
      </div>
    </div>
    <div v-if="figure==4" class="row trapezoid">
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во рядов:</label>
          <input type="number" min="0" v-model="qtyRows" v-focus />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>№ ряда</label>
          <input type="number" min="0" v-model="rows" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во мест (первого ряда):</label>
          <input type="number" min="0" v-model="qtySeatsFirstRow" />
        </div>
      </div>

      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во мест (последнего ряда):</label>
          <input type="number" min="0" v-model="qtySeats" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>№ места</label>
          <input type="number" min="0" v-model="seats" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="button-group">
          <button class="btn button-sm" :class="{'active':kindOfFigures==1}" @click="kindOfFigures=1">Прямой</button>
          <button class="btn button-sm" :class="{'active':kindOfFigures==2}"
            @click="kindOfFigures=2">Равнобедренный</button>
        </div>
      </div>
    </div>
    <div v-if="figure==5" class="row triangle">
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во рядов:</label>
          <input type="number" min="0" v-model="qtyRows" v-focus />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>№ ряда</label>
          <input type="number" min="0" v-model="rows" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во мест:</label>
          <input type="number" min="0" v-model="qtySeats" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>№ места</label>
          <input type="number" min="0" v-model="seats" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="button-group">
          <button class="btn button-sm" :class="{'active':kindOfFigures==1}" @click="kindOfFigures=1">Прямой</button>
          <button class="btn button-sm" :class="{'active':kindOfFigures==2}"
            @click="kindOfFigures=2">Равнобедренный</button>
        </div>
      </div>
    </div>
    <div v-if="figure==6" class="row polyline">
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во рядов:</label>
          <input type="number" min="0" v-model="qtyRows" v-focus />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>№ ряда</label>
          <input type="number" min="0" v-model="rows" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>Кол-во мест:</label>
          <input type="number" min="0" v-model="qtySeats" />
        </div>
      </div>
      <div class="col-12 mb-10">
        <div class="input-group">
          <label>№ места</label>
          <input type="number" min="0" v-model="seats" />
        </div>
      </div>
    </div>

    <div class="row" v-if="figure==6">
      <div class="recently">
        <!-- <button type="button" @click="unequalRanks">Недавные ряды</button> -->
      </div>
    </div>

    <div class="row mb-10">
      <div class="col-10">
        <div class="input-group">
          <label for=""> Сектор </label>
          <AppSelect :options="sector" @select="chooseSector" />
        </div>

      </div>
      <div class="col-2">
        <button class="button-sm" type="button">+</button>
      </div>
    </div>
    <div class="row mb-10">
      <div class="col-10">
        <div class="input-group">
          <label for=""> Подъезд: </label>
          <select name="" id="" v-model="entrance">
            <option value="0">Подъезд-1</option>
            <option value="1">Подъезд-2</option>
            <option value="2">Подъезд-3</option>
          </select>
        </div>

      </div>
      <div class="col-2">
        <button class="button-sm" type="button">+</button>
      </div>

    </div>

    <div class="row mb-10">
      <div class="block-change">
        <div class="row mb-10">
          <div class="col-4">
            <div class="input-group">
              <label for=""> угол </label>
              <input type="number" v-model="rotate" min="-180" max="180" />
            </div>
          </div>
          <div class="col-8">
            <input type="range" min="-180" max="180" v-model="rotate" />
          </div>
        </div>
        <div class="row mb-10">
          <div class="col-4">
            <div class="input-group">
              <label for=""> Радиус </label>
              <input type="number" min="0" max="1000" v-model="radius" />
            </div>
          </div>
          <div class="col-8">
            <input type="range" min="0" max="1000" v-model="radius" />
          </div>
        </div>
        <div class="row mb-10">
          <div class="col-12">
            <div class="input-group">
              <label for=""> Положение объектов </label>
              <AppSelect :options="positionObjectArray" @select="choosePosition" />
            </div>
          </div>
          <div class="col-12">
            <button class="button-sm" @click="oPosition(1)" :class="{'active':isctivePosition==1}">
              <font-awesome-icon icon="fa-solid fa-align-left" />
            </button>
            <button class="button-sm" @click="oPosition(2)" :class="{'active':isctivePosition==2}">
              <font-awesome-icon icon="fa-solid fa-align-center" />
            </button>
            <button class="button-sm" @click="oPosition(3)" :class="{'active':isctivePosition==3}">
              <font-awesome-icon icon="fa-solid fa-align-right" />
            </button>
            <button class="button-sm" @click="oPosition(4)" :class="{'active':isctivePosition==4}">
              <font-awesome-icon icon="fa-solid fa-align-justify" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row mb-10">
      <div class="col-12">
        <div class="input-form-checkbox">
          <input type="checkbox" class="" id="groupped" v-model="groupped" />
          <label for="groupped">Сгруппировать</label>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 mb-10">
        <div class="create-block">
          <button type="button" @click="createBlock(newBlock())">Создать блок</button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import AppSelect from "@/components/core/AppSelect.vue";
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

export default {

  data() {
    return {
      sector: [
        { id: 1, name: "1 Ярус левая", value: "1" },
        { id: 2, name: "1 Ярус ложа №1", value: "2" },
        { id: 3, name: "1 Ярус ложа №10", value: "3" },
        { id: 4, name: "1 Ярус ложа №11", value: "4" },
      ],
      positionObjectArray: [
        { id: 1, name: "Свободно", value: "1" },
        { id: 2, name: "К центру окружности", value: "2" },
        { id: 3, name: "От центра окружности", value: "3" },
      ],
      rows: 0,
      qtyRows: 4,
      seats: 0,
      qtySeats: 10,
      sectorValue: 0,
      entranceValue: 0,
      entrance: 0,
      rotate: 0,
      radius: 0,
      positionObject: 0,
      isctivePosition: 1,
      groupped: false,
      figure: 4,
      kindOfFigures: 1,
      qtySeatsFirstRow: 4,
      cuttingAngle:0,
    }
  },
  components: {
    AppSelect,
  },
  methods: {
    ...mapMutations({
      // onchangeText:'canvas/onchangeText',
      createPlace: 'canvas/createPlace',
      createBlock: 'canvas/createBlock',
      deleteBlock: 'canvas/deleteBlock',
      groupedBlock: 'canvas/groupedBlock',
      ChangeBlock: 'ChangeBlock'
    }),
    oPosition(number) {
      this.isctivePosition = number
    },
    newBlock() {
      let block = {}
      block.row = this.rows
      block.qtyRow = this.qtyRows
      block.seat = this.seats
      block.qtySeats = this.qtySeats
      block.sectorValue = this.sectorValue
      block.entranceValue = this.entranceValue
      block.entrance = this.entrance
      block.rotate = this.rotate
      block.radius = this.radius
      block.positionObject = this.positionObject
      block.position = this.isctivePosition
      block.groupped = this.groupped
      block.qtySeats = this.qtySeats
      block.figure = Number(this.figure)
      block.kindOfFigures = this.kindOfFigures
      block.qtySeatsFirstRow = this.qtySeatsFirstRow
      block.cuttingAngle=this.cuttingAngle
      this.rows = 0
      this.qtyRows = 0
      this.seats = 0
      this.qtySeats = 0
      this.sectorValue = 0
      this.entranceValue = 0
      this.entrance = 0
      this.rotate = 0
      this.radius = 0
      this.positionObject = 0
      this.isctivePosition = 1
      this.groupped = false
      this.qtySeats = 0
      this.figure = 4
      this.kindOfFigures = 1
      this.qtySeatsFirstRow = 0;
      this.cuttingAngle=0
      console.log(block)
      return block;
    },
    unequalRanks() {

    },
    chooseSector(sector) {
      console.log(sector)
    },
    choosePosition(position) {
      console.log(position)
    },
    createSeatCanvas() {

    },
    createSectorCanvas() {

    },
    ...mapActions({

    }),
  },
  computed: {
    ...mapGetters({

    }),
    ...mapState({
      // changeText: state => state.canvas.changeText,
    })
  }
}
</script>
<style lang="scss">

</style>