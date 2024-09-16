import { createContext } from "react";

export const WIDTH = 60
export const Context = createContext();
export const GameContext = createContext();
export const ConfigContext = createContext();
export const apiUrl = "/";
export const WIDTHPERCENT = 100 / 9;
export const HEIGHTPERCENT = 100 / 8;
export const COLOR_LIGHT = "#ECDFCC";
export const COLOR_MED_1 = "#697565";
export const COLOR_MED_2 = "#3C3D37";
export const COLOR_DARK = "#1E201E";
export const PIECESIMAGES_BLACK = {
  'g5': "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/GotG-001B.svg/1920px-GotG-001B.svg.png",
  'g4': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/GotG-002B.svg/1920px-GotG-002B.svg.png',
  'g3': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/GotG-003B.svg/1920px-GotG-003B.svg.png',
  'g2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/GotG-004B.svg/1920px-GotG-004B.svg.png',
  'g1': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/GotG-005B.svg/1920px-GotG-005B.svg.png',
  'cl': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/GotG-006B.svg/1920px-GotG-006B.svg.png',
  'lc': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/GotG-007B.svg/1920px-GotG-007B.svg.png',
  'm' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/GotG-008B.svg/1920px-GotG-008B.svg.png',
  'cp': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/GotG-009B.svg/1920px-GotG-009B.svg.png',
  'l1': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/GotG-010B.svg/1920px-GotG-010B.svg.png',
  'l2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/GotG-011B.svg/1920px-GotG-011B.svg.png',
  'sg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/GotG-012B.svg/1920px-GotG-012B.svg.png',
  'p' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/GotG-014B.svg/1920px-GotG-014B.svg.png',
  'sp': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/GotG-spyB.svg/1920px-GotG-spyB.svg.png',
  'f' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/GotG-flagB.svg/1920px-GotG-flagB.svg.png',
}
export const PIECESIMAGES_WHITE = {
  'g5': "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/GotG-001W.svg/1920px-GotG-001W.svg.png",
  'g4': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/GotG-002W.svg/1920px-GotG-002W.svg.png',
  'g3': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/GotG-003W.svg/1920px-GotG-003W.svg.png',
  'g2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/GotG-004W.svg/1920px-GotG-004W.svg.png',
  'g1': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/GotG-005W.svg/1920px-GotG-005W.svg.png',
  'cl': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/GotG-006W.svg/1920px-GotG-006W.svg.png',
  'lc': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/GotG-007W.svg/1920px-GotG-007W.svg.png',
  'm' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/GotG-008W.svg/1920px-GotG-008W.svg.png',
  'cp': 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/GotG-009W.svg/1920px-GotG-009W.svg.png',
  'l1': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/GotG-010W.svg/1920px-GotG-010W.svg.png',
  'l2': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/GotG-011W.svg/1920px-GotG-011W.svg.png',
  'sg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/GotG-012W.svg/1920px-GotG-012W.svg.png',
  'p' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/GotG-014W.svg/1920px-GotG-014W.svg.png',
  'sp': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/GotG-spyW.svg/1920px-GotG-spyW.svg.png',
  'f' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/GotG-flagW.svg/1920px-GotG-flagW.svg.png',
}
export const PIECES = [
    { name: 'g5' }, // Gen 5 Star
    { name: 'g4' }, // Gen 4 Star
    { name: 'g3' }, // Gen 3 Star
    { name: 'g2' }, // Gen 2 Star
    { name: 'g1' }, // Gen 1 Star
    { name: 'cl' }, // Colonel
    { name: 'lc' }, // Lt Colonel
    { name: 'm' },  // Major
    { name: 'cp' }, // Captain
    { name: 'l1' }, // Lt 1
    { name: 'l2' }, // Lt 2
    { name: 'sg' }, // Sergeant
    { name: 'p' },  // Private
    { name: 'p' },  // Private
    { name: 'p' },  // Private
    { name: 'p' },  // Private
    { name: 'p' },  // Private
    { name: 'p' },  // Private
    { name: 'sp' }, // Spy
    { name: 'sp' }, // Spy
    { name: 'f' }   // Flag
  ];
  