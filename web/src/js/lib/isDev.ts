export function isDev(): boolean {
    const isDev = localStorage.getItem('polymedia.isDev');
    return isDev === 'yes';
}
