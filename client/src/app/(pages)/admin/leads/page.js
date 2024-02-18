"use client";
import AdminLayout from "@/app/components/Layout/AdminLayout";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import { useTheme } from "next-themes";
import { AiOutlineDelete } from "react-icons/ai";
import { useAssistant } from "@/app/context/authContext";
import axios from "axios";
import { format } from "date-fns";
import toast from "react-hot-toast";
import Loader from "@/app/utils/Loader";
import moment from "moment";

// const rows = [
//   { id: 1, Name: "Snow", Email: "Jon", Phone: 35, created_at: "10/12/2024" },
// ];

export default function Leads() {
  const { theme } = useTheme();
  const { color } = useAssistant();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get Lead Users
  const userInfo = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/userInfo/all-usersInfo`
      );
      setUsers(data?.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    userInfo();

    //eslint-disable-next-line
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "Name", headerName: "Full Name", flex: 0.7 },
    { field: "Email", headerName: "Email Address", flex: 0.7 },
    { field: "Phone", headerName: "Phone Number", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.3 },

    {
      field: " ",
      headerName: "Delete",
      flex: 0.3,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => deleteUsersInfo(params.row._id)}>
              <AiOutlineDelete
                className="text-red-500 hover:text-red-600 cursor-pointer"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  if (users && Array.isArray(users)) {
    users.forEach((user, i) => {
      if (user) {
        const formattedDate = format(new Date(user?.createdAt), "dd-MM-yyyy");
        const userObject = {
          id: i + 1,
          Name: user?.name,
          Email: user?.email,
          Phone: user?.phone,
          created_at: formattedDate,
          _id: user?._id,
        };

        rows.push(userObject);
      }
    });
  }

  //---------------------Delete Users---------------
  const deleteUsersInfo = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/userInfo/delete-assistant-users/${id}`
      );
      if (data?.success) {
        userInfo();
        toast.success("Assistant deleted successfully!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full mt-[1rem] px-3 sm:px-6 message overflow-y-auto ">
        <h1
          className="text-2xl sm:text-3xl font-semibold "
          style={{
            color:
              theme === "dark"
                ? color
                  ? color
                  : "#4facfe"
                : color
                ? color
                : "#047857",
            textShadow: "-.1px 1px 0px #ccc",
          }}
        >
          Lead Users
        </h1>
        <hr className="my-3 h-[2px] bg-gray-300" />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full h-[90vh]  pb-[10rem] overflow-auto message">
            <Box
              m="40px 0 0 0"
              height="70vh"
              width="98%"
              boxShadow=".3rem .3rem .4rem rgba(0,0,0,.3)"
              filter="drop-shadow(0rem 0rem .6rem .1rem rgb(0, 149, 255))"
              overflow={"auto"}
              className="overflow-auto message hidden sm:block"
              sx={{
                "& .MuiDataGrid-root": {
                  border: `2px solid ${
                    theme === "dark"
                      ? color
                        ? color
                        : "#4facfe"
                      : color
                      ? color
                      : "#047857"
                  }`,
                  outline: "none",
                },
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom: `2px solid ${
                    theme === "dark"
                      ? color
                        ? color
                        : "#4facfe"
                      : color
                      ? color
                      : "#047857"
                  }`,
                },
                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .name-column--cell": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor:
                    theme === "dark"
                      ? color
                        ? color
                        : "#4facfe"
                      : color
                      ? color
                      : "#047857",
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme === "dark" ? "#1f2A40" : "#F2F0F0",
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor:
                    theme === "dark"
                      ? color
                        ? color
                        : "#4facfe"
                      : color
                      ? color
                      : "#047857",
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom: "none",
                },
                "& .MuiCheckbox-root": {
                  color:
                    theme === "dark"
                      ? color
                        ? color
                        : "#4facfe"
                      : color
                      ? color
                      : "#047857",
                },
                "& .MuiCheckbox-root:nth-child(1)": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid--toolbarContainer .MuiButton-text": {
                  color: `#fff !important`,
                },
              }}
            >
              <DataGrid
                class="light:text-black dark:text-white "
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 6 },
                  },
                }}
                pageSizeOptions={[5, 10, 20, 50]}
                checkboxSelection
              />
            </Box>
            {/* Mobile Format */}
            <div className=" sm:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
              {users?.map((info, index) => (
                <div
                  key={index}
                  className="py-4 flex flex-col gap-3 px-3 rounded-md box cursor-pointer border-2 "
                  style={{
                    border: `2px solid ${
                      theme === "dark" ? "#4facfe" : color ? color : "#047857"
                    }`,
                  }}
                >
                  <div className="">
                    <span className="rounded-3xl py-1 px-2 border border-green-500 bg-green-500/30 cursor-pointer shadow-md text-xs">
                      {moment(info?.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <input
                      type="text"
                      value={info?.name}
                      disabled
                      className="border-2 rounded-md border-gray-700  dark:border-gray-300  shadow-md py-2 px-3 text-black dark:text-white"
                    />
                    <input
                      type="text"
                      value={info?.email}
                      disabled
                      className="border-2 rounded-md border-gray-700 dark:border-gray-300 shadow-md py-2 px-3 text-black dark:text-white"
                    />
                    <input
                      type="text"
                      value={info?.phone}
                      disabled
                      className="border-2 rounded-md border-gray-700  dark:border-gray-300  shadow-md py-2 px-3 text-black dark:text-white"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
