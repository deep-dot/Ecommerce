import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      {/* <a className="mailBtn" href="mailto:mymailforabhi@gmail.com">
        <Button>Contact: mymailforabhi@gmail.com</Button>
      </a> */}
      <a className="mailBtn" href="#">
        <Button>Contact:</Button>
      </a>
    </div>
  );
};

export default Contact;
