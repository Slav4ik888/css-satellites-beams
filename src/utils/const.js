
export const MAP_CENTER = {lat: 53.59778, lng: 103.29639};
export const MAP_ZOOM_START = 2;

export const MAP_TYPE = {
  ROAD_MAP: `roadmap`,
  TERRAIN_MAP: `terrain`,
};
export const MAP_TYPE_ID = MAP_TYPE.TERRAIN_MAP;

export const MAP_MARKER_MAIN_POSITION = {lat: 53.59778, lng: 103.29639};

export const rangeType = {
  KU: `Ku`,
  KA: `Ka`,
};

export const SATELLITES = [
  {
    id: `1`,
    name: `Express AM5`,
    range: rangeType.KA,
    coordsSat: {
      lat: 0.7,
      lng: 140,
    },
    coordsBeam: {
      lat: 7,
      lng: 140,
    },
    beams: {
      beam1: [{lat: 61.757, lng: 107.867}, {lat: 61.485, lng: 110.679}, {lat: 60.157, lng: 114.766}, {lat: 59.494, lng: 116.172}, {lat: 58.291, lng: 117.93}, {lat: 56.878, lng: 119.644}, {lat: 53.493, lng: 122.72}, {lat: 51.267, lng: 123.423}, {lat: 50.295, lng: 123.555}, {lat: 49.101, lng: 123.379}, {lat: 48.084, lng: 122.984}, {lat: 47.285, lng: 121.841}, {lat: 46.776, lng: 120.699}, {lat: 46.836, lng: 119.688}, {lat: 47.196, lng: 118.062}, {lat: 48.493, lng: 115.777}, {lat: 49.985, lng: 113.624}, {lat: 51.624, lng: 111.69}, {lat: 53.884, lng: 109.361}, {lat: 56.199, lng: 107.515}, {lat: 58.152, lng: 106.285}, {lat: 59.805, lng: 105.538}, {lat: 60.764, lng: 105.582}, {lat: 61.569, lng: 106.241}, {lat: 61.715, lng: 107.339}, {lat: 61.757, lng: 107.867}],
      beam2: [{lat: 56.37, lng: 101.846}, {lat: 54.73, lng: 104.571}, {lat: 53.099, lng: 107.032}, {lat: 51.923, lng: 107.955}, {lat: 49.245, lng: 109.932}, {lat: 47.878, lng: 110.328}, {lat: 46.656, lng: 109.932}, {lat: 46.018, lng: 109.097}, {lat: 45.528, lng: 107.559}, {lat: 45.62, lng: 105.274}, {lat: 46.383, lng: 102.066}, {lat: 50.714, lng: 93.98}, {lat: 54.09, lng: 86.905}, {lat: 57.189, lng: 79.61}, {lat: 58.613, lng: 75.083}, {lat: 60.157, lng: 67.833}, {lat: 63.786, lng: 70.206}, {lat: 62.698, lng: 79.83}, {lat: 61.548, lng: 85.894}, {lat: 58.659, lng: 95.562}, {lat: 56.733, lng: 100.835}, {lat: 56.37, lng: 101.846}],
    },
  }, {
    id: `5`,
    name: `Express AM5`,
    range: rangeType.KU,
    coordsSat: {
      lat: 0.7,
      lng: 140,
    },
    coordsBeam: {
      lat: 7,
      lng: 140,
    },
    beams: {},
  }, {
    id: `2`,
    name: `Ямал 401`,
    range: rangeType.KU,
    coordsSat: {
      lat: 0.7,
      lng: 90,
    },
    coordsBeam: {
      lat: 7,
      lng: 90,
    },
    beams: {},
  }, {
    id: `3`,
    name: `Ямал 402`,
    range: rangeType.KU,
    coordsSat: {
      lat: 0.7,
      lng: 55,
    },
    coordsBeam: {
      lat: 7,
      lng: 55,
    },
    beams: {},
  }, {
    id: `4`,
    name: `Ямал 601`,
    range: rangeType.KA,
    coordsSat: {
      lat: 0.7,
      lng: 49,
    },
    coordsBeam: {
      lat: 7,
      lng: 49,
    },
    beams: {},
  },
];
