'use client'

import { useForm } from 'react-hook-form';
import { usePathname, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components//ui/textarea';
import { ThreadValidation } from '@/lib/validations/thread';
import { createThread } from '@/lib/actions/thread.actions';

interface Props {
	threadId: string;
	currentUserImg: string;
	currentUserId: string;
}

export const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {
    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
		resolver: zodResolver(ThreadValidation),
		defaultValues: {
			thread: '',
			accountId: currentUserId
		}
	});

	const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
		await createThread({
			text: values.thread,
			author: values.accountId,
			communityId: null,
			path: pathname
		});

		router.push('/');
	};


	return (
        <Form {...form}>
			<form
				className="flex flex-col justify-start gap-10 mt-10"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name="thread"
					render={({ field }) => (
						<FormItem className="flex w-full flex-col gap-3">
							<FormLabel className="text-base-semibold text-light-2">
								Content
							</FormLabel>
							<FormControl>
								<Textarea
									rows={15}
									className="no-focus border border-black-4 bg-dark-3 text-light-2"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="bg-primary-500">
					Post Thread
				</Button>
			</form>
		</Form>
	);
};
