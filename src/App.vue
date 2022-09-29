<template>
  <div class="app">
<HallEditor></HallEditor>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HallEditor from "@/components/tools/HallEditor/HallEditor.vue"
import "@/assets/styles/index.scss"
@Options({
  components: {
    HallEditor
  },
  methods:{

  },
})
export default class App extends Vue {
  data(){
    return {

    }
  }
}
</script>

<style lang="scss">

</style>
