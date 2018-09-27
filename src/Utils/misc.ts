
export function groupListByProperty<T>(list: T[], key: string) {
    return list.reduce((acc, v) => {
        if (!acc[v[key]]) {
            acc[v[key]] = [];
        }
        acc[v[key]].push(v);
        return acc;
    }, {})
}

interface IGroupKey {
    key: string;
    displayName: string;
}

interface IGroup<T> {
    groupKey: IGroupKey
    list: T[];
}

export function groupListByMethod<T>(list: T[], method: (o: T) => IGroupKey): Record<string, IGroup<T>> {
    return list.reduce((acc, v) => {
        const groupKey = method(v);
        if (!acc[groupKey.key]) {
            const group: IGroup<T> = { groupKey, list: [] };
            acc[groupKey.key] = group;
        }
        acc[groupKey.key].list.push(v);
        return acc;
    }, {})
}



