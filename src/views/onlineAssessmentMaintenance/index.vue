<template>
  <div class="index-wrapper">
    <component :is="componentsName" />
  </div>
</template>

<script>
import { EventBus } from '@/utils/eventBus'

export default {
  name: '',

  components: {
    partyActivityManagement: () => import('./components/partyActivityManagement.vue'),
    scoreViewList: () => import('./components/scoreViewList.vue')
  },
  data () {
    return {
      componentsName: 'partyActivityManagement'
    }
  },
  methods: {

  },
  created() {
    EventBus.$on('openScoreView', () => {
      this.componentsName = 'scoreViewList'
    })

    
    EventBus.$on('back', (params) => {
      this.componentsName = params
    })
  }
}
</script>

<style lang="scss" scoped>
.index-wrapper {

}
</style>
