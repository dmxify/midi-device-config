"use strict";

const fs = require('fs').promises; // filestream
const ini = require('ini'); // ini configuration file module


const writeConfig = async function(objConfig = {}) {
  await fs.writeFile(`./config/midi-devices/config.ini`, ini.stringify(objConfig, {
    whitespace: true
  }));
};

const readConfig = async function() {
  let raw = await fs.readFile(`./config/midi-devices/config.ini`, 'utf-8').catch(async (err) => {
    // if it doesnt exist, create it
    await writeConfig();
    // read it and return it
    return await fs.readFile(`./config/midi-devices/config.ini`, 'utf-8');
  });
  return await ini.parse(raw);
}

/**
 * Load previously saved MidiDeviceControl bindings for a specific MidiDevice
 * @param  {string} midiDeviceName The hardware name given to the MidiPort (as detected by the Web MIDI API)
 * @return {[type]}                Promise which resolves with an array of MidiDeviceControl objects
 */
const loadControls = async function(midiDeviceName) {
  let allConfig = await readConfig();
  return allConfig[midiDeviceName];
}

/**
 * Saves a MidiDevice's MidiDeviceControl bindings for future recollection
 * @param  {MidiDevice} midiDevice The MidiDevice with MidiDeviceControl bindings to save.
 * @return {Promise}            Promise which resolves true when successfully saved
 */
const saveControls = async function(midiDevice) {
  // objConfig = midiDevice.
  // await writeConfig(objConfig);
}

module.exports = {
  loadControls,
  saveControls,
  readConfig
};
