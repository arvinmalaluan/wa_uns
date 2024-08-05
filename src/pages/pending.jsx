import React, { useEffect, useState } from "react";

const PendingPage = ({ verified, status }) => {
  return (
    <div>
      <p>haloooooooooo</p>
      <p>
        {verified
          ? "You are done verifying your email."
          : "Please verify your email first."}
      </p>
      <p>
        {status &&
          "Your request is now being processed. Please wait for the admin to confirm your request of access to the system."}
      </p>
    </div>
  );
};

export default PendingPage;
