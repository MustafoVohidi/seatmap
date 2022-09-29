<template>
    <v-layer>
        <v-text :config="{
          text: 'Title',
          x: 150,
          y: 50,
          fontSize: 30,
          draggable: true,
          fill: isDragging ? 'green' : 'black'
        }" />
        <v-rect :config="seat" @transformend="handleTransformEnd" />
        <SeatButton v-for="seat in rectangles" :key="seat" :seat="seat" />
    </v-layer>
</template>
<script>
import { mapState } from 'vuex'
import Konva from 'konva';
import SeatButton from '@/components/core/userforms/SeatButton.vue'
export default {
    components: {
        SeatButton,
    },
    computed: {
        ...mapState({
            rectangles: state => state.canvas.rectangles
        }),
    }
}
</script>
<style lang="scss">

</style>