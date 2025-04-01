import { useState } from "react";
import { useDisclosure } from "@heroui/modal";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@heroui/drawer";
import { CheckboxGroup, Checkbox } from "@heroui/checkbox";
import { DatePicker } from "@heroui/date-picker";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import {
  parseAbsoluteToLocal,
  today,
  getLocalTimeZone,
} from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";

interface ITrade {
  direction: string;
  operation_result: string;
  market_type: string;
  start_date: string;
  end_date: string | null;
  entry_price: string;
  quantity: string;
  exit_price: string;
  take_profit: string;
  stop_loss: string;
}

export const AddTrade = () => {
  // console.log(today("GMT-0").toDate("GMT-0").toISOString());
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  let [newTrade, setNewTrade] = useState<ITrade>({
    direction: "long",
    operation_result: "",
    market_type: "futures",
    start_date: today(getLocalTimeZone())
      .toDate(getLocalTimeZone())
      .toISOString(),
    end_date: null,
    entry_price: "",
    quantity: "",
    exit_price: "",
    take_profit: "",
    stop_loss: "",
  });

  // useEffect(() => {
  //   console.log(newTrade)
  //   // console.log(startDate?.toAbsoluteString());
  //   // if (startDate) {
  //   //   console.log(parseZonedDateTime(startDate.toString()));
  //   // }
  // }, [newTrade]);

  const isOperationClosed = () => {
    return ["gain", "loss"].indexOf(newTrade.operation_result) > -1;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(newTrade)
    // setSubmitted(data);
  };

  const onReset = () => {
    setNewTrade({
      direction: "long",
      operation_result: "",
      market_type: "futures",
      start_date: today(getLocalTimeZone())
        .toDate(getLocalTimeZone())
        .toISOString(),
      end_date: null,
      entry_price: "",
      quantity: "",
      exit_price: "",
      take_profit: "",
      stop_loss: "",
    });
  };

  return (
    <>
      <Button
        aria-label="Add Trade"
        color="primary"
        size="sm"
        variant="flat"
        onPress={onOpen}
      >
        Add Trade
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        size="3xl"
        onOpenChange={onOpenChange}
      >
        <DrawerContent>
          {(onClose) => (
            <Form className="w-full" onReset={onReset} onSubmit={onSubmit}>
              <div className="container max-w-7x1 self-center">
                <DrawerHeader className="flex flex-col gap-1">
                  <div className="flex flex-row gap-x-4 items-center">
                    Trade
                    <CheckboxGroup
                      isRequired
                      // label="Market"
                      orientation="horizontal"
                      size="sm"
                      value={[newTrade?.market_type]}
                      onValueChange={(value) => {
                        setNewTrade((prevTrade) => ({
                          ...prevTrade,
                          market_type: value.slice(-1)[0],
                          direction:
                            value.slice(-1)[0] === "futures"
                              ? prevTrade.direction
                              : "long",
                        }));
                      }}
                    >
                      <Checkbox value="futures">Futures</Checkbox>
                      <Checkbox value="spot">Spot</Checkbox>
                    </CheckboxGroup>
                  </div>
                </DrawerHeader>
                <DrawerBody className="lg:grid lg:grid-cols-3">
                  {/* Dates */}
                  <div className="col-span-1 flex flex-col gap-y-4">
                    <I18nProvider locale="pt-BR-u-ca-gregory">
                      <DatePicker
                        hideTimeZone
                        isRequired
                        showMonthAndYearPickers
                        // defaultValue={parseAbsoluteToLocal("2025-03-25T07:45:00Z")}
                        granularity="second"
                        hourCycle={24}
                        label="Start Trade"
                        labelPlacement="outside"
                        value={parseAbsoluteToLocal(newTrade.start_date)}
                        variant="bordered"
                        onChange={(value) => {
                          setNewTrade((prevTrade) => ({
                            ...prevTrade,
                            start_date: value
                              ? value.toAbsoluteString()
                              : prevTrade.start_date,
                          }));
                        }}
                      />
                      <DatePicker
                        hideTimeZone
                        showMonthAndYearPickers
                        // defaultValue={parseAbsoluteToLocal("2025-03-25T07:45:00Z")}
                        granularity="second"
                        hourCycle={24}
                        isRequired={isOperationClosed()}
                        label="End Trade"
                        labelPlacement="outside"
                        value={
                          newTrade.end_date != null
                            ? parseAbsoluteToLocal(newTrade.end_date)
                            : newTrade.end_date
                        }
                        variant="bordered"
                        onChange={(value) => {
                          setNewTrade((prevTrade) => ({
                            ...prevTrade,
                            end_date: value
                              ? value.toAbsoluteString()
                              : prevTrade.end_date,
                          }));
                        }}
                      />
                    </I18nProvider>
                  </div>
                  {/* Basic Info */}
                  <div className="col-span-1 flex flex-col justify-center items-center gap-y-4">
                    <div className="w-10/12 flex flex-col gap-y-4">
                      <div className="flex flex-row gap-x-4">
                        <Select
                          isRequired
                          label="Strategy"
                          labelPlacement="outside"
                          placeholder="Your best strategy"
                        >
                          <SelectItem>Scalping</SelectItem>
                          <SelectItem>Trend Following</SelectItem>
                          <SelectItem>Buy n Hold</SelectItem>
                        </Select>
                        <Select
                          isRequired
                          label="Exchange"
                          labelPlacement="outside"
                          placeholder="Binance"
                        >
                          <SelectItem>Binance</SelectItem>
                          <SelectItem>Bybit</SelectItem>
                          <SelectItem>Mexc</SelectItem>
                        </Select>
                      </div>
                      <Input
                        isRequired
                        className="w-full"
                        label="Asset"
                        labelPlacement="outside"
                        placeholder="BTC/USDT"
                      />
                    </div>
                    <div className="flex flex-row w-full justify-around">
                      {/* <CheckboxGroup
                        isRequired
                        label="Market"
                        orientation="horizontal"
                        size="sm"
                        value={[newTrade?.market_type]}
                        onValueChange={(value) => {
                          setNewTrade((prevTrade) => ({
                            ...prevTrade,
                            market_type: value.slice(-1)[0],
                            direction:
                              value.slice(-1)[0] === "futures"
                                ? prevTrade.direction
                                : "long",
                          }));
                        }}
                      >
                        <Checkbox value="futures">Futures</Checkbox>
                        <Checkbox value="spot">Spot</Checkbox>
                      </CheckboxGroup> */}
                      <CheckboxGroup
                        isRequired
                        errorMessage="The direction must be informed"
                        isInvalid={!newTrade?.direction}
                        label="Trade direction"
                        orientation="horizontal"
                        size="sm"
                        value={[newTrade?.direction]}
                        onValueChange={(value) => {
                          setNewTrade((prevTrade) => ({
                            ...prevTrade,
                            direction: value.slice(-1)[0],
                          }));
                        }}
                      >
                        <Checkbox
                          isDisabled={newTrade?.market_type === "spot"}
                          value="long"
                        >
                          Long
                        </Checkbox>
                        <Checkbox
                          isDisabled={newTrade?.market_type === "spot"}
                          value="short"
                        >
                          Short
                        </Checkbox>
                      </CheckboxGroup>
                      <CheckboxGroup
                        label="Operation Result"
                        orientation="horizontal"
                        size="sm"
                        value={[newTrade?.operation_result]}
                        onValueChange={(value) => {
                          setNewTrade((prevTrade) => ({
                            ...prevTrade,
                            operation_result: value.slice(-1)[0],
                          }));
                        }}
                      >
                        <Checkbox value="gain">Gain</Checkbox>
                        <Checkbox value="loss">Loss</Checkbox>
                      </CheckboxGroup>
                    </div>
                  </div>
                  {/* Trade info */}
                  <div className="col-span-1 flex flex-col gap-y-4">
                    <div className="flex flex-row gap-x-4">
                      <Input
                        // errorMessage="Not allowed to open position, change stop loss or risk ammount"
                        // isInvalid={onIsMaxQtyValid()}
                        isRequired
                        label="Entry Price"
                        labelPlacement="outside"
                        placeholder="0"
                        type="number"
                        value={newTrade.entry_price}
                        onValueChange={(value) => {
                          setNewTrade((prevTrade) => ({
                            ...prevTrade,
                            entry_price: value,
                          }));
                        }}
                      />
                      {/* {isOperationClosed() && (
                        <Input
                          isRequired={isOperationClosed()}
                          label="Exit Price"
                          labelPlacement="outside"
                          placeholder="0"
                          type="number"
                          value={newTrade.exit_price}
                          onValueChange={(value) => {
                            setNewTrade((prevTrade) => ({
                              ...prevTrade,
                              exit_price: value,
                            }));
                          }}
                        />
                      )} */}
                      <Input
                        // errorMessage="Not allowed to open position, change stop loss or risk ammount"
                        // isInvalid={onIsMaxQtyValid()}
                        isRequired
                        label="Quantity"
                        labelPlacement="outside"
                        placeholder="0"
                        type="number"
                        value={newTrade.quantity}
                        onValueChange={(value) => {
                          setNewTrade((prevTrade) => ({
                            ...prevTrade,
                            quantity: value,
                          }));
                        }}
                      />
                    </div>
                    <div className="flex flex-row gap-x-4">
                      <Input
                        // errorMessage="Not allowed to open position, change stop loss or risk ammount"
                        // isInvalid={onIsMaxQtyValid()}
                        isRequired={newTrade.operation_result === "gain"}
                        label="Take Profit"
                        labelPlacement="outside"
                        placeholder="0"
                        type="number"
                        value={newTrade.take_profit}
                        onValueChange={(value) => {
                          setNewTrade((prevTrade) => ({
                            ...prevTrade,
                            take_profit: value,
                          }));
                        }}
                      />
                      <Input
                        // errorMessage="Not allowed to open position, change stop loss or risk ammount"
                        // isInvalid={onIsMaxQtyValid()}
                        isRequired={newTrade.operation_result === "loss"}
                        label="Stop Loss"
                        labelPlacement="outside"
                        placeholder="0"
                        type="number"
                        value={newTrade.stop_loss}
                        onValueChange={(value) => {
                          setNewTrade((prevTrade) => ({
                            ...prevTrade,
                            stop_loss: value,
                          }));
                        }}
                      />
                    </div>
                    {/* <div className="flex flex-row gap-x-4">Test 3</div> */}
                  </div>
                </DrawerBody>
                <DrawerFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={() => {
                      onReset();
                      onClose();
                    }}
                  >
                    Close
                  </Button>
                  <Button color="primary" type="submit">
                    Add Trade
                  </Button>
                </DrawerFooter>
              </div>
            </Form>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
