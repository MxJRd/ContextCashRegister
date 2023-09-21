import { useState } from "react"
import DenominationsControlGroup from "../common/DenominationsControlGroup"
import { useCashRegisterContext } from "./contexts/CashRegisterProvider"
import { DenominationCollection } from "../../types"

const makeBillsAddOrRemove = ({ isAdd, billsToAddOrRemove }: { isAdd: boolean, billsToAddOrRemove: DenominationCollection }) => {
  // a function to calculate whether or not to add/remove bills
  if (isAdd) return billsToAddOrRemove

  // We want to loop through the billsToAddOrRemove
  // if we're removing, multiply each value by -1 so we can remove them.

  return Object.entries(billsToAddOrRemove).reduce((acc, currVal) => {
    const bill = currVal[0]
    const count = currVal[1]
    acc[bill] = count * -1
    return acc
  }, {} as DenominationCollection)
}

const CashRegisterControls = () => {
  const { denominations, handleEditDenominations } = useCashRegisterContext()
  const [isAdd, setIsAdd] = useState(false) // Controls the state to either add or remove multiple bills.
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [billsToAddOrRemove, setBillsToAddOrRemove] = useState<DenominationCollection>(Object.keys(denominations).reduce((acc, currentBill) => {
    acc[currentBill] = 0
    return acc
  }, {} as DenominationCollection)) // this is a localized bill collection. We want our context to consume the values here to add/remove bills based on isAdd.

  return (
    <div className='cash-register-controls'>
      {
        Object.keys(denominations).map(denomination => {
          return (
            <DenominationsControlGroup
              key={JSON.stringify(denomination)}
              isAdd={isAdd}
              setBillsToAddOrRemove={setBillsToAddOrRemove}
              isSubmitted={isSubmitted}
              bill={Number(denomination)}
            />
          )
        })
      }
      <div className='cash-register-controls__form'>
        <button
          onClick={() => {
            handleEditDenominations(makeBillsAddOrRemove({ isAdd, billsToAddOrRemove }))
            setIsSubmitted((prev) => !prev)
          }
          }
        >
          Commit Bill Amounts
        </button>
        to
        <button
          className={`cash-register-controls--${isAdd ? 'add' : 'remove'}`}
          onClick={() => setIsAdd((isAdd) => !isAdd)}
        >
          {isAdd ? 'Add' : 'Remove'}
        </button>
      </div>
    </div>
  )
}

export default CashRegisterControls