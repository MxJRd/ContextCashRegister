import { ReactElement, createContext, useContext, useReducer } from "react"
import { DenominationCollection } from "../../../types"
import { ActionEnum, CashRegisterContextType, ReducerActionType, StateType, DoTransactionType } from "./types"

const doTransaction = ({ bills, transactionAmount }: DoTransactionType): StateType => {

  try {
    if (transactionAmount <= 0) throw new Error('You need to provide an amount.')
    const billListAfterAdjust = { ...bills }
    const billsUsedToMakeChange: DenominationCollection = {}

    const sortedBillList = Object.entries(bills)
      .sort((a, b) => Number(a[0]) + Number(b[0])) // set the order of largest bill -> smallest bill

    let currentAmount = transactionAmount

    for (let [bill,] of sortedBillList) {
      const currBill = Number(bill)
      while (currentAmount >= currBill && billListAfterAdjust[bill] > 0) {
        billListAfterAdjust[bill] -= 1
        billsUsedToMakeChange[bill] ||= 0
        billsUsedToMakeChange[bill] += 1
        currentAmount -= currBill
      }
    }

    if (currentAmount !== 0) throw new Error('This transaction cannot be completed.')

    return { denominations: billListAfterAdjust, billsUsedToMakeChange, isSuccess: true, errorMessage: undefined }
  } catch (err) {
    const error = err instanceof Error ? err.message : 'An unknown error has occurred.'
    return { denominations: bills, billsUsedToMakeChange: {}, isSuccess: false, errorMessage: error }
  }
}

const cashRegisterReducer = (state: StateType, action: ReducerActionType): StateType => {
  const { denominations } = state

  switch (action.type) {
    case ActionEnum.EDIT_DENOMINATION:
      const { bill, count } = action.payload
      return {
        ...state,
        denominations: { ...denominations, [bill]: denominations[bill] + count }
      }

    case ActionEnum.EDIT_DENOMINATIONS:
      const { bills } = action.payload
      const allBillsAfterCountsAdjusted = Object.entries(bills).reduce((acc, currVal) => {
        const billKey = currVal[0]
        const billCountToAdjust = currVal[1]
        acc[billKey] = denominations[billKey] + billCountToAdjust
        return acc
      }, {} as DenominationCollection)

      return {
        ...state,
        denominations: allBillsAfterCountsAdjusted
      }

    case ActionEnum.TRANSACTION:
      const { transactionAmount } = action.payload
      
      return doTransaction({ bills: state.denominations, transactionAmount })

    default: return state
  }
}

export function useCashRegisterContext() {
  const cashRegister = useContext(CashRegisterContext)
  if (cashRegister === null) throw new Error('Context not found.')
  return cashRegister
}

export const CashRegisterContext = createContext<CashRegisterContextType | null>(null);

const CashRegisterProvider = ({ children, bills, initialAmount = 0 }: { children: ReactElement, bills: number[], initialAmount: number }) => {

  const initialState: StateType = {
    denominations: bills.reduce((acc, denomination) => { // initialize our denominations
      acc[denomination as keyof DenominationCollection] = initialAmount
      return acc
    }, {} as DenominationCollection),
    billsUsedToMakeChange: {},
    isSuccess: false,
    errorMessage: ''
  }

  const [state, dispatch] = useReducer(cashRegisterReducer, initialState)

  const handleEditDenomination = (bill: number, count: number) => { // Dispatch: Add/Remove single bill
    dispatch({
      type: ActionEnum.EDIT_DENOMINATION,
      payload: { bill, count }
    })
  }

  const handleEditDenominations = (bills: DenominationCollection) => { // Dispatch: Add/Remove multiple bills
    dispatch({
      type: ActionEnum.EDIT_DENOMINATIONS,
      payload: { bills }
    })
  }

  const handleTransactionAmount = (transactionAmount: number) => { // Dispatch: Conduct transaction by removing bills
    dispatch({
      type: ActionEnum.TRANSACTION,
      payload: { transactionAmount }
    })
  }

  return (
    <CashRegisterContext.Provider value={{ ...state, handleEditDenomination, handleEditDenominations, handleTransactionAmount }} >
      {children}
    </CashRegisterContext.Provider>
  )
}

export default CashRegisterProvider
