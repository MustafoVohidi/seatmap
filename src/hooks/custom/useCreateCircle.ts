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

interface CircleZone extends Sector {}
export function useCreateCircle() {
  const store = useStore();
  let circleSector: any = reactive({});
  const block = computed(() => store.state.canvas.dataBlock);
  const stateSectorId = computed(() => store.state.canvas.stateSectorId);
  function returnBlock() {
    let initialRow = block.value.row;
    let initialSeat = block.value.seat;
    let position = block.value.position;
    let width = 30;
    let height = 30;
    // let radiusCircle = 100;
    let radius = block.value.radius;
    let angleSegment = 0;
    if (radius !== 0) {
      angleSegment = (block.value.qtySeats * 40) / radius;
    } else {
      radius = block.value.qtySeats * width;
    }
    let coordinateR = { x: 0, y: 0 };
    let allSeats = [];
    let rowed = 0;
    let rowedCoordinates = [];
    let initialCoord = { x: 2 * radius + 15, y: 2 * radius + 15 };
    // let quantity = 12;
    let quantity = block.value.qtySeats;
    let rotate = 1;
    if (block.value.rotate !== 0) {
      rotate = (block.value.rotate % 360) / 360;
    }
    // for (let r = 0; r < block.value.qtyRow; r++) {
    for (let r = 0; r < 1; r++) {
      // for (let s = 0; s < block.value.qtySeats; s++) {
      for (let s = 0; s < quantity; s++) {
        if (s % block.value.qtyRow == 0) {
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
        let angle = ((2 * s) / quantity) * Math.PI * rotate;
        let dY = radius * (Math.cos(angle) - 1) + initialCoord.y;
        let dX = radius * (Math.sin(angle) - 1) + initialCoord.x;
        let place: Seat = {
          rotation: 0,
          left: dX,
          top: dY,
          width: width,
          height: height,
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
          angle: -(angle * 180) / Math.PI,
          sectorId: stateSectorId.value,
        };
        allSeats.push(place);
      }
    }
    let initialBlock: CircleZone = {
      x: 0,
      y: 0,
      width: 1000,
      height: 500,
      id: stateSectorId.value,
      rotate: block.value.rotate,
      grouped: block.value.groupped,
      entrance: block.value.entrance,
      title: "sector_" + stateSectorId.value,
      sectorItem: block.value.sector,
      radius: block.value.radius,
      position: block.value.position,
      initialRow: block.value.row,
      initialSeat: block.value.seat,
      seats: allSeats,
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
