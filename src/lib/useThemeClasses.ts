"use client";

import { useTheme } from "@/contexts/ThemeContext";

export function useThemeClasses() {
	const { theme } = useTheme();

	return {
		isDark: theme === "dark",
		isHighContrast: theme === "high-contrast",
		isLight: theme === "light",
		theme,
	};
}
