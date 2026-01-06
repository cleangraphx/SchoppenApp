<script setup>
import { ref } from 'vue'
import draggable from 'vuedraggable'

const zimmerDaten = ref([
  {
    id: 1,
    name: 'Wespennest',
    teilnehmer: [
      { id: 1, name: 'Max Mustermann', alter: 18, geschlecht: 'männlich' },
      { id: 2, name: 'Ursula Musterfrau', alter: 22, geschlecht: 'weiblich' },
    ],
  },
  {
    id: 2,
    name: 'Bärenhöhle',
    teilnehmer: [],
  },
])

const onChange = (evt) => {
  if (evt.added) {
    console.log('Teilnehmer hinzugefügt zu Zimmer', evt.added.element)
  }
}

const saveChanges = async () => {
  console.log('Sende an Datenbank:', JSON.stringify(zimmer.value, null, 2))

  await fetch('http://jonserver:3000/api/input/zimmer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(zimmer.value),
  })
}
</script>

<template>
  <div class="innercontainer">
    <div class="card" v-for="zimmer in zimmerDaten" :key="zimmer.ID">
      <div class="card-header">
        <h3>{{ zimmer.name }}</h3>
        <!--      <div class="zimmerconfig">
          <button class="zimmerconfig switchbutton aktiv">Aktiviert</button>
          <button class="zimmerconfig switchbutton geschlecht-m">Männer / Jungs</button>
          <input type="text" class="zimmerconfig" placeholder="{{  zimmer.maximal  }}">
        </div>-->
      </div>

      <div class="table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Vorname-Nachname</th>
              <th>Alter</th>
              <th>Geschlecht</th>
            </tr>
          </thead>
          <draggable
            v-model="zimmer.teilnehmer"
            tag="tbody"
            group="teilnehmer"
            item-key="id"
            @change="onChange"
          >
            <template #item="{ element }">
              <tr class="draggable-row">
                <td>{{ element.name }}</td>
                <td>{{ element.alter }}</td>
                <td>{{ element.geschlecht }}</td>
              </tr>
            </template>
          </draggable>
        </table>
      </div>

      <div v-if="zimmer.teilnehmer.length === 0" class="card-footer">
        <p>Zimmer ist leer</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>