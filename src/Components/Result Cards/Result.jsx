import React from "react";
import PassCard from "./PassCard";
import FailCard from "./FailCard";
import PendingCard from "./PendingCard";

const Result = ({user}) => {
  return (
    <>
      {user.isPass === "Pass" && <PassCard />}
      {user.isPass === "Fail" && <FailCard />}
      {user.isPass === "Pending" && <PendingCard />}
    </>
  );
};

export default Result;
