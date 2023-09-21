import { useEffect, useState } from "react"
import { DenominationCollection } from "../../../types"
import { useCashRegisterContext } from "../contexts/CashRegisterProvider"

const calculateDrawerTotal = (denominations: DenominationCollection) => {
  return Object.entries(denominations).reduce((acc, denominationPair) => { // denominationPair -> [ bill, amount ]
    const [bill, amount] = denominationPair
    return acc += Number(bill) * amount
  }, 0)
}

const useDrawerTotal = () => {
  const [drawerTotal, setDrawerTotal] = useState(0)
  const { denominations } = useCashRegisterContext()

  useEffect(() => {
    setDrawerTotal(calculateDrawerTotal(denominations))
  }, [denominations])

  return { drawerTotal }
}

export default useDrawerTotal
