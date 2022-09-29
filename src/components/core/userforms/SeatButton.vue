<template>

    <v-group>
        <v-rect  :config="seat" @transformend="handleTransformEnd" />
        <v-text :config="{
        text: '1', 
        fontSize: 16,
        x: seat.x+9,
        y: seat.y+8,
        fontFamily: 'Calibri',
        fill: '#000',
        draggable: true,
        textAlign:'center'
        }" />
    </v-group>

</template>
<script>
import { mapState } from 'vuex'
import Konva from 'konva';
export default {
    props: {
        seat: Object,
    },
    methods: {
        handleTransformEnd(e) {
            // shape is transformed, let us save new attrs back to the node
            // find element in our state
            const rect = this.rectangles.find(
                (r) => r.name === this.selectedShapeName
            );
            // update the state
            rect.x = e.target.x();
            rect.y = e.target.y();
            rect.rotation = e.target.rotation();
            rect.scaleX = e.target.scaleX();
            rect.scaleY = e.target.scaleY();

            // change fill
            // rect.fill = Konva.Util.getRandomColor();
        },

    },
    computed: {
        ...mapState({
            rectangles: state => state.canvas.rectangles
        }),

    },
    mounted() {
        // this.$refs.group.getNode().cache();
    }
}
</script>
<style lang="scss">

</style>