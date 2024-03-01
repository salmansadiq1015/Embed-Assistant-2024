"use client";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";

export default function CheckOutForm({ stripePromise, clientSecret, price }) {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [auth] = useAuth();
  const router = useRouter();

  const createOrder = async (e) => {
    e.preventDefault();
    setisLoading(true);
    if (!stripe || !elements) {
      return;
    }
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
      setisLoading(false);
      toast.error("Something went wrong!");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setisLoading(false);
      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/create-subscription`,
          { userId: auth.user.id, paymentInfo: { paymentIntent } }
        );
        if (data?.success) {
          setisLoading(false);
          toast.success("Payment successfully!");
          router.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
        setisLoading(false);
      }
    }
  };
  return (
    <form id="payment-form" onSubmit={createOrder} className="py-4 px-2">
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="mt-6 py-2 w-full flex items-center justify-center cursor-pointer bg-sky-500 hover:bg-sky-600 text-white rounded-3xl shadow-md hover:shadow-xl"
      >
        <span id="button-text">{isLoading ? "Paying..." : "Pay now"}</span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-red-500 pt-2 font-Poppins">
          {message}
        </div>
      )}
    </form>
  );
}
