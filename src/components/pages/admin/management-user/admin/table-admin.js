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
import FilterAdmin from "./filter-admin";
import { useGetAdmin } from "@/hooks/admin/useGetAdmin";
import { useRouter } from "next/navigation";

export const columns = [
  { name: "Nama", uid: "full_name" },
  { name: "Label Admin", uid: "label" },
  { name: "Email", uid: "email" },
  { name: "Dibuat", uid: "created_at" },
  { name: "Pembuat", uid: "created_by" },
  { name: "", uid: "actions" },
];

export default function TableAdmin(props) {
  const router = useRouter();
  const [filter, setFilter] = React.useState({
    page: 1,
    name_search: "",
    order_rule: "DESC",
  });
  const { data, isLoading } = useGetAdmin({
    params: {
      limit: 10,
      page: filter?.page,
      name_search: filter?.name_search,
      is_active: props.tabKey == "Aktif" ? true : false,
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
    return <FilterAdmin onValueChange={onValueChange} />;
  });

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
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
                  Details
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="edit"
                  onPress={() =>
                    router.push(`/admin/management-user/admin/edit/${user?.id}`)
                  }
                >
                  Edit
                </DropdownItem>
                <DropdownItem key="delete">Non-Aktifkan</DropdownItem>
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
