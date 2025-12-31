export function pageTransform(page: number | undefined) {
    const pg = Number(page);
    return pg && pg > 0 ? pg : 1;
}
