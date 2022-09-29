import { ref, onMounted, computed } from "vue";
export function useGrid(ctx, WIDTH, HEIGHT) {
  console.log(ctx.value, "ctx", WIDTH.value);
  let grid = computed(() => {
    for (let x = 0; x < WIDTH.value; x += 20) {
      ctx.value.beginPath();
      ctx.value.moveTo(x, 0); //передвигаем перо
      ctx.value.lineTo(x, HEIGHT.value); //рисуем лини
      ctx.value.strokeStyle = "#dfdedf";
      ctx.value.stroke();
      ctx.value.lineWidth = 1;
    }
    for (let y = 0; y < HEIGHT.value; y += 20) {
      ctx.value.beginPath();
      ctx.value.moveTo(0, y); //передвигаем перо
      ctx.value.lineTo(WIDTH.value, y); //рисуем лини
      ctx.value.strokeStyle = "#dfdedf";
      ctx.value.stroke();
      ctx.value.lineWidth = 1;
    }
  });
  onMounted(() => {
    ctx;
  });
  return grid;
}
