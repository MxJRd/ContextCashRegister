import { DenominationCollection } from "../../types"

export interface DenominationsControlGroupProps {
  isAdd: boolean
  bill: number
  isSubmitted: boolean
  setBillsToAddOrRemove: (prevList: (bills: DenominationCollection) => DenominationCollection) => void
}