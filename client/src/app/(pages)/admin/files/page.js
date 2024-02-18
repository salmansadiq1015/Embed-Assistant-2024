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
import Image from "next/image";

export default function Files() {
  const { theme } = useTheme();
  const { color } = useAssistant();
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [index, setIndex] = useState("");

  // Get all Assistants
  const getAllFiles = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/files/all-files`
      );
      setFiles(data?.files);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllFiles();

    //eslint-disable-next-line
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.2 },
    {
      field: "Type",
      headerName: "File Type",
      flex: 0.3,
      renderCell: (params) => {
        console.log(params);
        return (
          <>
            <div className="relative w-[2rem] h-[2.4rem] object-fill p-1">
              <Image
                src={
                  params.row.Type === "pdf"
                    ? "/pdf.png"
                    : params.row.Type === "plain"
                    ? "/txt.png"
                    : params.row.Type === "txt"
                    ? "/txt.png"
                    : params.row.Type === "csv"
                    ? "/csv.png"
                    : params.row.Type === "docx"
                    ? "/docx.png"
                    : params.row.Type === "doc"
                    ? "/docx.png"
                    : params.row.Type === "pptx"
                    ? "/pptx.png"
                    : "/any.png"
                }
                layout="fill"
                objectFit="contain"
                className="w-full h-full"
                alt="Icon"
              />
            </div>
          </>
        );
      },
    },
    { field: "Name", headerName: "Name", flex: 0.5 },
    { field: "assistantId", headerName: "Assistant ID", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.3 },

    {
      field: "  ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            <Button
              onClick={() => {
                handleDelete(params.row.assistantId, params.row.fileId);
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

  if (files && Array.isArray(files)) {
    files.forEach((file, i) => {
      if (file) {
        const formattedDate = format(new Date(file?.createdAt), "dd-MM-yyyy");
        const fileObject = {
          id: i + 1,
          Type: file?.fileType,
          Name: file?.fileName,
          created_at: formattedDate,
          assistantId: file?.assistantId,
          fileId: file?.fileId,
        };

        rows.push(fileObject);
      }
    });
  }

  //---------------------Delete Files---------------
  const handleDelete = async (assistantId, fileId) => {
    setDeleting(true);
    if (!assistantId || !fileId)
      return toast.error("Assistant_id or File_id is missing!");
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/v1/files/delete-file/${assistantId}/${fileId}`
      );
      if (data?.success) {
        getAllFiles();
        setDeleting(false);
        toast.success(data?.message, { duration: 3000 });
      } else {
        setDeleting(false);
        toast.error(data?.message, { duration: 2000 });
      }
    } catch (error) {
      console.log(error);
      setDeleting(false);
      toast.error("Something went wrong!");
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
          All Files
        </h1>
        <hr className="my-3 h-[2px] bg-gray-300" />
        {loading ? (
          <Loader />
        ) : (
          <div className="w-full h-[90vh]  pb-[10rem] overflow-auto message mt-[2rem] sm:mt-0">
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
            <div className=" sm:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {files?.map((file, index) => (
                <div
                  className=" relative box rounded-md py-4  border-2  cursor-default flex items-center justify-center flex-col gap-3 shadow-xl hover:shadow-md active:shadow-md hover:shadow-green-400/60 dark:hover:shadow-sky-400/60"
                  key={file?._id}
                  style={{
                    border: `2px solid ${
                      theme === "dark" ? "#4facfe" : color ? color : "#047857"
                    }`,
                  }}
                >
                  {/* Three Dots */}
                  <div className="relative flex items-center justify-between w-full px-2 ">
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
                      {format(new Date(file?.createdAt), "dd MMM yyyy")}
                    </div>
                    <span className=" p-1 border border-zinc-400 bg-white/15 cursor-pointer rounded-md shadow-md ">
                      <BsThreeDotsVertical
                        className="h-4 w-4 text-green-600 dark:text-blue-400"
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
                          className={` ${
                            deleting && "pointer-events-none animate-pulse"
                          }text-[14px] flex items-center justify-between text-red-500 font-medium cursor-pointer py-1 px-2 rounded-md hover:shadow-md hover:bg-white/10 border hover:border-red-400`}
                          onClick={() =>
                            handleDelete(file?.assistantId, file?.fileId)
                          }
                        >
                          Delete File
                          {deleting && (
                            <TbLoader3 className="h-4 w-4 animate-spin" />
                          )}
                          <MdDeleteForever className="h-4 w-4 text-red-500" />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* End */}
                  <div className="relative w-[3rem] h-[3rem] object-fill p-1">
                    <Image
                      src={
                        file?.fileType === "pdf"
                          ? "/pdf.png"
                          : file?.fileType === "plain"
                          ? "/txt.png"
                          : file?.fileType === "txt"
                          ? "/txt.png"
                          : file?.fileType === "csv"
                          ? "/csv.png"
                          : file?.fileType === "docx"
                          ? "/docx.png"
                          : file?.fileType === "doc"
                          ? "/docx.png"
                          : file?.fileType === "pptx"
                          ? "/pptx.png"
                          : "/any.png"
                      }
                      layout="fill"
                      objectFit="contain"
                      className="w-full h-full"
                      alt="Icon"
                    />
                  </div>
                  <p className="text-[16] font-medium text-center">
                    {file?.fileName?.slice(0, 25)}{" "}
                    <span>{file?.fileName?.length > 25 && "..."}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
