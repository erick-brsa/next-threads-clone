'use server';

import { revalidatePath } from 'next/cache';
import { connectToDB } from '@/lib/mongoose';
import User from '@/lib/models//user.model';
import Thread from '@/lib/models//thread.model';

interface Params {
	text: string;
	author: string;
	communityId: string | null;
	path: string;
}

export const createThread = async ({ text, author, communityId, path }: Params) => {
	try {
		connectToDB();

		const createdThread = await Thread.create({
			text,
			author,
			community: null
		});

		await User.findByIdAndUpdate(author, {
			$push: { threads: createdThread._id }
		});

        revalidatePath(path)
	} catch (error: any) {
        throw new Error(`Error creating thread: ${error.message}`);
    }
};
