'use server';

import { revalidatePath } from 'next/cache';
import { connectToDB } from '@/lib//mongoose';
import User from '@/lib/models/user.model';

interface Params {
	userId: string;
	username: string;
	name: string;
	bio: string;
	image: string;
	path: string;
}

export const updateUser = async ({ userId, username, name, bio,image, path }: Params): Promise<void> => {
	connectToDB();
	try {
		await User.findOneAndUpdate(
			{ id: userId },
			{
				username: username.toLowerCase(),
				name,
				bio,
				image,
				onboarded: true
			},
			{ upsert: true }
		);

		if (path === '/profile/edit') {
			revalidatePath(path);
		}
	} catch (error: any) {
		throw new Error(`Failed to create/update user: ${error.message}`);
	}
};

export const fetchUser= async (userId: string) => {
	try {
		connectToDB();		
		return await User.findOne({ id: userId })
		// .populate({
			// path: 'communities',
			// model: Community
		// });
	} catch (error: any) {
		throw new Error(`Failed to fecth user: ${error.message}`)
	}
};
