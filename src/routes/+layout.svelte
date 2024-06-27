<script>
	import '../app.css';
	import { authStore } from '$lib/pocketbase/auth.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	const login = async () => {
		await authStore.login();
	};

	const logout = () => {
		authStore.logout();
	};

	const { children } = $props();

	let hasSynced = $state(false);

	$effect(() => {
		authStore.syncAuthState();
		hasSynced = true;
	});
</script>

{#if hasSynced}
	<div class="flex flex-col min-h-[100dvh] justify-between">
		<header class="px-4 lg:px-6 h-14 flex items-center">
			<a class="flex items-center justify-center" href="/">
				<span class="text-2xl font-bold italic">Burgology</span>
			</a>
			<nav class="ml-auto flex gap-4 sm:gap-6">
				{#if authStore.user}
					<Button href="/raid" variant="ghost">Raid Time</Button>
					<Button onclick={logout} variant="outline">Logout</Button>
				{:else}
					<Button onclick={login} class="bg-indigo-500">Sign in With Discord</Button>
				{/if}
			</nav>
		</header>
		{@render children()}
		<footer class="w-full flex justify-center items-center p-4">
			<h2 class="text-light text-neutral-800">@burgology 2024</h2>
		</footer>
	</div>
{:else}
	<div>Loading...</div>
{/if}
