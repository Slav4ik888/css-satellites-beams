
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
      am5KaBeam1: [{lat: 61.757, lng: 107.867}, {lat: 61.485, lng: 110.679}, {lat: 60.157, lng: 114.766}, {lat: 59.494, lng: 116.172}, {lat: 58.291, lng: 117.93}, {lat: 56.878, lng: 119.644}, {lat: 53.493, lng: 122.72}, {lat: 51.267, lng: 123.423}, {lat: 50.295, lng: 123.555}, {lat: 49.101, lng: 123.379}, {lat: 48.084, lng: 122.984}, {lat: 47.285, lng: 121.841}, {lat: 46.776, lng: 120.699}, {lat: 46.836, lng: 119.688}, {lat: 47.196, lng: 118.062}, {lat: 48.493, lng: 115.777}, {lat: 49.985, lng: 113.624}, {lat: 51.624, lng: 111.69}, {lat: 53.884, lng: 109.361}, {lat: 56.199, lng: 107.515}, {lat: 58.152, lng: 106.285}, {lat: 59.805, lng: 105.538}, {lat: 60.764, lng: 105.582}, {lat: 61.569, lng: 106.241}, {lat: 61.715, lng: 107.339}, {lat: 61.757, lng: 107.867}],
      am5KaBeam2: [{lat: 56.37, lng: 101.846}, {lat: 54.73, lng: 104.571}, {lat: 53.099, lng: 107.032}, {lat: 51.923, lng: 107.955}, {lat: 49.245, lng: 109.932}, {lat: 47.878, lng: 110.328}, {lat: 46.656, lng: 109.932}, {lat: 46.018, lng: 109.097}, {lat: 45.528, lng: 107.559}, {lat: 45.62, lng: 105.274}, {lat: 46.383, lng: 102.066}, {lat: 50.714, lng: 93.98}, {lat: 54.09, lng: 86.905}, {lat: 57.189, lng: 79.61}, {lat: 58.613, lng: 75.083}, {lat: 60.157, lng: 67.833}, {lat: 63.786, lng: 70.206}, {lat: 62.698, lng: 79.83}, {lat: 61.548, lng: 85.894}, {lat: 58.659, lng: 95.562}, {lat: 56.733, lng: 100.835}, {lat: 56.37, lng: 101.846}],
      am5KaBeam3: [{lat: 44.659, lng: 134.058}, {lat: 45.466, lng: 133.157}, {lat: 46.232, lng: 132.498}, {lat: 47.166, lng: 131.861}, {lat: 48.362, lng: 131.158}, {lat: 50.253, lng: 130.521}, {lat: 51.446, lng: 130.389}, {lat: 52.901, lng: 130.455}, {lat: 54.206, lng: 130.806}, {lat: 54.92, lng: 131.202}, {lat: 55.782, lng: 131.949}, {lat: 56.467, lng: 132.806}, {lat: 57.046, lng: 134.498}, {lat: 57.153, lng: 135.442}, {lat: 57.069, lng: 136.958}, {lat: 56.589, lng: 138.101}, {lat: 55.645, lng: 139.134}, {lat: 54.907, lng: 139.573}, {lat: 53.845, lng: 140.188}, {lat: 53.152, lng: 140.562}, {lat: 52.394, lng: 140.848}, {lat: 51.855, lng: 141.023}, {lat: 50.784, lng: 141.155}, {lat: 49.929, lng: 141.155}, {lat: 48.668, lng: 140.892}, {lat: 47.211, lng: 140.188}, {lat: 45.881, lng: 139.31}, {lat: 44.956, lng: 138.189}, {lat: 44.456, lng: 136.629}, {lat: 44.377, lng: 135.069}, {lat: 44.659, lng: 134.058}],
      am5KaBeam4: [{lat: 51.569, lng: 102.989}, {lat: 56.297, lng: 97.364}, {lat: 58.337, lng: 95.21}, {lat: 59.694, lng: 94.375}, {lat: 61.253, lng: 94.244}, {lat: 61.611, lng: 95.826}, {lat: 61.611, lng: 97.671}, {lat: 61.232, lng: 100.484}, {lat: 60.462, lng: 103.428}, {lat: 59.561, lng: 105.669}, {lat: 57.591, lng: 109.668}, {lat: 55.707, lng: 112.701}, {lat: 53.961, lng: 114.81}, {lat: 53.519, lng: 115.337}, {lat: 52.408, lng: 116.26}, {lat: 51.624, lng: 116.744}, {lat: 49.559, lng: 117.71}, {lat: 47.671, lng: 117.403}, {lat: 46.353, lng: 116.436}, {lat: 46.018, lng: 115.601}, {lat: 45.957, lng: 114.239}, {lat: 45.988, lng: 112.964}, {lat: 46.956, lng: 110.328}, {lat: 47.937, lng: 107.867}, {lat: 49.9, lng: 104.922}, {lat: 51.569, lng: 102.989}],
      am5KaBeam5: [{lat: 51.733, lng: 101.143}, {lat: 50.098, lng: 102.769}, {lat: 47.79, lng: 103.956}, {lat: 46.625, lng: 103.868}, {lat: 45.559, lng: 102.593}, {lat: 45.219, lng: 100.748}, {lat: 45.682, lng: 97.32}, {lat: 46.656, lng: 94.332}, {lat: 47.701, lng: 91.739}, {lat: 49.245, lng: 86.993}, {lat: 51.705, lng: 80.225}, {lat: 53.441, lng: 73.721}, {lat: 55.083, lng: 65.284}, {lat: 61.422, lng: 68.58}, {lat: 60.244, lng: 76.797}, {lat: 58.909, lng: 83.653}, {lat: 57.568, lng: 89.19}, {lat: 56.003, lng: 93.848}, {lat: 54.142, lng: 97.715}, {lat: 52.888, lng: 99.869}, {lat: 51.733, lng: 101.143}],
      am5KaBeam6: [{lat: 59.517, lng: 123.907}, {lat: 59.405, lng: 125.533}, {lat: 58.337, lng: 128.345}, {lat: 57.141, lng: 130.191}, {lat: 55.856, lng: 131.465}, {lat: 54.957, lng: 132.125}, {lat: 53.519, lng: 132.828}, {lat: 51.624, lng: 133.311}, {lat: 49.417, lng: 133.487}, {lat: 47.523, lng: 133.091}, {lat: 46.565, lng: 132.344}, {lat: 45.774, lng: 130.982}, {lat: 45.559, lng: 129.795}, {lat: 45.62, lng: 128.433}, {lat: 45.957, lng: 127.071}, {lat: 46.836, lng: 125.577}, {lat: 48.172, lng: 124.258}, {lat: 51.896, lng: 121.797}, {lat: 54.219, lng: 120.655}, {lat: 56.248, lng: 120.523}, {lat: 58.083, lng: 121.138}, {lat: 59.158, lng: 122.413}, {lat: 59.517, lng: 123.907}],
      am5KaBeam7: [{lat: 48.406, lng: 133.838}, {lat: 47.583, lng: 134.827}, {lat: 46.277, lng: 135.706}, {lat: 44.831, lng: 136.541}, {lat: 43.124, lng: 136.958}, {lat: 41.63, lng: 137.024}, {lat: 40.118, lng: 136.431}, {lat: 39.307, lng: 135.223}, {lat: 38.847, lng: 133.531}, {lat: 38.812, lng: 132.3}, {lat: 39.103, lng: 131.202}, {lat: 39.748, lng: 130.147}, {lat: 40.353, lng: 129.554}, {lat: 42.04, lng: 128.389}, {lat: 43.65, lng: 127.84}, {lat: 45.466, lng: 127.576}, {lat: 47.151, lng: 127.972}, {lat: 48.025, lng: 128.719}, {lat: 48.697, lng: 129.883}, {lat: 48.943, lng: 130.85}, {lat: 49.015, lng: 132.015}, {lat: 48.639, lng: 133.333}, {lat: 48.406, lng: 133.838}],
      am5KaBeam8: [{lat: 53.91, lng: 140.123}, {lat: 55.209, lng: 141.397}, {lat: 56.028, lng: 143.199}, {lat: 56.224, lng: 145.835}, {lat: 55.757, lng: 147.549}, {lat: 54.628, lng: 148.648}, {lat: 52.941, lng: 149.219}, {lat: 51.157, lng: 149.087}, {lat: 48.26, lng: 148.296}, {lat: 45.774, lng: 147.286}, {lat: 44.094, lng: 145.308}, {lat: 43.268, lng: 142.935}, {lat: 43.682, lng: 141.133}, {lat: 44.659, lng: 139.683}, {lat: 46.049, lng: 138.892}, {lat: 48.318, lng: 138.628}, {lat: 50.519, lng: 138.628}, {lat: 52.595, lng: 139.156}, {lat: 53.91, lng: 140.123}],
      am5KaBeam9: [{lat: 59.225, lng: 155.24}, {lat: 61.881, lng: 159.019}, {lat: 63.119, lng: 162.139}, {lat: 63.592, lng: 164.908}, {lat: 63.158, lng: 167.193}, {lat: 62.799, lng: 167.896}, {lat: 62.129, lng: 168.467}, {lat: 60.57, lng: 168.292}, {lat: 57.943, lng: 167.457}, {lat: 55.384, lng: 165.787}, {lat: 51.24, lng: 161.875}, {lat: 48.668, lng: 158.184}, {lat: 47.76, lng: 155.899}, {lat: 47.671, lng: 154.141}, {lat: 47.849, lng: 152.911}, {lat: 48.639, lng: 151.592}, {lat: 50.013, lng: 151.197}, {lat: 51.76, lng: 151.065}, {lat: 53.754, lng: 151.329}, {lat: 55.459, lng: 152.032}, {lat: 57.284, lng: 153.174}, {lat: 58.818, lng: 154.712}, {lat: 59.225, lng: 155.24}],
      am5KaBeam10: [{lat: 56.54, lng: 113.624}, {lat: 58.864, lng: 111.426}, {lat: 61.084, lng: 109.932}, {lat: 63.728, lng: 108.086}, {lat: 66.394, lng: 106.373}, {lat: 67.579, lng: 106.768}, {lat: 67.912, lng: 108.35}, {lat: 68.011, lng: 110.459}, {lat: 67.713, lng: 112.437}, {lat: 67.242, lng: 114.195}, {lat: 66.587, lng: 116.128}, {lat: 65.716, lng: 118.106}, {lat: 64.571, lng: 119.82}, {lat: 63.356, lng: 121.578}, {lat: 60.678, lng: 124.478}, {lat: 57.873, lng: 126.807}, {lat: 55.707, lng: 127.642}, {lat: 54.373, lng: 127.598}, {lat: 51.514, lng: 127.115}, {lat: 51.102, lng: 126.5}, {lat: 50.323, lng: 124.61}, {lat: 50.323, lng: 122.5}, {lat: 51.019, lng: 120.04}, {lat: 53.65, lng: 116.304}, {lat: 56.54, lng: 113.624}],
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
    beams: {
      am5KuBeam1: [{lat: 35.967, lng: 132.652}, {lat: 38.349, lng: 145.396}, {lat: 40.587, lng: 151.812}, {lat: 42.947, lng: 156.646}, {lat: 46.079, lng: 161.128}, {lat: 49.388, lng: 166.05}, {lat: 51.896, lng: 171.236}, {lat: 54.475, lng: 176.949}, {lat: 57.709, lng: -176.108}, {lat: 63.119, lng: -163.012}, {lat: 64.74, lng: -157.387}, {lat: 65.95, lng: -152.993}, {lat: 69.29, lng: -161.43}, {lat: 71.528, lng: -169.956}, {lat: 74.094, lng: 175.455}, {lat: 75.609, lng: 161.568}, {lat: 76.498, lng: 146.099}, {lat: 76.437, lng: 134.673}, {lat: 75.804, lng: 115.513}, {lat: 74.452, lng: 102.154}, {lat: 72.715, lng: 90.376}, {lat: 70.322, lng: 81.939}, {lat: 66.27, lng: 75.875}, {lat: 60.025, lng: 71.568}, {lat: 48.055, lng: 67.613}, {lat: 46.018, lng: 67.173}, {lat: 44.471, lng: 77.72}, {lat: 42.882, lng: 88.882}, {lat: 43.075, lng: 95.298}, {lat: 43.332, lng: 101.714}, {lat: 41.449, lng: 109.625}, {lat: 41.515, lng: 119.029}, {lat: 41.581, lng: 125.445}, {lat: 40.32, lng: 127.994}, {lat: 38.211, lng: 129.224}, {lat: 36.251, lng: 131.421}, {lat: 35.967, lng: 132.652}],
      am5KuBeam2: [{lat: 42.235, lng: 125.796}, {lat: 40.654, lng: 134.585}, {lat: 40.92, lng: 146.89}, {lat: 42.495, lng: 157.789}, {lat: 42.495, lng: 163.765}, {lat: 45.651, lng: 170.445}, {lat: 46.505, lng: 175.015}, {lat: 49.559, lng: -176.547}, {lat: 50.013, lng: -176.372}, {lat: 51.24, lng: -177.602}, {lat: 51.678, lng: 178.355}, {lat: 52.22, lng: 177.125}, {lat: 54.831, lng: 179.234}, {lat: 60.806, lng: -170.395}, {lat: 65.334, lng: -157.211}, {lat: 66.27, lng: -151.586}, {lat: 71.832, lng: -169.34}, {lat: 74.662, lng: 171.324}, {lat: 76.416, lng: 147.593}, {lat: 76.539, lng: 129.488}, {lat: 75.696, lng: 111.91}, {lat: 73.606, lng: 93.277}, {lat: 70.41, lng: 99.781}, {lat: 68.628, lng: 102.242}, {lat: 66.691, lng: 101.539}, {lat: 65.187, lng: 99.957}, {lat: 62.149, lng: 101.363}, {lat: 58.864, lng: 105.933}, {lat: 53.91, lng: 111.734}, {lat: 48.172, lng: 118.941}, {lat: 44.409, lng: 122.808}, {lat: 42.235, lng: 125.796}],
    },
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
    beams: {
      yam401KuBeam1: [{lat: 49.559, lng: 69.722}, {lat: 48.172, lng: 78.511}, {lat: 46.383, lng: 84.136}, {lat: 46.625, lng: 90.464}, {lat: 47.106, lng: 99.078}, {lat: 46.383, lng: 106.285}, {lat: 45.528, lng: 114.195}, {lat: 46.262, lng: 118.238}, {lat: 46.866, lng: 120.875}, {lat: 46.625, lng: 122.808}, {lat: 44.909, lng: 125.445}, {lat: 41.318, lng: 127.906}, {lat: 39.171, lng: 128.433}, {lat: 38.761, lng: 130.191}, {lat: 39.307, lng: 133.179}, {lat: 48.522, lng: 157.261}, {lat: 50.686, lng: 164.82}, {lat: 51.13, lng: 166.753}, {lat: 59.135, lng: 163.062}, {lat: 66.27, lng: 157.789}, {lat: 71.105, lng: 152.515}, {lat: 74.662, lng: 145.835}, {lat: 76.58, lng: 138.98}, {lat: 78.262, lng: 128.96}, {lat: 79.482, lng: 118.589}, {lat: 80.314, lng: 108.746}, {lat: 80.804, lng: 97.32}, {lat: 80.832, lng: 85.542}, {lat: 80.663, lng: 73.238}, {lat: 80.195, lng: 61.46}, {lat: 79.386, lng: 50.562}, {lat: 78.262, lng: 41.07}, {lat: 76.416, lng: 34.566}, {lat: 74.046, lng: 29.644}, {lat: 71.162, lng: 26.128}, {lat: 66.83, lng: 23.316}, {lat: 62.149, lng: 21.207}, {lat: 57.568, lng: 20.503}, {lat: 53.178, lng: 19.976}, {lat: 51.13, lng: 19.976}, {lat: 48.986, lng: 25.601}, {lat: 45.528, lng: 31.05}, {lat: 43.396, lng: 34.39}, {lat: 40.654, lng: 39.488}, {lat: 39.035, lng: 45.464}, {lat: 38.486, lng: 50.035}, {lat: 38.898, lng: 52.847}, {lat: 40.387, lng: 54.078}, {lat: 42.365, lng: 54.957}, {lat: 45.528, lng: 56.011}, {lat: 47.345, lng: 57.593}, {lat: 47.701, lng: 59.175}, {lat: 47.819, lng: 62.339}, {lat: 47.819, lng: 64.097}, {lat: 48.522, lng: 65.855}, {lat: 49.101, lng: 67.613}, {lat: 49.445, lng: 69.019}, {lat: 49.559, lng: 69.722}],
    },
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
    beams: {
      yam402KuBeam1: [{lat: 60.375, lng: 24.195}, {lat: 57.473, lng: 24.546}, {lat: 52.755, lng: 28.765}, {lat: 45.774, lng: 34.214}, {lat: 41.712, lng: 36.324}, {lat: 39.849, lng: 39.488}, {lat: 39.307, lng: 42.476}, {lat: 39.579, lng: 45.64}, {lat: 41.843, lng: 48.628}, {lat: 44.784, lng: 50.562}, {lat: 46.383, lng: 53.199}, {lat: 47.345, lng: 56.714}, {lat: 48.406, lng: 61.636}, {lat: 49.787, lng: 65.152}, {lat: 51.35, lng: 68.843}, {lat: 51.569, lng: 72.359}, {lat: 51.35, lng: 74.644}, {lat: 49.9, lng: 78.16}, {lat: 47.701, lng: 82.378}, {lat: 47.226, lng: 87.3}, {lat: 47.583, lng: 91.343}, {lat: 47.345, lng: 95.562}, {lat: 46.625, lng: 100.66}, {lat: 47.226, lng: 108.042}, {lat: 49.331, lng: 114.722}, {lat: 52.004, lng: 123.511}, {lat: 54.013, lng: 131.597}, {lat: 59.405, lng: 129.136}, {lat: 64.134, lng: 126.148}, {lat: 68.175, lng: 122.105}, {lat: 71.832, lng: 117.007}, {lat: 74.475, lng: 110.503}, {lat: 77.179, lng: 100.835}, {lat: 78.956, lng: 89.937}, {lat: 80.195, lng: 73.765}, {lat: 80.577, lng: 62.867}, {lat: 80.634, lng: 53.55}, {lat: 80.403, lng: 45.113}, {lat: 80.075, lng: 36.148}, {lat: 79.482, lng: 26.656}, {lat: 78.684, lng: 19.8}, {lat: 77.751, lng: 14.175}, {lat: 76.742, lng: 8.375}, {lat: 74.334, lng: 13.296}, {lat: 71.666, lng: 16.812}, {lat: 67.978, lng: 20.679}, {lat: 63.98, lng: 23.667}, {lat: 62.313, lng: 24.019}, {lat: 60.375, lng: 24.195}],
    },
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
    beams: {
      yam601KaBeam1: [{lat: 46.746, lng: 32.171}, {lat: 47.211, lng: 32.435}, {lat: 47.538, lng: 32.698}, {lat: 47.775, lng: 33.072}, {lat: 47.863, lng: 33.467}, {lat: 47.849, lng: 34.017}, {lat: 47.731, lng: 34.544}, {lat: 47.568, lng: 35.027}, {lat: 47.352, lng: 35.324}, {lat: 47.076, lng: 35.676}, {lat: 46.806, lng: 35.928}, {lat: 46.361, lng: 36.357}, {lat: 45.996, lng: 36.62}, {lat: 45.605, lng: 36.873}, {lat: 45.212, lng: 37.093}, {lat: 44.847, lng: 37.225}, {lat: 44.409, lng: 37.323}, {lat: 44.023, lng: 37.356}, {lat: 43.563, lng: 37.291}, {lat: 43.228, lng: 37.082}, {lat: 43.043, lng: 36.697}, {lat: 42.923, lng: 36.06}, {lat: 42.939, lng: 35.522}, {lat: 43.075, lng: 34.819}, {lat: 43.276, lng: 34.324}, {lat: 43.539, lng: 33.885}, {lat: 43.912, lng: 33.412}, {lat: 44.322, lng: 33.039}, {lat: 44.737, lng: 32.709}, {lat: 45.111, lng: 32.49}, {lat: 45.674, lng: 32.259}, {lat: 46.087, lng: 32.16}, {lat: 46.505, lng: 32.138}, {lat: 46.746, lng: 32.171}],
      yam601KaBeam2: [{lat: 45.651, lng: 36.675}, {lat: 46.095, lng: 36.851}, {lat: 46.474, lng: 37.181}, {lat: 46.731, lng: 37.532}, {lat: 46.881, lng: 37.994}, {lat: 46.881, lng: 38.587}, {lat: 46.769, lng: 38.971}, {lat: 46.633, lng: 39.312}, {lat: 46.399, lng: 39.719}, {lat: 46.156, lng: 40.07}, {lat: 45.896, lng: 40.367}, {lat: 45.643, lng: 40.641}, {lat: 45.335, lng: 40.916}, {lat: 45.057, lng: 41.147}, {lat: 44.597, lng: 41.366}, {lat: 44.173, lng: 41.498}, {lat: 43.674, lng: 41.575}, {lat: 43.26, lng: 41.597}, {lat: 42.6, lng: 41.509}, {lat: 42.292, lng: 41.158}, {lat: 42.064, lng: 40.455}, {lat: 42.031, lng: 39.664}, {lat: 42.162, lng: 38.96}, {lat: 42.519, lng: 38.191}, {lat: 42.874, lng: 37.73}, {lat: 43.34, lng: 37.269}, {lat: 43.96, lng: 36.873}, {lat: 44.542, lng: 36.675}, {lat: 45.134, lng: 36.565}, {lat: 45.443, lng: 36.609}, {lat: 45.551, lng: 36.631}, {lat: 45.651, lng: 36.675}],
      yam601KaBeam3: [{lat: 46.095, lng: 42.07}, {lat: 46.049, lng: 42.685}, {lat: 45.82, lng: 43.256}, {lat: 45.389, lng: 43.827}, {lat: 44.737, lng: 44.223}, {lat: 44.031, lng: 44.531}, {lat: 43.348, lng: 44.772}, {lat: 42.657, lng: 44.926}, {lat: 41.843, lng: 44.728}, {lat: 41.515, lng: 44.443}, {lat: 41.301, lng: 43.981}, {lat: 41.152, lng: 43.322}, {lat: 41.185, lng: 42.751}, {lat: 41.334, lng: 42.114}, {lat: 41.597, lng: 41.63}, {lat: 42.023, lng: 41.169}, {lat: 42.479, lng: 40.861}, {lat: 43.043, lng: 40.619}, {lat: 43.619, lng: 40.466}, {lat: 44.173, lng: 40.422}, {lat: 44.737, lng: 40.488}, {lat: 45.436, lng: 40.663}, {lat: 45.881, lng: 41.103}, {lat: 46.034, lng: 41.498}, {lat: 46.095, lng: 42.07}],
    },
  },
];
