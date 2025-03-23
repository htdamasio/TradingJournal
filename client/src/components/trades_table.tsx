import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
} from "@heroui/table";

import { ITrade } from "@/data_types";

interface IProps {
  trades: ITrade[];
  rowsPerPage: number;
  page: number;
}

interface IColumn {
  name: string;
  uid: string;
  sortable?: boolean;
}

export const TradesTable = (props: IProps) => {
  // const [trades, setTrades] = useState<ITrade[]>([...props.trades]);
  const [avaiableColumns, setAvaiableColumns] = useState<IColumn[]>([]);
  const [activeColumns, setactiveColumns] = useState<Selection>(
    new Set(["start_date", "asset", "net_pnl", "status"]),
  );
  // const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage);
  // const [page, setPage] = useState(props.page);
  // const pages = Math.ceil(props.trades.length / props.rowsPerPage);
  // Sample trade object to extract keys from (since interfaces aren't available at runtime)
  const sampleTrade: ITrade = {
    id: -1,
    start_date: "",
    end_date: null,
    strategy: "",
    asset: "",
    direction: "",
    roi: 0,
    entry_price: 0,
    exit_price: 0,
    qty: 0,
    net_pnl: 0,
    status: "",
  };

  useEffect(() => {
    // Get the keys from the sample trade object
    const tradeKeys = Object.keys(sampleTrade) as (keyof ITrade)[];

    // Map keys to column objects
    const generatedColumns: IColumn[] = tradeKeys.map((key) => ({
      name: key.toUpperCase().replace("_", " "), // e.g., "start_date" -> "START DATE"
      uid: key, // Use the key as the uid
      sortable: [
        "roi",
        "entry_price",
        "exit_price",
        "net_pnl",
        "start_date",
        "status",
      ].includes(key), // Make numeric and date fields sortable
    }));

    // Set the columns state
    setAvaiableColumns(generatedColumns);
  }, []);

  const headerColumns = useMemo(() => {
    if (activeColumns === "all") return avaiableColumns;

    return avaiableColumns.filter((column) =>
      Array.from(activeColumns).includes(column.uid),
    );
  }, [activeColumns, avaiableColumns]);

  const items = useMemo(() => {
    const start = (props.page - 1) * props.rowsPerPage;
    const end = start + props.rowsPerPage;

    return props.trades
      .sort(function (a, b) {
        return new Date(b.start_date) - new Date(a.start_date);
      })
      .slice(start, end);
  }, [{ ...props }]);

  const renderCell = useCallback((trade: ITrade, columnKey: React.Key) => {
    const cellValue = trade[columnKey as keyof ITrade];

    switch (columnKey) {
      default:
        return (
          <p className={`${columnKey === "status" ? "capitalize" : ""}`}>
            {cellValue}
          </p>
        );
    }
  }, []);

  return (
    // <div className="">Teste</div>
    <Table
      isCompact
      removeWrapper
      aria-label="Example table with custom cells, pagination and sorting"
      // bottomContent={bottomContent}
      // bottomContentPlacement="outside"
      // checkboxesProps={{
      //   classNames: {
      //     wrapper: "after:bg-foreground after:text-background text-background",
      //   },
      // }}
      // classNames={classNames}
      // selectedKeys={selectedKeys}
      selectionMode="none"
      // sortDescriptor={sortDescriptor}
      // topContent={topContent}
      // topContentPlacement="outside"
      // onSelectionChange={setSelectedKeys}
      // onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column: IColumn) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No trades yet"} items={items}>
        {(item) => (
          <TableRow
            key={item.id}
            className="hover:bg-primary-500 hover:cursor-pointer"
          >
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
