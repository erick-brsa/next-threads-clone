import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import '../globals.css';
import { LeftSidebar, Topbar } from '@/components/shared';
import RightSidebar from '@/components/shared/RightSidebar';
import Bottombar from '@/components/shared/Bottombar';

export const metadata: Metadata = {
	title: 'Threads',
	description: 'A Next.js 13 Meta Threads Application',
	icons: {
		icon: '/logo.svg'
	}
};

const inter = Inter({ subsets: ['latin'] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ClerkProvider>
			<html lang="es">
				<body className={inter.className}>
					<Topbar />
					<main className='flex flex-row'>
						<LeftSidebar />
						<section className="main-container">
							<div className="w-full max-w-4xl">
								{children}
							</div>
						</section>
						<RightSidebar />
					</main>
					<Bottombar />
				</body>
			</html>
		</ClerkProvider>
	);
};

export default RootLayout;
