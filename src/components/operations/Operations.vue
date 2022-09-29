<template>
  <div class="operation">
    <div class="navbar">
      <ul class="navbar-list list-style-none">
        <li>
          <a>Список мероприятий</a>
        </li>
        <li class="active">
          <a>Мероприятие</a>
        </li>
        <li>
          <a>Заказы зрителей</a>
        </li>
        <li>
          <a>Заказы агентов</a>
        </li>
        <li>
          <a>Накладные поставщиков</a>
        </li>
        <li>
          <a>Накладные партнеров</a>
        </li>
        <li>
          <a>Накладные агентов</a>
        </li>
        <li>
          <a>Админстрирование</a>
        </li>
      </ul>
    </div>
    <div class="navbar-content">
      <div class="information">
      <Event />
      </div>
    </div>
  </div>
</template>

<script>
import Event from "@/components/operations/Event/Event";
export default {
components:{
  Event,
}
}
</script>

<style scoped lang="scss">
.list-style-none{
  list-style: none;
}
ul{
  margin: 0;
  padding: 0;
}
.navbar-list{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  li{
    &.active{
      background: #fff;
    }
    background: #c2c2c2;
    border: 1px solid;
    border-radius: 3px;
    a{
      text-align: center;
      padding: 5px;
      color: #030303;
    }
  }
}

</style>