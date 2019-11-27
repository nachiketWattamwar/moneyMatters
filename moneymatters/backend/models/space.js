var mongoose = require("mongoose");

const Spaceschema = new mongoose.Schema({
  satellites: {
    type: Number
  }
});

var Space = mongoose.model("nasasatellite", Spaceschema);

const Spaceschemabudget = new mongoose.Schema({
  budget: {
    type: Number
  }
});

var Spacebudget = mongoose.model("nasabudget", Spaceschemabudget);

const MarsSchema = new mongoose.Schema({
  project: {
    type: String
  },
  budget: {
    type: Number
  }
});

var Mars = mongoose.model("mars", MarsSchema);

const PlanetSchema = new mongoose.Schema({
  name: {
    type: String
  },
  distance: {
    type: Number
  }
});

var Planet = mongoose.model("planets", PlanetSchema);

module.exports = { Space: Space, Spacebudget: Spacebudget, Mars: Mars, Planet: Planet };
// module.exports = { Spacebudget };
