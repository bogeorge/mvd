import { isBoolean, isString } from 'util';
import { DictionaryManager } from './dictionaryManager';
export class CommandProcessor {

    dm: DictionaryManager;

    constructor(dm: DictionaryManager) {
        this.dm = dm;
    }

    public processCommand = (commandName: string, key?: string, value?: string) => {
        let commandResult: any = null;

        switch (commandName) {
            case 'keys':
                commandResult = this.dm.listAllKeys();
                break;
            case 'members':
                if (!key) { console.error('key missing in members command'); return };
                commandResult = this.dm.listValuesForKey(key);
                break;
            case 'add':
                if (!key) { console.error('key missing in add command'); return };
                if (!value) { console.error('value missing in add command'); return };
                commandResult = this.dm.addValueToKey(key, value);
                break;
            case 'remove':
                if (!key) { console.error('key missing in remove command'); return };
                if (!value) { console.error('value missing in remove command'); return };
                commandResult = this.dm.removeValueFromKey(key, value);
                break;
            case 'removeall':
                if (!key) { console.error('key missing in removeall command'); return };
                commandResult = this.dm.removeKey(key);
                break;
            case 'clear':
                commandResult = this.dm.clearDictionary();
                break;
            case 'keyexists':
                if (!key) { console.error('key missing in key command'); return };
                commandResult = this.dm.doesKeyExist(key);
                break;
            case 'valueexists':                
                if (!key) { console.error('key missing in valueexists command'); return };
                if (!value) { console.error('value missing in valueexists command'); return };
                commandResult = this.dm.doesValueExistForKey(key, value);
                break;
            case 'allmembers':
                commandResult = this.dm.listAllValues()
                break;
            case 'items':
                commandResult = this.dm.listAllKeysAndValues();
                break;
            default:
                console.log('Unable to determine the command name');
        }

        if (typeof commandResult === 'string' || typeof commandResult === 'boolean') {
            console.log(commandResult);
        }
        else if (this.isArrayOfStrings(commandResult)) {
            let index = 0;
            for (let i = 0; i < commandResult.length; i++) {
                console.log(`${i + 1}) ${commandResult[i]}`);
            }
        }
    }

    private isArrayOfStrings(value: any): boolean {
        return Array.isArray(value) && value.every(item => isString(item));
    }
}