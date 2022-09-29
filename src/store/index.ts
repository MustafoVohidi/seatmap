import { createStore } from "vuex";
import { canvasModule } from "./core/canvas";
import { colorPalette } from "./tools/color-palette";
export default createStore({
  state: {
    WIDTH: window.innerWidth,
    HEIGHT: window.innerHeight,
    GRIDY: 50,
    GRIDX: 50,
    testNumber:50,
    testCircle: {
      x: 30,
      y: 30,
      width: 30,
      height: 30,
    },
  },
  getters: {
    chabgetestCircle(state: any) {
      return state.testCircle;
    },
    chabgetestNumber(state: any) {
      return state.testNumber;
    },
  },
  mutations: {
    ChangeBlock(state: any, block: any) {
      state.testCircle.x = 20;
      state.testCircle.y = 20;
      state.testCircle.width = 100;
      state.testCircle.height = 100;
      state.testNumber+=20;
      console.log(block, state.testNumber);
    },
  },
  actions: {},
  modules: {
    canvas: canvasModule,
  },
});
