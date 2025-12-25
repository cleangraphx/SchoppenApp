<template>
	<div class="login">
		<h2>Login</h2>
		<input v-model="username" placeholder="Benutzername" />
		<input v-model="password" placeholder="Passwort" />
		<button @click="login">Einloggen</button>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';

	const username = ref('');
	const password = ref('');
	const router = useRouter();

	const login = async () => {
		const res = await fetch('http://192.168.178.41:3000/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: username.value, password: password.value })
		});

		if (res.ok) {
			const data = await res.json();
			localStorage.setItem('token', data.token);
			localStorage.setItem('role', data.role);
			router.push('/');
		} else {
			alert('Falscher Login');
		}
	};
</script>
