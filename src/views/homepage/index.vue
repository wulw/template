<template>
  <div class="homepage">
    <div class="header-wrapper">
      <!-- <strong>智慧党建大数据看板</strong> -->
      <img src="../../assets/homepage_images/title.png" alt="title" />
    </div>
    <div class="content-wrapper">
      <div class="flex-item-wrapper">
        <div class="top-wrapper">
          <div class="title">
            <span>党员概况</span>
          </div>
        </div>
        <div class="middle-wrapper">
          <div class="title">
            <span>党员年龄分布</span>
          </div>
        </div>
        <div class="bottom-wrapper">
          <div class="title">
            <span>党员性别分布</span>
          </div>
        </div>
      </div>
      <div class="flex-item-wrapper">
        <div class="top-wrapper">
          <div class="title">
            <span>智慧校园党建分布</span>
          </div>
          <baidu-map-wrapper />
        </div>
        <div class="bottom-wrapper">
          <div class="title">
            <span>党建活动统计</span>
          </div>
          <party-activity />
        </div>
      </div>
      <div class="flex-item-wrapper">
        <div class="top-wrapper">
          <div class="title">
            <span>党建资讯统计</span>
          </div>
          <party-build-info />
        </div>
        <div class="bottom-wrapper">
          <div class="title">
            <span>党建学习统计</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaiduMapWrapper from './components/baiduMapWrapper.vue'
import PartyActivity from './components/partyActivity.vue'
import PartyBuildInfo from './components/partyBuildInfo.vue'

export default {
  name: 'homepage',

  components: {
    BaiduMapWrapper,
    PartyActivity,
    PartyBuildInfo
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.homepage {
  width: 100%;
  height: 100%;
  background: url('../../assets/homepage_images/bg.png') no-repeat;
  background-size: 100% 100%;
  min-width: calc(100% - 200px);
  .header-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 88px;
    // strong {
    //   color: #c60f0f;
    //   font-size: 48px;
    // }
  }
  .content-wrapper {
    height: calc(100% - 88px);
    display: flex;
    .flex-item-wrapper {
      flex: 1;
      &:nth-child(1) {
        margin-left: 16px;
        display: flex;
        flex-direction: column;
        .top-wrapper {
          flex: 0.8;
          background: rgba(255, 255, 255, 0.90);
          border-radius: 8px;
          margin-bottom: 16px;
        }
        .middle-wrapper {
          flex: 1.13;
          background: rgba(255, 255, 255, 0.90);
          border-radius: 8px;
          margin-bottom: 16px;
        }
        .bottom-wrapper {
          flex: 1;
          background: rgba(255, 255, 255, 0.90);
          border-radius: 8px;
          margin-bottom: 16px;
        }
      }
      &:nth-child(2) {
        flex: 1.3;
        margin: 0 16px;
        display: flex;
        flex-direction: column;
        .top-wrapper {
          flex: 2;
          background: rgba(255, 255, 255, 0.90);
          border-radius: 8px;
          margin-bottom: 16px;
        }
        .bottom-wrapper {
          flex: 1;
          background: rgba(255, 255, 255, 0.90);
          border-radius: 8px;
          margin-bottom: 16px;
        }
      }
      &:nth-child(3) {
        display: flex;
        flex-direction: column;
        margin-right: 16px;
        .top-wrapper {
          flex: 2;
          background: rgba(255, 255, 255, 0.90);
          border-radius: 8px;
          margin-bottom: 16px;
        }
        .bottom-wrapper {
          flex: 1;
          background: rgba(255, 255, 255, 0.90);
          border-radius: 8px;
          margin-bottom: 16px;
        }
      }
      .title {
        position: absolute;
        z-index: 1;
        background: url('../../assets/homepage_images/title_bg.png') no-repeat;
        background-size: 100% 100%;
        height: 48px;
        width: 240px;
        margin: 0 0 0 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          // font-family: PingFangSC-Medium;
          font-size: 18px;
          color: #fff;
          letter-spacing: 1.85px;
        }
      }
    }
  }
}
</style>