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
interface PolylineZone extends Sector {
  figure: string;
  typeGrouped: string;
}
interface PolylineSeat extends Seat {
  rowID: number;
  radius: number;
  colID: number;
  quantitySeats: number;
  shift:number;
}
export function useCreatePolyline(blocks: any) {
  const store = useStore();
  let polylineSector: any = reactive({});
  let drawRectangle: any = reactive({});
  const dataBlock = computed(() => store.state.canvas.dataBlock);
  const stateSectorId = computed(() => store.state.canvas.stateSectorId);
  function returnBlock() {
    let block;
    if (Object.keys(dataBlock.value).length !== 0) {
      block = dataBlock.value;
    } else {
      block = blocks;
    }
    let allRow = block.qtyRow;
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

    // сдвиг каждого элемента в каждом ряду

    let differentQuantity = qtySeats - qtySeatsFirstRow;
    let shihtSeatInRow = 0;

    if (radius !== 0) {
      angleSegment = (qtySeats * 40) / radius;
    }
    let initialCoordinate = { x: 15, y: 15 };
    let allSeats = [];
    let rowed = 0;
    let rowedCoordinates = [];

    for (let r = 0; r < allRow; r++) {
      if (qtySeatsIteration < qtySeats) {
        qtySeatsIteration = qtySeatsFirstRow;
        qtySeatsIteration += Math.ceil((differentQuantity * r) / (allRow - 1));
      }
      let shift=0;
      if (kindOfFigures == 2) {
        shift = (qtySeats-qtySeatsIteration)/2;
      }
      for (let s = 0; s < qtySeatsIteration; s++) {
        if (s % allRow == 0) {
          rowed++;
        }3213
        let leftCoordinate;
        switch (position) {
          case 1:
            leftCoordinate = s * 40;
            break;
          case 2:
            leftCoordinate = s * 40;
            break;
          case 3:
            leftCoordinate = s * 40;
            break;
          case 4:
            leftCoordinate = s * 40;
            break;
          default:
            leftCoordinate = s * 40;
        }
        let angle = angleSegment * (s / (qtySeats - 1) - 1 / 2);
        let dY = radius * (Math.cos(angle) - 1);
        let dX = radius * (Math.sin(angle) - 1);
        let place: PolylineSeat = {
          rotation: 0,
          left: leftCoordinate + initialCoordinate.x + shift * 40,
          top: r * 40 - dY + initialCoordinate.y,
          width: 30,
          height: 30,
          scaleX: 1,
          scaleY: 1,
          fill: "#fff",
          name: "polyline" + (s + 1),
          draggable: true,
          cornerRadius: 5,
          stroke: "black",
          strokeWidth: 1,
          row: r + initialRow,
          number: initialSeat != 0 ? initialSeat + s : initialSeat + s + 1,
          id: s + 1,
          typeElement: "seat",
          angle: (angle * 180) / Math.PI,
          sectorId: stateSectorId.value,
          rowID: r,
          colID: s,
          radius: radius,
          quantitySeats: qtySeats,
          shift:shift * 40,
        };
        allSeats.push(place);
      }
    }
    let initialBlock: PolylineZone = {
      x: 0,
      y: 0,
      width: 1000,
      height: 500,
      id: stateSectorId.value,
      rotate: rotate,
      grouped: groupped,
      entrance: entrance,
      title: "sector_" + stateSectorId.value,
      sectorItem: sector,
      radius: radius,
      position: position,
      initialRow: initialRow,
      initialSeat: initialSeat,
      seats: allSeats,
      typeGrouped: "polyline",
      figure: "polyline",
    };
    return initialBlock;
  }
  onMounted(() => {
    // drawRectangle.value = returnBlock();
  });
  onUpdated(() => {
    // drawRectangle.value = returnBlock();

    polylineSector.value = returnBlock();
  });

  return {
    polylineSector,
    // drawRectangle,
    store,
    stateSectorId,
  };
}
