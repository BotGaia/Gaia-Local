module.exports = {
  haversine: (lat, lng) => {
    const EARTH_RADIUS = 6371;

    const a = Math.sin((lat[1] - lat[0])/2) * Math.sin((lat[1] - lat[0])/2) + Math.cos(lat[0]) * Math.cos(lat[1]) * Math.sin((lng[1] - lng[0])/2) * Math.sin((lng[1] - lng[0])/2);
    const b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return EARTH_RADIUS * b
  },

  toRadians: (num) =>{
  	return num * (Math.PI/180);
  },
};
