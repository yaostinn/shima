import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "@mantine/core";
import Code from "../Code/Code";
import { CodeTableData } from "../../types";
import "./table.css";
import SortIcon from "../sortIcon";

const CodeTable: React.FC = () => {
  const [data, setData] = useState<CodeTableData[]>([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch(
        "https://nikostin.pythonanywhere.com/api/codes/"
      );
      if (response.ok) {
        const jsonData: CodeTableData[] = await response.json();
        setData(jsonData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFormSubmit = () => {
    getData(); // Refresh data on successful form submission
  };

  const handleSort = (id: keyof CodeTableData) => {
    setData((prevData) => {
      const newData = [...prevData]; // Create a new array to avoid mutating the state directly

      newData.sort((a: CodeTableData, b: CodeTableData) => {
        if (id === "updated_at" || id === "created_at") {
          const date1 = new Date(a[id]);
          const date2 = new Date(b[id]);
          return date1.getTime() - date2.getTime();
        } else if (typeof a[id] === "string") {
          return a[id].localeCompare(b[id]);
        } else {
          return 0;
        }
      });

      return newData;
    });
  };

  return (
    <div className="wrapper">
      <Code onFormSubmit={handleFormSubmit} />
      <Table className="table">
        <div className="table-wrapper">
          <Table.Thead>
            <Table.Tr className="table__tr__sort">
              <Table.Th></Table.Th>
              <Table.Th>
                <Button className="button" onClick={() => handleSort("name")}>
                  <SortIcon />
                </Button>
              </Table.Th>
              <Table.Th>
                <Button className="button" onClick={() => handleSort("code")}>
                  <SortIcon />
                </Button>
              </Table.Th>
              <Table.Th>
                <Button
                  className="button"
                  onClick={() => handleSort("execution_response")}
                >
                  <SortIcon />
                </Button>
              </Table.Th>
              <Table.Th>
                <Button
                  className="button"
                  onClick={() => handleSort("created_at")}
                >
                  <SortIcon />
                </Button>
              </Table.Th>
              <Table.Th>
                <Button
                  className="button"
                  onClick={() => handleSort("updated_at")}
                >
                  <SortIcon />
                </Button>
              </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Thead>
            <Table.Tr className="table__tr">
              <Table.Th className="table__th">ID</Table.Th>
              <Table.Th className="table__th">Name</Table.Th>
              <Table.Th className="table__th">Code</Table.Th>
              <Table.Th className="table__th">Execution Response</Table.Th>
              <Table.Th className="table__th">Created at</Table.Th>
              <Table.Th className="table__th">Updated at</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {data.map((el) => (
              <Table.Tr key={el.id} className="tohover">
                <Table.Td className="table__td">{el.id}</Table.Td>
                <Table.Td className="table__td">
                  <a key={el.id} href={`/code/${el.id}`}>
                    {el.name}
                  </a>
                </Table.Td>
                <Table.Td className="table__td">{el.code}</Table.Td>
                <Table.Td bg="green" className="table__td">
                  {el.execution_response}
                </Table.Td>
                <Table.Td className="table__td">
                  {new Date(el.created_at).toDateString()}
                </Table.Td>
                <Table.Td className="table__td">
                  {new Date(el.updated_at).toDateString()}
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </div>
      </Table>
    </div>
  );
};

export default CodeTable;
