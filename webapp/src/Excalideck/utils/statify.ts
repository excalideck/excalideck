export type Statified<T> = {
    [Key in keyof T]: T[Key] extends (...args: any[]) => any
        ? (...args: Parameters<T[Key]>) => void
        : T[Key];
};

export function statifyClass<T>(
    instance: T,
    setState: (newState: T) => void
): Statified<T> {
    return Object.fromEntries([
        ...Object.entries(instance),
        ...Object.getOwnPropertyNames(Object.getPrototypeOf(instance)).map(
            (methodName) => [
                methodName,
                statifyMethod(instance, methodName, setState),
            ]
        ),
    ]);
}

function statifyMethod<T>(
    instance: T,
    methodName: string,
    setState: (newState: T) => void
) {
    return (...args: any[]) =>
        setState(
            ((instance as any)[methodName] as Function).apply(instance, args)
        );
}
