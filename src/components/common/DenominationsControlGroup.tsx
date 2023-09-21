import { ChangeEvent, useEffect, useState } from "react"
import { useCashRegisterContext } from "../CashRegister/contexts/CashRegisterProvider"
import { DenominationsControlGroupProps } from "./types"
import './denominations-control-group.css'

const DenominationsControlGroup = ({ isAdd, bill, setBillsToAddOrRemove, isSubmitted }:  DenominationsControlGroupProps) => {
  const { denominations, handleEditDenomination } = useCashRegisterContext()
  const [billAmountInput, setBillAmountInput] = useState(0)

  const typedInputGreaterThanMax = (billAmountInput > denominations[bill])
  const removeBills = !isAdd && typedInputGreaterThanMax

  const handleBillAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setBillAmountInput(Number(e.target.value))
  }

  useEffect(() => {
    // Parent state setting setting bills with the amounts to add or remove.
    setBillsToAddOrRemove((prevBills) => ({ ...prevBills, [bill]: billAmountInput }))
  
    // this will correct any cases where the amount of bills to -remove- is more than what we have in our store.
    if(removeBills) setBillAmountInput(denominations[bill])
  }, [billAmountInput, isAdd])

  useEffect(() => {
    // reset input state when bill amounts are submitted.
    setBillAmountInput(0)
  }, [isSubmitted])

  return (
    <div className='denominations-control-group'>
      <div className='denominations-control-group__controls'>
        <button onClick={() => handleEditDenomination(bill, 1)}>+</button>
        <h2>${bill}</h2>
        <button onClick={() => handleEditDenomination(bill, -1)}>-</button>
      </div>
      <h2>Count: {denominations[bill]}</h2>
      <input type='number' value={billAmountInput} min={0} max={denominations[bill]} onChange={handleBillAmountChange} />
    </div>
  )
}

export default DenominationsControlGroup