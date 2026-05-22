import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "FinLingo - Aprenda a Investir",
	description:
		"Plataforma gamificada de educacao financeira para adolescentes",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="pt-BR"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased light`}
		>
			<body className="min-h-full flex flex-col bg-background text-foreground vc-init">
				<ThemeProvider>{children}</ThemeProvider>
			</body>
		</html>
	);
}
