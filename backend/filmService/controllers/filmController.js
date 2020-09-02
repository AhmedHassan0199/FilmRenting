const {
  ALREADY_EXIST,
  BAD_REQUEST,
  GOOD_REQUEST,
} = require("../utils/httpCodes");
const joi = require("joi");
joi.objectId = require("joi-objectid")(joi);
const { isFilmExists, createFilm, getAllFilms } = require("../repos/film");
const stripe = require("stripe")(
  "sk_test_51HMXmEIkP9PE94S848RFXHoMWYZmrJDeldoXDIP8Ph4EYcMV1uBB34tUqehnx2W1D004VU35RmtL86VEJMiP8hJ1009z3PX33r"
);
const { v4: uuidv4 } = require("uuid");

module.exports.addFilm = async (req, res) => {
  const { _id } = req.user;
  try {
    const isFilmFound = await isFilmExists(req.body.filmTitle);
    if (isFilmFound) {
      return res.status(ALREADY_EXIST).json({ error: "Film already exists" });
    }
    const createdFilm = await createFilm({ ...req.body, createdBy: _id });
    return res
      .status(GOOD_REQUEST)
      .json({ status: createdFilm.filmTitle + "Is added" });
  } catch (error) {
    return res.status(BAD_REQUEST).json({ error: "Something went wrong" });
  }
};
module.exports.getFilms = async (req, res) => {
  try {
    const films = await getAllFilms();
    return res.status(GOOD_REQUEST).json(films);
  } catch (error) {
    return res.status(BAD_REQUEST).json({ error: "Something went wrong" });
  }
};

module.exports.rentFilm = async (req, res) => {
  console.log("REQUEST :");
  console.log(req.body);
  let error;
  let status;

  try {
    const { filmData, token } = req.body;
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });
    const idempotency_key = uuidv4();
    const charge = await stripe.charges.create(
      {
        amount: filmData.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Rented the ${filmData.filmTitle} film`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotency_key,
      }
    );
    console.log("Charge : ", { charge });
    status = "success";
    res.status(GOOD_REQUEST).json(status);
  } catch (error) {
    console.log(error);
    status = "failure";
    res.status(BAD_REQUEST).json(status);
  }
};
