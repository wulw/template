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
          <party-profile :profileData="profileData"/>
        </div>
        <div class="middle-wrapper">
          <div class="title">
            <span>党员年龄分布</span>
          </div>
          <party-age :ageData="ageData" />
        </div>
        <div class="bottom-wrapper">
          <div class="title">
            <span>党员性别分布</span>
          </div>
          <party-gender :genderData="genderData"/>
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
          <party-activity :activityData="activityData"/>
        </div>
      </div>
      <div class="flex-item-wrapper">
        <div class="top-wrapper">
          <div class="title">
            <span>党建资讯统计</span>
          </div>
          <party-build-info :buildData="buildData"/>
        </div>
        <div class="bottom-wrapper">
          <div class="title">
            <span>党建学习统计</span>
          </div>
          <party-learn :learnData="learnData"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PartyProfile from './components/partyProfile.vue'
import BaiduMapWrapper from './components/baiduMapWrapper.vue'
import PartyActivity from './components/partyActivity.vue'
import PartyAge from './components/partyAge.vue'
import PartyBuildInfo from './components/partyBuildInfo.vue'
import PartyGender from './components/partyGender.vue'
import PartyLearn from './components/partyLearn.vue'
import { getHomeList } from '@/api/home'

export default {
  name: 'homepage',

  components: {
    PartyProfile,
    BaiduMapWrapper,
    PartyActivity,
    PartyBuildInfo,
    PartyLearn,
    PartyAge,
    PartyGender
  },
  data () {
    return {
      ageData: [],
      genderData: null,
      profileData: null,
      activityData: null,
      buildData: null,
      learnData: null
    }
  },
  methods: {
    // 获取首页数据
    getHomeList () {
      getHomeList().then(res => {
        if (res && res.code === 200) {
          // this.ageData = res.data.age.map((item) => {
          //     return item.count
          // })
          this.ageData = res.data.age || []
          this.genderData = res.data.dysex
          this.profileData = res.data.dygk
          this.activityData = res.data.djhdtj
          this.buildData = res.data.djzxtj
          this.learnData = res.data.djxxtj
        }
      })
    }
  },
  created() {
    this.getHomeList()
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