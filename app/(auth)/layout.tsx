import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import '../globals.css';

export const metadata: Metadata = {
	title: 'Threads',
	description: 'A Next.js 13 Meta Threads Application'
};

const inter = Inter({ subsets: ['latin'] });

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<ClerkProvider>
			<html lang="es">
				<body className={`${inter.className} bg-dark-1`}>
					{children}
				</body>
			</html>
		</ClerkProvider>
	);
};

export default AuthLayout;
