<script setup>
  import { ref } from 'vue';
  import { onMounted } from 'vue';

  const tabellenDaten = ref([]);

  onMounted(async() => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://jonserver:3000/api/data', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (response.ok) {
        tabellenDaten.value = await response.json();
      } else {
        console.log("Fehler beim Laden:", response.status);
      }
    } catch (error) {
      console.log("Verbindungsfehler:", error);
    }
  });
</script>

<template>
  <div class="innercontainer">
    <table class="table">
      <thead>
        <tr>
          <th>Vorname</th>
          <th>Nachname</th>
          <th>Geschlecht</th>
          <th>Geburtstag</th>
          <th>Adresse</th>
          <th>E-Mail</th>
          <th>Letzte Freizeit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tabellenDaten" :key="row.ID">
          <th>{{ row.Vorname }}</th>
          <th>{{ row.Nachname }}</th>
          <th>{{ row.Geschlecht }}</th>
          <th>{{ row.Geburtstag }}</th>
          <th>{{ row.Addresse }}</th>
          <th>{{ row.Email }}</th>
          <th>Letzte Freizeit</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  .innercontainer {
    width: 100%;
    height: 100%;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    max-height: 100%;
    overflow-y: scroll;
    padding: 20px;
  }
  th, td {
    padding: 10px;
    text-align: left;
  }
  thead {
    border-bottom: 3px solid black;
    border-radius: 3px;
  }
  tbody tr {
    border-bottom: 1px dashed #ccc;
    transition: background-color 0.15s ease-in-out;
  }
  tbody tr:hover {
    background-color: #383838;
    color: white;
  }
  tbody tr:last-child {
    border-bottom: none;
  }
</style>
