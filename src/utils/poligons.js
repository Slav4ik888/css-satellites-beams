// Возвращает массив полигонов которые находятся в указанных кординатах
export const getTargetPoligons = (point, poligons) => {
  let arr = [];
  if (poligons.length) {
    poligons.forEach((poligon) => window.google.maps.geometry.poly.containsLocation(point, poligon.poligon)
      ? arr.push(poligon)
      : null);
  }
  return arr;
};
