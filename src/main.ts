import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
// import VueKonva from "vue-konva";

import { library } from "@fortawesome/fontawesome-svg-core";

// import Seat from "@/components/tools/HallEditor/Seat.vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { faPaste } from "@fortawesome/free-solid-svg-icons";
import { faScissors } from "@fortawesome/free-solid-svg-icons";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faObjectUngroup } from "@fortawesome/free-solid-svg-icons";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import { faAlignRight } from "@fortawesome/free-solid-svg-icons";
import { faAlignCenter } from "@fortawesome/free-solid-svg-icons";
import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import { faHand } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faBraille } from "@fortawesome/free-solid-svg-icons";

library.add(
  faUserSecret,
  faCopy,
  faRotateLeft,
  faRotateRight,
  faPaste,
  faScissors,
  faArrowPointer,
  faClockRotateLeft,
  faObjectUngroup,
  faAlignLeft,
  faAlignRight,
  faAlignCenter,
  faAlignJustify,
  faHand,
  faSquare,
  faBraille,
);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  // .component("v-seat", Seat)
  .use(store)
  // .use(VueKonva) 
  .mount("#app");