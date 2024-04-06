"use client";

import { Coin } from "@/types";
import { convertPairFormat } from "@/utils/convertPairFormat";
import { formatCurrency } from "@/utils/numberFormat";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useCallback } from "react";
import { useSocketChangePrice } from "../hooks/useSocketChangePrice";
import { mapSymbolToIcon } from "./MapSymbolToIcon";
import { Key } from "react-stately";

interface ListCoinProps {
  coins: Coin[];
}

export const CoinList = ({ coins }: ListCoinProps) => {
  const { data, loading } = useSocketChangePrice(coins);

  const renderCell = useCallback(
    (data: Record<string, any>, columnKey: Key) => {
      const cellValue = data[columnKey];

      switch (columnKey) {
        case "symbol":
          return (
            <div className="flex items-center space-x-2">
              <span>{mapSymbolToIcon(data.symbol)}</span>{" "}
              <span className="font-bold">
                {convertPairFormat(data.symbol)}
              </span>
            </div>
          );
        case "lastPrice":
          return (
            <div className="text-right">
              {formatCurrency(data.lastPrice, "en-US")}
            </div>
          );

        case "priceChangePercent":
          return data.priceChangePercent > 0 ? (
            <div className="text-success-500 text-right">
              +{Number(data.priceChangePercent).toFixed(2) + "%"}
            </div>
          ) : (
            <div className="text-red-500 text-right">
              {Number(data.priceChangePercent).toFixed(2) + "%"}
            </div>
          );
        case "volume":
          return (
            <div className="text-right">
              {new Intl.NumberFormat().format(data.volume)}
            </div>
          );
        case "quoteVolume":
          return (
            <div className="text-right">
              {formatCurrency(data.quoteVolume, "en-US")}
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  const columns = [
    {
      key: "symbol",
      label: "Pair",
      align: false,
    },
    {
      key: "lastPrice",
      label: "Price",
      align: true,
    },
    {
      key: "priceChangePercent",
      label: "24h Change",
      align: true,
    },
    {
      key: "volume",
      label: "24h Volume (coin)",
      align: true,
    },
    {
      key: "quoteVolume",
      label: "24h Volume USD",
      align: true,
    },
  ];

  return (
    <div>
      <Table
        cellSpacing={0}
        cellPadding={0}
        border={0}
        classNames={{ th: "w-1/5", tbody: "bg-gray-50" }}
        shadow="none"
        radius="none"
      >
        <TableHeader
          columns={columns}
          className="text-right rounded-none w-1/5"
        >
          {(column) => (
            <TableColumn key={column.key}>
              <div className={column.align ? "text-right" : "text-left"}>
                {column.label}
              </div>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={data} className="w-1/5">
          {(item: Coin) => (
            <TableRow
              key={item.symbol}
              className={item.highlight ? "bg-slate-200" : "bg-transparent"}
            >
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
