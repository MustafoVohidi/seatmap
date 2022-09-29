<template>
    <div class="canvas" ref="kanva" :style="{width:width+'px', height:height+'px'}">
        <div v-for="item in rectangles">
{{item}}
        </div>
        <v-stage ref="stage" class="stage"  @mousedown="handleStageMouseDown"
            @touchstart="handleStageMouseDown">

            <!-- <Sector /> -->
            <v-layer ref="layer-1" title="sector">
                <v-group>
                    <v-rect v-for="item in rectangles" :key="item" :config="item" @transformend="handleTransformEnd">
                    </v-rect>
                    <!-- <v-text v-for="item in rectangles" :key="item.id" :config="{
                        text: item.number, 
                        fontSize: 13,
                        x:item.number/10>=1?item.x+8 :item.x+10,
                        y:item.y+10,
                        draggable: true,
                        textAlign:'center'
                    }"></v-text> -->
                </v-group>
                <v-transformer ref="transformer" />
            </v-layer>

        </v-stage>

    </div>

    <!-- <div v-show="false">

        {{seat}}
    </div> -->
    <!-- 
    <div class="canvas">
        <canvas ref="editorHall" class="canvas-editor" :width="WIDTH" :height="HEIGHT"></canvas>
    </div> -->
</template>
<script>
import Sector from "@/components/core/userforms/Sector.vue"
import { mapState } from 'vuex'
// import Konva from 'konva';
import { useCanvas } from "@/hooks/useCanvas.js"
import { useCreateSeat } from "@/hooks/useCreateSeat.js"
// const width = window.innerWidth;
// const height = window.innerHeight;
const wid = window.innerWidth;
export default {
    components: {
        Sector
    },
    data() {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
            selectedShapeName: '',
        };
    },
    setup(props) {
        const thisCanvas = useCanvas();
        let w = 10
        const createPLace = useCreateSeat({
            w: wid
        });
        return {
            thisCanvas
        }
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
        handleStageMouseDown(e) {
            // clicked on stage - clear selection
            if (e.target === e.target.getStage()) {
                this.selectedShapeName = '';
                this.updateTransformer();
                return;
            }

            // clicked on transformer - do nothing
            const clickedOnTransformer =
                e.target.getParent().className === 'Transformer';
            if (clickedOnTransformer) {
                return;
            }

            // find clicked rect by its name
            const name = e.target.name();
            const rect = this.rectangles.find((r) => r.name === name);
            if (rect) {
                this.selectedShapeName = name;
            } else {
                this.selectedShapeName = '';
            }
            this.updateTransformer();
        },
        updateTransformer() {
            // here we need to manually attach or detach Transformer node
            const transformerNode = this.$refs.transformer.getNode();
            const stage = transformerNode.getStage();
            const { selectedShapeName } = this;

            const selectedNode = stage.findOne('.' + selectedShapeName);
            // do nothing if selected node is already attached
            if (selectedNode === transformerNode.node()) {
                return;
            }

            if (selectedNode) {
                // attach to another node
                transformerNode.nodes([selectedNode]);
            } else {
                // remove transformer
                transformerNode.nodes([]);
            }
        },
        // clWidth() {
        //     return this.$refs.rightContent.clientWidth
        // },
        // clHeight() {
        //     return this.$refs.rightContent.clientHeight
        // },
        // createBlock() {
        //     this.ctx.beginPath();
        //     this.ctx.moveTo(0, 0); //передвигаем перо
        //     this.ctx.lineTo(50, 250); //рисуем лини
        //     this.ctx.strokeStyle = "#000";
        //     this.ctx.lineWidth = 5;
        //     this.ctx.stroke();
        // },
        // createPlace(x, y, color, rotate, number) {
        //     this.ctx.beginPath();
        //     this.ctx.moveTo(0, 0); //передвигаем перо
        //     this.ctx.lineTo(20, this.HEIGHT); //рисуем лини
        //     this.ctx.lineWidth = 20;
        //     this.ctx.strokeStyle = "#000";
        //     this.ctx.stroke();
        // },
        // createSector(x, y, rows, column, qtyPlace, rotate) {

        // },

    },
    computed: {
        ...mapState({
            WIDTH: state => state.WIDTH,
            HEIGHT: state => state.HEIGHT,
            // seat: state => state.canvas.seat,
            // changeText: state => state.canvas.changeText,
            hall: state => state.canvas.hall,
            rectangles: state => state.canvas.initialBlock.seats,
            initialBlock: state => state.canvas.initialBlock,
            sectors: state => state.canvas.hall.sectors.length,
        }),
        // ref() {
        //     return this.$refs["editorHall"];
        //     // this.$refs["editorHall"];

        // },
        // ctx() {
        //     return this.ref.getContext("2d");
        // },
        // grid() {
        //     for (let x = 0; x < this.WIDTH; x += 20) {
        //         this.ctx.beginPath();
        //         this.ctx.moveTo(x, 0); //передвигаем перо
        //         this.ctx.lineTo(x, this.HEIGHT); //рисуем лини
        //         this.ctx.strokeStyle = "#dfdedf";
        //         this.ctx.stroke();
        //         this.ctx.lineWidth = 1;
        //     }
        //     for (let y = 0; y < this.HEIGHT; y += 20) {
        //         this.ctx.beginPath();
        //         this.ctx.moveTo(0, y); //передвигаем перо
        //         this.ctx.lineTo(this.WIDTH, y); //рисуем лини
        //         this.ctx.strokeStyle = "#dfdedf";
        //         this.ctx.stroke();
        //         this.ctx.lineWidth = 1;
        //     }
        // },
        // createPLace(ctx, x, y, w, h, number) {
        //     this.ctx.beginPath();
        //     this.ctx.strokeStyle = '#00BFF5';
        //     this.ctx.lineJoin = 'round';
        //     this.ctx.rect(this.seat.x, this.seat.y, 30, 30);
        //     this.ctx.fillStyle = '#00BFF5';
        //     this.ctx.fill();

        //     this.ctx.lineWidth = 5;
        //     this.ctx.stroke();
        //     this.ctx.fillStyle = "#00F";
        //     this.ctx.font = '20px serif';
        //     this.ctx.fillText("10", this.seat.x + 10, this.seat.y + 20);
        //     this.ctx.textAlign = center;
        //     console.log(this.seat)
        // },
        // createSector() {

        // },
        // createFigure() {

        // },
    },
    watch: {
        // seat(a, b) {
        //     console.log(a, b, "1121")
        // }
        // HEIGHT() {
        //     this.getWidth()
        // },
        // HEIGHT() {
        //     this.getHeight()
        // },
    },
    mounted() {
        // Изменение размера элемента адаптивно
        window.onresize = () => {
            this.width = window.innerWidth
            this.height = window.innerHeight
        }
        // this.getHeight;
        // this.getWidth;
        // this.changeSize;
        this.grid;
        // this.createPLace;
    },
    updated() {
        // this.createQuoter;
        // this.createPLace;
        console.log(this.hall, "hall")
    }
}
</script>
<style lang="scss">
.canvas-editor {
    background: #edeced;
    border: 1px solid;
}
</style>