export function groupListByProperty<T>(list: T[], key: string) {
    return list.reduce((acc, v) => {
        if (!acc[v[key]]) {
            acc[v[key]] = [];
        }
        acc[v[key]].push(v);
        return acc;
    }, {})
}