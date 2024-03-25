import subscriptionModel from "../models/subscriptionModel.js";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// Get Subscription Details
export const subscriptionDetails = async (req, res) => {
  try {
    const { userId, stripeCustomerId, plan } = req.body;

    const user = await userModel.findById(userId).select("_id, name, email");
    await userModel.findByIdAndUpdate(user._id, {
      $set: { subscriptionId: id },
    });

    const order = await subscriptionModel.create({
      userId,
      stripeCustomerId: stripeCustomerId,
      plan: plan,
    });
    res.status(200).send({
      success: true,
      message: "Subscription successfully!",
      order: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create subscription controller.",
      error,
    });
  }
};

// Get ALl Subscription Users
export const subscriptionUsers = async (req, res) => {
  try {
    const subUsers = await subscriptionModel.get({});
    res.status(200).send({
      success: true,
      message: "Subscription successfully!",
      users: subUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get subscription controller.",
      error,
    });
  }
};

// Get Single User Payment Details
export const getUserPayment = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await userModel.findById(userId).select("subscriptionId");
    if (!user.subscriptionId) {
      return;
    }
    const paymentInfo = await subscriptionModel.findOne({
      subscriptionId: user.subscriptionId,
    });
    res.status(200).send({
      success: true,
      paymentInfo: paymentInfo,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user payment info controller!",
    });
  }
};

// Delete Subscription
export const deleteSubscription = async (req, res) => {
  try {
    const orderId = req.params.id;
    await subscriptionModel.findByIdAndDelete(orderId);
    res.status(200).send({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user payment info controller!",
    });
  }
};

// -----------------------------------------

export const addStripe = async (req, res) => {
  try {
    const { user, plan } = req.body;
    const memberShip = await subscriptionModel.findOne({ userId: user.id });
    if (memberShip) {
      return res.status(201).send({
        success: true,
        message: `You are already in ${memberShip.plan} plain`,
      });
    }

    const myPayment = await stripe.customers.create({
      email: user.email,
      name: user.name,
    });
    await subscriptionModel.create({
      userId: user.id,
      name: myPayment.name,
      stripeCustomerId: myPayment.id,
      plain: plan,
    });
    res.status(200).send({
      success: true,
      message: "Payment successfully!",
      myPayment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in addStripe controller",
      error,
    });
  }
};

// CheckOutSection

export const checkOutSection = async (req, res) => {
  try {
    const { user, price, plan } = req.body;

    const stripeUser = await subscriptionModel.findOne({
      userId: user.id,
    });
    if (!stripeUser) {
      return res.status(400).send({
        success: false,
        message: "Stripe user not found!",
      });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: stripeUser.stripeCustomerId,
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      success_url: `${process.env.SUCCESS_URI}/success`,
      cancel_url: `${process.env.SUCCESS_URI}/error`,
      subscription_data: {
        metadata: {
          payingUserId: user.id,
        },
      },
    });
    console.log(checkoutSession);
    if (!checkoutSession.url) {
      return res.status(400).send({
        success: false,
        message: "Could not create checkout session!",
      });
    } else {
      res.status(200).send({
        success: true,
        message: "Checkout successfully!",
        checkoutSession: checkoutSession,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in checkout controller",
      error,
    });
  }
};

// Webhook Handeller
export const webhookHandler = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    const buf = req.body;
    const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);

      return res.status(400).json({
        error: {
          message: `Webhook Error: ${errorMessage}`,
        },
      });
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    // getting to the data we want from the event
    const subscription = event.data.object;
    const itemId = subscription.items.data[0].price.product;
    console.log(subscription);

    // Fetch the product (plan) details
    const product = await stripe.products.retrieve(itemId);

    const planName = product.name;

    switch (event.type) {
      case "customer.subscription.created":
        // customer subscription created
        const membership = await subscriptionModel.findOne({
          stripeCustomerId: subscription.customer,
        });

        if (membership) {
          await subscriptionModel.updateOne(
            {
              stripeCustomerId: subscription.customer,
            },
            { $set: { plan: planName } }
          );
        }
        break;
      case "customer.subscription.deleted":
        // subscription deleted
        break;

      default:
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        break;
    }

    return res.status(200).json({
      success: true,
      message: "",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in webhook controller",
      error,
    });
  }
};
