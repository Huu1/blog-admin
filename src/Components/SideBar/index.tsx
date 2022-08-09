import * as React from "react";
import { MenuList } from "@/Config/router";
import NestedMenu from "./NestedMenu";

export default function CustomizedList() {
  return (
    <>
      <NestedMenu
        data={MenuList}
        className="bg-white border-r"
        style={{ minWidth: "200px" }}
      />
    </>
  );
}
