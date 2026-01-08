<script setup>

</script>

<template>
  <div class="innercontainer">
    <div class="card" v-for="zimmer in daten">
      <div class="card-header">
        <h3>{{ zimmer.name }}</h3>
      </div>
      <div class="card-body">
        <div class="input-container">
          <input type="text" v-model="zimmer.name" id="zimmer_name" required autocomplete="off">
          <label for="zimmer_name">Zimmername</label>
        </div>
        <div class="input-container">
          <input type="text" v-model="zimmer.standort" id="zimmer_standort" required autocomplete="off">
          <label for="zimmer_standort">Standort</label>
        </div>
        <div class="input-container">
          <input type="range" min="1" max="12" v-model="zimmer.anzahl" id="zimmer_anzahl" required autocomplete="off">
          <label for="zimmer_anzahl">Anzahl Betten</label>
        </div>
      </div>
      <div class="card-footer">
        <button type="submit" class="btn btn-save">Speichern</button>
        <button class="btn btn-delete">Löschen</button>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <h3>Neues Zimmer</h3>
      </div>
      <div class="card-body">
        <button class="btn">Hinzufügen</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>