import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Pagination } from "@heroui/pagination";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { IoMdArrowDropdown } from "react-icons/io";
import { Spinner } from "@heroui/spinner";
import { useGetMaterial } from "@/hooks/admin/useGetMaterial";
import FilterMateri from "./filter-materi";
import { Avatar } from "@heroui/avatar";
import { trunc } from "@/helpers/Text";
import { parseDate } from "@/helpers/Date";

export const columns = [
  { name: "Nama Pelatihan", uid: "title" },
  { name: "Harga", uid: "price_fmt" },
  { name: "Total Materi", uid: "material_count_fmt" },
  { name: "Trainer", uid: "trainer" },
  { name: "Update date", uid: "updated_at" },
  { name: "", uid: "actions" },
];

export default function TableTrainee() {
  const [filter, setFilter] = React.useState({
    page: 1,
    name_search: "",
    order_rule: "DESC",
  });
  const { data, isLoading } = useGetMaterial({
    params: {
      limit: 10,
      page: filter?.page,
      name_search: filter?.name_search,
      is_active: true,
      order_by: "id",
      order_rule: filter?.order_rule,
    },
  });

  const onValueChange = React.useCallback(
    (value) => {
      setFilter({ ...filter, ...value });
    },
    [filter],
  );

  const topContent = React.useMemo(() => {
    return <FilterMateri onValueChange={onValueChange} />;
  });

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "title":
        return (
          <div className="flex gap-3 items-center">
            <span>{trunc(cellValue, 50)}</span>
          </div>
        );
      case "price":
        return (
          <div className="flex gap-3 items-center">
            <span>{cellValue}</span>
          </div>
        );
      case "total_materi":
        return (
          <div className="flex gap-3 items-center">
            <span>{cellValue} Topik</span>
          </div>
        );
      case "trainer":
        return (
          <div className="flex gap-3 items-center">
            <Avatar size="sm" src={cellValue?.profile_url} />
            <span>{cellValue?.full_name}</span>
          </div>
        );
      case "updated_at":
        return (
          <div className="flex gap-3 items-center">
            <span>{parseDate(cellValue, "DD MMM YYYY, HH:mm")}</span>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  size="sm"
                  endContent={<IoMdArrowDropdown size={16} />}
                  variant="bordered"
                  color="secondary"
                  className="border-1 border-slate-300"
                >
                  Actions
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="delete">Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with client side pagination"
      topContent={topContent}
      bottomContent={
        <div className="flex w-full mb-4 justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="secondary"
            page={filter?.page}
            total={data?.pagination?.page_total}
            onChange={(val) => onValueChange({ page: val })}
          />
        </div>
      }
      classNames={{
        wrapper: "gap-8 overflow-hidden shadow-none p-0",
        td: "py-4 border-b-1",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No users found"}
        items={data?.data || []}
        isLoading={isLoading}
        loadingContent={<Spinner />}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
