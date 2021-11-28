<template>
  <div class="party-learn-wrapper">
    <div class="flex-wrapper">
      <div class="flex-item">
        <div class="title">图文学习</div>
        <div class="content">
          <div class="count">
            <span>{{ learnData.picture }}</span>
            <span>人</span>
          </div>
          <div class="percentage">{{ (learnData.picture / (learnData.picture + learnData.video)) * 100 }}%</div>
        </div>
      </div>
      <div class="flex-item">
        <div class="title">视频学习</div>
        <div class="content">
          <div class="count">
            <span>{{ learnData.video }}</span>
            <span>人</span>
          </div>
          <div class="percentage">{{ (learnData.video / (learnData.picture + learnData.video)) * 100 }}%</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <label>总评论：</label>
      <span>{{ learnData.see_number }}</span>
      <label>总点赞次数：</label>
      <span>{{ learnData.like_number }}</span>
      <label>总转发次数：</label>
      <span>{{ learnData.reprint_number }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'partyLearn',

  props: {
    learnData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {

    }
  },
  // watch: {
  //   learnData(newVal, oldVal) {
  //     if (newVal !== oldVal) {
  //       this.initEcharts()
  //     }
  //   }
  // },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.party-learn-wrapper {
  width: 100%;
  margin-top: 48px;
  height: calc(100% - 48px);
  .flex-wrapper {
    display: flex;
    height: calc(100% - 32px);
    padding: 16px 4px;
    .flex-item {
      margin: 0 8px;
      flex: 1;
      background: url('../../../assets/homepage_images/border_bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .title {
        writing-mode: tb-rl;
        color: #D0021B;
        font-size: 18px;
        font-weight: bold;
      }
      .content {
        margin-left: 8px;
        .count {
          padding-top: 16px;
          span {
            &:nth-child(1) {
              font-size: 35px;
              color: #4a4a4a;
            }
            &:nth-child(2) {
              font-size: 14px;
            }
          }
        }
        .percentage {
          padding-top: 8px;
          text-align: center;
          color: #4A4A4A;
        }
      }
    }
  }
  .footer {
    text-align: center;
    label {
      font-size: 14px;
    }
    span {
      margin-right: 8px;
    }
  }
}
</style>
