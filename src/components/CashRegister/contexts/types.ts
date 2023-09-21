import { DenominationCollection } from "../../../types"

export interface DoTransactionType {
  bills: DenominationCollection, transactionAmount: number
}

export interface StateType {
  denominations: DenominationCollection
  billsUsedToMakeChange: DenominationCollection
  isSuccess: boolean
  errorMessage?: string
}
export interface CashRegisterContextType extends StateType {
  handleEditDenomination: (bill: number, count: number) => void
  handleEditDenominations: (bills: DenominationCollection) => void
  handleTransactionAmount: (transactionAmount: number) => void
}
export enum ActionEnum {
  EDIT_DENOMINATION = 'EDIT_DENOMINATION',
  EDIT_DENOMINATIONS = 'EDIT_DENOMINATIONS',
  TRANSACTION = 'TRANSACTION',
  ERROR_MESSAGE = 'ERROR_MESSAGE',
  SUCCESSFUL_TRANSACTION = 'SUCCESSFUL_TRANSACTION'
}
export type EditDenominationType = {
  payload: { bill: number, count: number }
  type: ActionEnum.EDIT_DENOMINATION
}
export type EditDenominationsType = {
  payload: { bills: DenominationCollection }
  type: ActionEnum.EDIT_DENOMINATIONS
}
export type ErrorMessageType = {
  payload: { bills: DenominationCollection }
  type: ActionEnum.ERROR_MESSAGE
}
export type SuccessfulTransactionType = {
  payload: { successfulTransaction: boolean }
  type: ActionEnum.SUCCESSFUL_TRANSACTION
}
export type TransactionType = {
  payload: { transactionAmount: number }
  type: ActionEnum.TRANSACTION
}
export type ReducerActionType =
  | EditDenominationType | EditDenominationsType | ErrorMessageType | SuccessfulTransactionType | TransactionType