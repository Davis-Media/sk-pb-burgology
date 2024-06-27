<script>
	import { authStore } from '$lib/pocketbase/auth.svelte';
	import { pb } from '$lib/pocketbase/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Dialog from '$lib/components/ui/dialog';
	import Button from '$lib/components/ui/button/button.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import { page } from '$app/stores';

	const id = $page.url.searchParams.get('id');

	let raidData = $state(null);

	let players = $state([]);

	let filteredPlayers = $derived.by(() => {
		if (!raidData || !raidData.expand || !raidData.expand.players) {
			return players;
		}

		return players.filter((p) => {
			const idx = raidData.expand.players.findIndex((v) => {
				return v.id === p.id;
			});

			if (idx === -1) {
				return true;
			}

			return false;
		});
	});

	let burgerCounts = $derived.by(() => {
		const burgerMap = new Map();

		if (!raidData || !raidData.expand || !raidData.expand.players || !raidData.expand.runs) {
			return burgerMap;
		}

		raidData.expand.runs.forEach((r) => {
			if (r.encounter === encounter) {
				const player = raidData.expand.players.find((p) => {
					return p.id === r.player;
				});

				const curData = burgerMap.get(player.id);

				if (curData) {
					burgerMap.set(player.id, {
						playerData: player,
						burgers: curData.burgers + 1
					});
				} else {
					burgerMap.set(player.id, {
						playerData: player,
						burgers: 1
					});
				}
			}
		});

		return burgerMap;
	});

	let encounter = $state(1);
	let wipe = $state(1);

	$effect(async () => {
		if (!authStore.user) {
			goto('/');
		}

		raidData = await pb.collection('raids').getOne(id, {
			expand: 'runs,players'
		});

		players = await pb.collection('players').getFullList();

		if (raidData.expand && raidData.expand.runs) {
			if (raidData.expand.runs.length > 0) {
				encounter = raidData.expand.runs[raidData.expand.runs.length - 1].encounter;
				wipe = raidData.expand.runs[raidData.expand.runs.length - 1].wipe + 1;
			}
		}
	});

	let playerId = $state('');
	let addIsOpen = $state(false);

	let isLoading = $state(false);
</script>

{#if !raidData}
	<main>loading...</main>
{:else}
	<main class="grow flex flex-col justify-between">
		<div class="w-full flex flex-row justify-between p-4 items-center">
			<h2 class="text-2xl font-bold">RAID: {raidData.raidName} - {raidData.name}</h2>
			<Dialog.Root
				open={addIsOpen}
				onOpenChange={(o) => {
					addIsOpen = o;
				}}
			>
				<Dialog.Trigger>
					<Button>Add Player</Button>
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Add Player</Dialog.Title>
					</Dialog.Header>
					<div>
						<div>
							<Label>Select Player</Label>
							<Select.Root
								onSelectedChange={(v) => {
									playerId = v.value;
								}}
							>
								<Select.Trigger class="w-full">
									<Select.Value placeholder="Raid Name" />
								</Select.Trigger>
								<Select.Content>
									{#each filteredPlayers as fp}
										<Select.Item value={fp.id}>{fp.nickname}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</div>
						<Button
							onclick={async () => {
								let curPlayerIds = [];
								if (raidData.expand && raidData.expand.players) {
									curPlayerIds = raidData.expand.players.map((p) => {
										return p.id;
									});
								}
								curPlayerIds.push(playerId);
								await pb.collection('raids').update(id, {
									players: curPlayerIds
								});

								raidData = await pb.collection('raids').getOne(id, {
									expand: 'runs,players'
								});

								addIsOpen = false;
							}}>Add</Button
						>
					</div>
				</Dialog.Content>
			</Dialog.Root>
		</div>
		<div class="grow flex flex-col justify-between">
			<Table.Root class="">
				<Table.Header class="sticky top-0">
					<Table.Row>
						<Table.Head class="w-[100px]">Run</Table.Head>
						{#if raidData.expand && raidData.expand.players}
							{#each raidData.expand.players as player}
								<Table.Head class="font-bold text-black"
									>{player.nickname} - {burgerCounts.get(player.id)
										? burgerCounts.get(player.id).burgers
										: 0}</Table.Head
								>
							{/each}
						{:else}
							<Table.Head class="font-bold text-black">no players found...</Table.Head>
						{/if}
					</Table.Row>
				</Table.Header>
				<Table.Body class="">
					{#if raidData.expand && raidData.expand.runs}
						{#each raidData.expand.runs as run}
							{#if run.encounter === encounter}
								<Table.Row>
									<Table.Cell class="font-medium w-[100px]"
										>E{run.encounter} - W{run.wipe}</Table.Cell
									>
									{#each raidData.expand.players as player}
										{#if player.id === run.player}
											<Table.Cell class="text-2xl">🍔</Table.Cell>
										{:else}
											<Table.Cell class="text-2xl">⏰</Table.Cell>
										{/if}
									{/each}
								</Table.Row>
							{/if}
						{/each}
					{/if}
				</Table.Body>
			</Table.Root>
			<Table.Root class=" ">
				<Table.Body>
					<Table.Row>
						<Table.Cell class="font-medium w-[100px]">BURG</Table.Cell>
						{#if raidData.expand && raidData.expand.players}
							{#each raidData.expand.players as player}
								<Table.Cell>
									<Button
										disabled={isLoading}
										onclick={async () => {
											isLoading = true;
											const nRun = await pb.collection('runs').create({
												encounter,
												wipe,
												player: player.id
											});

											let curRunIds = [];
											if (raidData.expand && raidData.expand.runs) {
												curRunIds = raidData.expand.runs.map((r) => {
													return r.id;
												});
											}
											curRunIds.push(nRun.id);
											await pb.collection('raids').update(id, {
												runs: curRunIds
											});

											raidData = await pb.collection('raids').getOne(id, {
												expand: 'runs,players'
											});

											wipe += 1;
											isLoading = false;
										}}>{player.nickname}</Button
									>
								</Table.Cell>
							{/each}
						{/if}
					</Table.Row>
				</Table.Body>
			</Table.Root>
		</div>

		<div class="">
			<Separator class="my-3" />
			<Button
				onclick={() => {
					if (encounter > 1) {
						encounter -= 1;
						if (raidData.expand && raidData.expand.runs) {
							if (raidData.expand.runs.length > 0) {
								// find the highest wipe # for the new encounter
								let lastWipe = 0;
								raidData.expand.runs.forEach((r) => {
									if (r.encounter === encounter && r.wipe > lastWipe) {
										lastWipe = r.wipe;
									}
								});
								wipe = lastWipe + 1;
							}
						}
					}
				}}>Prev Encounter</Button
			>
			<Button
				onclick={() => {
					encounter += 1;
					wipe = 1;
				}}>Next Encounter</Button
			>
			<div>
				<h2>ENCOUNTER #{encounter}</h2>
				<h2>WIPE #{wipe}</h2>
			</div>
		</div>
	</main>
{/if}
