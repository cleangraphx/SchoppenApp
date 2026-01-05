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
    <div class="zimmer" v-for="zimmer in zimmerDaten" :key="zimmer.ID">
      <h2>{{ zimmer.name }}</h2>
      <!--      <div class="zimmerconfig">
        <button class="zimmerconfig switchbutton aktiv">Aktiviert</button>
        <button class="zimmerconfig switchbutton geschlecht-m">Männer / Jungs</button>
        <input type="text" class="zimmerconfig" placeholder="{{  zimmer.maximal  }}">
      </div>-->
      <table class="zimmer">
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

      <div v-if="zimmer.teilnehmer.length === 0" class="zimmer-leer">Zimmer ist leer</div>
    </div>
  </div>
</template>

<style scoped>
div.innercontainer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  width: 90%;
  height: 90%;
}
div.zimmer {
  background-color: lightgray;
  padding: 4px;
  margin: 0;
  height: fit-content;
  box-sizing: border-box;
  border-radius: 16px;
}
div.zimmer h2 {
  text-align: center;
  font-weight: normal;
  padding: 4px;
  margin: 4px;
}
table.zimmer {
  text-align: center;
  margin: 8px;
  border-collapse: separate;
  border-spacing: 0 4px;
}
table.zimmer thead tr th {
  border-bottom: 2px solid black;
  margin-bottom: 4px;
  padding: 4px;
}
table.zimmer tbody td {
  padding: 4px;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
}
table.zimmer tbody tr td:first-child {
  border-left: 1px solid black;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}
table.zimmer tbody tr td:last-child {
  border-right: 1px solid black;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}
table.zimmer tbody tr {
}
div.zimmer-leer {
  margin: 8px;
  text-align: center;
}
</style>