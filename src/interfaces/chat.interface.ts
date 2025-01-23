
export interface IConvo{
	_id: string;
	recipients: string[];
	lastMessage: string;
	alias: string;
	aliasAvatar: string;
	unreadMessages: number;
	createdAt: string;
	updatedAt: string;
};

export interface IMsg  {
	_id: string;
	conversation: string;
	to: IMsgAlias;
	from: IMsgAlias;
	message: string;
	attachment: [];
	seen: string[];
	createdAt: string;
	updatedAt: string;
};

export interface IMsgAlias {
	_id: string;
	firstName: string;
	lastName: string;
	phoneNumber: string;
	country: string;
	email: string;
	password: string;
	role: string;
	verificationToken: string;
	isVendor: boolean;
	addresses: [];
	createdAt: string;
	updatedAt: string;
	avatar: string;
};