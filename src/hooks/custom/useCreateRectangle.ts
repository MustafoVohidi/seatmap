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
}

export function useCreateRectangle() {
  const store = useStore();
  let rectangleSector: any = reactive({});
  const block = computed(() => store.state.canvas.dataBlock);
  const stateSectorId = computed(() => store.state.canvas.stateSectorId);
  function returnBlock() {
    let initialRow = block.value.row;
    let initialSeat = block.value.seat;
    let position = block.value.position;
    let radius = block.value.radius;
    let angleSegment = 0;
    if (radius !== 0) {
      angleSegment = (block.value.qtySeats * 40) / radius;
    }
    let initialCoordinate = { x: 15, y: 15 };
    let allSeats = [];
    let rowed = 0;
    let rowedCoordinates = [];

    for (let r = 0; r < block.value.qtyRow; r++) {
      for (let s = 0; s < block.value.qtySeats; s++) {
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
        let angle = angleSegment * (s / (block.value.qtySeats - 1) - 1 / 2);
        let dY = radius * (Math.cos(angle) - 1);
        let dX = radius * (Math.sin(angle) - 1);
        let place: Seat = {
          rotation: 0,
          left: leftCoordinate+initialCoordinate.x,
          top: r * 40 - dY+initialCoordinate.y,
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
          sectorId: stateSectorId.value,
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
      figure:"rectangle",
    };
    return initialBlock;
  }

  onUpdated(() => {
    rectangleSector.value = returnBlock();
  });

  return {
    rectangleSector,
    store,
    stateSectorId,
  };
}
