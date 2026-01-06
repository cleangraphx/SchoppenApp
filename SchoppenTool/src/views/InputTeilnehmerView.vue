<script setup>
import { reactive } from 'vue'

const form = reactive({
  vorname: '',
  nachname: '',
  geschlecht: '',
  geburtstag: '',
  addresse: '',
  email: '',
})

const errors = reactive({
  vorname: null,
  nachname: null,
  geschlecht: null,
  geburtstag: null,
  adresse: null,
  email: null,
})

const status = reactive({
  loading: false,
  success: false,
  error: null,
})

const validate = () => {
  let isValid = true

  errors.vorname = null
  errors.nachname = null
  errors.geschlecht = null
  errors.geburtstag = null
  errors.adresse = null
  errors.email = null

  if (!form.vorname) {
    errors.vorname = 'Vorname darf nicht leer sein!'
    isValid = false
  }
  if (!form.nachname) {
    errors.nachname = 'Nachname darf nicht leer sein!'
    isValid = false
  }
  if (!form.geschlecht) {
    errors.geschlecht = 'Geschlecht auswählen'
    isValid = false
  }
  if (!form.geburtstag) {
    error.geburtstag = 'Bitte Geburtstag auswählen'
    isValid = false
  }
  return isValid
}

const submitForm = async () => {
  if (!validate()) {
    return
  }

  status.loading = true
  status.success = false
  status.error = null

  const token = localStorage.getItem('token')

  try {
    const res = await fetch('http://jonserver:3000/api/input/teilnehmer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      status.success = true

      form.vorname = ''
      form.nachname = ''
      form.geschlecht = ''
      form.geburtstag = ''
      form.adresse = ''
      form.email = ''
    } else {
      const text = await res.text()
      status.error = 'Server Fehler: ' + text
    }
  } catch (error) {
    status.error = 'Verbindung Fehler: ' + error.message
  } finally {
    status.loading = false
  }
}
</script>

<template>
  <div class="innercontainer">
    <div class="card">
      <div class="card-header">
        <h3>Neuen Teilnehmer anlegen</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <table class="data-table">
            <tbody>
              <tr>
                <td>
                  <label for="vorname">Vorname:</label>
                </td>
                <td>
                  <input v-model="form.vorname" type="text" placeholder="Vorname" id="vorname" />
                </td>
                <td v-if="errors.vorname" class="error-msg">{{ errors.vorname }}</td>
              </tr>
              <tr>
                <td>
                  <label for="nachname">Nachname:</label>
                </td>
                <td>
                  <input v-model="form.nachname" type="text" placeholder="Nachname" id="nachname" />
                </td>
                <td v-if="errors.nachname" class="error-msg">{{ errors.nachname }}</td>
              </tr>
              <tr>
                <td>
                  <label for="geschlecht">Geschlecht:</label>
                </td>
                <td>
                  <select v-model="form.geschlecht" name="geschlecht" id="geschlecht">
                    <option value="männlich">männlich</option>
                    <option value="weiblich">weiblich</option>
                  </select>
                </td>
                <td v-if="errors.geschlecht" class="error-msg">{{ errors.geschlecht }}</td>
              </tr>
              <tr>
                <td>
                  <label for="geburtstag">Geburtstag:</label>
                </td>
                <td>
                  <input v-model="form.geburtstag" type="date" id="geburtstag" />
                </td>
                <td v-if="errors.geburtstag" class="error-msg">{{ errors.geburtstag }}</td>
              </tr>
              <tr>
                <td>
                  <label for="adresse">Adresse:</label>
                </td>
                <td>
                  <div class="editable-input" contenteditable="true">Addresse</div>
                  <!--                  /* <input v-model="form.adresse" type="text" placeholder="Adresse" id="adresse" /> */-->
                </td>
                <td v-if="errors.adresse" class="error-msg">{{ errors.adresse }}</td>
              </tr>
              <tr>
                <td>
                  <label for="email">Email:</label>
                </td>
                <td>
                  <input v-model="form.email" type="text" placeholder="Email" id="email" />
                </td>
                <td v-if="errors.email" class="error-msg">{{ errors.email }}</td>
              </tr>
            </tbody>
          </table>

          <div v-if="status.success" class="success-box">✅ Erfolgreich gespeichert!</div>
          <div v-if="status.error" class="error-box">❌ {{ status.error }}</div>

          <button type="submit" :disabled="status.loading">
            {{ status.loading ? 'Speichere...' : 'Teilnehmer erstellten' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
form {
  min-width: 350px;
}
input {
  min-width: 180px;
  overflow-x: scroll;
}
.editable-input {
  border: 1px solid #ccc;
  padding: 5px;
  min-width: 200px;
  display: inline-block; /* Oder block, je nach Layout */
  cursor: text;
}
</style>
