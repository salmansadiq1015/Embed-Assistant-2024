"use client";

import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useAssistant, useAuth } from "../context/authContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { TbLoader } from "react-icons/tb";
import { useRouter } from "next/navigation";

const UpgradeButton = ({ plans }) => {
  const { theme } = useTheme();
  const { color } = useAssistant();
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Handle Subscription
  const handleSubscription = async ({ amount, plan }) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/add-stripe`,
        { user: auth.user, plan }
      );
      if (data?.success) {
        checkOutSession(amount, plan);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  // Checkout Session
  const checkOutSession = async (amount, plan) => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/order/checkOut-Section`,
        { user: auth.user, price: amount, plan }
      );
      if (data?.success) {
        router.push(data?.checkoutSession?.url);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };
  return (
    <>
      <button
        className="w-full h-[2.8rem] flex items-center gap-1 text-white justify-center rounded-3xl shadow-md cursor-pointer "
        style={{
          background:
            theme === "dark"
              ? !color
                ? "blue"
                : color
              : !color
              ? "green"
              : color,
        }}
        onClick={() =>
          handleSubscription({
            amount:
              plans === "Standard"
                ? "price_1OpOPRHDam9TUVDQf7h7P5Db"
                : "price_1OpOSRHDam9TUVDQkEL7P5HC",
            plan: plans,
          })
        }
      >
        Upgrade now <ArrowRight className="h-5 w-5 ml-1.5 text-white" />
        {loading && <TbLoader className="h-5 w-5 text-white animate-spin" />}
      </button>
    </>
  );
};

export default UpgradeButton;
