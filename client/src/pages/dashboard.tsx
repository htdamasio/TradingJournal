import { Badge } from "@heroui/badge";
import { Tabs, Tab } from "@heroui/tabs";
// import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Pagination } from "@heroui/pagination";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Chip } from "@heroui/chip";
import { useState, useMemo, useEffect } from "react";

import { NoDataAvaiable } from "@/components/no_data_avaiable";
import { TradesTable } from "@/components/trades_table";
import { ITrade } from "@/data_types";
// import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { AddTrade } from "@/components/add_trade";
import { PositionSizeCalculator } from "@/components/position_size_calculator";

// import { useUser } from "@/contexts/user_context_provider";

export const mockTrades: ITrade[] = [
  {
    id: 1,
    strategy: "Buy the dip",
    asset: "BTCUSDT",
    direction: "Long",
    roi: 0.5,
    entry_price: 100,
    exit_price: 105,
    qty: 10,
    start_date: "2025-02-15",
    end_date: "2025-02-20",
    status: "closed",
    net_pnl: 500.0,
  },
  {
    id: 2,
    strategy: "Breakout",
    asset: "ETHUSDT",
    direction: "Long",
    roi: 0.8,
    entry_price: 2500,
    exit_price: 2700,
    qty: 5,
    start_date: "2025-03-01",
    end_date: null,
    status: "open",
    net_pnl: 10000.0,
  },
  {
    id: 3,
    strategy: "Scalping",
    asset: "XRPUSDT",
    direction: "Short",
    roi: -0.2,
    entry_price: 0.75,
    exit_price: 0.73,
    qty: 20,
    start_date: "2025-02-25",
    end_date: "2025-02-27",
    status: "closed",
    net_pnl: -30.0,
  },
  {
    id: 4,
    strategy: "Trend following",
    asset: "ADAUSDT",
    direction: "Long",
    roi: 1.2,
    entry_price: 1.5,
    exit_price: 1.68,
    qty: 3,
    start_date: "2025-03-05",
    end_date: null,
    status: "open",
    net_pnl: 5.4,
  },
  {
    id: 5,
    strategy: "Mean reversion",
    asset: "SOLUSDT",
    direction: "Short",
    roi: 0.3,
    entry_price: 150,
    exit_price: 145,
    qty: 8,
    start_date: "2025-02-18",
    end_date: "2025-02-25",
    status: "closed",
    net_pnl: 360.0,
  },
  {
    id: 6,
    strategy: "Buy the dip",
    asset: "BNBUSDT",
    direction: "Long",
    roi: 0.9,
    entry_price: 300,
    exit_price: 327,
    qty: 10,
    start_date: "2025-02-20",
    end_date: "2025-02-25",
    status: "closed",
    net_pnl: 2700.0,
  },
  {
    id: 7,
    strategy: "Breakout",
    asset: "LTCUSDT",
    direction: "Short",
    roi: -0.4,
    entry_price: 120,
    exit_price: 115,
    qty: 15,
    start_date: "2025-03-02",
    end_date: null,
    status: "open",
    net_pnl: -720.0,
  },
  {
    id: 8,
    strategy: "Scalping",
    asset: "DOGEUSDT",
    direction: "Long",
    roi: 0.6,
    entry_price: 0.15,
    exit_price: 0.159,
    qty: 25,
    start_date: "2025-02-28",
    end_date: "2025-03-05",
    status: "closed",
    net_pnl: 2.25,
  },
  {
    id: 9,
    strategy: "Trend following",
    asset: "MATICUSDT",
    direction: "Long",
    roi: 1.5,
    entry_price: 0.8,
    exit_price: 0.92,
    qty: 5,
    start_date: "2025-03-07",
    end_date: null,
    status: "open",
    net_pnl: 6.0,
  },
  {
    id: 10,
    strategy: "Mean reversion",
    asset: "AVAXUSDT",
    direction: "Short",
    roi: 0.7,
    entry_price: 50,
    exit_price: 46.5,
    qty: 12,
    start_date: "2025-02-22",
    end_date: "2025-03-02",
    status: "closed",
    net_pnl: 420.0,
  },
  {
    id: 11,
    strategy: "Buy the dip",
    asset: "BTCUSDT",
    direction: "Long",
    roi: 0.5,
    entry_price: 100,
    exit_price: 105,
    qty: 10,
    start_date: "2025-02-15",
    end_date: "2025-02-20",
    status: "closed",
    net_pnl: 500.0,
  },
  {
    id: 12,
    strategy: "Breakout",
    asset: "ETHUSDT",
    direction: "Long",
    roi: 0.8,
    entry_price: 2500,
    exit_price: 2700,
    qty: 5,
    start_date: "2025-03-01",
    end_date: null,
    status: "open",
    net_pnl: 10000.0,
  },
  {
    id: 13,
    strategy: "Scalping",
    asset: "XRPUSDT",
    direction: "Short",
    roi: -0.2,
    entry_price: 0.75,
    exit_price: 0.73,
    qty: 20,
    start_date: "2025-02-25",
    end_date: "2025-02-27",
    status: "closed",
    net_pnl: -30.0,
  },
  {
    id: 14,
    strategy: "Trend following",
    asset: "ADAUSDT",
    direction: "Long",
    roi: 1.2,
    entry_price: 1.5,
    exit_price: 1.68,
    qty: 3,
    start_date: "2025-03-05",
    end_date: null,
    status: "open",
    net_pnl: 5.4,
  },
  {
    id: 15,
    strategy: "Mean reversion",
    asset: "SOLUSDT",
    direction: "Short",
    roi: 0.3,
    entry_price: 150,
    exit_price: 145,
    qty: 8,
    start_date: "2025-02-18",
    end_date: "2025-02-25",
    status: "closed",
    net_pnl: 360.0,
  },
  {
    id: 16,
    strategy: "Buy the dip",
    asset: "BNBUSDT",
    direction: "Long",
    roi: 0.9,
    entry_price: 300,
    exit_price: 327,
    qty: 10,
    start_date: "2025-02-20",
    end_date: "2025-02-25",
    status: "closed",
    net_pnl: 2700.0,
  },
  {
    id: 17,
    strategy: "Breakout",
    asset: "LTCUSDT",
    direction: "Short",
    roi: -0.4,
    entry_price: 120,
    exit_price: 115,
    qty: 15,
    start_date: "2025-03-02",
    end_date: null,
    status: "open",
    net_pnl: -720.0,
  },
  {
    id: 18,
    strategy: "Scalping",
    asset: "DOGEUSDT",
    direction: "Long",
    roi: 0.6,
    entry_price: 0.15,
    exit_price: 0.159,
    qty: 25,
    start_date: "2025-02-28",
    end_date: "2025-03-05",
    status: "closed",
    net_pnl: 2.25,
  },
  {
    id: 19,
    strategy: "Trend following",
    asset: "MATICUSDT",
    direction: "Long",
    roi: 1.5,
    entry_price: 0.8,
    exit_price: 0.92,
    qty: 5,
    start_date: "2025-03-07",
    end_date: null,
    status: "open",
    net_pnl: 6.0,
  },
  {
    id: 20,
    strategy: "Mean reversion",
    asset: "AVAXUSDT",
    direction: "Short",
    roi: 0.7,
    entry_price: 50,
    exit_price: 46.5,
    qty: 12,
    start_date: "2025-02-22",
    end_date: "2025-03-02",
    status: "closed",
    net_pnl: 420.0,
  },
];
export const exhibitionModes = ["table", "cards", "carousel"];
export default function DashboardPage() {
  // const { userState } = useUser();
  const [tradesExhibitionMode, setTradesExhibitionMode] = useState<
    "table" | "cards" | "carousel"
  >("table");

  const [page, setPage] = useState(1);
  // const [itensPerPage, setItensPerPage] = useState(4);

  const itensPerPage = useMemo(() => {
    if (tradesExhibitionMode === "cards") return 4;
    else if (tradesExhibitionMode === "table") return 17;
    else return 100;
  }, [tradesExhibitionMode]);

  const pages = Math.ceil(mockTrades.length / itensPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * itensPerPage;
    const end = start + itensPerPage;

    // TODO: order first then slice it
    return mockTrades.slice(start, end);
  }, [page, mockTrades, itensPerPage]);

  // useEffect(() => {
  //   // TODO: Fetch trading data for the specifyed period for the user
  //   // TODO: default perriod is the current month
  // }, []);

  const exhibitionModeChange = (strKey: string | number) => {
    if (exhibitionModes.indexOf(strKey) > -1) {
      setPage(1);
      setTradesExhibitionMode(strKey);
    }
  };

  // useEffect(() => {
  //   if (tradesExhibitionMode === "cards") setItensPerPage(4);
  //   else if (tradesExhibitionMode === "table") setItensPerPage(17);
  //   else setItensPerPage(100);
  // }, [tradesExhibitionMode]);

  return (
    <DefaultLayout>
      {/* <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"> */}
      <section className="grid grid-cols-5 grid-rows-8 gap-2 h-full">
        {/* Latetal dashboard */}
        <div className="col-span-2 max-w-xl row-span-8 h-full content-end p-2">
          <div className="flex h-1/2 w-full">
            <PositionSizeCalculator />
          </div>
          <Tabs
            fullWidth
            aria-label="Options"
            classNames={{
              tabWrapper: "h-1/2 w-full",
            }}
            placement="bottom"
          >
            <Tab
              className="h-full w-full flex flex-col justify-around"
              title="Summary"
            >
              <div className="flex h-16 items-center w-full justify-evenly">
                <div className="flex flex-col gap-y-1">
                  <div className="text-sm">Trades</div>
                  <div className="text-2xl self-center">10</div>
                </div>
                <Divider orientation="vertical" />
                <div className="flex flex-col gap-y-1">
                  <div className="text-sm">Loss %</div>
                  <div className="text-2xl self-center text-red-500">80%</div>
                </div>
                <Divider orientation="vertical" />
                <div className="flex flex-col gap-y-1">
                  <div className="text-sm">Gain %</div>
                  <div className="text-2xl self-center text-green-500">20%</div>
                </div>
              </div>
              <div className="flex h-16 items-center w-full justify-evenly mt-4">
                <div className="flex flex-col gap-y-1 w-1/6">
                  <div className="text-sm self-start">Avg Ratio</div>
                  <div className="text-2xl self-end">-0.003</div>
                </div>
                <Divider orientation="vertical" />
                <div className="flex flex-col gap-y-1 w-1/6">
                  <div className="text-sm self-start">Avg Loss</div>
                  <div className="text-2xl self-end">1.57%</div>
                </div>
                <Divider orientation="vertical" />
                <div className="flex flex-col gap-y-1 w-1/6">
                  <div className="text-sm self-start">Avg Gain</div>
                  <div className="text-2xl self-end">-1.8%</div>
                </div>
              </div>
              <div className="flex h-16 items-center w-full justify-evenly mt-4">
                <div className="flex flex-col gap-y-1 w-1/6">
                  <div className="text-sm self-start">Profit Total</div>
                  <div className="text-2xl self-end">-$1500.83</div>
                </div>
                <Divider orientation="vertical" />
                <div className="flex flex-col gap-y-1 w-1/6">
                  <div className="text-sm self-start">Loss Total</div>
                  <div className="text-2xl self-end">-$3300.72</div>
                </div>
                <Divider orientation="vertical" />
                <div className="flex flex-col gap-y-1 w-1/6">
                  <div className="text-sm self-start">Gain Total</div>
                  <div className="text-2xl self-end">$1700.89</div>
                </div>
              </div>
            </Tab>
            <Tab className="h-full w-full flex" title="Daily Profit/Loss">
              <div className="grid grid-cols-7 gap-y-2 w-full">
                {[...Array(30)].map((_, i) => (
                  <div className="flex flex-col" key={i + 1}>
                    {/* TODO: Open the trades for that day onClick */}
                    <div className="text-xs self-start cursor-pointer">{i + 1}</div>
                    <div className="text-md self-start cursor-pointer">{Math.floor(Math.random() * 100)}.{Math.floor(Math.random() * 100)}</div>
                  </div>
                ))}
              </div>
            </Tab>
            {/* <Tab className="w-full h-full flex flex-col" title="Add Trade">
              <Form onSubmit={onCreateTrade} className="h-full justify-between">
                <div className="flex flex-col w-full gap-y-2">
                  <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="Username"
                    labelPlacement="outside"
                    name="username"
                    placeholder="Enter your username"
                    type="text"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter a valid email"
                    label="Email"
                    labelPlacement="outside"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </div>
                <div className="flex gap-2 self-end">
                  <Button color="primary" type="submit">
                    Add Trade
                  </Button>
                  <Button type="reset" variant="flat">
                    Reset
                  </Button>
                </div>
              </Form>
            </Tab> */}
          </Tabs>
        </div>
        {/* Current month and PnL */}
        <div className="col-span-3 row-span-1 flex flex-row justify-between p-4">
          <span className="capitalize text-5xl">
            {new Date().toLocaleString("default", { month: "long" })}
          </span>
          <div className="self-center flex flex-row gap-2 justify-center">
            <span className="text-2xl self-end">P&L:</span>
            <Badge
              color={true ? "success" : "danger"}
              content={(true ? `+${4}` : `-${4}`) + "%"}
              variant="faded"
            >
              <span className="text-5xl">$1000.00</span>
            </Badge>
            {/* <p>{userState.loggedInStatus}</p> */}
          </div>
        </div>
        {/* Trades */}
        <div className="col-span-3 row-span-7">
          <div className="grid grid-rows-12 h-full">
            {/* Title and exhibition mode */}
            <div className="row-span-1 p-2 content-center flex justify-between items-center">
              {/* <div className="text-lg">Trades</div> */}
              <AddTrade />
              <Tabs
                disableAnimation
                aria-label="Options"
                color="primary"
                selectedKey={tradesExhibitionMode}
                variant="underlined"
                onSelectionChange={(key) => exhibitionModeChange(key)}
              >
                <Tab
                  key="table"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Table</span>
                    </div>
                  }
                />
                <Tab
                  key="cards"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Cards</span>
                    </div>
                  }
                />
                {/* TODO: Create and add Carousel */}
                {/* <Tab
                  key="carousel"
                  title={
                    <div className="flex items-center space-x-2">
                      <span>Carousel</span>
                    </div>
                  }
                /> */}
              </Tabs>
            </div>
            {/* Trades exhibited as chosen by user */}
            <div className="row-span-10 p-2 h-full">
              {!items.length && <NoDataAvaiable />}
              {items.length && tradesExhibitionMode === "cards" && (
                <div className="flex flex-wrap h-full">
                  {items.map((trade: ITrade, i: number) => (
                    <div key={i} className="w-1/2 h-1/2 p-2">
                      <Card isPressable className="h-full w-full">
                        <CardHeader className="flex flex-row justify-between">
                          <div className="flex flex-row gap-x-1 items-center danger-200">
                            <div className="text-2xl">{trade.asset}</div>
                            <Chip
                              color={
                                trade.direction === "Short"
                                  ? "danger"
                                  : "success"
                              }
                              radius="sm"
                              size="sm"
                              variant="flat"
                            >
                              {trade.direction}
                            </Chip>
                          </div>
                          <div className="">{trade.strategy}</div>
                        </CardHeader>
                        <CardBody className="flex gap-y-2">
                          <div className="flex flex-row px-1 justify-between">
                            {/* ROI */}
                            <div className="flex flex-col">
                              <div className="text-xs">ROI</div>
                              <div
                                className={`text-4xl ${trade.roi > 0 ? "text-success-600" : "text-danger-600"}`}
                              >
                                {trade.roi * 100}%
                              </div>
                            </div>
                            <div className="flex flex-col">
                              <div className="text-xs self-end">Net P&L</div>
                              <div
                                className={`text-4xl ${trade.roi > 0 ? "text-success-600" : "text-danger-600"}`}
                              >
                                ${trade.net_pnl}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col w-2/3">
                            <div className="flex flex-row justify-between">
                              <div className="text-default-600">
                                Entry Price
                              </div>
                              <div className="text-warning">
                                {trade.entry_price}
                              </div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <div className="text-default-600">
                                {`${trade.status === "closed" ? "Exit " : "Current "}`}
                                Price
                              </div>
                              <div className="text-warning">
                                {trade.exit_price}
                              </div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <div className="text-default-600"> Quantity </div>
                              <div className="text-warning"> {trade.qty} </div>
                            </div>
                          </div>
                          <div className="flex flex-row self-end mt-2 justify-between w-full">
                            <div className="flex flex-row content-center">
                              {trade.start_date}
                              {trade.end_date && (
                                <div> - {trade.end_date} </div>
                              )}
                            </div>
                            <div>
                              {trade.status === "closed" ? "Closed" : "Open"}
                            </div>
                          </div>
                        </CardBody>
                        {/* <CardFooter>
                          <div className="flex flex-row justify-between w-full">
                            <div className="flex flex-row content-center">
                              {trade.start_date}
                              {trade.end_date && (
                                <div> - {trade.end_date} </div>
                              )}
                            </div>
                            <div>
                              {trade.status === "closed" ? "Closed" : "Open"}
                            </div>
                          </div>
                        </CardFooter> */}
                      </Card>
                    </div>
                  ))}
                </div>
              )}
              {items.length && tradesExhibitionMode === "table" && (
                <TradesTable
                  page={page}
                  rowsPerPage={itensPerPage}
                  trades={mockTrades}
                />
              )}
            </div>
            <div className="row-span-1 flex flex-row-reverse overflow-hidden py-2">
              {/* If table or cards we will need a pagination */}
              {["table", "cards"].indexOf(tradesExhibitionMode) > -1 && (
                <Pagination
                  isCompact
                  showControls
                  color="default"
                  initialPage={1}
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
