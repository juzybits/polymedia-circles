export function isDev(): boolean {
    const isDev = localStorage.getItem('polymedia.isDev');
    return isDev === 'yes';
}

export function formatSui(num: BigInt): string {
    return (Number(num)/1_000_000_000).toFixed(2) + ' SUI';
};
