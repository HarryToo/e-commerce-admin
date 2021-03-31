<template>
  <div class="ranking">
    <div class="top-row">
      <div class="title">机构学员排名</div>
      <div class="tab-hd">
        <div class="tab-hd-item" :class="{active: tabIndex === 0}" @click="tabIndex = 0">正式学员</div>
        <div class="tab-hd-item" :class="{active: tabIndex === 1}" @click="tabIndex = 1">试用学员</div>
      </div>
    </div>
    <ul class="tab-cont" v-show="tabIndex === 0">
      <li class="rank-item" v-for="(item, index) in rankList.official" :key="item.id">
        <div class="rank-item-l">
          <div class="index">{{ index + 1 }}</div>
          <div class="name text-cut-1" :title="item.name">{{ item.name }}</div>
        </div>
        <div class="rank-item-r">
          <el-progress :percentage="item.num > rankList.official[0].num ? 100 : Math.round(item.num / rankList.official[0].num * 100)" :show-text="false"></el-progress>
          <div class="num text-cut-1" :title="item.num">{{ item.num }}</div>
        </div>
      </li>
    </ul>
    <ul class="tab-cont" v-show="tabIndex === 1">
      <li class="rank-item" v-for="(item, index) in rankList.trial" :key="item.id">
        <div class="rank-item-l">
          <div class="index">{{ index + 1 }}</div>
          <div class="name text-cut-1" :title="item.name">{{ item.name }}</div>
        </div>
        <div class="rank-item-r">
          <el-progress :percentage="item.num > rankList.trial[0].num ? 100 : Math.round(item.num / rankList.trial[0].num * 100)" :show-text="false"></el-progress>
          <div class="num text-cut-1" :title="item.num">{{ item.num }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {defineComponent, ref} from 'vue'
import $api from '@/api'

export default defineComponent({
  name: "OrganizationStudentRanking",
  setup() {
    const tabIndex = ref(0)
    const rankList = ref([])

    const getOrganizationStudentRanking = async () => {
      rankList.value = await $api.customerApi.getOrganizationStudentRanking()
    }
    getOrganizationStudentRanking()

    return {
      tabIndex,
      rankList
    }
  }
})
</script>

<style scoped lang="scss">
.ranking {
  height: 100%;
  display: flex;
  flex-direction: column;

  .top-row {
    padding-bottom: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #EEEEEE;

    .title {
      line-height: 1;
      font-weight: bold;
      font-size: 15px;
      color: #101010;
    }

    .tab-hd {
      display: flex;
      align-items: center;
      transform: translateY(6px);

      .tab-hd-item {
        margin-left: 10px;
        line-height: 1;
        font-size: 13px;
        color: #101010;
        cursor: pointer;
        transition: color 0.3s;

        &.active {
          color: #F9612E;
        }
      }
    }
  }

  .tab-cont {
    flex-grow: 1;
    list-style: none;

    .rank-item {
      height: 42px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .rank-item-l {
        display: flex;
        align-items: center;

        .index {
          width: 14px;
          height: 14px;
          text-align: center;
          line-height: 14px;
          font-size: 12px;
          color: #EEEEEE;
          border-radius: 50%;
          background-color: #CCCCCC;
        }

        .name {
          width: 100px;
          margin-left: 15px;
          font-size: 14px;
          color: #101010;
        }
      }

      .rank-item-r {
        flex-grow: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .el-progress {
          flex-grow: 0.55;

          ::v-deep .el-progress-bar__inner {
            background-color: #00BB7A;
          }
        }

        .num {
          width: 52px;
          margin-left: 10px;
          text-align: left;
          font-size: 14px;
          color: #101010;
        }
      }

      &:nth-child(1) {
        .index {
          background-color: #FF3A30;
        }
      }

      &:nth-child(2) {
        .index {
          background-color: #FF9502;
        }
      }

      &:nth-child(3) {
        .index {
          background-color: #00BB7A;
        }
      }
    }
  }
}
</style>