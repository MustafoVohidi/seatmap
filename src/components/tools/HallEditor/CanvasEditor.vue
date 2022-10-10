<template>
    <div class="canvas">
        <div class="tools" v-if="getActive">
            <div class="d-item">
                <span>Сохранить проект</span>
                <button @click="canvasToJSON">Экспортировать как JSON</button>
            </div>
            <div class="d-item">
                <span>Заголовок сектора</span>
                <!-- <input type="text" v-model="sectorTitle" /> -->
            </div>
            <!-- <div class="d-item">
                <span>Метка строки</span>
                <button>Л</button>
                <button>
                    С
                </button>
                <button>П</button>
            </div> -->

            <!-- <div class="d-item">
                <span>Места</span>
                <span>9строк/200 мест</span>
            </div> -->
            <div class="d-item">
                <span>Выровнять</span>
                <button @click="alignLeft" type="button" class="btn">
                    <font-awesome-icon icon="fa-solid fa-align-left" />
                </button>
                <button @click="alignCenter" type="button" class="btn">
                    <font-awesome-icon icon="fa-solid fa-align-center" />
                </button>
                <button @click="alignRight" type="button" class="btn">
                    <font-awesome-icon icon="fa-solid fa-align-right" />
                </button>
                <!-- <button  @click="alignSpaceBeween" type="button" class="btn">
                    <font-awesome-icon icon="fa-solid fa-align-right" />
                </button> -->
            </div>
            <div class="d-item">
                <span>Удалить объект</span>
                <button @click="deleteObject">
                    <font-awesome-icon icon="fa-solid fa-trash-can" />
                </button>
            </div>
            <div class="d-item">
                <span>Сгруппировать</span>
                <button @click="groupedBlock" title="сгруппировать">
                    <font-awesome-icon icon="fa-solid fa-object-group" />
                </button>
            </div>
            <div class="d-item">
                <span>Разгруппировать</span>
                <button @click="unGroup" title="Разгруппировать">
                    <font-awesome-icon icon="fa-solid fa-object-ungroup" />
                </button>
            </div>
            <div class="d-item">
                <span>Вращение</span>
                <input type="range" class="angle-group rotate" min="-180" max="180" v-model="angle" />
                <input type="number" class="angle-group rotate" name="" id="" v-model="angle" />
            </div>
            <div class="d-item">
                <span>Изгиб</span>
                <input type="range" class="angle-group curve" min="-1000" max="1000" v-model="curve" />
                <input type="number" class="angle-group curve" name="" id="" v-model="curve" />
            </div>
            <div class="d-item">
                <span>Растягивание</span>
                <input type="range" class="angle-group stretch" min="0" max="100" v-model="stretch" />
                <input type="number" class="angle-group stretch" name="" id="" v-model="stretch" />
            </div>
        </div>
        <div v-show="false">
            {{ hookUpdate }}
        </div>
        <canvas ref="ctx" width="1001" height="1000"></canvas>
    </div>
</template>
<script>
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
        let stretch = ref(0);
        let curve = ref(0);
        let activeSelection = ref(null);
        let mouseWheel = ref(null);
        let dataHall = reactive({});
        // GETTERS AND STATES
        // const changeArrowUp = computed(() => store.getters.canvas.changeArrowUp)
        const changeArrowUp = () => store.commit("canvas/falseNewSector");
        const changeCreateSectorDraw = () => store.commit("canvas/changeCreateSectorDraw")
        const changeCreateSectorDrawAction = () => store.dispatch("canvas/changeCreateSectorDrawAction")
        const changeSelectDraw = () => store.commit("canvas/changeSelectDraw")
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
        const createSectorDraw = computed(() => store.state.canvas.createSectorDraw);
        const selectDraw = computed(() => store.state.canvas.selectDraw);
        // HOOKS
        const { circleSector } = useCreateCircle(dataBlock.value);
        const { polylineSector } = useCreatePolyline(dataBlock.value);
        const { rectangleSector } = useCreateRectangle(dataBlock.value);
        const { ringSector } = useCreateRing(dataBlock.value);
        const { trapezoidSector } = useCreateTrapezoid(dataBlock.value);
        const { triangleSector } = useCreateTriangle(dataBlock.value);
        // METHODS
        const createSeat = (seat, typeGrouped) => {
            const rect = new fabric.Seat({
                left: seat.left,
                top: seat.top,
                tleft: seat.left,
                ttop: seat.top,
                fill: "#ffffff",
                width: seat.width,
                height: seat.height,
                strokeWidth: 1,
                shift: seat.shift,
                stroke: "#000",
                rx: 10,
                ry: 10,
                angle: seat.angle,
                tAngle: seat.angle,
                scaleX: 1,
                scaleY: 1,
                text: "" + seat.number,
                hasControls: true,
                textBox: this,
                id: seat.id,
                row: seat.row,
                typeElement: seat.typeElement,
                typeGrouped: typeGrouped,
                sectorId: seat.sectorId,
                radius: seat.radius,
                rowID: seat.rowID,
                colID: seat.colID,
                quantitySeats: seat.quantitySeats,
                // меняет контур вращения
                originX: "center",
                originY: "center",

                // angle: seat.angle,
            });
            canvas.add(rect);
        };
        // del
        const createHall = () => {
            // console.log(1)
            let sectors = HALL.value.sectors;
            if (sectors.length !== 0) {
                for (let i = 0; i < sectors.length; i++) {
                    createUngroupedSector(sectors[i]);
                }
            }
        };

        // const createGroup = (groupedBlocks) => {
        //     if (groupedBlocks.length > 0) {
        //         for (let i = 0; i < groupedBlocks.length; i++) {
        //             createGroupedItem(groupedBlocks[i]);
        //         }
        //     }
        //     console.log(groupedBlocks.value, "groupedBlocks");
        // };


        // сгрупировать
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
        // разгруппировать
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
        // удалить выбранный объект
        const deleteObject = () => {
            // canvas.getActiveObject().remove();
            canvas.getActiveObjects().forEach((obj) => {
                canvas.remove(obj);
                console.log(obj, "delete this object");
            });
            canvas.discardActiveObject().renderAll();
        };
        // выровнять элементы по левому краю
        const alignLeft = () => {
            if (!getAllActiveObject()) {
                return;
            } else {
                console.log(getAllActiveObject())
                const activeObject = getAllActiveObject();
                const allObjects = activeObject._objects;
                const length = allObjects.length;
                const rowFirst = allObjects[0].row
                const rowLast = allObjects[length - 1].row

                const quantitySeatOnRow = Math.ceil(activeObject.width / 40);
                let arrayObjects = [];
                for (let r = rowFirst; r <= rowLast; r++) {
                    let rowObjects = []
                    for (let c = 0; c < quantitySeatOnRow; c++) {
                        rowObjects.push(0)
                    }
                    arrayObjects.push(rowObjects)
                }
                for (let l = 0; l < length; l++) {
                    arrayObjects[Math.floor((allObjects[l].top + activeObject.height / 2) / 40)][Math.floor((allObjects[l].left + activeObject.width / 2) / 40)] = l + 1
                    // console.log(Math.floor((allObjects[l].top + activeObject.width / 2) / 40))
                    //  console.log(Math.floor((allObjects[l].left+activeObject.width/2)/40),Math.floor((allObjects[l].top+activeObject.width/2)/40))
                }
                // выравнивает по левому краю массив
                for (let r = 0; r < arrayObjects.length; r++) {
                    let step = 0;
                    for (let c = 0; c < arrayObjects[r].length; c++) {
                        if (arrayObjects[r][c] == 0) {
                            step++
                            // console.log(step,"step", r, c)
                        } else {
                            arrayObjects[r][c - step] = arrayObjects[r][c];
                            // arrayObjects[r][c]=0
                        }
                    }
                    // console.log(step)
                    for (let n = arrayObjects[r].length - 1; n >= arrayObjects[r].length - step; n--) {
                        arrayObjects[r][n] = 0
                    }
                }
                for (let r = 0; r < arrayObjects.length; r++) {
                    for (let c = 0; c < arrayObjects[r].length; c++) {
                        if (arrayObjects[r][c] !== 0) {
                            // console.log(allObjects[arrayObjects[r][c] - 1])
                            allObjects[arrayObjects[r][c] - 1].set("tleft", parseInt(40, 10) * c - activeObject.width / 2 + 15).setCoords();
                            allObjects[arrayObjects[r][c] - 1].set("left", parseInt(40, 10) * c - activeObject.width / 2 + 15).setCoords();
                        }

                    }
                }

                canvas.requestRenderAll();
                // console.log(canvas.getActiveObject(), arrayObjects)
            }

        }
        // выровнять элементы по правому краю
        const alignRight = () => {
            if (!getAllActiveObject()) {
                return;
            } else {
                const activeObject = getAllActiveObject();
                const allObjects = activeObject._objects;
                const length = allObjects.length;
                const rowFirst = allObjects[0].row
                const rowLast = allObjects[length - 1].row

                const quantitySeatOnRow = Math.ceil(activeObject.width / 40);
                let arrayObjects = [];
                for (let r = rowFirst; r <= rowLast; r++) {
                    let rowObjects = []
                    for (let c = 0; c < quantitySeatOnRow; c++) {
                        rowObjects.push(0)
                    }
                    arrayObjects.push(rowObjects)
                }
                for (let l = 0; l < length; l++) {
                    arrayObjects[Math.floor((allObjects[l].top + activeObject.height / 2) / 40)][Math.floor((allObjects[l].left + activeObject.width / 2) / 40)] = l + 1
                    //  console.log(Math.floor((allObjects[l].left+activeObject.width/2)/40),Math.floor((allObjects[l].top+activeObject.width/2)/40))
                }

                // выравнивает по правому краю массив
                for (let r = 0; r < arrayObjects.length; r++) {
                    let step = 0;
                    for (let c = arrayObjects[r].length - 1; c >= 0; c--) {
                        if (arrayObjects[r][c] == 0) {
                            step++
                            // console.log(step,"step", r, c)
                        } else {
                            arrayObjects[r][c + step] = arrayObjects[r][c];
                            // arrayObjects[r][c]=0
                        }
                    }
                    // console.log(step)
                    for (let n = 0; n < step; n++) {
                        arrayObjects[r][n] = 0
                    }
                }
                for (let r = 0; r < arrayObjects.length; r++) {
                    for (let c = 0; c < arrayObjects[r].length; c++) {
                        if (arrayObjects[r][c] !== 0) {
                            // console.log(allObjects[arrayObjects[r][c] - 1])
                            allObjects[arrayObjects[r][c] - 1].set("left", parseInt(40, 10) * c - activeObject.width / 2 + 15).setCoords();
                            allObjects[arrayObjects[r][c] - 1].set("tleft", parseInt(40, 10) * c - activeObject.width / 2 + 15).setCoords();
                        }

                    }
                }

                canvas.requestRenderAll();
                // console.log(canvas.getActiveObject(), arrayObjects)

            }

        }
        // выровнять элементы по центру
        const alignCenter = () => {
            if (!getAllActiveObject()) {
                return;
            } else {
                const activeObject = getAllActiveObject();
                const allObjects = activeObject._objects;
                const length = allObjects.length;
                const rowFirst = allObjects[0].row
                const rowLast = allObjects[length - 1].row

                const quantitySeatOnRow = Math.ceil(activeObject.width / 40);
                let arrayObjects = [];
                for (let r = rowFirst; r <= rowLast; r++) {
                    let rowObjects = []
                    for (let c = 0; c < quantitySeatOnRow; c++) {
                        rowObjects.push(0)
                    }
                    arrayObjects.push(rowObjects)
                }
                for (let l = 0; l < length; l++) {
                    arrayObjects[Math.floor((allObjects[l].top + activeObject.height / 2) / 40)][Math.floor((allObjects[l].left + activeObject.width / 2) / 40)] = l + 1
                    //  console.log(Math.floor((allObjects[l].left+activeObject.width/2)/40),Math.floor((allObjects[l].top+activeObject.width/2)/40))
                }
                //получаем из массива для каждой строки количество пустых мест
                let rowEmpty = []
                // выравнивает по правому краю массив
                for (let r = 0; r < arrayObjects.length; r++) {
                    let step = 0;
                    for (let c = arrayObjects[r].length - 1; c >= 0; c--) {
                        if (arrayObjects[r][c] == 0) {
                            step++
                            // console.log(step,"step", r, c)
                        } else {
                            arrayObjects[r][c + step] = arrayObjects[r][c];
                            // arrayObjects[r][c]=0
                        }
                    }
                    // console.log(step)
                    for (let n = 0; n < step; n++) {
                        arrayObjects[r][n] = 0
                    }
                    rowEmpty.push(step)
                }
                // выравнивает по центру
                console.log(arrayObjects, "arrayObjects")
                for (let r = 0; r < arrayObjects.length; r++) {
                    for (let c = 0; c < arrayObjects[r].length; c++) {
                        if (arrayObjects[r][c] !== 0) {
                            arrayObjects[r][c - rowEmpty[r] % 2 - (rowEmpty[r] - rowEmpty[r] % 2) / 2] = arrayObjects[r][c];
                            if (rowEmpty[r] > 0) {
                                arrayObjects[r][c] = 0
                            }
                        }
                    }
                }


                for (let r = 0; r < arrayObjects.length; r++) {
                    for (let c = 0; c < arrayObjects[r].length; c++) {
                        if (arrayObjects[r][c] !== 0) {
                            // console.log(allObjects[arrayObjects[r][c] - 1])
                            let lengthShift = 0;
                            if (rowEmpty[r] % 2 == 1) {
                                lengthShift = 20
                            }
                            allObjects[arrayObjects[r][c] - 1].set("left", parseInt(40, 10) * c - activeObject.width / 2 + 15 + lengthShift).setCoords();
                            allObjects[arrayObjects[r][c] - 1].set("tleft", parseInt(40, 10) * c - activeObject.width / 2 + 15).setCoords();
                        }

                    }
                }

                canvas.requestRenderAll();
                // console.log(canvas.getActiveObject(), arrayObjects)
            }
        }
        // выровнять пространство между элементами
        const alignSpaceBeween = () => {
            if (!getAllActiveObject()) {
                return;
            } else {
                console.log(getAllActiveObject(), getAllActiveObject()._objects[0].row, getAllActiveObject()._objects[getAllActiveObject()._objects.length - 1].row)
            }
        }
        // все активные элемненты
        const getActiveObjects = () => {
            createGroupedItem();
            return canvas.getActiveObjects();
        };
        // метод создания разгруппированного сектора
        const createUngroupedSector = (createSectorData) => {
            if (!createSectorData.value.seats.length) {
                return;
            }
            let sector = createSectorData.value;

            if (sector.seats.length !== 0) {
                for (let s = 0; s < sector.seats.length; s++) {
                    createSeat(sector.seats[s], sector.typeGrouped);
                }
            }
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
            console.log(sector)

            for (let s = 0; s < sector.seats.length; s++) {
                const seat = new fabric.Seat({
                    left: sector.seats[s].left,
                    top: sector.seats[s].top,
                    tleft: sector.seats[s].left,
                    ttop: sector.seats[s].top,
                    fill: "#ffffff",
                    shift: sector.seats[s].shift,
                    width: sector.seats[s].width,
                    height: sector.seats[s].height,
                    strokeWidth: 1,
                    stroke: "#000",
                    rx: 10,
                    ry: 10,
                    angle: sector.seats[s].angle,
                    tAngle: sector.seats[s].angle,
                    scaleX: 1,
                    scaleY: 1,
                    text: "" + sector.seats[s].number,
                    row: sector.seats[s].row,
                    rowID: sector.seats[s].rowID,
                    hasControls: true,
                    textBox: this,
                    id: sector.seats[s].id,
                    typeElement: sector.seats[s].typeElement,
                    sectorId: sector.seats[s].sectorId,
                    typeGrouped: sector.typeGrouped,
                    radius: sector.seats[s].radius,
                    colID: sector.seats[s].colID,
                    quantitySeats: sector.seats[s].quantitySeats,
                    // меняет контур вращения
                    originX: "center",
                    originY: "center",
                });
                // const seat = createSeat(sector.seats[s], sector.typeGrouped)
                group.addWithUpdate(seat);
            }
            // if (sector.groupped) {
            //     group.canvas.toActiveSelection();
            //     group.canvas.requestRenderAll();
            // }
            group.angle = sector.rotate;
            group.fill = "blue";
            console.log(group)
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
                        // hoverCursor: "move",
                        // hoverCursor: "pointer"
                        hoverCursor: "default"
                    }
                )
            );
        };
        // Возвращает выделенные объекты
        let getAllActiveObject = () => {
            if (!canvas.getActiveObject()) {
                return;
            } else {
                // canvas.getActiveObject().set("originX", "center").setCoords();
                // canvas.getActiveObject().set("originY", "center").setCoords();
                return canvas.getActiveObject()
            }

        }

        // WATCHERS
        // Изменение угла выделенного объекта
        watch(angle, (newangle, oldangle) => {
            if (newangle == 180 && oldangle == 179) {
                angle = -180;
            }
            if (!getAllActiveObject()) {
                return;
            } else {
                // console.log(getAllActiveObject().angle)
                // resetCreateSector.value;
                getAllActiveObject()
                    .set("originX", parseInt("center", 10))
                    .setCoords();
                getAllActiveObject()
                    .set("originY", parseInt("center", 10))
                    .setCoords();
                getAllActiveObject()
                    .set("angle", parseInt(newangle, 10))
                    .setCoords();
                canvas.requestRenderAll();
            }
        });
        // изменение радиуса изгиба curve
        watch(curve, (newcurve, oldcurve) => {
            let originCoordinate = false;
            if (!getAllActiveObject()) {
                return;
            } else {
                originCoordinate = true;
                let activeObject = getAllActiveObject();
                // activeObject.set("originX", "center").setCoords();
                // activeObject.set("originY", "center").setCoords();
                // console.log(activeObject)
            }
            if (originCoordinate) {
                let activeObject = getAllActiveObject();
                let widthBlock = activeObject.width
                let heightBlock = activeObject.height
                let chord = widthBlock;
                let heightSegment = Math.abs(newcurve);
                if (newcurve == 0) {
                    heightSegment = 1
                }
                if (Math.abs(newcurve) > widthBlock / 2) {
                    heightSegment = widthBlock / 2
                }
                let centralCorner = 2 * 2 * Math.atan(2 * heightSegment / chord)
                let LengthCurve = chord * centralCorner / (2 * Math.sin(centralCorner / 2));
                let radiusSegment = 2 * LengthCurve / (2 * centralCorner);
                let coefficient = -1;
                if (newcurve >= 0) {
                    coefficient = 1
                } else {
                    coefficient = -1
                    newcurve = -newcurve
                }

                activeObject._objects.map((seat) => {
                    switch (seat.typeGrouped) {
                        case "rectangle":
                            let colID = seat.colID;
                            let quantitySeats = seat.quantitySeats;
                            let angle = centralCorner * colID / (quantitySeats - 1) - centralCorner / 2;
                            const dLeft =
                                // seat.tleft +
                                radiusSegment * (Math.sin(angle) - 1) + radiusSegment
                            const dTop =
                                seat.ttop +
                                radiusSegment * (-Math.cos(angle) + 1)
                            // + seat.ttop * (-Math.cos(angle) + 1)
                            seat.set("angle",
                                angle * 180 / Math.PI
                            )
                            seat.set("radius",
                                radiusSegment
                            )
                            seat.set("left",
                                coefficient * (
                                    dLeft
                                    // + widthBlock / 2
                                )
                            ).setCoords();
                            seat.set("top",
                                coefficient * (
                                    // seat.ttop/2 +
                                    dTop
                                    - heightBlock / 2
                                )
                            ).setCoords();
                            break;
                        case "trapezoid":
                            // console.log(seat)
                            let shiftTrapezoid = seat.shift;
                            let lengthToCenter = widthBlock / 2;
                            let param1 = (lengthToCenter - shiftTrapezoid + shiftTrapezoid * (Math.cos(seat.tAngle)) ^ 2) ^ 2
                            let param2 = (Math.cos(seat.tAngle) * Math.sin(seat.tAngle) * shiftTrapezoid) ^ 2
                            let shiftAngle = Math.asin((param1 / (param1 + param2)) ^ 0.5);
                            // console.log((param1/(param1+param2))^0.5,param1, param2,param1+param2,"shiftAngle")
                            let colIDtrapezoid = seat.colID;
                            let quantitySeatstrapezoid = seat.quantitySeats;
                            let angletrapezoid = centralCorner * colIDtrapezoid / (quantitySeatstrapezoid - 1) - centralCorner / 2
                            // +shiftAngle;
                            const dLefttrapezoid =
                                // seat.tleft +
                                radiusSegment * (Math.sin(angletrapezoid) - 1) + radiusSegment
                            const dToptrapezoid =
                                seat.ttop +
                                radiusSegment * (-Math.cos(angletrapezoid) + 1)
                            // + seat.ttop * (-Math.cos(angle) + 1)
                            seat.set("angle",
                                angletrapezoid * 180 / Math.PI
                            )
                            seat.set("radius",
                                radiusSegment
                            )
                            seat.set("left",
                                coefficient * (
                                    dLefttrapezoid
                                    // + widthBlock / 2
                                )
                            ).setCoords();
                            seat.set("top",
                                coefficient * (
                                    // seat.ttop/2 +
                                    dToptrapezoid
                                    - heightBlock / 2
                                )

                            ).setCoords();
                            break;
                    }
                })

                canvas.requestRenderAll();
            }
        });
        // изменение расстояние между строками (растягивание)
        watch(stretch, (newstretch, oldstretch) => {
            let originCoordinate = false;
            if (!getAllActiveObject()) {
                return;
            } else {
                originCoordinate = true;
                let activeObject = getAllActiveObject();

                // activeObject.set("originX", "center").setCoords();
                // activeObject.set("originY", "center").setCoords();
            }
            if (originCoordinate) {
                let activeObject = getAllActiveObject();
                let width = activeObject.width
                let height = activeObject.height
                // console.log(activeObject)
                // activeObject.set("originX", "center").setCoords();
                // activeObject.set("originY", "center").setCoords();
                activeObject._objects.map((seat) => {
                    switch (seat.typeGrouped) {
                        case "rectangle":
                            if (newstretch > oldstretch) {
                                seat.set("top", seat.top + seat.rowID).setCoords();
                                seat.set("ttop", seat.top + seat.rowID).setCoords();
                            } else {
                                seat.set("top", seat.top - seat.rowID).setCoords();
                                seat.set("ttop", seat.top - seat.rowID).setCoords();
                            }

                            // console.log("rectangle");
                            break;
                        case "trapezoid":
                            if (newstretch > oldstretch) {
                                seat.set("top", seat.top + seat.rowID).setCoords();
                                seat.set("ttop", seat.top + seat.rowID).setCoords();
                            } else {
                                seat.set("top", seat.top - seat.rowID).setCoords();
                                seat.set("ttop", seat.top - seat.rowID).setCoords();
                            }

                            // console.log("rectangle");
                            break;
                        case "circle":
                            const radius = seat.radius + seat.rowID * newstretch;
                            seat.set("top",
                                radius + radius * (Math.cos(-seat.angle * Math.PI / 180) - 1)).setCoords();
                            seat.set("left",
                                radius + radius * (Math.sin(-seat.angle * Math.PI / 180) - 1)).setCoords();
                            seat.set("ttop",
                                radius + radius * (Math.cos(-seat.angle * Math.PI / 180) - 1)).setCoords();
                            seat.set("tleft",
                                radius + radius * (Math.sin(-seat.angle * Math.PI / 180) - 1)).setCoords();

                            // console.log("circle");
                            break;
                        case "ring":
                            const radiusRing = seat.radius + seat.rowID * newstretch;
                            seat.set("top",
                                radiusRing + radiusRing * (Math.cos(-seat.angle * Math.PI / 180) - 1)).setCoords();
                            seat.set("left",
                                radiusRing + radiusRing * (Math.sin(-seat.angle * Math.PI / 180) - 1)).setCoords();
                            seat.set("ttop",
                                radiusRing + radiusRing * (Math.cos(-seat.angle * Math.PI / 180) - 1)).setCoords();
                            seat.set("tleft",
                                radiusRing + radiusRing * (Math.sin(-seat.angle * Math.PI / 180) - 1)).setCoords();
                            break;

                    }
                })

                canvas.requestRenderAll();
                // console.log(activeObject)
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

        let canvasToJSON = () => {
            console.log(canvas.toJSON())
        }
        let ceateSector = reactive({
            entrance: 0,
            entranceValue: 0,
            figure: "3",
            groupped: false,
            position: 1,
            positionObject: 0,
            qtyRow: 5,
            qtySeats: 5,
            radius: 0,
            rotate: 0,
            row: 5,
            seat: 5,
            sectorValue: 0,
        });
        const { drawRectangle } = useCreateRectangle(createSectorDraw.value);
        // HOOK MOUNTED
        onMounted(() => {
            canvas = new fabric.Canvas(ctx.value);
            dataHall.value = HALL.value;
            fabric.Seat = fabric.util.createClass(fabric.Rect, {
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


            // start polygon
            // var min = 99;
            // var max = 999999;
            // var polygonMode = true;
            // var pointArray = new Array();
            // var lineArray = new Array();
            // var activeLine;
            // var activeShape = false;
            // var canvas1
            // $(window).load(function () {
            //     prototypefabric.initCanvas();
            //     ctx.click(function () {
            //         prototypefabric.polygon.drawPolygon();
            //     });
            // });
            // var prototypefabric = new function () {
            //     this.initCanvas = function () {
            //         canvas1 = window._canvas = new fabric.Canvas(ctx.value);
            //         canvas1.setWidth(1000) //window.width());
            //         canvas1.setHeight(1000) //window.height());
            //         //canvas.selection = false;

            //         canvas1.on('mouse:down', function (options) {
            //             if (options.target && options.target.id == pointArray[0].id) {
            //                 prototypefabric.polygon.generatePolygon(pointArray);
            //             }
            //             if (polygonMode) {
            //                 prototypefabric.polygon.addPoint(options);
            //             }
            //         });
            //         canvas1.on('mouse:up', function (options) {

            //         });
            //         canvas1.on('mouse:move', function (options) {
            //             if (activeLine && activeLine.class == "line") {
            //                 var pointer = canvas1.getPointer(options.e);
            //                 activeLine.set({ x2: pointer.x, y2: pointer.y });

            //                 var points = activeShape.get("points");
            //                 points[pointArray.length] = {
            //                     x: pointer.x,
            //                     y: pointer.y
            //                 }
            //                 activeShape.set({
            //                     points: points
            //                 });
            //                 canvas1.renderAll();
            //             }
            //             canvas1.renderAll();
            //         });
            //     };
            // };



            // prototypefabric.polygon = {
            //     drawPolygon: function () {
            //         polygonMode = true;
            //         pointArray = new Array();
            //         lineArray = new Array();
            //         activeLine;
            //     },
            //     addPoint: function (options) {
            //         var random = Math.floor(Math.random() * (max - min + 1)) + min;
            //         var id = new Date().getTime() + random;
            //         var circle = new fabric.Circle({
            //             radius: 5,
            //             fill: '#ffffff',
            //             stroke: '#333333',
            //             strokeWidth: 0.5,
            //             left: (options.e.layerX / canvas1.getZoom()),
            //             top: (options.e.layerY / canvas1.getZoom()),
            //             selectable: false,
            //             hasBorders: false,
            //             hasControls: false,
            //             originX: 'center',
            //             originY: 'center',
            //             id: id,
            //             objectCaching: false
            //         });
            //         if (pointArray.length == 0) {
            //             circle.set({
            //                 fill: 'red'
            //             })
            //         }
            //         var points = [(options.e.layerX / canvas1.getZoom()), (options.e.layerY / canvas1.getZoom()), (options.e.layerX / canvas1.getZoom()), (options.e.layerY / canvas1.getZoom())];
            //         line = new fabric.Line(points, {
            //             strokeWidth: 2,
            //             fill: '#999999',
            //             stroke: '#999999',
            //             class: 'line',
            //             originX: 'center',
            //             originY: 'center',
            //             selectable: false,
            //             hasBorders: false,
            //             hasControls: false,
            //             evented: false,
            //             objectCaching: false
            //         });
            //         if (activeShape) {
            //             var pos = canvas1.getPointer(options.e);
            //             var points = activeShape.get("points");
            //             points.push({
            //                 x: pos.x,
            //                 y: pos.y
            //             });
            //             var polygon = new fabric.Polygon(points, {
            //                 stroke: '#333333',
            //                 strokeWidth: 1,
            //                 fill: '#cccccc',
            //                 opacity: 0.3,
            //                 selectable: false,
            //                 hasBorders: false,
            //                 hasControls: false,
            //                 evented: false,
            //                 objectCaching: false
            //             });
            //             canvas1.remove(activeShape);
            //             canvas1.add(polygon);
            //             activeShape = polygon;
            //             canvas1.renderAll();
            //         }
            //         else {
            //             var polyPoint = [{ x: (options.e.layerX / canvas1.getZoom()), y: (options.e.layerY / canvas1.getZoom()) }];
            //             var polygon = new fabric.Polygon(polyPoint, {
            //                 stroke: '#333333',
            //                 strokeWidth: 1,
            //                 fill: '#cccccc',
            //                 opacity: 0.3,
            //                 selectable: false,
            //                 hasBorders: false,
            //                 hasControls: false,
            //                 evented: false,
            //                 objectCaching: false
            //             });
            //             activeShape = polygon;
            //             canvas1.add(polygon);
            //         }
            //         activeLine = line;

            //         pointArray.push(circle);
            //         lineArray.push(line);

            //         canvas1.add(line);
            //         canvas1.add(circle);
            //         canvas1.selection = false;
            //     },
            //     generatePolygon: function (pointArray) {
            //         var points = new Array();
            //         $.each(pointArray, function (index, point) {
            //             points.push({
            //                 x: point.left,
            //                 y: point.top
            //             });
            //             canvas1.remove(point);
            //         });
            //         $.each(lineArray, function (index, line) {
            //             canvas1.remove(line);
            //         });
            //         canvas1.remove(activeShape).remove(activeLine);
            //         var polygon = new fabric.Polygon(points, {
            //             stroke: '#333333',
            //             strokeWidth: 0.5,
            //             fill: 'red',
            //             opacity: 1,
            //             hasBorders: false,
            //             hasControls: false
            //         });
            //         canvas1.add(polygon);

            //         activeLine = null;
            //         activeShape = null;
            //         polygonMode = false;
            //         canvas1.selection = true;
            //     }
            // };

            // end polygon
        });
        onUpdated(() => {
            if (newSector.value) {
                console.log(dataBlock.value)
                if (dataBlock.value.groupped) {
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
                        // default:
                        //     createGroupedSector(rectangleSector);
                        //     break;
                    }
                } else {
                    switch (dataBlock.value.figure) {
                        case 1:
                            createUngroupedSector(circleSector);
                            break;
                        case 2:
                            console.log(ringSector)
                            createUngroupedSector(ringSector);
                            break;
                        case 3:
                            createUngroupedSector(rectangleSector);
                            break;
                        case 4:
                            createUngroupedSector(trapezoidSector);
                            break;
                        case 5:
                            createUngroupedSector(triangleSector);
                            break;
                        case 6:
                            createUngroupedSector(polylineSector);
                            break;
                        // default:
                        //     createUngroupedSector(rectangleSector);
                        //     break;
                    }
                }

            }
            falseNewSector();

            // Для отрисолвки прямоугольника
            // начало точки
            if (!!selectDraw.value) {
                const rectDrag = new fabric.Seat({
                    fill: "#af0",
                });

                let coordX = 0,
                    coordY = 0,
                    widthRect = 0,
                    heightRect = 0;
                let isMove = false;

                canvas.on({
                    "mouse:down": (e) => {
                        if (selectDraw.value) {
                            // console.log(selectDraw.value, "mouse:down");
                            coordX = e.pointer.x;
                            coordY = e.pointer.y;
                            // rectDrag.set("top", coordY).setCoords();
                            // rectDrag.set("left", coordX).setCoords();
                            isMove = true;
                        }
                    },
                });
                canvas.on({
                    "mouse:move": (e) => {
                        if (selectDraw.value) {
                            // console.log(coordX, "coordX", e.pointer.x, coordY, "mouse:move");
                            widthRect = e.pointer.x - coordX;
                            heightRect = e.pointer.y - coordY;
                            const quantityRow = heightRect / 40;
                            const quantitySeat = widthRect / 40;
                            rectDrag.set("top", coordY).setCoords();
                            rectDrag.set("left", coordX).setCoords();
                            rectDrag.set("width", widthRect).setCoords();
                            rectDrag.set("height", heightRect).setCoords();
                            rectDrag.set("fill", "#af0");
                            rectDrag.set("fontSize", "80px");
                            rectDrag.set("text", Math.floor(quantityRow) + "X" + Math.floor(quantitySeat));
                        }

                    },
                });

                canvas.on("mouse:up", (e) => {
                    if (selectDraw.value) {
                        // console.log(coordX, e.pointer.x, coordY, "mouse:up");
                        widthRect = e.pointer.x - coordX;
                        heightRect = e.pointer.y - coordY;
                        const quantityRow = heightRect / 40;
                        const quantitySeat = widthRect / 40;
                        // rectDrag.set("width", widthRect).setCoords();
                        // rectDrag.set("height", heightRect).setCoords();
                        // rectDrag.set("text", Math.floor(quantityRow) + "X" + Math.floor(quantitySeat));
                        rectDrag.set("fill", "#af000055");
                        rectDrag.set("text", "");
                        ceateSector.qtyRow = Math.floor(quantityRow)
                        ceateSector.qtySeats = Math.floor(quantitySeat)
                        ceateSector.row = 10
                        ceateSector.seat = 5
                        // не работаетт
                        // changeCreateSectorDraw(ceateSector);
                        // changeCreateSectorDraw("asdasd");
                        changeCreateSectorDrawAction([10])

                        createUngroupedSector(drawRectangle);
                        changeSelectDraw();
                        // console.log(ceateSector, drawRectangle, "createSectorDraw")
                    }

                });
                canvas.add(rectDrag);
            }
            // конец точки

            // canvas.on("mouse:up", (e) => {
            //     console.log(canvas.getActiveObject(), canvas.getActiveObject()._objects[0].row, canvas.getActiveObject()._objects[canvas.getActiveObject()._objects.length - 1].row)
            // })

        });
        return {
            ctx,
            createUngroupedSector,
            createHall,
            unGroup,
            deleteObject,
            canvas,
            HALL,
            // Seat,
            hookUpdate,
            store,
            dataHall,
            activeSelection,
            getActive: true,
            groupedBlocks,
            angle,
            curve,
            stretch,
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
            changeCreateSectorDraw,
            createSectorDraw,
            changeCreateSectorDrawAction,
            ceateSector,
            alignLeft,
            alignRight,
            alignCenter,
            alignSpaceBeween,
            canvasToJSON,
            getAllActiveObject,
        };
    },
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
    z-index: 9999;

    button {
        padding: 10px;
        margin-right: 10px;
        cursor: pointer;

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