<script setup></script>

<template>
  <div class="innercontainer">
    <div class="card">
      <div class="card-header">
        <h3>Teilnehmeransicht</h3>
      </div>
      <div class="card-body">
        <div class="input-container">
          <input
            type="text"
            v-model="teilnehmer.vorname"
            id="vorname"
            required
            autocomplete="off"
          />
          <label for="vorname">Vorname:</label>
          <p v-if="errors.vorname" class="error-msg">{{ errors.vorname }}</p>
        </div>
        <div class="input-container">
          <input
            type="text"
            v-model="teilnehmer.nachname"
            id="nachname"
            required
            autocomplete="off"
          />
          <label for="nachname">Nachname:</label>
          <p v-if="errors.nachname" class="error-msg">{{ errors.nachname }}</p>
        </div>
        <div class="input-container">
          <select
            v-model="teilnehmer.geschlecht"
            name="geschlecht"
            id="geschlecht"
            required
            autocomplete="off"
          >
            <option value="männlich">männlich</option>
            <option value="weiblich">weiblich</option>
          </select>
          <label for="geschlecht">Geschlecht:</label>
          <p v-if="errors.geschlecht" class="error-msg">{{ errors.geschlecht }}</p>
        </div>
        <div class="input-container">
          <input
            v-model="teilnehmer.geburtstag"
            type="date"
            id="geburtstag"
            required
            autocomplete="off"
          />
          <label for="geburtstag">Geburtstag:</label>
          <p v-if="errors.geburtstag" class="error-msg">{{ errors.geburtstag }}</p>
        </div>
        <div class="input-container">
          <input v-model="adresse" type="text" id="adresse" required autocomplete="off" />
          <label for="adresse">Adresse:</label>
          <p v-if="errors.adresse" class="error-msg">{{ errors.adresse }}</p>
        </div>
        <div class="input-container">
          <input v-model="email" type="text" id="email" required autocomplete="off" />
          <label for="email">E-Mail:</label>
          <p v-if="errors.email" class="error-msg">{{ errors.email }}</p>
        </div>
        <div>
          <h3>Besuchte Freizeiten:</h3>
          <p v-if="teilnehmer.freizeiten.length === 0">Noch keine Freizeiten besucht</p>
          <table v-if="teilnehmer.freizeiten.length > 0" class="data-table">
            <thead>
              <tr>
                <th>Freizeit</th>
                <th>Zeitraum</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="freizeit in teilnehmer.freizeiten">
                <td>{{ freizeit.name }}</td>
                <td>{{ freizeit.zeitraum }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-footer">
        <button>Bearbeiten</button>
        <button>Löschen</button>
        <button>Speichern</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
