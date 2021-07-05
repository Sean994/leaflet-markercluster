const defaultMap = { 
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}

const jawgMap = {
    token : '?access-token=59naIgIUbsIL6hvWL3rBlku4qnzyebH5Zbidzyf5DqHR8zDM331xqCWPpLKF7Cbp',
    lightUrl : "https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png",
    darkUrl : "https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png",
    attribution: `<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`
}

const oneMap = {
    lightUrl:'https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png',
    darkUrl: 'https://maps-{s}.onemap.sg/v3/Night/{z}/{x}/{y}.png',
    attribution: '<img src="https://docs.onemap.sg/maps/images/oneMap64-01.png" style="height:20px;width:20px;"/> New OneMap | Map data &copy; contributors, <a href="http://SLA.gov.sg">Singapore Land Authority</a>'
}

const hereApi = {
    apiKey : 'uNAkp3A6Cxt2gEfx5jOBafT1FF53HP_uyjyrK0Q9K0s'
}

export { jawgMap , defaultMap , oneMap , hereApi }
