# Enigma simulator

A browser simulator of the three-rotor Enigma I, written in React.

Type into the input and the ciphertext appears as you go. Since Enigma is symmetric, running the output back through the same settings decrypts it.

## Features

- Rotors I, II and III with reflector B, using the historical wirings and turnover notches (rotors IV–V and reflectors A and C are defined in `src/utils/baseData.js`)
- Ring settings and starting positions for each rotor, with the current positions shown while you type
- Rotor stepping, including the middle rotor's double step
- Plugboard for swapping letter pairs
- Copy the output to the clipboard

## How it works

The cipher logic lives in `src/utils/enigmaMachine.js`. Each key press first steps the rotors. The signal then goes through the plugboard, the right, middle and left rotors, the reflector, back through the rotors in reverse, and the plugboard again. `notes/notes.md` walks through one letter step by step.

## Run

```sh
npm install
npm run dev
```
