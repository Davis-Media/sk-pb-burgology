import { pb } from '.';

class RaidStore {
	raids = $state([]);

	async loadRaids() {
		this.raids = await pb.collection('raids').getFullList();
	}

	async createNewRaid(data) {
		const nRaid = await pb.collection('raids').create(data);
		this.raids.push(nRaid);
	}
}

export const raidStore = new RaidStore();
