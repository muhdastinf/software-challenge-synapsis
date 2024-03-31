"use client";

import React, { useState, useEffect, useRef } from "react";
import TopNavigation from "@/components/topNavigation/topNavigation";
import { Button, Input, Space, Table, Modal, Spin } from "antd";
import type { GetRef, TableColumnsType, TableColumnType } from "antd";
import type { FilterDropdownProps } from "antd/es/table/interface";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import axios from "axios";

const { confirm } = Modal;

type InputRef = GetRef<typeof Input>;
type DataIndex = keyof IUsers;

export default function UsersPage() {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [loading, setLoading] = useState(false);
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<IUsers> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      width: 250,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: IUsers) => (
        <Space size="middle" className="text-blue-600">
          <a onClick={() => showDeleteConfirm(record.id)}>Delete</a>
        </Space>
      ),
      width: 150,
    },
  ];

  const getUsers = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
      const response = await axios.get(
        "https://gorest.co.in/public/v2/users?page=1&per_page=100",
        {
          headers: {
            Authorization: `Bearer c967e5f5e4e50f03aa01f2a6e70d8ec3392d239a8ecf091244536420a0c36687`,
          },
        }
      );
      setUsers(response.data);
    } catch (e) {
      console.error("Error fatching data users: ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleDelete = async (userId: number) => {
    try {
      setLoading(true);
      await axios.delete(`https://gorest.co.in/public/v2/users/${userId}`, {
        headers: {
          Authorization: `Bearer c967e5f5e4e50f03aa01f2a6e70d8ec3392d239a8ecf091244536420a0c36687`,
        },
      });
      getUsers();
    } catch (error) {
      console.error("Error deleting user: ", error);
    } finally {
      setLoading(false);
    }
  };

  const showDeleteConfirm = (userId: number) => {
    confirm({
      title: "Are you sure delete this user?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      centered: true,
      onOk() {
        handleDelete(userId);
      },
    });
  };

  return (
    <>
      <div>
        <TopNavigation />
        <div
          className="mt-20 p-16 text-center font-bold text-3xl text-white"
          style={{
            backgroundImage: "linear-gradient(to right, #ff7e5f, #feb47b)",
          }}
        >
          USERS PAGE
        </div>
        <div className="flex justify-end">
          <Button
            href="/users/add-users"
            className="flex w-1/12 mx-20 mt-6 justify-center items-center shadow-md"
          >
            + Add User
          </Button>
        </div>

        {loading ? (
          <div className="text-center">
            <Spin size="large" />
          </div>
        ) : (
          <div className="mx-20 my-6 rounded-xl shadow-xl">
            <Table dataSource={users} columns={columns} scroll={{ y: 220 }} />{" "}
          </div>
        )}
      </div>
    </>
  );
}
