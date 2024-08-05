import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ShadCN_Input = (props) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input
        type="text"
        disabled
        className="focus-visible:ring-transparent"
        id="email"
        placeholder="Email"
      />
    </div>
  );
};

export default ShadCN_Input;
