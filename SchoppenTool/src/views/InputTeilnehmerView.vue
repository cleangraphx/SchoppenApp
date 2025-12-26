<script setup>
  import { reactive } from 'vue'

  const form = reactive({
    vorname: '',
    nachname: '',
    geschlecht: '',
    geburtstag: '',
    addresse: '',
    email: ''
  });

  const errors = reactive({
    vorname: null,
    nachname: null,
    geschlecht: null,
    geburtstag: null,
    adresse: null,
    email: null
  });

  const status = reactive({
    loading: false,
    success: false,
    error: null
  });

  const validate = () => {
    let isValid = true;

    errors.vorname = null;
    errors.nachname = null;
    errors.geschlecht = null;
    errors.geburtstag = null;
    errors.adresse = null;
    errors.email = null;

    if (!form.vorname) {
      errors.vorname = 'Vorname darf nicht leer sein!';
      isValid = false;
    }
    if (!form.nachname) {
      errors.nachname = 'Nachname darf nicht leer sein!';
      isValid = false;
    }
    if (!(form.geschlecht === 'männlich') || !(form.geschlecht === 'weiblich')) {
      errors.geschlecht = 'Geschlecht auswählen';
      isValid = false;
    }
    if (!form.geburtstag) {
      error.geburtstag = 'Bitte Geburtstag auswählen';
      isValid = false;
    }
    return isValid;
  };

  const submitForm = async () => {
    if (!validate()) {
      return;
    }

    status.loading = true;
    status.success = false;
    status.error = null;

    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:3000/api/input/teilnehmer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        status.success = true;

        form.vorname = '';
        form.nachname = '';
        form.geschlecht = '';
        form.geburtstag = '';
        form.adresse = '';
        form.email = '';
      } else {
        const text = await res.text();
        status.error = 'Server Fehler: ' + text;
      }
    } catch (error) {
      status.error = 'Verbindung Fehler: ' + error.message;
    } finally {
      status.loading = false;
    }
  };
</script>

<template>
  <div class="innercontainer">
    <h2>Neuen Teilnehmer anlegen</h2>
    <div class="divider" />
    <form @submit.prevent="submitForm">
      <div class="formgroup">
        <label for="vorname">Vorname:</label>
        <input v-model="form.vorname" type="text" placeholder="Vorname" id="vorname" />
        <span v-if="errors.vorname" class="error-msg">{{ errors.vorname }}</span>
      </div>
      <div class="formgroup">
        <label for="nachname">Nachname:</label>
        <input v-model="form.nachname" type="text" placeholder="Nachname" id="nachname" />
        <span v-if="errors.nachname" class="error-msg">{{ errors.nachname }}</span>
      </div>
      <div class="formgroup">
        <label for="geschlecht">Geschlecht:</label>
        <select v-model="form.geschlecht" name="geschlecht" id="geschlecht">
          <option value="männlich">männlich</option>
          <option value="weiblich">weiblich</option>
        </select>
        <span v-if="errors.geschlecht" class="error-msg">{{ errors.geschlecht }}</span>
      </div>
      <div class="formgroup">
        <label for="geburtstag">Geburtstag:</label>
        <input v-model="form.geburtstag" type="date" id="geburtstag" />
        <span v-if="errors.geburtstag" class="error-msg">{{ errors.geburtstag }}</span>
      </div>
      <div class="formgroup">
        <label for="adresse">Nachname:</label>
        <input v-model="form.adresse" type="text" placeholder="Adresse" id="adresse" />
        <span v-if="errors.adresse" class="error-msg">{{ errors.adresse }}</span>
      </div>
      <div class="formgroup">
        <label for="email">Email:</label>
        <input v-model="form.email" type="email" placeholder="E-Mail@Mail.de" id="email" />
        <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
      </div>

      <div v-if="status.success" class="success-box">✅ Erfolgreich gespeichert!</div>
      <div v-if="status.error" class="error-box">❌ {{ status.error }}</div>

      <button type="submit" :disabled="status.loading">{{ status.loading ? 'Speichere...' : 'Teilnehmer erstellten' }}</button>
    </form>
  </div>
</template>

<style scoped></style>
