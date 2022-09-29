<template>
  <div class="hall-editor" ref="hallEdit">
    <div class="menu-panel">
      <ul>
        <li>
          <a href="#"> Файл </a>
        </li>
        <li>
          <a href="#"> Правка </a>
        </li>
        <li>
          <a href="#"> Инструменты </a>
        </li>
        <li>
          <a href="#"> Вид </a>
        </li>
        <li>
          <a href="#"> Помощь </a>
        </li>
      </ul>
    </div>

    <div class="tools-panel">
      <div class="tools-panel-head">
        <ul>
          <li>
            <button @click="openTabTools(1)" :class="openTabTool==1?'active':''"> Макет </button>
          </li>
          <li>
            <button @click="openTabTools(2)" :class="openTabTool==2?'active':''"> Инструменты </button>
          </li>
          <li>
            <button @click="openTabTools(3)" :class="openTabTool==3?'active':''"> Параметры </button>
          </li>
          <li>
            <button @click="openTabTools(4)" :class="openTabTool==4?'active':''"> Отрисовка кресел </button>
          </li>
        </ul>
      </div>
      <div class="tools-panel-body">
        <div class="tools-panel-body-content maket" v-if="openTabTool==1">
          <Maket />
        </div>
        <div class="tools-panel-body-content tools" v-if="openTabTool==2">
          <ToolsEditor />
        </div>
        <div class="tools-panel-body-content parametrs" v-if="openTabTool==3">
          <ParametresEdit />
        </div>
        <div class="tools-panel-body-content kresel" v-if="openTabTool==4">
          <DrawingChairs />
        </div>
      </div>
    </div>

    <div class="content-editor">
      <div class="left-content">
        <div class="tabs-menu-head transform-deg">
          <ul>
            <li>
              <span @click="openTabs(1)" :class="openTab==1?'active':''"> Блоки </span>
            </li>
            <li>
              <span @click="openTabs(2)" :class="openTab==2?'active':''"> Места/сектора </span>
            </li>
            <li>
              <span @click="openTabs(3)" :class="openTab==3?'active':''"> Ценоваяч палитра </span>
            </li>
            <li>
              <span @click="openTabs(4)" :class="openTab==4?'active':''"> Метки </span>
            </li>
            <li>
              <span @click="openTabs(5)" :class="openTab==5?'active':''"> Сегменты </span>
            </li>
            <li>
              <span @click="openTabs(6)" :class="openTab==6?'active':''"> Свойства </span>
            </li>
          </ul>
        </div>
        <div class="tabs-menu-body">
          <div class="tabs-item-content" v-if="openTab==1">
            <Blocks :colsQuantity="colsQuantity" :colsNumber="colsNumber" :placeQuantity="placeQuantity"
              :placeNumber="placeNumber" :sectorValue="sectorValue" :entranceValue="entranceValue" :rotate="rotate"
              :radius="radius" :positionObject="positionObject" />
          </div>
          <div class="tabs-item-content place-sectors" v-if="openTab==2">
            <PlaceSectors />
          </div>
          <div class="tabs-item-content price-palette" v-if="openTab==3">
            <PricePalette />
          </div>
          <div class="tabs-item-content tags" v-if="openTab==4">
            <Tags></Tags>
          </div>
          <div class="tabs-item-content segments" v-if="openTab==5">
            <Segments></Segments>
          </div>
          <div class="tabs-item-content properties" v-if="openTab==6">
            <Properties></Properties>
          </div>
        </div>
      </div>


      <div class="right-content" ref="rightContent">
        <CanvasEditor />
        <!-- <canvas ref="editorHall" class="canvas-editor" :width="WIDTH" :height="HEIGHT"></canvas> -->
      </div>
    </div>
  </div>
</template>

<script>
import Blocks from "@/components/tools/HallEditor/Blocks.vue"
import Properties from "@/components/tools/HallEditor/Properties.vue"
import Segments from "@/components/tools/HallEditor/Segments.vue"
import Tags from "@/components/tools/HallEditor/Tags.vue"
import PricePalette from "@/components/tools/HallEditor/PricePalette.vue"
import PlaceSectors from "@/components/tools/HallEditor/PlaceSectors.vue"
import CanvasEditor from "@/components/tools/HallEditor/CanvasEditor.vue"
import Maket from "@/components/tools/HallEditor/Maket.vue"
import ToolsEditor from "@/components/tools/HallEditor/ToolsEditor.vue"
import ParametresEdit from "@/components/tools/HallEditor/ParametresEdit.vue"
import DrawingChairs from "@/components/tools/HallEditor/DrawingChairs.vue"

import HallCanvas from "@/components/tools/HallEditor/HallCanvas.vue"
import useGrid from "@/hooks/useGrid"
export default {
  components: {
    Blocks,
    Properties,
    Segments,
    Tags,
    PricePalette,
    PlaceSectors,
    CanvasEditor,
    Maket,
    ToolsEditor,
    ParametresEdit,
    DrawingChairs,
    HallCanvas,
  },
  data() {
    return {
      WIDTH: 1500,
      HEIGHT: 500,
      colsQuantity: 1,
      colsNumber: 1,
      placeQuantity: 1,
      placeNumber: 1,
      sectorValue: 0,
      entranceValue: 0,
      rotate: 0,
      radius: 0,
      positionObject: 0,
      openTabTool: 1,
      openTab: 1,
    };
  },
  setup(props) {
    // useGrid(this.ctx,this.WIDTH, this.HEIGHT)
    // return useGrid(ctx,WIDTH, HEIGHT)
  },
  computed: {
    clWidth() {
      console.log(his.$refs.rightContent.clientWidth)
      return this.$refs.rightContent.clientWidth;
    },
    clHeight() {
      return this.$refs.rightContent.clientHeight
    },
  },
  watch: {
    WIDTH() {
      this.WIDTH = this.$refs.rightContent.clientHeight
      console.log("0")
    }
  },
  methods: {
    openTabTools(tabNumber) {
      this.openTabTool = tabNumber
      console.log(tabNumber)
    },
    openTabs(tabNumber) {
      this.openTab = tabNumber
      console.log(tabNumber, this.openTab)
    },
  },
};
</script>

<style lang="scss" scoped>
.hall-editor {
  width: 100%;
  min-height: 100vh;
}

.menu-panel {
  width: 100%;
  background: #2d2c2d;
  border-bottom: 1px solid;

  ul {
    display: flex;
    align-items: center;

    li {
      padding: 2px 5px;
      color: #fff;

      a {
        color: #fff;
      }
    }
  }
}

.tools-panel {
  background: #2d2c2d;
  color: #fff;

  .tools-panel-head {
    ul {
      display: flex;
    }

    li {
      button {
        padding: 2px 5px;
        border: 1px solid;
        background: transparent;
        color: #fff;
        border-color: transparent;
        padding: 15px 5px;

        &.active {
          transition: all 0.3s;
          background: #1c74bd;
        }
      }

    }
  }
}

.content-editor {
  display: flex;
  align-items: stretch;

  .left-content {
    position: relative;
    min-width: 300px;
    height: 100%;
    display: flex;
    align-items: stretch;
    width: 300px;
    min-height: 100vh;

    .tabs-item-content {
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
    }

    .tabs-menu-body {
      box-sizing: border-box;
      width: calc(100% - 30px);
      background: #fff;
      border-bottom: 1px solid;
    }

    .tabs-menu-head {
      background: #fff;
      box-sizing: border-box;
      border-right: 1px solid;
      border-bottom: 1px solid;
      width: 30px;

      li {
        span {
          writing-mode: vertical-rl;
          transform: scale(-1, -1);
          white-space: nowrap;
          padding: 10px 5px;
          cursor: pointer;
          box-sizing: border-box;
          font-size: 13px;

          &.active {
            background: #1c74bd;
            color: #fff;
          }
        }

      }
    }
  }

  .right-content {
    width: 100%;
    height: 100%;
    background: #f6f6f6;
    display: block;
  }
}


.title-constructor {
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  background: #cfd0e3;
  border: 1px solid;
}

.transform-deg {}

.sector-r-c {}

.input-form-checkbox {
  cursor: pointer;
}

.tools-panel-body {
  padding: 10px;
  box-sizing: border-box;
}
</style>
