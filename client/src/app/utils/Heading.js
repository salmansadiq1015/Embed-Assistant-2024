import React from "react";

const Heading = ({ title, description, keywords }) => {
  return (
    <>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="shortcut icon" href="/logo1.jpeg" type="image/x-icon" />
    </>
  );
};

export default Heading;
