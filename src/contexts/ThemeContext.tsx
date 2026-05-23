"use client";

import {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";

type Theme = "light" | "dark" | "high-contrast";

interface ThemeContextType {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<Theme>("light"); // ✅ valor seguro para SSR

	useEffect(() => {
		const savedTheme = localStorage.getItem("finly-theme") as Theme;
		if (savedTheme) setTheme(savedTheme);
	}, []);

	useEffect(() => {
		const root = document.documentElement;
		root.classList.remove("light", "dark", "high-contrast");
		root.classList.add(theme);
		localStorage.setItem("finly-theme", theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
