const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const stripe = require("stripe")(process.env.stripe_secret_key);
app.use(cors());

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res, next) => {
    const signature = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.webhook_secret
      );
    } catch (error) {
      console.error(error.message);
      return res.status(401).send(`Webhook error: ${error.message}`);
    }
    if (event.type === "checkout.session.completed") {
      console.log("Checkout session completed:", event.data.object);
      const appointmentId = event.data.object.metadata.appointment_id;
      const sessionDetails = JSON.parse(event.data.object.metadata.session);
      console.log("here");
      console.log(sessionDetails);
      const appointment = await Appointment.findByIdAndUpdate(
        appointmentId,
        {
          profilePicture: sessionDetails.profilePicture,
          serviceTitle: sessionDetails.serviceTitle,
          clientId: sessionDetails.clientId,
          phone: sessionDetails.phone,
          availabilityData: sessionDetails.availabilityData,
          isPaid: sessionDetails.isPaid,
          isBooked: sessionDetails.isBooked,
          message: sessionDetails.message,
          email: sessionDetails.email,
          name: sessionDetails.name,
        },
        { new: true } // Return the updated document
      );

      console.log("Appointment status updated:", appointment);
      console.log("payment successfully");
    } else {
      console.log("Payment rejected");
    }
    res.status(200).end();
  }
);

//to take request body from frontend
app.use(express.json());

app.use("/api/create-checkout-process", async (req, res) => {
  const { sessionArray } = req.body;
  console.log(sessionArray);
  const lineItems = sessionArray.map((product) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: product.serviceTitle,
      },
      unit_amount: product.price * 100,
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,

    mode: "payment",
    success_url: `${process.env.deployed_url}/success`,
    cancel_url: `${process.env.deployed_url}/cancel`,
    metadata: {
      appointment_id: sessionArray[0]?.appointmentId,
      session: JSON.stringify(sessionArray[0]),
    },
  });

  res.json({ id: session.id });
  // console.log(session);
  // console.log(session.payment_status);
});

const dbConfig = require("./config/dbConfig");
const port = process.env.PORT || 5000;

const usersRoute = require("./routes/usersRoute");
const serviceRoute = require("./routes/sevicesRoute");
const apponitmentRoute = require("./routes/apponitmentRoute");
const Appointment = require("./models/reservationSchema");

app.use("/api/users", usersRoute);
app.use("/api/service", serviceRoute);
app.use("/api/apponitment", apponitmentRoute);

// deployment config
const path = require("path");
__dirname = path.resolve();
// render deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () =>
  console.log(`Node/Express Server is Listing to port ${port}`)
);
