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
interface RingZone extends Sector {}
export function useCreateRing() {
  const store = useStore();
  return {
    store,
  };
}
