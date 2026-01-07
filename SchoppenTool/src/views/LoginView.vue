<template>
	<div class="innercontainer">
		<div class="card">
			<div class="card-header">
				<h2>Login</h2>
			</div>
			<div class="card-body">
				<input v-model="username" placeholder="Benutzername" />
				<input v-model="password" placeholder="Passwort" />
				<button @click="login">Einloggen</button>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { useRouter } from 'vue-router';

	const username = ref('');
	const password = ref('');
	const router = useRouter();

	const login = async () => {
		const res = await fetch('http://jonserver:3000/login', {
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

<style scoped>
	input {
		height: auto;
		width: fit-content;
		padding: 8px;
		background-color: lightgray;
		border: 1px solid gray;
	}
	div.card-body {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
</style>
