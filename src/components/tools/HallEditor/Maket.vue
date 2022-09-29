<template>
  <div class="maket-tools">
    <div class="tools-element">
      <div class="m-tool-item">
        <button
          type="button"
          title="Копировать"
          @click="copyBtn"
          :class="{ active: isActive ==21 }"
        >
          <font-awesome-icon icon="fa-solid fa-arrow-pointer" />
          <span>Выбрать</span>
        </button>
        
      </div>
      <div class="m-tool-item">
        <button
          type="button"
          title="Копировать"
          @click="copyBtn"
          :class="{ active: isActive == 22 }"
        >
         <font-awesome-icon icon="fa-solid fa-hand" />
           <span>Перетаскивать</span>
        </button>
      </div>
      <div class="m-tool-item">
        <button
          type="button"
          title="Копировать"
          @click="copyBtn"
          :class="{ active: isActive == 23 }"
        >
          <font-awesome-icon icon="fa-regular fa-square" />
           <span>Форма места проведения</span>
        </button>
      </div>
      <div class="m-tool-item">
        <button
          type="button"
          title="Копировать"
          @click="copyBtn"
          :class="{ active: isActive == 24 }"
        >
          <font-awesome-icon icon="fa-solid fa-braille" />
           <span>Ряды сидения</span>
        </button>
      </div>

      <!--
      <div class="m-tool-item">
        <button
          type="button"
          title="Назад"
          @click="prevState"
          :class="{ active: isActive == 2 }"
        >
          <font-awesome-icon class="icon" icon="fa-solid fa-rotate-left" />
        </button>
        <button
          type="button"
          title="Вперед"
          @click="nextState"
          :class="{ active: isActive == 3 }"
        >
          <font-awesome-icon class="icon" icon="fa-solid fa-rotate-right" />
        </button>
        <button
          type="button"
          title="Вырезать"
          @click="scissor"
          :class="{ active: isActive == 4 }"
        >
          <font-awesome-icon class="icon" icon="fa-solid fa-scissors" />
        </button>
        <button
          type="button"
          title="Вставить"
          @click="paste"
          :class="{ active: isActive == 5 }"
        >
          <font-awesome-icon class="icon" icon="fa-solid fa-paste" />
        </button>
      </div>
      <div class="m-tool-item">
        <button
          type="button"
          title="Выделить объект"
          @click="selectObject"
          :class="{ active: isActive == 6 }"
        >
          <font-awesome-icon class="icon" icon="fa-solid fa-arrow-pointer" />
        </button>
      </div>
      <div class="m-tool-item">
        <button type="button" title="Свободное вращение">
          <font-awesome-icon
            class="icon"
            icon="fa-solid fa-clock-rotate-left"
          />
        </button>
      </div>
      <div class="m-tool-item">
        <button type="button" title="Выделить все">
          <font-awesome-icon class="icon" icon="fa-solid fa-object-ungroup" />
        </button>
      </div>
      <div class="m-tool-item">
        <button type="button" title="Добавить текст">Добавить текст</button>
      </div>
      <div class="m-tool-item">
        <button type="button" title="Параметры объекта">
          Параметры объекта
        </button>
      </div>
      <div class="m-tool-item">
        <select name="figure" id="figure">
          <option value="1">
            <img src="/" alt="Прямоугольник" />
            Прямоугольник
          </option>
          <option value="1">
            <img src="/" alt="Эллипс" />
            Эллипс
          </option>
          <option value="1">
            <img src="/" alt="Полигон" />
            Полигон
          </option>
          <option value="1">
            <img src="/" alt="Замкнутая полилиния" />
            Замкнутая полилиния
          </option>
        </select>
      </div>
      <div class="m-tool-item">
        <select name="line" id="line">
          <option value="1">
            <img
              src="https://www.meysonjewellery.com/wp-content/uploads/2021/12/6939397_preview.jpg"
              alt="Линия"
            />
            Линия
          </option>
          <option value="1">
            <img src="/" alt="Полилиния" />
            Полилиния
          </option>
          <option value="1">
            <img src="/" alt="Дуга" />
            Дуга
          </option>
          <option value="1">
            <img src="/" alt="Кривая" />
            Кривая
          </option>
        </select>
      </div>
      <div class="m-tool-item">
        <button type="button" title="Копировать">Удалить</button>
      </div>
      -->
    </div>
  </div>
</template>
<script>
import { faChessQueen } from "@fortawesome/free-solid-svg-icons";
export default {
  data() {
    return {
      isActive: 1,
    };
  },
  methods: {
    copyBtn() {
      this.isActive = 1;
    },
    prevState() {
      this.isActive = 2;
    },
    nextState() {
      this.isActive = 3;
    },
    scissor() {
      this.isActive = 4;
    },
    paste() {
      this.isActive = 5;
    },
    selectObject() {
      this.isActive = 6;
    },
  },
  computed: {},
};
</script>
<style lang="scss">
.tools-element {
  display: flex;
  align-items: flex-start;

  .m-tool-item {
    margin: 0 5px;

    button {
      color: #fff;
      border: 1px;
      padding: 5px 10px;
      box-sizing: border-box;
      &.active {
        background: #1c74bd;
        border-color: #1c74bd;
        transform: all 0.3s;
      }
      .icon {
        font-size: 2rem;
      }
      span{
        font-size:12px;
        display:block;
      }
    }
  }
}
</style>
