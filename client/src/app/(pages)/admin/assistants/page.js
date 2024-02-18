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
import { BsThreeDotsVertical } from "react-icons/bs";
import { TbLoader3 } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { CiCalendarDate } from "react-icons/ci";
import { GrUpdate } from "react-icons/gr";
import Image from "next/image";
import AssistantModel from "../../(user)/CustomModel/AssistantModel";
import UpdateAssistant from "@/app/components/user/UpdateAssistant";
import { LuPencil } from "react-icons/lu";

export default function Assistants() {
  const { theme } = useTheme();
  const { color } = useAssistant();
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("updateAssistant");
  const [updateId, setUpdateId] = useState("");
  const [index, setIndex] = useState("");

  // Get all Assistants
  const getAssistants = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/assistant/all-assistants`
      );
      setAssistants(data?.dbAssistants);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAssistants();

    //eslint-disable-next-line
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    { field: "Name", headerName: "Name", flex: 0.5 },
    { field: "Instructions", headerName: "Instructions", flex: 0.5 },
    { field: "Files", headerName: "Files Length", flex: 0.2 },
    { field: "Model", headerName: "AI Model", flex: 0.4 },
    { field: "created_at", headerName: "Created At", flex: 0.3 },

    {
      field: " ",
      headerName: "Update",
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                setUpdateId(params.row._id);
                setOpen(true);
              }}
            >
              <LuPencil
                className=" cursor-pointer"
                style={{
                  color:
                    theme === "dark"
                      ? color
                        ? color
                        : "#4facfe"
                      : color
                      ? color
                      : "#047857",
                }}
                size={20}
              />
            </Button>
          </>
        );
      },
    },

    {
      field: "  ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                deleteAssistantsInfo(params.row._id);
                setIndex(params.row.id);
              }}
            >
              {deleting && index === params.row.id ? (
                <TbLoader3 className="h-4 w-4 animate-spin" />
              ) : (
                <AiOutlineDelete
                  className="text-red-500 hover:text-red-600 cursor-pointer"
                  size={20}
                />
              )}
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  if (assistants && Array.isArray(assistants)) {
    assistants.forEach((assis, i) => {
      if (assistants) {
        const formattedDate = format(new Date(assis?.createdAt), "dd-MM-yyyy");
        const assisObject = {
          id: i + 1,
          Name: assis?.name,
          Instructions: assis?.instructions,
          Files: assis?.file_ids?.length,
          Model: assis?.model,
          created_at: formattedDate,
          _id: assis?.id,
        };

        rows.push(assisObject);
      }
    });
  }

  //---------------------Delete Assistants---------------
  const deleteAssistantsInfo = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/assistant/delete-assistant/${id}`
      );
      setDeleting(false);
      getAssistants();
      toast.success("Assistant deleted successfully!");
    } catch (error) {
      console.log(error);
      setDeleting(false);
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
          All Assistants
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
            <div className="sm:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-8">
              {assistants &&
                assistants?.map((assist, index) => (
                  <div
                    className={` rounded-md py-4  px-2 sm:px-[1rem] shadow-xl hover:shadow-md active:shadow-md hover:shadow-green-400/60 dark:hover:shadow-sky-400/60  cursor-pointer flex flex-col items-center gap-3 transition-shadow duration-150 border-2 border-green-800 dark:border-sky-500 `}
                    style={{
                      border: `2px solid ${
                        theme === "dark" ? "#4facfe" : color ? color : "#047857"
                      }`,
                    }}
                    key={assist._id}
                  >
                    <div className="relative flex items-center justify-between w-full ">
                      <div className="flex items-center gap-2">
                        <CiCalendarDate
                          className="h-5 w-5 text-purple-600"
                          style={{
                            color:
                              theme === "dark"
                                ? "#4facfe"
                                : color
                                ? color
                                : "#047857",
                          }}
                        />
                        {format(new Date(assist.createdAt), "dd MMM yyyy")}
                      </div>
                      <span className=" p-1 border border-zinc-400 bg-white/15 cursor-pointer rounded-md shadow-md">
                        <BsThreeDotsVertical
                          className="h-4 w-4 text-green-600 dark:text-sky-500"
                          style={{
                            color:
                              theme === "dark"
                                ? "#4facfe"
                                : color
                                ? color
                                : "#047857",
                          }}
                          onClick={() =>
                            setShow((prevShow) =>
                              prevShow === index ? null : index
                            )
                          }
                        />
                      </span>
                      {show === index && (
                        <div className=" absolute top-6 right-4 bg-white z-40 w-[12rem] py-1 px-1 flex flex-col gap-[2px] rounded-md shadow-md cursor-pointer border border-zinc-400">
                          <span
                            className="text-[14px] text-gray-800 flex items-center justify-between font-medium cursor-pointer py-1 px-2 rounded-md hover:shadow-md hover:bg-white/10 border hover:border-blue-400"
                            onClick={() => {
                              setRoute("updateAssistant");
                              setUpdateId(assist?.id);
                              setOpen(true);
                            }}
                          >
                            Update Assistant{" "}
                            <GrUpdate className="h-4 w-4 text-blue-500" />
                          </span>
                          <span
                            className="text-[14px] flex items-center justify-between text-red-500 font-medium cursor-pointer py-1 px-2 rounded-md hover:shadow-md hover:bg-white/10 border hover:border-red-400"
                            onClick={() => deleteAssistantsInfo(assist.id)}
                          >
                            Delete Assistant
                            {deleting && (
                              <TbLoader3 className="h-4 w-4 animate-spin" />
                            )}
                            <MdDeleteForever className="h-4 w-4 text-red-500" />
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="relative w-[4rem] h-[4rem] rounded-full overflow-hidden cursor-pointer shadow-lg border border-fuchsia-500 ">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/assistant/assistant-logo/${assist?._id}`}
                        alt="log"
                        layout="fill"
                        objectFit="fill"
                      />
                    </div>
                    <h3 className="text-lg font-semibold ">{assist?.name}</h3>
                    <p className="text-center">
                      {assist?.instructions.slice(0, 90)}...
                    </p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      {/* Update Assistant */}
      {route === "updateAssistant" && (
        <>
          {open && (
            <AssistantModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              component={UpdateAssistant}
              updateId={updateId}
              getAssistants={getAssistants}
            />
          )}
        </>
      )}
    </AdminLayout>
  );
}
