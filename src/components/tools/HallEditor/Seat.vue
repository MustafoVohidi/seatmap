
<script>
import { fabric } from 'fabric';

export default {
    props: {
        seat: {
            type: Object,
        },
        canvas: {}
    },
    methods: {
        createCircle() {
            let circle1 = new fabric.Circle({
                radius: 50,
                fill: 'red',
                left: 0
            });
            let circle2 = new fabric.Circle({
                radius: 50,
                fill: 'green',
                left: 100
            });
            let circle3 = new fabric.Circle({
                radius: 50,
                fill: 'blue',
                left: 200
            });

            let group = new fabric.Group([circle1, circle2, circle3], {
                left: 200,
                top: 100
            });

            this.canvas.add(group);
            console.log("seat", group)
        }
    },
    mounted() {
        this.$emit("seat",this.createCircle(), "asdasd")
    },
    computed: {
        // ctx() {
        //     return this.$refs["ctx"];

        // },
        // canvas() {
        //     return new fabric.Canvas(this.ctx)
        // }

    },
}
</script>
