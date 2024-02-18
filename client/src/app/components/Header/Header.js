"use client";
import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import TheamSwitcher from "../../utils/TheamSwitcher";
import Login from "../auth/Login";
import CustomModle from "@/app/utils/CustomModel";
import Register from "../auth/Register";
import UpdatePassword from "../auth/UpdatePassword";
import ResetPassword from "../auth/ResetPassword";
import { useAssistant, useAuth } from "../../context/authContext";
import toast from "react-hot-toast";
import UpdateProfile from "../auth/UpdateProfile";
import Profile from "../auth/Profile";
import ProfileModel from "@/app/utils/ProfileModel";
import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header({ open, setOpen }) {
  const [route, setRoute] = useState("Login");
  const [auth, setAuth] = useAuth();
  const [profileRoute, setProfileRoute] = useState("Profile");
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();
  const [active, setActive] = useState("");
  const { logo } = useAssistant();

  const navigation = [
    { name: "Home", href: "/", current: "" },
    { name: "Blogs", href: "/blogs", current: "blogs" },
    { name: "Contact", href: "/contact", current: "contact" },
  ];

  useEffect(() => {
    const pathArray = window.location.pathname.split("/");
    const fileIdFromPath = pathArray[1];
    setActive(fileIdFromPath);

    // exlint-disable-next-line
  }, []);

  // Logout User
  const handleLogout = () => {
    setOpen(true);
    setRoute("Login");
    router.push("/");
    localStorage.removeItem("auth");
    setAuth({ ...auth, user: null, token: "" });
    toast.success("Logout Successfully", { duration: 2000 });
  };

  return (
    <>
      <Disclosure
        as="nav"
        className={`dark:bg-gray-950 bg-gray-200 z-[1000] sticky top-0 left-0 w-full border-b-[2px] dark:border-gray-500 border-gray-400 shadow-md shadow-gray-300 dark:shadow-gray-700  `}
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <div className="flex flex-shrink-0 items-center">
                    <Link href="/">
                      <Image
                        className="h-10 w-auto rounded-full shadow-md shadow-gray-400 border border-gray-400"
                        src={logo ? logo?.logoImage : "/logo1.jpeg"}
                        alt="Your Company"
                        width={36}
                        height={36}
                      />
                    </Link>
                  </div>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:flex flex-shrink-0 items-center ">
                    <Link href="/">
                      <Image
                        className="h-10 w-auto rounded-full shadow-md shadow-gray-400 border border-gray-400"
                        src={logo ? logo?.logoImage : "/logo1.jpeg"}
                        alt="Your Company"
                        width={36}
                        height={36}
                      />
                    </Link>
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            active === item.current
                              ? `bg-gray-950 text-white shadow1 `
                              : " hover:bg-gray-400 hover:text-white",
                            `rounded-3xl px-4 py-[.4rem] text-sm text-green-900 dark:text-white font-medium `
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full dark:bg-gray-800 bg-white p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <TheamSwitcher />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <Image
                          className=" rounded-full"
                          src={
                            auth?.user
                              ? `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/users/user-avatar/${auth?.user?.id}`
                              : "/defaultProfile.png"
                          }
                          alt="Profile"
                          width={32}
                          height={32}
                          style={{
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "50%",
                            border: "1px solid #000",
                            objectFit: "cover",
                          }}
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {auth?.user ? (
                          <>
                            {/* Admin Route Star */}
                            {auth?.user?.role === 1 && (
                              <Menu.Item>
                                {({ active }) => (
                                  <span
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-800  cursor-pointer hover:text-blue-500 font-semibold"
                                    )}
                                    onClick={() =>
                                      router.push("/admin/dashboard")
                                    }
                                  >
                                    Admin Dashboard
                                  </span>
                                )}
                              </Menu.Item>
                            )}
                            {auth?.user?.role === 1 && (
                              <div className="px-2">
                                <hr className="w-full h-[2px] my-1 bg-gray-400" />
                              </div>
                            )}
                            {/* Admin Route End */}
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-800 cursor-pointer hover:text-blue-500 font-semibold"
                                  )}
                                  onClick={() => router.push("/dashboard")}
                                >
                                  Dashboard
                                </span>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-800 cursor-pointer hover:text-blue-500 font-semibold"
                                  )}
                                  onClick={() => {
                                    setProfileRoute("Profile");
                                    setProfileOpen(true);
                                  }}
                                >
                                  Your Profile
                                </span>
                              )}
                            </Menu.Item>
                            {/* Nav Menu */}
                            <div className="block sm:hidden">
                              <div className="px-2">
                                <hr className="w-full h-[2px] my-1 bg-gray-400" />
                              </div>
                              {navigation.map((item) => (
                                <Menu.Item key={item.href} className="">
                                  {({ active }) => (
                                    <span
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-800 cursor-pointer hover:text-sky-600 font-semibold"
                                      )}
                                      onClick={() =>
                                        router.push(`${item.href}`)
                                      }
                                    >
                                      {item.name}
                                    </span>
                                  )}
                                </Menu.Item>
                              ))}
                            </div>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-800  cursor-pointer hover:text-blue-500 font-semibold"
                                  )}
                                  onClick={() => {
                                    setProfileRoute("UpdateProfile");
                                    setProfileOpen(true);
                                  }}
                                >
                                  Settings
                                </span>
                              )}
                            </Menu.Item>
                            <div className="px-2">
                              <hr className="w-full h-[2px] my-1 bg-gray-400" />
                            </div>
                            <Menu.Item>
                              {({ active }) => (
                                <span
                                  className={classNames(
                                    active ? "bg-gray-200" : "",
                                    "block px-4 py-2 text-sm text-gray-800 cursor-pointer hover:text-blue-500 font-semibold"
                                  )}
                                  onClick={handleLogout}
                                >
                                  Logout
                                </span>
                              )}
                            </Menu.Item>
                          </>
                        ) : (
                          <Menu.Item>
                            {({ active }) => (
                              <span
                                className={classNames(
                                  active ? "bg-gray-200" : "",
                                  "block px-4 py-2 text-sm text-gray-800 cursor-pointer hover:text-blue-500 font-semibold"
                                )}
                                onClick={() => setOpen(true)}
                              >
                                Login
                              </span>
                            )}
                          </Menu.Item>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    // as="a"
                    // href={item.href}
                    onClick={() => router.push(item.href)}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      {/* Login */}
      {route === "Login" && (
        <>
          {open && (
            <CustomModle
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Login}
            />
          )}
        </>
      )}
      {/* Register */}
      {route === "Register" && (
        <>
          {open && (
            <CustomModle
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={Register}
            />
          )}
        </>
      )}
      {/* Reset Password */}
      {route === "ResetPassword" && (
        <>
          {open && (
            <CustomModle
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={ResetPassword}
            />
          )}
        </>
      )}
      {/* Update Password */}
      {route === "UpdatePassword" && (
        <>
          {open && (
            <CustomModle
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={UpdatePassword}
            />
          )}
        </>
      )}
      {/*--------------------- Profile--------------- */}
      {profileRoute === "Profile" && (
        <>
          {profileOpen && (
            <ProfileModel
              open={profileOpen}
              setOpen={setProfileOpen}
              setRoute={setProfileRoute}
              component={Profile}
            />
          )}
        </>
      )}
      {/* Update Profile */}
      {profileRoute === "UpdateProfile" && (
        <>
          {profileOpen && (
            <ProfileModel
              open={profileOpen}
              setOpen={setProfileOpen}
              setRoute={setProfileRoute}
              component={UpdateProfile}
            />
          )}
        </>
      )}
      {/*  */}
    </>
  );
}
