<script lang="ts">

export default {
  name: 'ToDoRing',
  props: ['ringProgressPercent'],
  computed: {
    style () {
      return '--progress-value: ' + this.ringProgressPercent;
    }
  }
}
</script>

<template>
  <div class="ring-container">
    <div class="ring_mock-container" v-if="ringProgressPercent === 0">
      <h1 class="ring_mock" >U･ｪ･U</h1>
      <h2 class="ring_mock-description">Nothing done yet, tick to start</h2>
    </div>
    <div v-if="ringProgressPercent > 0" class="ring" :style="style">
      <progress class="ring-progress-bar" :value="ringProgressPercent" min="0" max="100"></progress>
    </div>
    <h2 v-if="ringProgressPercent > 0" class="ring-progress-percent">{{ ringProgressPercent }}%</h2>
  </div>
</template>

<style scoped>
.ring-container {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 600px;
}

.ring-progress-bar, .ring {
  width: 241px;
  height: 241px;
  border-radius: 50%;
  background: radial-gradient(closest-side, white 80%, transparent 80% 100%),
    conic-gradient(#005ce6 calc(var(--progress-value) * 1% ) , transparent 0%);
  margin-bottom: 30px;
}

.ring-progress-bar {
  visibility: hidden;
  width: 0px;
  height: 0px;
}

.ring-progress-percent {
  color: #000;
  font-family: Inter;
  font-size: 44px;
  font-weight: 700;
}

.ring_mock-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  justify-items: center;
  align-content: space-around;
  height: 100%;
  /* min-height: 600px; */
}

.ring_mock {
  color: #CCCCCCCC;
  font-weight: 600;
}

.ring_mock-description {
  color: #CCCCCCCC;
  font-weight: 500;
}
</style>
