"use strict";

const ElectronStore = require('electron-store')
const store = new ElectronStore();

const read = async function() {
  let data = await store.get('MidiDeviceConfig', {});
  return data;
}

const save = async function(key, value) {
  return await store.set(`MidiDeviceConfig.${key}`, value);
}

module.exports = {
  read,
  save
};
