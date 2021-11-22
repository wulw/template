<template>
  <div class="party-learn-wrapper">
    <div class="flex-wrapper">
      <div class="flex-item">
        <div class="title">图文学习</div>
        <div class="content">
          <div class="count">
            <span>{{ 1000 }}</span>
            <span>人</span>
          </div>
          <div class="percentage">{{ '57%' }}</div>
        </div>
      </div>
      <div class="flex-item">
        <div class="title">视频学习</div>
        <div class="content">
          <div class="count">
            <span>{{ 1000 }}</span>
            <span>人</span>
          </div>
          <div class="percentage">{{ '57%' }}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <label>总评论：</label>
      <span>12345</span>
      <label>总点赞次数：</label>
      <span>12345</span>
      <label>总转发次数：</label>
      <span>12345</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'partyLearn',

  data () {
    return {

    }
  },
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
