import {
  ref,
  reactive,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  computed,
  watchEffect,
  watch,
} from "vue";

import { Seat } from "@/interface/seat";
import { Sector } from "@/interface/sector";
import { useStore } from "vuex";
import type { Ref } from "vue";

interface RectangleZone extends Sector {
  figure: string;
  typeGrouped:string;
}
interface RectangleSeat extends Seat{
  rowID:number;
  radius:number;
  colID:number;
  quantitySeats:number;
}

export function useCreateRectangle(blocks:any) {
  const store = useStore();
  let rectangleSector: any = reactive({});
  let drawRectangle: any = reactive({});
  const dataBlock = computed(() => store.state.canvas.dataBlock);

  const stateSectorId = computed(() => store.state.canvas.stateSectorId);
  function returnBlock() {
    let block;
    if(Object.keys(dataBlock.value).length !== 0){
      block = dataBlock.value;
    }else{
      block = blocks;
    }
    let allRow=block.qtyRow
    // let allRow=1
    // console.log(block.value, "hook");
    let initialRow = block.row;
    let initialSeat = block.seat;
    let position = block.position;
    let radius = block.radius;
    let angleSegment = 0;
    let rotate = block.rotate;
    let qtySeatsFirstRow = 1 //количество мест первого ряда
    let qtySeatsIteration = qtySeatsFirstRow;
    let qtySeats = block.qtySeats; // количество мест последнего ряда
    let sectorValue = block.sectorValue;
    let positionObject = block.positionObject;
    let kindOfFigures = block.kindOfFigures; //прямой или равнобедренный
    let groupped = block.groupped; //true false
    let entrance = block.entrance; //подъезд
    let entranceValue = block.entranceValue; //
    let cuttingAngle = block.cuttingAngle; //угол среза
    let sector = block.sector; //

    if (radius !== 0) {
      angleSegment = (qtySeats* 40) / radius;
    }
    let initialCoordinate = { x: 15, y: 15 };
    let allSeats = [];
    let rowed = 0;
    let rowedCoordinates = [];

    for (let r = 0; r < allRow; r++) {
      for (let s = 0; s < qtySeats; s++) {
        if (s % allRow== 0) {
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
        let angle = angleSegment * (s / (qtySeats - 1) - 1 / 2);
        let dY = radius * (Math.cos(angle) - 1);
        let dX = radius * (Math.sin(angle) - 1);
        let place: RectangleSeat = {
          rotation: 0,
          left: leftCoordinate + initialCoordinate.x,
          top: r * 40 - dY + initialCoordinate.y,
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
          row:r+initialRow,
          number: initialSeat != 0 ? initialSeat + s : initialSeat + s + 1,
          id: s + 1,
          typeElement: "seat",
          angle: (angle * 180) / Math.PI,
          sectorId: stateSectorId.value,
          rowID:r,
          colID:s,
          radius:radius,
          quantitySeats:qtySeats,
        };
        allSeats.push(place);
      }
    }
    let initialBlock: RectangleZone = {
      x: 0,
      y: 0,
      width: 1000,
      height: 500,
      id: stateSectorId.value,
      rotate: block.rotate,
      grouped: groupped,
      entrance: entrance,
      title: "sector_" + stateSectorId.value,
      sectorItem: sector,
      radius: radius,
      position: position,
      initialRow: initialRow,
      initialSeat: initialSeat,
      seats: allSeats,
      typeGrouped:"rectangle",
      figure: "rectangle",
    };
    return initialBlock;
  }
  onMounted(() => {
    // drawRectangle.value = returnBlock();
  });
  onUpdated(() => {
    drawRectangle.value = returnBlock();

    rectangleSector.value = returnBlock();
  });

  return {
    rectangleSector,
    drawRectangle,
    store,
    stateSectorId,
  };
}
