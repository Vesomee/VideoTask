export class LocalStorage {
    public static appendItemToArrayString(data: string, value: string): string {
        const parsedItems: string[] = JSON.parse(data);

        parsedItems.push(value);

        return JSON.stringify(parsedItems);
    }

    public static removeItemFromArrayString(items: string, value: string): string {
        let parsedItems: string[] = JSON.parse(items);

        parsedItems = parsedItems.filter((item: string) => item !== value);

        return JSON.stringify(parsedItems);
    }
}
