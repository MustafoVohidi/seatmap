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
import { Seat } from "@/interface/seat";
import { Sector } from "@/interface/sector";
interface PolylineZone extends Sector {}
export function useCreatePolyline() {
  const store = useStore();
  return {
    store,
  };
}
