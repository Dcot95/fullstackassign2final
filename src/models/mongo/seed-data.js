import {hillwalk} from "../../../test/fixtures.js";

export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    }
  },
  countrys: {
    _model: "Country",
    ireland: {
      title: "Ireland",
      userid: "->users.bart"
    }
  },
  pointofinterests: {
    _model: "Pointofinterest",
    hillwalk: {
      title: "Hillwalk",
      county: "kerry",
      description: "stuff happens here",
      latitude: 2.4234,
      longitude: -3.4564,
      countryid: "->countrys.ireland"
    }
  },
  reviews: {
    _model: "Review",
    hillwalk: {
      title: "Hillwalk",
      comment: "tough but fun walk",
      rating: 3,
      countryid: "->countrys.ireland"
    }
  }
};
