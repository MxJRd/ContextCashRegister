import { useCashRegisterContext } from "./contexts/CashRegisterProvider"
import useDrawerTotal from "./hooks/useDrawerTotal"

interface BillAndAmountDisplayProps {
  denomination: [string, number]
}
const BillAndAmountDisplay = ({ denomination }: BillAndAmountDisplayProps) => {
  const bill = denomination[0]
  const amount = denomination[1]

  return (
    <p className={`${amount <= 0 ? 'error-message' : ''}`}>
      [${bill}: {amount}]
    </p>
  )
}

const CashRegisterDisplay = () => {
  const { drawerTotal } = useDrawerTotal()
  const { denominations, billsUsedToMakeChange } = useCashRegisterContext()

  return (
    <div className='cash-register-display'>
      <h2>Drawer Total: <span className={`${drawerTotal > 0 ? 'success' : 'error-message'}`}>${drawerTotal}</span></h2>
      <div>
        <p>Bills and amounts: </p>
        <div className='bill-amount-display'>
          {
            Object.entries(denominations).map(denomination => <BillAndAmountDisplay key={JSON.stringify(denomination)} denomination={denomination}/>)
          }
        </div>
        <div className='bill-amount-display error-message'>
          Bills removed:
          {
            Object.entries(billsUsedToMakeChange).map(denomination => <BillAndAmountDisplay key={JSON.stringify(denomination)} denomination={denomination}/>)
          }
        </div>
      </div>
    </div>
  )
}

export default CashRegisterDisplay