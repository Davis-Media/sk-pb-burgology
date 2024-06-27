import { pb } from '$lib/pocketbase';

class AuthStore {
	user = $state(null);

	syncAuthState() {
		if (pb.authStore.isValid) {
			this.user = pb.authStore.model;
		}
	}

	async login() {
		this.user = await (await pb.collection('users').authWithOAuth2({ provider: 'discord' })).record;

		// after the above you can also access the auth data from the authStore
		console.log(pb.authStore.isValid);
		console.log(pb.authStore.token);
		console.log(pb.authStore.model.id);
	}

	logout() {
		pb.authStore.clear();
		this.user = null;
	}
}

export const authStore = new AuthStore();
