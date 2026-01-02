<script setup>

</script>

<template>
  <div class="innercontainer">
    <div class="zimmer" v-for="zimmer in zimmerDaten" :key="zimmer.ID">
      <h2>{{  zimmer.zimmername  }}</h2>
      <div class="zimmerconfig">
        <button class="zimmerconfig switchbutton aktiv">Aktiviert</button>
        <button class="zimmerconfig switchbutton geschlecht-m">Männer / Jungs</button>
        <input type="text" class="zimmerconfig" placeholder="{{  zimmer.maximal  }}">
      </div>
      <div class="zimmerteilnehmer">
        <ol class="zimmerteilnehmer">
          <li class="zimmerteilnehmer" v-for="teilnehmer in zimmer.teilnehmer">{{ teilnehmer.name }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>