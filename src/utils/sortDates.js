
export function sortPostsByDate(postList) {
    return postList.sort((a, b) => {
        const aDate = new Date(a.oldCreatedAt);
        const bDate = new Date(b.oldCreatedAt);
        console.log('aDate', aDate)
        console.log('bDate', bDate)

        if (aDate < bDate) return 1;
        if (aDate > bDate) return -1;
        console.log('revised list:', postList)
        return 0
    })

}
