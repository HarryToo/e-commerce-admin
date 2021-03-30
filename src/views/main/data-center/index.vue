<template>
  <div class="data-center">
    <div class="header-row block-view">
      <column-statistics></column-statistics>
    </div>
    <div class="grid-wrapper">
      <div class="column-l">
        <div class="column-l-t block-view">
          <order-statistics></order-statistics>
        </div>
        <div class="column-l-b block-view">
          <customer-statistics></customer-statistics>
        </div>
      </div>
      <div class="column-r">
        <div class="column-r-t block-view"></div>
        <div class="column-r-b block-view"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import ColumnStatistics from "./components/ColumnStatistics"
import OrderStatistics from "./components/OrderStatistics"
import CustomerStatistics from "./components/CustomerStatistics"

export default defineComponent({
  name: "DataCenter",
  components: {
    ColumnStatistics,
    OrderStatistics,
    CustomerStatistics
  }
})
</script>

<style scoped lang="scss">
.data-center {
  height: 100%;
  display: flex;
  flex-direction: column;

  .header-row {
    height: 110px;
    display: flex;
    align-items: center;
  }

  .grid-wrapper {
    flex-grow: 1;
    display: flex;
    margin-top: 15px;

    .block-view {
      padding: 18px 28px;
    }

    .column-l {
      width: 72%;
      margin-right: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .column-l-t {
        height: calc((100% - 15px) / 2);
      }

      .column-l-b {
        height: calc((100% - 15px) / 2);
      }
    }

    .column-r {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .column-r-t {
        height: calc((100% - 15px) * 0.66);
      }

      .column-r-b {
        height: calc((100% - 15px) * 0.34);
      }
    }
  }
}
</style>