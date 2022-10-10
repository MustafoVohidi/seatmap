import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
// import VueKonva from "vue-konva";
import directives from "@/directives";
import { Icons } from "./icons/icons";

const app = createApp(App);
directives.forEach((directive) => {
  app.directive(directive.name, directive);
});
app
.component("font-awesome-icon", Icons)
.use(store)
.mount("#app");
