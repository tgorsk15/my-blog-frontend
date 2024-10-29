
export function sortPostsByDate(postList) {
    return [...postList].sort((a, b) => {
        const aDate = new Date(a.oldCreatedAt);
        const bDate = new Date(b.oldCreatedAt);

        if (aDate < bDate) return 1;
        if (aDate > bDate) return -1;
        return 0
    })

}
