<script>
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import { authStore } from '$lib/pocketbase/auth.svelte';
	import { pb } from '$lib/pocketbase';
	import Label from '$lib/components/ui/label/label.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import { raidStore } from '$lib/pocketbase/raids.svelte';
	import * as Table from '$lib/components/ui/table/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';

	$effect(async () => {
		if (!authStore.user) {
			goto('/');
		}

		await raidStore.loadRaids();
	});

	let name = $state('');
	let raidName = $state('');

	$inspect(raidStore.raids);

	const raidData = [
		{ value: 'LW', label: 'Last Wish' },
		{ value: 'GOS', label: 'Garden of Salvation' },
		{ value: 'DSC', label: 'Deep Stone Crypt' },
		{ value: 'VOG', label: 'Vault of Glass' },
		{ value: 'VOTD', label: 'Vow of the Disciple' },
		{ value: 'KF', label: "King's Fall" },
		{ value: 'RON', label: 'Root of Nightmares' },
		{ value: 'CE', label: "Crota's End" },
		{ value: 'SE', label: "Salvation's Edge" }
	];
</script>

<main class="grow">
	<div class="w-full flex flex-row justify-between items-center p-4">
		<h2 class="font-bold text-2xl">Manage the Raids</h2>
		<Drawer.Root>
			<Drawer.Trigger>
				<Button>Start New Raid</Button>
			</Drawer.Trigger>
			<Drawer.Content>
				<Drawer.Header>
					<Drawer.Title>Start a New Raid</Drawer.Title>
				</Drawer.Header>
				<div class="flex flex-col items-center gap-4 w-1/2 my-0 mx-auto">
					<div class="w-full">
						<Label for="name">Name</Label>
						<Input name="name" id="name" bind:value={name} />
					</div>
					<div class="w-full">
						<Label for="raidName">Raid</Label>
						<Select.Root
							onSelectedChange={(v) => {
								raidName = v.value;
							}}
						>
							<Select.Trigger class="w-full">
								<Select.Value placeholder="Raid Name" />
							</Select.Trigger>
							<Select.Content>
								{#each raidData as rd}
									<Select.Item value={rd.value}>{rd.label}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
				</div>
				<Drawer.Footer>
					<Button
						onclick={async () => {
							await raidStore.createNewRaid({ raidName, name });
						}}>Start</Button
					>
					<Drawer.Close>Cancel</Drawer.Close>
				</Drawer.Footer>
			</Drawer.Content>
		</Drawer.Root>
	</div>

	<Separator class="my-4 bg-black" />

	<Table.Root>
		<Table.Caption>Our Raids</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head class="w-[100px]">Raid</Table.Head>
				<Table.Head>Name</Table.Head>
				<Table.Head>Date</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each raidStore.raids as raid}
				<Table.Row>
					<Table.Cell class="font-medium">{raid.raidName}</Table.Cell>
					<Table.Cell>{raid.name}</Table.Cell>
					<Table.Cell>{new Date(raid.created).toLocaleDateString()}</Table.Cell>
					<Table.Cell class="text-right"
						><Button href={`raid/${raid.id}`} variant="outline">View</Button></Table.Cell
					>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</main>
