import { DictionaryManager } from './dictionaryManager';
import * as readline from 'readline';
import { CommandProcessor } from './commandProcessor';

// create our instance of the dictionary manager that will internally manage the dictionary
const cp = new CommandProcessor(new DictionaryManager());

const inputParser = (input: string) => {

    if (input.length > 0) {
        // match on any alphanumeric character or anything when it's in quotes
        let array = input.match(/\w+|"[^"]+"/g);
        if (array) {
            let i = array.length;
            while (i--) {
                // remove double quotes when we matched on something with them
                array[i] = array[i].replace(/"/g, "");
            }

            let commandName = '';
            let key = undefined;
            let value = undefined;
            if (array.length > 0) { commandName = array[0].toLowerCase(); }
            if (array.length > 1) { key = array[1].toLowerCase(); }
            if (array.length > 2) { value = array[2].toLowerCase(); }

            switch (commandName) {
                case 'exit':
                    cli.close();
                    break;
                case 'help':
                    showHelp();
                    break;
                default:
                    cp.processCommand(commandName, key, value)
            }
        }
    }
    else {
        // might have accidentally hit enter, just ignore
    }
}

const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

cli.on('line', (input: string) => {
    inputParser(input);
});

/*
 * This show help isn't the most beautiful but hopefully good enough to let users know the commands available
*/
const showHelp = () => {
    console.info(`
The Multivalue Dictionary App is a command line application that stores a multivalue dictionary in memory. All keys and values are strings.

Available Dictionary Commands and required Parameters:

ADD <key> <value>
- Add a member to a collection for a given key. Displays an error if the value already existed in the collection.
ALLMEMBERS
- Returns all the values in the dictionary. Returns nothing if there are none. Order is not guaranteed.
CLEAR
- Removes all keys and all values from the dictionary.
ITEMS
- Returns all keys in the dictionary and all of their values. Returns nothing if there are none. Order is not guaranteed.
KEYEXISTS <key>
- Returns whether a key exists or not.
KEYS
- Returns all the keys in the dictionary. Order is not guaranteed.
MEMBERS <key>
- Returns the collection of strings for the given key. Return order is not guaranteed. Returns an error if the key does not exists.
REMOVE <key> <value>
- Removes a value from a key. If the last value is removed from the key, they key is removed from the dictionary. If the key or value does not exist, displays an error.
REMOVEALL <key>
- Removes all values for a key and removes the key from the dictionary. Returns an error if the key does not exist.
VALUEEXISTS <key> <value>
- Returns whether a value exists within a key. Returns false if the key does not exist.

Other Commands:

HELP
- Show this help again if needed
EXIT
- Leave the currently running app
`);
}


const main = () => {
    showHelp();
    cli.question('\n', (input: string) => {
        inputParser(input);
    });
}

main();