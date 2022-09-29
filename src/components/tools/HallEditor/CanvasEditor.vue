<template>
  <div class="canvas">
    <div class="tools" v-if="getActive">
      <div class="d-item">
        <span>Заголовок сектора</span>
        <input type="text" v-model="sectorTitle" />
      </div>
      <div class="d-item">
        <span>Метка строки</span>
        <button>Л</button>
        <button>С</button>
        <button>П</button>
      </div>
      <div class="d-item">
        <span>Места</span>
        <span>9строк/200 мест</span>
      </div>
      <div class="d-item">
        <span>Выровнять</span>
        <button>Л</button>
        <button>С</button>
        <button>П</button>
      </div>
      <div class="d-item">
        <span>Удалить объект</span>
        <button @click="deleteObject">Удалить</button>
      </div>
      <div class="d-item">
        <span>Сгруппировать</span>
        <button @click="groupedBlock">Сгруппировать</button>
      </div>
      <div class="d-item">
        <span>Разгруппировать</span>
        <button @click="unGroup">Разгруппировать</button>
      </div>
      <div class="d-item">
        <span>Вращение</span>
        <input
          type="range"
          class="angle-group"
          min="-180"
          max="180"
          v-model="angle"
        />
        <input
          type="number"
          class="angle-group"
          name=""
          id=""
          v-model="angle"
        />
      </div>
      <div class="d-item">
        <span>Изгиб</span>
        <input
          type="range"
          class="angle-group"
          min="-180"
          max="180"
          v-model="angle"
        />
        <input
          type="number"
          class="angle-group"
          name=""
          id=""
          v-model="angle"
        />
      </div>
      <div class="d-item">
        <span>Растягивание</span>
        <input
          type="range"
          class="angle-group"
          min="-180"
          max="180"
          v-model="angle"
        />
        <input
          type="number"
          class="angle-group"
          name=""
          id=""
          v-model="angle"
        />
      </div>
      <div class="d-item"></div>
      <div class="d-item"></div>
      <div class="d-item"></div>
      <div class="d-item"></div>
      <div class="d-item"></div>
      <div class="d-item"></div>
    </div>
    <!-- <button  ref="inline">inline</button> -->
    <div v-show="false">
      {{ hookUpdate }}
    </div>
    <canvas ref="ctx" width="1001" height="1000"></canvas>
    <!-- <canvas id="demoCanvas" ref="demoCanvas" width="500" height="300"></canvas>
        <canvas ref="canvas" class="canvas-editor" width="1000" height="1000"></canvas> -->
  </div>
</template>
<script>
// import {createjs} from "https://cdn.jsdelivr.net/npm/createjs@1.0.1/gruntfile.min.js"
// import createjs from '@/create.js'
import { useStore } from "vuex";
import { useGrid } from "@/hooks/useGrid.js";
import { fabric } from "fabric";
import {
  ref,
  reactive,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  computed,
  watchEffect,
  watch,
  onBeforeMount,
  getCurrentInstance,
} from "vue";

import { useHall } from "@/hooks/custom/useHall.js";

import { useCreateCircle } from "@/hooks/custom/useCreateCircle.ts";
import { useCreatePolyline } from "@/hooks/custom/useCreatePolyline.ts";
import { useCreateRectangle } from "@/hooks/custom/useCreateRectangle.ts";
import { useCreateRing } from "@/hooks/custom/useCreateRing.ts";
import { useCreateTrapezoid } from "@/hooks/custom/useCreateTrapezoid.ts";
import { useCreateTriangle } from "@/hooks/custom/useCreateTriangle.ts";
export default {
  setup(props, context) {
    // add new class
    let Seat = fabric.util.createClass(fabric.Rect, {
      type: "Seat",
      hText: function (text, height) {
        let number = height / 5;
        if (text < 10) {
          number = height / 5;
        } else if (text < 100) {
          number = height / 5;
        } else if (text < 1000) {
          number = height / 5;
        }

        return number;
      },
      wText: function (text, width) {
        let number = (-1.9 * width) / 4;
        if (text < 10) {
          number = (-0.8 * width) / 6;
        } else if (text < 100) {
          number = (-1 * width) / 4;
        } else if (text < 1000) {
          number = (-1.5 * width) / 4;
        }
        return number;
      },
      initialize: function (options) {
        options || (options = {});
        this.callSuper("initialize", options);

        this.set("text", options.text || "");
      },
      toObject: function () {
        return fabric.util.object.extend(this.callSuper("toObject"), {
          text: this.get("text"),
        });
      },
      _render: function (ctx) {
        this.callSuper("_render", ctx);

        ctx.font = "13px Helvetica";
        ctx.fillStyle = "#333";
        ctx.fillText(
          this.text,
          this.wText(this.text, this.height),
          this.hText(this.text, this.height)
        );
      },
    });

    // const GroupSeats = fabric.util.createClass(fabric.Group, {
    //     type: 'GroupSeats',

    //     initialize: function (options) {
    //         options || (options = {});

    //         this.callSuper('initialize', options);
    //         this.set('text', options.text || '');
    //         this.set('backgroundColor', options.backgroundColor || '');
    //         this.set('fill', options.fill || 'rgb(0,0,0)');
    //         this.set('fillRule', options.fillRule || 'nonzero');
    //         this.set('flipX', options.flipX || false);
    //         this.set('flipY', options.flipY || false);
    //         this.set('globalCompositeOperation', options.globalCompositeOperation || 'source-over');
    //         this.set('opacity', options.opacity || 1);
    //         this.set('originX', options.originX || 'left');
    //         this.set('originY', options.originY || 'top');
    //         this.set('paintFirst', options.paintFirst || 'fill');
    //         this.set('scaleX', options.scaleX || 1);
    //         this.set('scaleY', options.scaleY || 1);
    //         this.set('shadow', options.shadow || null);
    //         this.set('skewX', options.skewX || 0);
    //         this.set('skewY', options.skewY || 0);
    //         this.set('stroke', options.stroke || null);
    //         this.set('strokeDashArray', options.strokeDashArray || null);
    //         this.set('strokeDashOffset', options.strokeDashOffset || 0);
    //         this.set('strokeLineCap', options.strokeLineCap || 'butt');
    //         this.set('strokeLineJoin', options.strokeLineJoin || 'miter');
    //         this.set('strokeMiterLimit', options.strokeMiterLimit || 4);
    //         this.set('strokeUniform', options.strokeUniform || false);
    //         this.set('strokeWidth', options.strokeWidth || 0);
    //         this.set('visible', options.visible || true);
    //     },
    //     toObject: function () {
    //         return fabric.util.object.extend(this.callSuper('toObject'), {
    //             text: this.get('text'),
    //             backgroundColor: this.get('backgroundColor'),
    //             fill: this.get('fill'),
    //             fillRule: this.get('fillRule'),
    //             flipX: this.get('flipX'),
    //             flipY: this.get('flipY'),
    //             globalCompositeOperation: this.get('globalCompositeOperation'),
    //             opacity: this.get('opacity'),
    //             originX: this.get('originX'),
    //             originY: this.get('originY'),
    //             paintFirst: this.get('paintFirst'),
    //             scaleX: this.get('scaleX'),
    //             scaleY: this.get('scaleY'),
    //             shadow: this.get('shadow'),
    //             skewX: this.get('skewX'),
    //             skewY: this.get('skewY'),
    //             stroke: this.get('stroke'),
    //             strokeDashArray: this.get('strokeDashArray'),
    //             strokeDashOffset: this.get('strokeDashOffset'),
    //             strokeLineCap: this.get('strokeLineCap'),
    //             strokeLineJoin: this.get('strokeLineJoin'),
    //             strokeMiterLimit: this.get('strokeMiterLimit'),
    //             strokeUniform: this.get('strokeUniform'),
    //             strokeWidth: this.get('strokeWidth'),
    //             visible: this.get('visible'),
    //         });
    //     },
    //     _render: function (ctx) {
    //         this.callSuper('_render', ctx);
    //         ctx.font = '13px Helvetica';
    //         ctx.fillStyle = '#333';
    //         ctx.fillText(
    //             this.text, 10, 20
    //         );

    //         ctx.backgroundColor = this.backgroundColor;
    //         ctx.fill = this.fill;
    //         ctx.fillRule = this.fillRule;
    //         ctx.flipX = this.flipX;
    //         ctx.flipY = this.flipY;
    //         ctx.globalCompositeOperation = this.globalCompositeOperation;
    //         ctx.opacity = this.opacity;
    //         ctx.originX = this.originX;
    //         ctx.originY = this.originY;
    //         ctx.paintFirst = this.paintFirst;
    //         ctx.scaleX = this.scaleX;
    //         ctx.scaleY = this.scaleY;
    //         ctx.shadow = this.shadow;
    //         ctx.skewX = this.skewX;
    //         ctx.skewY = this.skewY;
    //         ctx.stroke = this.stroke;
    //         ctx.strokeDashArray = this.strokeDashArray;
    //         ctx.strokeDashOffset = this.strokeDashOffset;
    //         ctx.strokeLineCap = this.strokeLineCap;
    //         ctx.strokeLineJoin = this.strokeLineJoin;
    //         ctx.strokeMiterLimit = this.strokeMiterLimit;
    //         ctx.strokeUniform = this.strokeUniform;
    //         ctx.strokeWidth = this.strokeWidth;
    //         ctx.visible = this.visible;
    //     }
    // });

    // let GroupSeats = fabric.util.createClass(fabric.Group, {
    //     type: 'GroupSeats',
    //     initialize: function (objects, options) {
    //         options || (options = {});

    //         this.callSuper('initialize', objects, options);
    //         this.set('text', options.text || '');
    //         this.set('fill', options.fill || '');
    //         this.set('backgroundColor', options.backgroundColor || '#000');
    //     },

    //     toObject: function () {
    //         return fabric.util.object.extend(this.callSuper('toObject'), {
    //             text: this.get('text'),
    //             fill: this.get('fill'),
    //             backgroundColor: this.get('backgroundColor'),
    //         });
    //     },

    //     // _render:function(ctx){
    //     //     // this.callSuper('render', ctx)
    //     // },
    //     render: function (ctx, childrenOverride) {
    //         this.callSuper('render', ctx);
    //         ctx.font = '13px Helvetica';
    //         ctx.fillStyle = '#333';
    //         ctx.fillText(
    //             this.text, this.width, this.height
    //         );
    //         ctx.fill = '#333';

    //         ctx.save();
    //         // ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;

    //         ctx.opacity = this.opacity >= 0 || 0;
    //         childrenOverride = childrenOverride || {};
    //         if (typeof childrenOverride.hasControls === 'undefined') {
    //             childrenOverride.hasControls = false;
    //         }
    //         childrenOverride.forActiveSelection = true;
    //         for (var i = 0, len = this._objects.length; i < len; i++) {
    //             this._objects[i]._renderControls(ctx, childrenOverride);
    //         }
    //         // ctx.restore();
    //     }

    //     // initialize: function (objects, options) {
    //     //     options = options || {};
    //     //     this._objects = objects || [];
    //     //     this.callSuper('initialize', options);

    //     //     // for (var i = this._objects.length; i--;) {
    //     //     //     this._objects[i].group = this;
    //     //     // }

    //     //     // if (options.originX) {
    //     //     //     this.originX = options.originX;
    //     //     // }
    //     //     // if (options.originY) {
    //     //     //     this.originY = options.originY;
    //     //     // }
    //     //     // this._calcBounds();
    //     //     // this._updateObjectsCoords();
    //     //     // fabric.Object.prototype.initialize.call(this, options);
    //     //     // this.setCoords();

    //     //     // this.callSuper('initialize', options);
    //     //     this.set('text', options.text || '');
    //     //     this.set('backgroundColor', options.backgroundColor || '');
    //     //     this.set('fill', options.fill >= 0 || 'rgb(0,0,0)');
    //     //     this.set('fillRule', options.fillRule || 'nonzero');
    //     //     // this.set('flipX', options.flipX || false);
    //     //     // this.set('flipY', options.flipY || false);
    //     //     // this.set('globalCompositeOperation', options.globalCompositeOperation || 'source-over');
    //     //     this.set('opacity', options.opacity || 1);
    //     //     // this.set('originX', options.originX || 'left');
    //     //     // this.set('originY', options.originY || 'top');
    //     //     // this.set('paintFirst', options.paintFirst || 'fill');
    //     //     // this.set('scaleX', options.scaleX || 1);
    //     //     // this.set('scaleY', options.scaleY || 1);
    //     //     // this.set('shadow', options.shadow || null);
    //     //     // this.set('skewX', options.skewX || 0);
    //     //     // this.set('skewY', options.skewY || 0);
    //     //     // this.set('stroke', options.stroke || null);
    //     //     // this.set('strokeDashArray', options.strokeDashArray || null);
    //     //     // this.set('strokeDashOffset', options.strokeDashOffset || 0);
    //     //     // this.set('strokeLineCap', options.strokeLineCap || 'butt');
    //     //     // this.set('strokeLineJoin', options.strokeLineJoin || 'miter');
    //     //     // this.set('strokeMiterLimit', options.strokeMiterLimit || 4);
    //     //     // this.set('strokeUniform', options.strokeUniform || false);
    //     //     // this.set('strokeWidth', options.strokeWidth || 0);
    //     //     // this.set('visible', options.visible || true);
    //     // },
    //     // toGroup: function () {
    //     //     var objects = this._objects.concat();
    //     //     this._objects = [];
    //     //     var options = fabric.Object.prototype.toObject.call(this);
    //     //     var newGroup = new fabric.Group([]);
    //     //     delete options.type;
    //     //     newGroup.set(options, {
    //     //         text: this.get('text'),
    //     //         backgroundColor: this.get('backgroundColor'),
    //     //         fill: this.get('fill'),
    //     //         fillRule: this.get('fillRule'),
    //     //         // flipX: this.get('flipX'),
    //     //         // flipY: this.get('flipY'),
    //     //         // globalCompositeOperation: this.get('globalCompositeOperation'),
    //     //         opacity: this.get('opacity'),
    //     //         // originX: this.get('originX'),
    //     //         // originY: this.get('originY'),
    //     //         // paintFirst: this.get('paintFirst'),
    //     //         // scaleX: this.get('scaleX'),
    //     //         // scaleY: this.get('scaleY'),
    //     //         // shadow: this.get('shadow'),
    //     //         // skewX: this.get('skewX'),
    //     //         // skewY: this.get('skewY'),
    //     //         // stroke: this.get('stroke'),
    //     //         // strokeDashArray: this.get('strokeDashArray'),
    //     //         // strokeDashOffset: this.get('strokeDashOffset'),
    //     //         // strokeLineCap: this.get('strokeLineCap'),
    //     //         // strokeLineJoin: this.get('strokeLineJoin'),
    //     //         // strokeMiterLimit: this.get('strokeMiterLimit'),
    //     //         // strokeUniform: this.get('strokeUniform'),
    //     //         // strokeWidth: this.get('strokeWidth'),
    //     //         // visible: this.get('visible'),
    //     //     }
    //     //     );
    //     //     objects.forEach(function (object) {
    //     //         object.canvas.remove(object);
    //     //         object.group = newGroup;
    //     //     });
    //     //     newGroup._objects = objects;
    //     //     if (!this.canvas) {
    //     //         return newGroup;
    //     //     }
    //     //     var canvas = this.canvas;
    //     //     canvas.add(newGroup);
    //     //     canvas._activeObject = newGroup;
    //     //     newGroup.setCoords();
    //     //     return newGroup;
    //     // },
    //     // render: function (ctx, styleOverride, childrenOverride) {
    //     //     this.callSuper('render', ctx, styleOverride);
    //     //     ctx.font = '13px Helvetica';
    //     //     ctx.fillStyle = '#333';
    //     //     ctx.fillText(
    //     //         this.text, 10, 20
    //     //     );
    //     //     ctx.opacity = this.opacity >= 0 || 1;
    //     //     childrenOverride = childrenOverride || {};
    //     //     if (typeof childrenOverride.hasControls === 'undefined') {
    //     //         childrenOverride.hasControls = false;
    //     //     }
    //     //     for (var i = 0, len = this._objects.length; i < len; i++) {
    //     //         this._objects[i]._renderControls(ctx, childrenOverride);
    //     //     }
    //     // },

    //     // onDeselect: function () {
    //     //     this.destroy();
    //     //     return false;
    //     // },

    //     // shouldCache: function () {
    //     //     return false;
    //     // },

    //     // isOnACache: function () {
    //     //     return false;
    //     // },

    //     // getObjects:function(){
    //     //     console.log(this._objects)
    //     //     return this._objects
    //     // },
    //     // item:function(index){
    //     //     console.log(this.getObjects()[index]);
    //     //     return this.getObjects()[index]
    //     // },

    //     // _renderControls: function (ctx, styleOverride, childrenOverride) {
    //     //     ctx.save();
    //     //     // ctx.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1;
    //     //     this.callSuper('_renderControls', ctx, styleOverride);
    //     //     ctx.font = '13px Helvetica';
    //     //     ctx.fillStyle = '#333';
    //     //     ctx.fillText(
    //     //         this.text, 10, 20
    //     //     );
    //     //     ctx.opacity = this.opacity >= 0 || 1;
    //     //     childrenOverride = childrenOverride || {};
    //     //     if (typeof childrenOverride.hasControls === 'undefined') {
    //     //         childrenOverride.hasControls = false;
    //     //     }
    //     //     // childrenOverride.forActiveSelection = true;
    //     //     for (var i = 0, len = this._objects.length; i < len; i++) {
    //     //         this._objects[i]._renderControls(ctx, childrenOverride);
    //     //     }
    //     //     // ctx.restore();
    //     // },

    // });

    // CONSTANTS

    const store = useStore();
    const ctx = ref(null);
    let canvas = ref(null);
    // let arrowUp = ref(null);
    let arrowDown = ref(null);
    let arrowLeft = ref(null);
    let arrowRight = ref(null);
    let getActive = ref(false);
    let angle = ref(0);
    let activeSelection = ref(null);
    let mouseWheel = ref(null);
    let dataHall = reactive({});
    const inline = ref(null);

    // GETTERS AND STATES
    // const changeArrowUp = computed(() => store.getters.canvas.changeArrowUp)
    const changeArrowUp = () => store.commit("canvas/falseNewSector");
    const arrowUp = computed(() => store.state.canvas.arrowUp);
    // const WIDTH = computed(() => store.state.WIDTH);
    // const HEIGHT = computed(() => store.state.HEIGHT);
    // const GRIDX = computed(() => store.state.GRIDX);
    // const GRIDY = computed(() => store.state.GRIDY);
    const HALL = computed(() => store.state.canvas.hall);
    const groupedBlocks = computed(() => store.state.canvas.groupedBlocks);
    const createSectorData = computed(() => store.state.canvas.createSector);
    const groupedBlock = () => {
      return store.commit("canvas/groupedBlock", getActiveObjects());
    };
    const hookUpdate = computed(() => store.state.canvas.hookUpdate);
    const resetCreateSector = computed(
      () => store.getters.canvas.resetCreateSector
    );
    const newSector = computed(() => store.state.canvas.newSector);
    const falseNewSector = () => store.commit("canvas/falseNewSector");
    // const createWithDraw = computed(() => store.state.canvas.createWithDraw)
    const dataBlock = computed(() => store.state.canvas.dataBlock);

    // HOOKS
    const { circleSector } = useCreateCircle(dataBlock.value);
    const { polylineSector } = useCreatePolyline(dataBlock.value);
    const { rectangleSector } = useCreateRectangle(dataBlock.value);
    const { ringSector } = useCreateRing(dataBlock.value);
    const { trapezoidSector } = useCreateTrapezoid(dataBlock.value);
    const { triangleSector } = useCreateTriangle(dataBlock.value);

    // METHODS
    const createSeat = (seat) => {
      const rect = new Seat({
        left: seat.left,
        top: seat.top,
        fill: "#ffffff",
        width: seat.width,
        height: seat.height,
        strokeWidth: 1,
        stroke: "#000",
        rx: 10,
        ry: 10,
        scaleX: 1,
        scaleY: 1,
        text: "" + seat.number,
        tleft: 0,
        ttop: 0,
        hasControls: true,
        textBox: this,
        id: seat.id,
        typeElement: seat.typeElement,
        sectorId: seat.sectorId,
        // меняет контур вращения
        originX: "center",
        originY: "center",
      });
      rect.set("angle", parseInt(30, 10)).setCoords();
      canvas.add(rect);
    };
    const createSector = (sector) => {
      if (sector.seats.length !== 0) {
        for (let s = 0; s < sector.seats.length; s++) {
          createSeat(sector.seats[s]);
        }
      }
    };
    const createHall = () => {
      // console.log(1)
      let sectors = HALL.value.sectors;
      if (sectors.length !== 0) {
        for (let i = 0; i < sectors.length; i++) {
          createSector(sectors[i]);
        }
      }
    };
    const createGroupedItem = (grouped) => {
      if (!canvas.getActiveObject()) {
        return;
      }
      if (canvas.getActiveObject().type !== "activeSelection") {
        return;
      }
      // canvas.getActiveObject().set('originX', parseInt("center", 10)).setCoords();
      // canvas.getActiveObject().set('originY', parseInt("center", 10)).setCoords();
      canvas.getActiveObject().toGroup();
      canvas.requestRenderAll();
      // canvas.getActiveObject().centeredScaling=true

      // canvas.discardActiveObject().renderAll()
    };

    const createGroup = (groupedBlocks) => {
      if (groupedBlocks.length > 0) {
        for (let i = 0; i < groupedBlocks.length; i++) {
          createGroupedItem(groupedBlocks[i]);
        }
      }

      console.log(groupedBlocks.value, "groupedBlocks");
    };

    const unGroup = () => {
      if (!canvas.getActiveObject()) {
        return;
      }
      if (canvas.getActiveObject().type !== "group") {
        return;
      }
      // canvas.getActiveObject().set('originX', parseInt("center", 10)).setCoords();
      // canvas.getActiveObject().set('originY', parseInt("center", 10)).setCoords();
      canvas.getActiveObject().toActiveSelection();
      canvas.requestRenderAll();
    };

    const deleteObject = () => {
      // canvas.getActiveObject().remove();
      canvas.getActiveObjects().forEach((obj) => {
        canvas.remove(obj);
        console.log(obj, "delete this object");
      });
      canvas.discardActiveObject().renderAll();
    };
    const getActiveObjects = () => {
      createGroupedItem();
      return canvas.getActiveObjects();
    };
    // метод создания сгруппированного объекта
    const createGroupedSector = (createSectorData) => {
      if (!createSectorData.value.seats.length) {
        return;
      }
      let sector = createSectorData.value;
      const group = new fabric.Group([], {
        left: 800,
        top: 500,
        angle: 40,
        backgroundColor: "#000",
        opacity: 1,
        text: "textGroup",
        fill: "#af0000",
        width: 300,
        height: 300,
        selectable: true,
        // меняет контур вращения
        originX: "center",
        originY: "center",
      });
      // if (sectors.length !== 0) {
      //     for (let i = 0; i < sectors.length; i++) {
      //         if (sectors[i].seats.length !== 0) {
      //             for (let s = 0; s < sectors[i].seats.length; s++) {
      //                 const seat = new Seat({
      //                     left: sectors[i].seats[s].left,
      //                     top: sectors[i].seats[s].top,
      //                     fill: '#ffffff',
      //                     width: 30,
      //                     height: 30,
      //                     strokeWidth: 1,
      //                     stroke: "#000",
      //                     rx: 10,
      //                     ry: 10,
      //                     angle: 0,
      //                     scaleX: 1,
      //                     scaleY: 1,
      //                     text: "" + sectors[i].seats[s].number,
      //                     tleft: 0,
      //                     ttop: 0,
      //                     hasControls: true,
      //                     textBox: this,
      //                     id: sectors[i].seats[s].id,
      //                     typeElement: sectors[i].seats[s].typeElement,
      //                     sectorId: sectors[i].seats[s].sectorId,
      //                 });

      //                 group.addWithUpdate(seat)
      //             }
      //             group.angle = sectors[i].rotate
      //         }
      //     }
      // }
      for (let s = 0; s < sector.seats.length; s++) {
        const seat = new Seat({
          left: sector.seats[s].left,
          top: sector.seats[s].top,
          fill: "#ffffff",
          width: sector.seats[s].width,
          height: sector.seats[s].height,
          strokeWidth: 1,
          stroke: "#000",
          rx: 10,
          ry: 10,
          angle: sector.seats[s].angle,
          scaleX: 1,
          scaleY: 1,
          text: "" + sector.seats[s].number,
          tleft: 0,
          ttop: 0,
          hasControls: true,
          textBox: this,
          id: sector.seats[s].id,
          typeElement: sector.seats[s].typeElement,
          sectorId: sector.seats[s].sectorId,
          // меняет контур вращения
          originX: "center",
          originY: "center",
        });

        group.addWithUpdate(seat);
      }
      group.angle = sector.rotate;
      group.fill = "blue";
      canvas.add(group);
    };

    const createGroupedZone = (data) => {
      // console.log(data)
    };

    const changeCoordinate = document.addEventListener(
      "keyup",
      function (event) {
        // console.log('Key: ', event.key);
        // console.log('keyCode: ', event.keyCode);
        switch (event.keyCode) {
          case 37:
            arrowLeft.value += 1;
            break;
          case 38:
            // arrowUp.value += 1;
            // if (!canvas.getActiveObject()) {
            //     return;
            // } else {
            //     canvas.getActiveObject().top -= 50;
            // }
            changeArrowUp();
            break;
          case 39:
            arrowRight.value += 1;
            break;
          case 40:
            arrowDown.value += 1;
            break;
        }
      }
    );

    const oCoordinate = () => {
      let triangleY = new fabric.Triangle({
        width: 10,
        height: 15,
        fill: "red",
        left: 6,
        top: 110,
        angle: 180,
        selectable: false,
      });

      let lineY = new fabric.Line([0, 0, 0, 100], {
        left: 0,
        top: 0,
        stroke: "red",
        selectable: false,
      });
      let textY = new fabric.Text("Y", {
        left: -5,
        top: 110,
        fill: "red",
        fontSize: "13",
        selectable: false,
      });

      let triangleX = new fabric.Triangle({
        width: 10,
        height: 15,
        fill: "green",
        left: 110,
        top: -5,
        angle: 90,
        selectable: false,
      });

      let lineX = new fabric.Line([0, 0, 100, 0], {
        left: 0,
        top: 0,
        stroke: "green",
        selectable: false,
      });
      let textX = new fabric.Text("X", {
        left: 110,
        top: -7,
        fill: "green",
        fontSize: "13",
        selectable: false,
      });
      let textO = new fabric.Text("O", {
        left: -15,
        top: -15,
        fill: "black",
        fontSize: "13",
        selectable: false,
      });
      canvas.add(
        new fabric.Group(
          [lineY, triangleY, textY, textO, textX, lineX, triangleX],
          {
            selectable: false,
            hoverCursor: "move",
          }
        )
      );
    };
    // WATCHERS
    // Изменение угла выделенного объекта
    watch(angle, (newangle, oldangle) => {
      if (newangle == 180 && oldangle == 179) {
        angle = -180;
      }
      if (!canvas.getActiveObject()) {
        return;
      } else {
        // resetCreateSector.value;
        canvas
          .getActiveObject()
          .set("originX", parseInt("center", 10))
          .setCoords();
        canvas
          .getActiveObject()
          .set("originY", parseInt("center", 10))
          .setCoords();
        canvas
          .getActiveObject()
          .set("angle", parseInt(newangle, 10))
          .setCoords();
        canvas.requestRenderAll();
      }
    });
    watch(arrowUp, (newangle, oldangle) => {
      console.log(newangle, "arrowUp");
      if (!canvas.getActiveObject()) {
        return;
      } else {
        // canvas.getActiveObject().top -= 50;
        canvas.getActiveObject().set("top", parseInt(-1, 10)).setCoords();
        canvas.requestRenderAll();
      }
    });
    watch(arrowDown, (newangle, oldangle) => {
      console.log(newangle, "arrowDown");
      if (!canvas.getActiveObject()) {
        return;
      } else {
        // canvas.getActiveObject().top += 50;
        canvas.getActiveObject().set("top", parseInt(1, 10)).setCoords();
        canvas.requestRenderAll();
      }
    });
    watch(arrowLeft, (newangle, oldangle) => {
      console.log(newangle, "arrowLeft");
      if (!canvas.getActiveObject()) {
        return;
      } else {
        // canvas.getActiveObject().left -= 50;
        canvas.getActiveObject().set("left", parseInt(-1, 10)).setCoords();
        canvas.requestRenderAll();
      }
    });
    watch(arrowRight, (newangle, oldangle) => {
      console.log(newangle, "arrowRight");
      if (!canvas.getActiveObject()) {
        return;
      } else {
        // console.log(canvas.getActiveObject().left, "left")
        // canvas.getActiveObject().left += 50;
        canvas.getActiveObject().set("left", parseInt(1, 10)).setCoords();
        canvas.requestRenderAll();
      }
    });

    // HOOK MOUNTED
    onMounted(() => {
      // let instance = getCurrentInstance().ctx.$forceUpdate(HALL => HALL);
      // console.log(instance);
      // console.log("mounted!");
      // console.log(hookUpdate.value, "sdfsdf")

      canvas = new fabric.Canvas(ctx.value);
      dataHall.value = HALL.value;
      // createHall(dataHall.value);
      // createGroupedSector(dataHall.value);
      // console.log(dataHall.value)

      //   const ellipse = new fabric.Ellipse({
      //     originX: "left",
      //     originY: "top",
      //     left: 100,
      //     top: 100,
      //     rx: 100,
      //     ry: 100,
      //     fill: "rgb(0,0,0)",
      //     selectable: true,
      //   });
      // canvas.add(ellipse)

      // let circle2 = new fabric.Circle({
      //     radius: 100,
      //     fill: '#eef',
      //     scaleY: 0.5,
      //     originX: 'center',
      //     originY: 'center'
      // });

      // let text2 = new fabric.Text('hello world', {
      //     fontSize: 30,
      //     originX: 'center',
      //     originY: 'center'
      // });

      // let groups = new fabric.Group([circle2, text2], {
      //     left: 500,
      //     top: 300,
      //     angle: 90,
      //     backgroundColor: "#000",
      //     opacity: 0.5,
      //     text: "textGroup",
      //     fill: "#af0000",
      //     width: 300,
      //     height: 300,
      //     selectable: true,
      // });

      // let groups = new GroupSeats([circle2, text2], {
      //     left: 500,
      //     top: 300,
      //     angle: 40,
      //     backgroundColor: "#000",
      //     opacity: 0,
      //     text: "textGroup",
      //     fill: "#af0000",
      //     width: 300,
      //     height: 300,
      //     selectable: true,
      // })

      // canvas.add(groups);

      // console.log(groups, "group")

      // changeCoordinate()

      // fabric.Object.prototype.transparentCorners = false;
      // fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

      // fabric.Canvas.prototype.getAbsoluteCoords = function (object) {
      //     return {
      //         left: object.left + this._offset.left,
      //         top: object.top + this._offset.top
      //     };
      // }

      // var btn = inline.value,
      //     btnWidth = 85,
      //     btnHeight = 18;

      // function positionBtn(obj) {
      //     var absCoords = canvas.getAbsoluteCoords(obj);

      //     btn.style.left = (absCoords.left - btnWidth / 2) + 'px';
      //     btn.style.top = (absCoords.top - btnHeight / 2) + 'px';
      // }

      // fabric.Image.fromURL('https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png', function (img) {
      //     canvas.add(img.set({ left: 250, top: 250, angle: 30 }).scale(0.25));
      //     img.on('moving', function () { positionBtn(img) });
      //     img.on('scaling', function () { positionBtn(img) });
      //     positionBtn(img);
      // })

      // Добавление zoom
      mouseWheel = canvas.on("mouse:wheel", function (opt) {
        var delta = opt.e.deltaY;
        var zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 10) zoom = 10;
        if (zoom < 0.1) zoom = 0.1;
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
      });

      oCoordinate();

      // Для отрисолвки прямоугольника
      // начало точки
      if (true) {
        const rectDrag = new Seat({
          fill: "#af0",
        });
        canvas.add(rectDrag);
        let coordX = 0,
          coordY = 0,
          widthRect = 0,
          heightRect = 0;
        let isMove = false;
        canvas.on({
          "mouse:down": (e) => {
            console.log(coordX, coordY, "mouse:down");
            coordX = e.pointer.x;
            coordY = e.pointer.y;
            rectDrag.set("top", coordY).setCoords();
            rectDrag.set("left", coordX).setCoords();
            isMove = true;
          },
        });
        // if (true) {
        //   canvas.on({
        //     "mouse:move": (e) => {
        //       console.log(coordX, e.pointer.x, coordY, "mouse:move");
        //       widthRect = e.pointer.x - coordX;
        //       heightRect = e.pointer.y - coordY;
        //       rectDrag.set("width", widthRect).setCoords();
        //       rectDrag.set("height", heightRect).setCoords();
        //       rectDrag.set("fill", "#af0");
        //       rectDrag.set("fontSize", "80px");
        //       rectDrag.set("text", widthRect + " " + heightRect);
        //     },
        //   });
        // }

        // canvas.on("mouse:move", (e) => {
        //   console.log(e, "mouse:move");
        //   widthRect = e.pointer.x - coordX;
        //   heightRect = e.pointer.y - coordY;
        //   rectDrag.set("width", widthRect).setCoords();
        //   rectDrag.set("height", heightRect).setCoords();
        //   rectDrag.set("fill", "#af0");
        //   rectDrag.set("text", widthRect + " " + heightRect);
        //   // createRect = false
        // });

        canvas.on("mouse:up ", (e) => {
          console.log(e, "mouse:up");
          widthRect = e.pointer.x - coordX;
          heightRect = e.pointer.y - coordY;
          rectDrag.set("width", widthRect).setCoords();
          rectDrag.set("height", heightRect).setCoords();
          rectDrag.set("fill", "#000");
          // createRect = false
        });
      }

      // конец точки
    });
    onUpdated(() => {
      //      // Для отрисолвки прямоугольника
      //   // начало точки
      //   if (true) {
      //     const rectDrag = new Seat({
      //       top: 0,
      //       left: 0,
      //       width: 0,
      //       height: 0,
      //       fill: "#af0",
      //     });
      //     canvas.add(rectDrag);
      //     let coordX = 0,
      //       coordY = 0,
      //       widthRect = 0,
      //       heightRect = 0;
      //     let isMove = false;
      //     canvas.on({
      //       "mouse:down": (e) => {
      //         console.log(coordX, coordY, "mouse:down");
      //         coordX = e.pointer.x;
      //         coordY = e.pointer.y;
      //         rectDrag.set("top", coordY).setCoords();
      //         rectDrag.set("left", coordX).setCoords();
      //         isMove=true
      //       },
      //     });
      //     if (isMove) {
      //       canvas.on({
      //         "mouse:move": (e) => {
      //           console.log(coordX, e.pointer.x, coordY, "mouse:move");
      //           widthRect = e.pointer.x - coordX;
      //           heightRect = e.pointer.y - coordY;
      //           rectDrag.set("width", widthRect).setCoords();
      //           rectDrag.set("height", heightRect).setCoords();
      //           rectDrag.set("fill", "#af0");
      //           rectDrag.set("fontSize", "80px");
      //           rectDrag.set("text", widthRect + " " + heightRect);
      //         },
      //       });
      //     }
      //   }

      //   // конец точки

      if (newSector.value) {
        switch (dataBlock.value.figure) {
          case 1:
            createGroupedSector(circleSector);
            break;
          case 2:
            createGroupedSector(ringSector);
            break;
          case 3:
            createGroupedSector(rectangleSector);
            break;
          case 4:
            createGroupedSector(trapezoidSector);
            break;
          case 5:
            createGroupedSector(triangleSector);
            break;
          case 6:
            createGroupedSector(polylineSector);
            break;
          default:
            createGroupedSector(rectangleSector);
            break;
        }

        // createGroupedSector(createSectorData)
        // console.log(circleSector)
      }
      falseNewSector();
    });
    return {
      ctx,
      // createSeat,
      createSector,
      createHall,
      // createGroupedItem,
      // getActiveObjects,
      // newCollection,
      createGroup,
      unGroup,
      deleteObject,
      canvas,
      HALL,
      Seat,
      hookUpdate,
      store,
      dataHall,
      activeSelection,
      getActive: true,
      groupedBlocks,
      angle,
      mouseWheel,
      arrowUp,
      arrowDown,
      arrowLeft,
      arrowRight,
      changeArrowUp,
      groupedBlock,
      createGroupedSector,
      createSectorData,
      resetCreateSector,
      newSector,
      falseNewSector,
      changeCoordinate,
      inline,
      // GroupSeats,
      // createWithDraw,
    };
  },

  // setup(props, context) {
  //     const grid = () => {
  //         for (let x = 0; x < WIDTH.value; x += GRIDX.value) {
  //             ctx.beginPath();
  //             ctx.moveTo(x, 0); //передвигаем перо
  //             ctx.lineTo(x, HEIGHT.value); //рисуем лини
  //             ctx.strokeStyle = "#dfdedf";
  //             ctx.stroke();
  //             ctx.lineWidth = 1;
  //         }
  //         for (let y = 0; y < HEIGHT.value; y += GRIDY.value) {
  //             ctx.beginPath();
  //             ctx.moveTo(0, y); //передвигаем перо
  //             ctx.lineTo(WIDTH.value, y); //рисуем лини
  //             ctx.strokeStyle = "#dfdedf";
  //             ctx.stroke();
  //             ctx.lineWidth = 1;
  //         }
  //     }

  //     const createSeat = (seat) => {

  //         // let seat = new Path2D();
  //         // seat.rect(x, y, width, height);
  //         // ctx.fill(seat);
  //         let radius = Math.min(seat.cornerRadius, seat.width / 2, seat.height / 2); // избегаем артефактов, в случае если радиус скругления больше одной из сторон

  //         let rxh = -radius * Math.cos(seat.rotation);
  //         let ryh = -radius * Math.sin(seat.rotation);
  //         let rxw = radius * Math.cos(-Math.PI / 2 + seat.rotation);
  //         let ryw = -radius * Math.sin(-Math.PI / 2 + seat.rotation);
  //         let widthX = seat.width * Math.cos(-Math.PI / 2 + seat.rotation);
  //         let widthY = -seat.width * Math.sin(-Math.PI / 2 + seat.rotation);
  //         let heightX = seat.height * Math.cos(seat.rotation);
  //         let heightY = seat.height * Math.sin(seat.rotation);
  //         ctx.beginPath();
  //         ctx.fillStyle = seat.fill;
  //         ctx.strokeStyle = "#000";

  //         // ctx.moveTo(seat.x + radius, seat.y);// двишение по ширине на расстояние радиуса
  //         // ctx.lineTo(seat.x + seat.width - radius, seat.y);
  //         // ctx.arcTo(seat.x + seat.width, seat.y, seat.x + seat.width, seat.y + radius, radius);
  //         // ctx.lineTo(seat.x + seat.width, seat.y + seat.height - radius);
  //         // ctx.arcTo(seat.x + seat.width, seat.y + seat.height, seat.x + seat.width - radius, seat.y + seat.height, radius);
  //         // ctx.lineTo(seat.x + radius, seat.y + seat.height);
  //         // ctx.arcTo(seat.x, seat.y + seat.height, seat.x, seat.y + seat.height - radius, radius);
  //         // ctx.lineTo(seat.x, seat.y + radius);
  //         // ctx.arcTo(seat.x, seat.y, seat.x + radius, seat.y, radius);

  //         ctx.moveTo(seat.x + rxw, seat.y + ryw);// движение по ширине на расстояние радиуса
  //         ctx.lineTo(seat.x + widthX - rxw, seat.y + widthY - ryw); // линия по ширине
  //         ctx.arcTo(seat.x + widthX, seat.y + widthY, seat.x + widthX + rxh, seat.y + widthY - ryh, radius);
  //         ctx.lineTo(seat.x + widthX - heightX - rxh, seat.y + heightY + widthY + ryh); //all right
  //         ctx.arcTo(seat.x + widthX - heightX, seat.y + heightY + widthY, seat.x + widthX - heightX - rxw, seat.y + heightY + widthY - ryw, radius);

  //         ctx.lineTo(seat.x - heightX + rxw, seat.y + heightY + ryw);
  //         ctx.arcTo(seat.x - heightX, seat.y + heightY, seat.x - heightX - rxh, seat.y + heightY + ryh, radius);
  //         ctx.lineTo(seat.x + rxh, seat.y - ryh);
  //         ctx.arcTo(seat.x, seat.y, seat.x + rxw, seat.y + ryw, radius);

  //         ctx.fill()
  //         ctx.stroke();

  //         ctx.beginPath();
  //         ctx.fillStyle = seat.stroke;
  //         ctx.font = "15px Verdana";
  //         ctx.fillText(seat.number, seat.x - (widthX + heightX) / 2 + 8 * Math.cos(Math.PI / 2 - seat.rotation), seat.y + (widthY + heightY) / 2 + 8 * Math.sin(seat.rotation));
  //         // ctx.fillText(seat.number, seat.x + seat.width / 2 - 8, seat.y + seat.height / 2 + 5);
  //     }

  // },
};
</script>
<style lang="scss" scoped>
.canvas-editor {
  background: #fff;
  border: 1px solid;
}
.canvas {
  position: relative;
}
.tools {
  // display: flex;
  // align-items: baseline;
  padding: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid;
  position: fixed;
  right: 0;
  height: 100%;
  background: #fff;
  button {
    padding: 10px;
    margin-right: 10px;

    &:hover {
      background-color: #000;
      color: #fff;
    }
  }
}
.d-item {
  margin-bottom: 10px;
}
.angle-group {
  //   width: 100%;
}
</style>
