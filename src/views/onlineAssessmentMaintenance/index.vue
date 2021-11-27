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
    scoreViewList: () => import('./components/scoreViewList.vue'),
    questionMaintenance: () => import('./components/questionMaintenance.vue')
  },
  data () {
    return {
      componentsName: 'partyActivityManagement'
    }
  },
  methods: {

  },
  created() {
    EventBus.$on('openScoreView', (id) => {
      this.componentsName = 'scoreViewList'
      EventBus.$emit('scoreView', id)
    })
    
    EventBus.$on('openQuestionMaintenance', (id) => {
      this.componentsName = 'questionMaintenance'
      EventBus.$emit('questionMaintenance', id)
    })
    
    EventBus.$on('back', (params) => {
      this.componentsName = params
    })
  }
}
</script>

<style lang="scss" scoped>
.index-wrapper {
  height: 100%;
}
</style>
