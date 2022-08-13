import http from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import * as React from "react";

const columns: ColumnsType<{
  key: React.Key;
}> = [
  {
    title: "name",
    dataIndex: "name",
    align:'center'
  },
  {
    title: "age",
    dataIndex: "age",
    align:'center'
  },
  {
    title: "address",
    dataIndex: "address",
    align:'center'
  },
  {
    title: "操作",
    dataIndex: "operation",
    align:'center',
    render: (_: any, record: { key: React.Key }) => {
      return <>
        <Button type="link">编辑</Button>
      </>;
    },
  },
];

const getSeriesList = () => {
  return http.get("/api/series").then(({ code, data }: any) => {
    if (code === 0) {
      return data;
    } else {
      return [];
    }
  });
};

const Index = () => {
  const { isLoading, data } = useQuery(["series"], getSeriesList, {
    initialData: [],
  });

  const handleAdd = () => {};
  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        rowClassName={() => "editable-row"}
        loading={isLoading}
        bordered
        dataSource={data}
        columns={columns}
      />
    </div>
  );
};

export default Index;
