export function useCreateSeat(width) {
  return fabric.util.createClass(fabric.Rect, {
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
}
