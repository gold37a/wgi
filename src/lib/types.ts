import { escape } from '@edge37/util';

export class EscapedEmail {
	value: string;
	constructor(email: string) {
		this.value = escape(email);
	}
}
