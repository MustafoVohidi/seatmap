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
interface TriangleZone extends Sector {}
export function useCreateTriangle() {
  const store = useStore();
  return {
    
    store,
  };
}
