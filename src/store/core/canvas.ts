import { createStore } from "vuex";
import { Seat } from "@/interface/seat";
export const canvasModule = {
  state: () => ({
    arrowRight: 0,
    arrowLeft: 0,
    arrowDown: 0,
    arrowUp: 0,
    arcAngleTest: 180,
    qty: 5,
    stateSectorId: 0,
    radius: 100,
    createWithDraw: false,
    testCircle: [
      {
        x: 100,
        y: 100,
        width: 30,
        height: 30,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        fill: "#fff",
        name: "rect1",
        draggable: true,
        cornerRadius: 7,
        stroke: "black",
        strokeWidth: 1,
        number: 1,
      },
      {
        x: 150,
        y: 100,
        width: 30,
        height: 30,
        rotation: Math.PI / 4,
        scaleX: 1,
        scaleY: 1,
        fill: "#fff",
        name: "rect1",
        draggable: true,
        cornerRadius: 10,
        stroke: "black",
        strokeWidth: 1,
        number: 10,
      },
      {
        x: 200,
        y: 100,
        width: 30,
        height: 30,
        rotation: Math.PI / 2,
        scaleX: 1,
        scaleY: 1,
        fill: "#fff",
        name: "rect1",
        draggable: true,
        cornerRadius: 7,
        stroke: "black",
        strokeWidth: 1,
        number: 2,
      },
      {
        x: 250,
        y: 100,
        width: 30,
        height: 30,
        rotation: (3 * Math.PI) / 4,
        scaleX: 1,
        scaleY: 1,
        fill: "#fff",
        name: "rect1",
        draggable: true,
        cornerRadius: 7,
        stroke: "black",
        strokeWidth: 1,
        number: 4,
      },
      {
        x: 300,
        y: 100,
        width: 30,
        height: 30,
        rotation: Math.PI,
        scaleX: 1,
        scaleY: 1,
        fill: "#fff",
        name: "rect1",
        draggable: true,
        cornerRadius: 7,
        stroke: "black",
        strokeWidth: 1,
        number: 5,
      },

      //   {
      //     x: 30,
      //     y: 70,
      //     width: 30,
      //     height: 30,
      //     rotation: 0,
      //     scaleX: 1,
      //     scaleY: 1,
      //     fill: "#fff",
      //     name: "rect1",
      //     draggable: true,
      //     cornerRadius: 7,
      //     stroke: "black",
      //     strokeWidth: 1,
      //     number: 10,
      //   },
      //   {
      //     x: 70,
      //     y: 70,
      //     width: 30,
      //     height: 30,
      //     rotation: 0,
      //     scaleX: 1,
      //     scaleY: 1,
      //     fill: "#fff",
      //     name: "rect1",
      //     draggable: true,
      //     cornerRadius: 7,
      //     stroke: "black",
      //     strokeWidth: 1,
      //     number: 10,
      //   },
      //   {
      //     x: 110,
      //     y: 70,
      //     width: 30,
      //     height: 30,
      //     rotation: 0,
      //     scaleX: 1,
      //     scaleY: 1,
      //     fill: "#fff",
      //     name: "rect1",
      //     draggable: true,
      //     cornerRadius: 7,
      //     stroke: "black",
      //     strokeWidth: 1,
      //     number: 10,
      //   },
      //   {
      //     x: 150,
      //     y: 70,
      //     width: 30,
      //     height: 30,
      //     rotation: 0,
      //     scaleX: 1,
      //     scaleY: 1,
      //     fill: "#fff",
      //     name: "rect1",
      //     draggable: true,
      //     cornerRadius: 7,
      //     stroke: "black",
      //     strokeWidth: 1,
      //     number: 10,
      //   },
      //   {
      //     x: 190,
      //     y: 70,
      //     width: 30,
      //     height: 30,
      //     rotation: 0,
      //     scaleX: 1,
      //     scaleY: 1,
      //     fill: "#fff",
      //     name: "rect1",
      //     draggable: true,
      //     cornerRadius: 7,
      //     stroke: "black",
      //     strokeWidth: 1,
      //     number: 10,
      //   },
    ],
    createSector: {},
    testNumber: 20,
    initialSeat: {
      rotation: 0,
      x: 0,
      y: 0,
      width: 30,
      height: 30,
      scaleX: 1,
      scaleY: 1,
      fill: "#fff",
      name: "rect1",
      draggable: true,
      cornerRadius: 7,
      stroke: "black",
      strokeWidth: 1,
      id: 1,
    },
    initialBlock: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      id: 0,
      rotate: 0,
      grouped: false,
      entrance: 0,
      title: "unknown",
      sectorItem: 0,
      radius: 0,
      position: 0,
      initialRow: 0,
      initialSeat: 0,
      seats: [],
    },
    hookUpdate: 0,
    angleGroup: 0,
    groupedBlocks: [],
    newSector: false,
    // begin hall
    hall: {
      width: 1000,
      height: 1500,
      id: 0,
      title: "Абономентная компания",
      sectors: [
        // {
        //   width: 1000,
        //   height: 500,
        //   x: 0,
        //   y: 0,
        //   rotate: 0,
        //   rows: [1, 2, 3, 4],
        //   title: "Бельэтаж",
        //   seats: [
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //     {
        //       id: 0,
        //       number: 1,
        //       color: "#000",
        //       background: "#fff",
        //       borderColor: "#000",
        //       status: "K",
        //       x: 0,
        //       y: 0,
        //     },
        //   ],
        // },
      ],
    },
    // end hall

    dataBlock: {},
  }),
  getters: {
    changetestCircle(state: any) {
      return state.testCircle;
    },
    changetestNumber(state: any) {
      return state.testNumber;
    },
    changeAnglegroup() {},
    HALL(state: any) {
      return state.hall;
    },
    changeArrowRight(state: any) {
      state.hookUpdate++;
      return state.arrowRight++;
    },
    changeArrowLeft(state: any) {
      state.hookUpdate++;
      return state.arrowLeft++;
    },
    changeArrowDown(state: any) {
      state.hookUpdate++;
      return state.arrowDown++;
    },
    resetCreateSector(state: any) {
      state.createSector = {};
    },
  },

  mutations: {
    // Добавляем методы для изменения сотояния
    createSeat(state: any, datas: object) {
      (state.seat.x = 250),
        (state.seat.y = 500),
        (state.seat.rotate = 500),
        (state.seat.number = 500);
    },
    createPlace(state: any, seat: any) {
      state.seat.x += seat;
    },
    groupedBlock(state: any, blocks: any) {
      // state.hookUpdate++;

      state.groupedBlocks.push(blocks);
      for (let s = 0; s < state.hall.sectors.length; s++) {
        for (let b = 0; b < blocks.length; b++) {
          if (state.hall.sectors[s].id === blocks[b].sectorId) {
            // state.hall.sectors[s].seats.filter((elem:any)=>elem.id!=blocks[b].id)
            for (let i = 0; i < state.hall.sectors[s].seats.length; i++) {
              if (blocks[b].id == state.hall.sectors[s].seats[i].id) {
                state.hall.sectors[s].seats.splice(i, 1);
                // console.log(state.hall.sectors[s].seats[i].id)
              }
            }
          }
        }
        // console.log(state.hall.sectors);
      }
    },
    deleteBlock(state: any, block: any) {
    },
    createBlock(state: any, block: any) {
      // console.log(block);
      state.hookUpdate++;
      state.newSector = true;
      state.dataBlock = block;
      state.stateSectorId++;
      
      // добавляет данные в массви HALL (delete)
      let initialRow = block.row;
      let initialSeat = block.seat;
      let position = block.position;
      let radius = block.radius;
      let angleSegment = 0;
      if (radius !== 0) {
        angleSegment = (block.qtySeats * 40) / radius;
      }
      let coordinateR = { x: 0, y: 0 };
      let allSeats = [];
      let rowed = 0;
      let rowedCoordinates = [];
      for (let r = 0; r < block.qtyRow; r++) {
        for (let s = 0; s < block.qtySeats; s++) {
          if (s % block.qtyRow == 0) {
            rowed++;
          }
          let leftCoordinate;
          switch (position) {
            case 1:
              // leftCoordinate = (s % block.qtyRow) * 40;
              leftCoordinate = s * 40;
              break;
            case 2:
              // leftCoordinate = (s % block.qtyRow) * 40;
              leftCoordinate = s * 40;
              break;
            case 3:
              // leftCoordinate = (s % block.qtyRow) * 40;
              leftCoordinate = s * 40;
              break;
            case 4:
              // leftCoordinate = (s % block.qtyRow) * 40;
              leftCoordinate = s * 40;
              break;
            default:
              // leftCoordinate = (s % block.qtyRow) * 40;
              leftCoordinate = s * 40;
          }
          let angle = angleSegment * (s / (block.qtySeats - 1) - 1 / 2);
          let dY = radius * (Math.cos(angle) - 1);
          let dX = radius * (Math.sin(angle) - 1);
          let place: Seat = {
            rotation: 0,
            left: leftCoordinate,
            top: r * 40 - dY,
            width: 30,
            height: 30,
            scaleX: 1,
            scaleY: 1,
            fill: "#fff",
            name: "rect" + (s + 1),
            draggable: true,
            cornerRadius: 5,
            stroke: "black",
            strokeWidth: 1,
            number: initialSeat != 0 ? initialSeat + s : initialSeat + s + 1,
            id: s + 1,
            typeElement: "seat",
            angle: (angle * 180) / Math.PI,
            sectorId: state.stateSectorId,
          };
          allSeats.push(place);
        }
      }
      state.initialBlock.x = 0;
      state.initialBlock.y = 0;
      state.initialBlock.width = 1000;
      state.initialBlock.height = 500;
      state.initialBlock.id = state.stateSectorId;
      state.initialBlock.rotate = block.rotate;
      state.initialBlock.grouped = block.groupped;
      state.initialBlock.entrance = block.entrance;
      state.initialBlock.title = "sector" + state.stateSectorId;
      state.initialBlock.sectorItem = block.sector;
      state.initialBlock.radius = block.radius;
      state.initialBlock.position = block.position;
      state.initialBlock.initialRow = block.row;
      state.initialBlock.initialSeat = block.seat;
      state.initialBlock.seats = allSeats;

      state.createSector = state.initialBlock;
      state.hall.sectors.push(state.initialBlock);
      state.initialBlock = [];

      // console.log(state.dataBlock, "canvas hall");
    },

    falseNewSector(state: any) {
      state.newSector = false;
    },
    changeArrowUp(state: any) {
      // state.hookUpdate++;
      // console.log(state.arrowUp);
      return state.arrowUp++;
    },
  },
  actions: {},
  modules: {},
  namespaced: true,
};
