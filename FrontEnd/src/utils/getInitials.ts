export const getInitials = (name: string | undefined): string => {
	if (!name) return "";

	const parts = name.trim().split(" ").filter(Boolean);

	const firstTwo = parts.slice(0, 2);

	return firstTwo.map((word) => word[0].toUpperCase()).join("");
};
