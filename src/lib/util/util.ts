export function chunk<T>(entries: T[], chunkSize: number): T[][] {
	const clone = entries.slice();
	const chunks = [];
	while (clone.length) chunks.push(clone.splice(0, chunkSize));
	return chunks;
}
