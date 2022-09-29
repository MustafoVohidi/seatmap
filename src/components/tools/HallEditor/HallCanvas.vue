<template>
    <h2>test</h2>
    <canvas width="1000" height="1000" ref="ctx">
    </canvas>
    <v-seat v-for="seat in seats" :key="seat" :seat="seat" :canvas="canvas" @seat="createSeat"></v-seat>

</template>
<script>
import { fabric } from 'fabric';
export default {
    data() {
        return {
            seats: [
                { id: 0, top: 10, left: 10, width: 30, height: 30 },
                // { id: 0, top: 10, left: 50, width: 30, height: 30 },
                // { id: 0, top: 10, left: 100, width: 30, height: 30 },
                // { id: 0, top: 10, left: 150, width: 30, height: 30 },
            ],

        }
    },
    methods: {
        createSeat(event, prop2){
            console.log(event, prop2)
            return event
        }
    },
    computed: {
        ctx() {
            return this.$refs["ctx"];

        },
        canvas() {
            return new fabric.Canvas(this.ctx)
        },
        // createCircle() {
        //     let circle1 = new fabric.Circle({
        //         radius: 50,
        //         fill: 'red',
        //         left: 0
        //     });
        //     let circle2 = new fabric.Circle({
        //         radius: 50,
        //         fill: 'green',
        //         left: 100
        //     });
        //     let circle3 = new fabric.Circle({
        //         radius: 50,
        //         fill: 'blue',
        //         left: 200
        //     });

        //     let group = new fabric.Group([circle1, circle2, circle3], {
        //         left: 200,
        //         top: 100
        //     });
        //     this.canvas.add(group);
        //     console.log("seat", group)
        // }
    },
    watch() { },
    mounted() {
        this.canvas;
        this.createSeat;
        // this.createCircle
        // console.log(this.canvas)
    },
}
</script>
<style lang="">
    
</style>