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
import type { Ref } from "vue";
import { useStore } from "vuex";

interface CircleZone extends Sector {
  typeGrouped: string;
  figure: string;
}
interface CircleSeat extends Seat {
  radius: number;
  rowID: number;
}
var arr=10;
var arr=20
export function useCreateCircle(blocks: any) {
  const store = useStore();
  let circleSector: any = reactive({});
  const dataBlock = computed(() => store.state.canvas.dataBlock);
  const stateSectorId = computed(() => store.state.canvas.stateSectorId);
  function returnBlock() {
    let block;
    if (Object.keys(dataBlock.value).length !== 0) {
      block = dataBlock.value;
    } else {
      block = blocks;
    }

    let qtySeatsFirstRow = 1; //количество мест первого ряда
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

    let initialRow = block.row;
    let initialSeat = block.seat;
    let position = block.position;
    let width = 30;
    let height = 30;
    let iterationRow = 0;
    // let allRow=block.qtyRow
    let allRow = 1;
    // let radiusCircle = 100;
    let radius = block.radius;
    let angleSegment = 0;
    if (radius !== 0) {
      angleSegment = (qtySeats * 40) / radius;
    } else {
      radius = qtySeats * width;
    }
    let coordinateR = { x: 0, y: 0 };
    let allSeats = [];
    let rowed = 0;
    let rowedCoordinates = [];
    let initialCoord = { x: 2 * radius + 15, y: 2 * radius + 15 };
    let rotate = 1;
    if (block.rotate !== 0) {
      rotate = (block.rotate % 360) / 360;
    }
    let differentQuantity = qtySeats - qtySeatsFirstRow;
    for (let r = 0; r < allRow; r++) {
      // for (let r = 0; r < 1; r++) {
      if (qtySeatsIteration < qtySeats) {
        qtySeatsIteration = qtySeatsFirstRow;
        qtySeatsIteration += Math.ceil((differentQuantity * r) / (allRow - 1));
      }
      let shift = 0;
      if (kindOfFigures == 2) {
        shift = (qtySeats - qtySeatsIteration) / 2;
      }

      for (let s = 0; s < qtySeats + iterationRow; s++) {
        if (s % allRow == 0) {
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
        let angle = ((2 * s) / (qtySeats + iterationRow)) * Math.PI * rotate;
        // console.log(angle, "use angle")
        let dY =
          (radius + r * 40) * (Math.cos(angle) - 1) + initialCoord.y + r * 40;
        let dX =
          (radius + r * 40) * (Math.sin(angle) - 1) + initialCoord.x + r * 40;
        let place: CircleSeat = {
          rotation: 0,
          left: dX,
          top: dY,
          row: s + r + initialRow,
          width: width,
          height: height,
          scaleX: 1,
          scaleY: 1,
          fill: "#fff",
          name: "circle" + (s + 1),
          draggable: true,
          cornerRadius: 5,
          stroke: "black",
          strokeWidth: 1,
          number: initialSeat != 0 ? initialSeat + s : initialSeat + s + 1,
          id: s + 1,
          typeElement: "seat",
          angle: -(angle * 180) / Math.PI,
          sectorId: stateSectorId.value,
          radius: radius + r * 40,
          rowID: r,
        };
        // console.log(place, "use place")
        allSeats.push(place);
      }
      iterationRow += 6;
    }
    let initialBlock: CircleZone = {
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
      typeGrouped: "circle",
      figure: "circle",
    };
    return initialBlock;
  }

  onUpdated(() => {
    circleSector.value = returnBlock();
  });
  return {
    circleSector,
    store,
    stateSectorId,
  };
}
