<script setup></script>

<template>
  <div class="innercontainer">
    <div>
      <h2>Teilnehmeransicht:</h2>
      <h3>Bearbeiten</h3>
    </div>
    <div class="divider" />
    <h2>{{ teilnehmer.vorname + ' ' + teilnehmer.nachname }}</h2>
    <p>{{ teilnehmer.geschlecht }}</p>
    <p>{{ teilnehmer.geburtstag }}</p>
    <p>{{ teilnehmer.adresse }}</p>
    <p>{{ teilnehmer.email }}</p>
    <h3>Besuchte Freizeiten:</h3>
    <ul>
      <li>noch keine Freizeiten besucht</li>
      <li>...</li>
    </ul>
  </div>
</template>

<style scoped></style>
