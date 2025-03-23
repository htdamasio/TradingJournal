import React, { useState, useMemo } from "react";
import { Input } from "@heroui/input";
import { Slider, SliderValue } from "@heroui/slider";

export const PositionSizeCalculator = () => {
  const [leverage, setLeverage] = React.useState<SliderValue>(25);
  const [risk, setRisk] = useState<string>("0");
  const [entryPrice, setEntryPrice] = useState<string>("0");
  const [stopLoss, setStopLoss] = useState<string>("0");
  const [entryQty, setEntryQty] = useState<string>("0");

  const stopLossPercentage = useMemo(() => {
    if (entryPrice != "" && stopLoss != "") {
      const nEntryPrice = parseFloat(entryPrice);
      const nStopLoss = parseFloat(stopLoss);

      var nStopLossPercentage = 0;

      // Long
      if (nEntryPrice > nStopLoss) {
        if (nEntryPrice === 0) return "";
        nStopLossPercentage = (1 - nStopLoss / nEntryPrice) * 100;
        // Short
      } else {
        if (nStopLoss === 0) return "";
        nStopLossPercentage = (1 - nEntryPrice / nStopLoss) * 100;
      }

      return nStopLossPercentage.toFixed(2).toString();
    } else {
      return "";
    }
  }, [entryPrice, stopLoss]);

  const maxQty = useMemo(() => {
    const nStopLossPercentage = parseFloat(stopLossPercentage) / 100;
    const nEntryPrice = parseFloat(entryPrice);
    var nRisk = 0;

    if (risk != "") {
      nRisk = parseFloat(risk);
    }

    if (nRisk > 0 && nStopLossPercentage > 0) {
      if (nStopLossPercentage === 0) return "";
      const nMaxValue = nRisk / nStopLossPercentage;

      if (nEntryPrice === 0) return "";

      const nMaxQty = Math.floor(nMaxValue / nEntryPrice);

      return nMaxQty.toString();
    } else {
      return "";
    }
  }, [stopLossPercentage, risk]);

  const requestedMargin = useMemo(() => {
    var nMaxQty = 0;
    var nEntryQty = 0;
    const nEntryPrice = parseFloat(entryPrice);

    if (maxQty != "") {
      nMaxQty = parseFloat(maxQty);
    }

    if (entryQty != "") {
      nEntryQty = parseFloat(entryQty);
    }

    if (typeof leverage === "number" && (nMaxQty > 0 || nEntryQty > 0)) {
      var nQty = 0;

      if (nMaxQty === 0) nQty = nEntryQty;
      if (nEntryQty === 0) nQty = nMaxQty;
      else nQty = Math.min(nMaxQty, nEntryQty);

      if (Number(leverage) === 0) return "";

      return ((nQty * nEntryPrice) / Number(leverage)).toFixed(8).toString();
    } else {
      return "";
    }
  }, [maxQty, entryQty, leverage]);

  const liquidationPrice = useMemo(() => {
    const nLiquidationPoint = 100 / Number(leverage) / 100;
    const nEntryPrice = parseFloat(entryPrice);
    const nStopLoss = parseFloat(stopLoss);

    var nLiquidationPrice = 0;

    // Short
    if (nStopLoss > nEntryPrice) {
      nLiquidationPrice = nEntryPrice + nEntryPrice * nLiquidationPoint;
      // Long
    } else {
      nLiquidationPrice = nEntryPrice - nEntryPrice * nLiquidationPoint;
    }

    return nLiquidationPrice.toFixed(8).toString();
  }, [requestedMargin]);

  function onIsLiquidationValid() {
    const nStopLoss = parseFloat(stopLoss);
    const nEntryPrice = parseFloat(entryPrice);

    if (nStopLoss > 0 && nEntryPrice > 0) {
      const nValue = parseFloat(liquidationPrice);

      // Long
      if (nStopLoss < nEntryPrice) {
        if (nValue > nStopLoss) return true;
        // Short
      } else {
        if (nValue < nStopLoss) return true;
      }
    }

    return false;
  }

  function onIsMaxQtyValid() {
    const nStopLoss = parseFloat(stopLoss);
    const nEntryPrice = parseFloat(entryPrice);
    const nRiskAmmount = parseFloat(risk);

    if (nStopLoss > 0 && nEntryPrice > 0 && nRiskAmmount > 0) {
      return parseInt(maxQty) === 0;
    } else return false;
  }

  return (
    <div className="self-center">
      <div className="w-full h-full flex flex-col gap-y-4">
        <div className="flex row content-center justify-center">
          <h1 className="font-bold text-xl">Position Size Calculator</h1>
        </div>
        <div className="flex flex-row gap-x-4">
          <Input
            label="Entry Price"
            labelPlacement="outside"
            placeholder="100.00"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            type="number"
            value={entryPrice}
            onValueChange={setEntryPrice}
          />
          <Input
            label="Stop Loss"
            labelPlacement="outside"
            placeholder="0.00"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            type="number"
            value={stopLoss}
            onValueChange={setStopLoss}
          />
          <Input
            label="Risk Ammount"
            labelPlacement="outside"
            placeholder="0.00"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            type="number"
            value={risk}
            onValueChange={setRisk}
          />
        </div>
        <div className="flex flex-row gap-x-4">
          <Input
            isDisabled
            endContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">%</span>
              </div>
            }
            label="Stop Loss %"
            labelPlacement="outside"
            placeholder="0"
            value={stopLossPercentage}
          />
          <Input
            isDisabled
            errorMessage="Not allowed to open position, change stop loss or risk ammount"
            isInvalid={onIsMaxQtyValid()}
            label="Max Qty"
            labelPlacement="outside"
            placeholder="0"
            type="number"
            value={maxQty}
          />
          <Input
            label="Entry Qty"
            labelPlacement="outside"
            placeholder="0"
            type="number"
            value={entryQty}
            onValueChange={setEntryQty}
          />
        </div>
        <div className="flex flex-row gap-x-4">
          <Input
            isDisabled
            label="Requested Margin"
            labelPlacement="outside"
            placeholder="0.00"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            type="number"
            value={requestedMargin}
          />
          <Input
            isDisabled
            errorMessage="Liquidation price is before stop loss, lower Leverage"
            isInvalid={onIsLiquidationValid()}
            label="Liquidation Price"
            labelPlacement="outside"
            placeholder="0.00"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">$</span>
              </div>
            }
            type="number"
            value={liquidationPrice}
          />
        </div>
        <div className="flex flex-row justify-center">
          <Slider
            className="max-w-md"
            defaultValue={25}
            label="Leverage"
            marks={[
              {
                value: 25,
                label: "25",
              },
              {
                value: 50,
                label: "50",
              },
              {
                value: 75,
                label: "75",
              },
              {
                value: 100,
                label: "100",
              },
            ]}
            maxValue={125}
            minValue={1}
            showTooltip={true}
            value={leverage}
            onChange={setLeverage}
          />
        </div>
      </div>
    </div>
  );
};
