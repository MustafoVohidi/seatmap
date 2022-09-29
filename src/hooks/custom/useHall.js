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
import { useStore } from "vuex";
import { fabric } from "fabric";

export function useHall(ctx) {
  const HALL = computed(() => store.state.canvas.hall);
  let sectors = HALL.value.sectors;
  const store = useStore();
  var Seat = fabric.util.createClass(fabric.Rect, {
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

  if (sectors.length !== 0) {
    for (let i = 0; i < sectors.length; i++) {
      createSector(sectors[i]);
    }
  }

  const createSeat = (seat) => {
    const rect = new Seat({
      left: seat.left,
      top: seat.top,
      fill: "#ffffff",
      width: 30,
      height: 30,
      strokeWidth: 1,
      stroke: "#000",
      rx: 10,
      ry: 10,
      angle: 0,
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
    });
    canvas.add(rect);
  };
  const createSector = (sector) => {
    if (sector.seats.length !== 0) {
      for (let s = 0; s < sector.seats.length; s++) {
        createSeat(sector.seats[s]);
      }
    }
  };

  onMounted(() => {
    canvas = new fabric.Canvas(ctx.value);
  });

  return {
    HALL,
    createSeat,
    createSector,
    Seat,
    store,
    canvas,
  };
}
