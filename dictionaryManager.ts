/* 
    using a class isn't really necessary just doing it so we could create many instances of the
    class if needed each with their own dictionary
*/
export class DictionaryManager {
    // our in memory dictionary
    dictionary: Map<string, Set<string>>;

    constructor() {
        this.dictionary = new Map<string, Set<string>>();
    }

    // Returns all the keys in the dictionary. Order is not guaranteed.
    public listAllKeys = (): string[] | string => {
        if (this.dictionary.size > 0) {
            return [...this.dictionary.keys()];
        }

        return 'empty set';
    }

    // Returns the collection of strings for the given key. Return order is not guaranteed. Returns an error if the key does not exists.
    public listValuesForKey = (key: string): string[] | string | undefined => {
        if (key) {
            let keyItem = this.dictionary.get(key);

            if (keyItem) {
                return [...keyItem.values()];
            }
            else {
                return 'ERROR, key does not exist.';
            }
        }
    }

    // Add a member to a collection for a given key. Displays an error if the value already existed in the collection.
    public addValueToKey = (key: string, value: string): string | undefined => {
        if (key && value) {
            let keyItem = this.dictionary.get(key);

            if (keyItem) {
                if (keyItem.has(value)) {
                    return 'ERROR, value already exists';
                }
                else {
                    keyItem.add(value);
                    return 'Added';
                }
            }
            else {
                this.dictionary.set(key, new Set([value]));
                return 'Added';
            }
        }
    }

    // Removes a value from a key. If the last value is removed from the key, they key is removed from the dictionary. If the key or value does not exist, displays an error
    public removeValueFromKey = (key: string, value: string): string | undefined => {
        if (key && value) {
            let keyItem = this.dictionary.get(key);

            if (keyItem && keyItem.has(value)) {
                keyItem.delete(value);
                if(keyItem.size === 0) {
                    this.dictionary.delete(key);
                }
                return 'Removed';
            }
            else {
                return 'ERROR, value does not exists';
            }
        }
    }

    // Removes all values for a key and removes the key from the dictionary. Returns an error if the key does not exist.
    public removeKey = (key: string): string | undefined => {
        if (key) {
            let keyItem = this.dictionary.get(key);

            if (keyItem) {
                this.dictionary.delete(key);
                return 'Removed';
            }
            else {
                return 'ERROR, key does not exists';
            }
        }
    }

    // Removes all keys and all values from the dictionary
    public clearDictionary = () => {
        this.dictionary.clear();
        return 'Cleared';
    }

    // Returns whether a key exists or not.
    public doesKeyExist = (key: string): boolean => {
        if (key) {
            return this.dictionary.has(key);
        }
        else {
            return false;
        }
    }

    // Returns whether a value exists within a key. Returns false if the key does not exist
    public doesValueExistForKey = (key: string, value: string): boolean => {
        if (key && value) {
            let keyItem = this.dictionary.get(key);

            if (keyItem) {
                return keyItem.has(value);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }

    // Returns all the values in the dictionary. Returns nothing if there are none. Order is not guaranteed.
    public listAllValues = (): string[] | string => {
        if (this.dictionary.size > 0) {
            let allValues: string[] = [];
            for (let values of this.dictionary.values()) {
                allValues = [...allValues, ...values]
            }
            return allValues;
        }

        return 'empty set';
    }

    // Returns all keys in the dictionary and all of their values. Returns nothing if there are none. Order is not guaranteed.
    public listAllKeysAndValues = (): string[] | string => {
        if (this.dictionary.size > 0) {
            let allKeysAndValues: string[] = [];

            for (let [key, values] of this.dictionary.entries()) {
                for (let value of values) {
                    allKeysAndValues.push(`${key}: ${value}`);
                }
            }
            return allKeysAndValues;
        }

        return 'empty set';
    }
};