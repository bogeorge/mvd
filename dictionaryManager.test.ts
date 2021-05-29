import { strict } from "assert/strict";
import { defaultMaxListeners } from "events";
import { DictionaryManager } from "./dictionaryManager";

let dm: DictionaryManager;

beforeEach(() => {
 dm = new DictionaryManager();
});

// basic tests
test('BASIC: Add foo bar to empty dictionary', () => {
    expect(dm.addValueToKey('foo', 'bar')).toEqual('Added');
});

test('BASIC: Remove foo bar to empty dictionary', () => {
    expect(dm.removeValueFromKey('foo', 'bar')).toEqual('ERROR, value does not exists');
});

test('BASIC: Add and Remove foo bar to empty dictionary', () => {
    expect(dm.addValueToKey('foo', 'bar')).toEqual('Added');
    expect(dm.removeValueFromKey('foo', 'bar')).toEqual('Removed');
});

// example tests
test('KEYS: Add 2 items and check keys', () => {
    expect(dm.addValueToKey('foo', 'bar')).toEqual('Added');
    expect(dm.addValueToKey('baz', 'bang')).toEqual('Added');
    let keys = dm.listAllKeys();

    expect(keys.length).toBe(2);

    expect(keys).toContain('foo');
    expect(keys).toContain('baz');
});

test('MEMBERS: Add 2 items and check existing and non existing members', () => {
    expect(dm.addValueToKey('foo', 'bar')).toEqual('Added');
    expect(dm.addValueToKey('foo', 'baz')).toEqual('Added');
    let keys = dm.listValuesForKey('foo');

    expect(keys).toBeInstanceOf(Array);

    expect(keys).toContain('bar');
    expect(keys).toContain('baz');

    keys = dm.listValuesForKey('bad');

    expect(keys).toEqual('ERROR, key does not exist.');
});

test('ADD: Duplicate add test', () => {
    expect(dm.addValueToKey('foo', 'bar')).toEqual('Added');
    expect(dm.addValueToKey('foo', 'baz')).toEqual('Added');
    expect(dm.addValueToKey('foo', 'bar')).toEqual('ERROR, value already exists');
});

test('REMOVE: Add and Remove tests', () => {
    expect(dm.addValueToKey('foo', 'bar')).toEqual('Added');
    expect(dm.addValueToKey('foo', 'baz')).toEqual('Added');
    expect(dm.removeValueFromKey('foo', 'bar')).toEqual('Removed');
    expect(dm.removeValueFromKey('foo', 'bar')).toEqual('ERROR, value does not exists');

    let keys = dm.listAllKeys();
    expect(keys.length).toBe(1);
    expect(keys).toContain('foo');

    expect(dm.removeValueFromKey('foo', 'baz')).toEqual('Removed');
    keys = dm.listAllKeys();
    expect(keys).toEqual('empty set');

    expect(dm.removeKey('boom')).toEqual('ERROR, key does not exists');
});

test('REMOVEALL: Add and Remove tests', () => {
    expect(dm.addValueToKey('foo', 'bar')).toEqual('Added');
    expect(dm.addValueToKey('foo', 'baz')).toEqual('Added');

    let keys = dm.listAllKeys();
    expect(keys.length).toBe(1);
    expect(keys).toContain('foo');

    expect(dm.removeKey('foo')).toEqual('Removed');
    keys = dm.listAllKeys();
    expect(keys).toEqual('empty set');

    expect(dm.removeKey('foo')).toEqual('ERROR, key does not exists');
});

test('CLEAR: Add, Remove, Clear and Keys checks', () => {
    expect(dm.addValueToKey('foo', 'bar')).toEqual('Added');
    expect(dm.addValueToKey('bang', 'zip')).toEqual('Added');

    let keys = dm.listAllKeys();
    expect(keys.length).toBe(2);
    expect(keys).toContain('foo');
    expect(keys).toContain('bang');

    expect(dm.clearDictionary()).toEqual('Cleared');
    keys = dm.listAllKeys();
    expect(keys).toEqual('empty set');

    expect(dm.clearDictionary()).toEqual('Cleared');
    keys = dm.listAllKeys();
    expect(keys).toEqual('empty set');
});

test('KEYEXISTS: Check for valid and invalid keys', () => {
    expect(dm.doesKeyExist('foo')).toBe(false);
    expect(dm.addValueToKey('foo', 'bar')).toEqual('Added');
    expect(dm.doesKeyExist('foo')).toBe(true);
});

test('VALUEEXIST: Check for valid and invalid key/value pairs', () => {
    expect(dm.doesValueExistForKey('foo', 'bar')).toBe(false);
    expect(dm.addValueToKey('foo', 'bar')).toEqual('Added');
    expect(dm.doesValueExistForKey('foo', 'bar')).toBe(true);
    expect(dm.doesValueExistForKey('foo', 'baz')).toBe(false);
});

test('ALLMEMBERS: add members and check counts and existence', () => {
    expect(dm.listAllValues()).toEqual('empty set');
    expect(dm.addValueToKey('foo', 'bar')).toEqual('Added');
    expect(dm.addValueToKey('foo', 'baz')).toEqual('Added');

    let values = dm.listAllValues();
    expect(values.length).toBe(2);
    expect(values).toContain('bar');
    expect(values).toContain('baz');

    expect(dm.addValueToKey('bang', 'bar')).toEqual('Added');
    expect(dm.addValueToKey('bang', 'baz')).toEqual('Added');

    values = dm.listAllValues() as string[];
    expect(values.length).toBe(4);
    expect(values).toContain('bar');
    expect(values).toContain('baz');

    let barValues = values.filter((item) => { return item === 'bar' });
    expect(barValues.length).toBe(2);
    let bazValues = values.filter((item) => { return item === 'baz' });
    expect(bazValues.length).toBe(2);
});

test('ITEMS: add members and check counts and existence', () => {
    expect(dm.listAllKeysAndValues()).toEqual('empty set');
    expect(dm.addValueToKey('foo', 'bar')).toEqual('Added');
    expect(dm.addValueToKey('foo', 'baz')).toEqual('Added');

    let items = dm.listAllKeysAndValues();
    expect(items.length).toBe(2);
    expect(items).toContain('foo: bar');
    expect(items).toContain('foo: baz');

    expect(dm.addValueToKey('bang', 'bar')).toEqual('Added');
    expect(dm.addValueToKey('bang', 'baz')).toEqual('Added');

    items = dm.listAllKeysAndValues();
    expect(items.length).toBe(4);
    expect(items).toContain('foo: bar');
    expect(items).toContain('foo: baz');
    expect(items).toContain('bang: bar');
    expect(items).toContain('bang: baz');
});