const surchargeCoords = [
  {
    coordinates: [
      [
        [103.9917912, 1.3703719],
        [103.9956536, 1.3686129],
        [103.9980568, 1.3737184],
        [103.9999451, 1.3732679],
        [104.0042152, 1.3737184],
        [103.9993058, 1.3866598],
        [103.9917912, 1.3703719],
      ],
      [
        [103.9814038, 1.3358462],
        [103.9822621, 1.3355459],
        [103.9923673, 1.3610176],
        [103.9884368, 1.3626731],
        [103.9794878, 1.34178],
        [103.9814038, 1.3358462],
      ]
    ],
    name: "Changi Airport and Freight Center",
    surcharge1:
      "On Fridays, Saturdays or Sundays from 5pm to before midnight: $5.00",
    surcharge2: "All other times: $3.00",
  },

  //   changiAirport:

  //   seletarAirport:

  //   sgExpo:

  //   ferryTerminal:

  //   cruiseCenter:

  //   marinaBaysands:

  //   resortsSentosa:

  //   cityArea:
];

surchargeCoords.forEach((areaObj) =>
    areaObj.coordinates.forEach((coordsArray) => {
      coordsArray.forEach( data => {
        data.reverse()
      })
    })
  );

export default surchargeCoords;
