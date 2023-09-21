import CashRegisterProvider from "./contexts/CashRegisterProvider"
import CashRegisterControls from "./CashRegisterControls"
import CashRegisterDisplay from "./CashRegisterDisplay"
import CashRegisterTransactionField from "./CashRegisterTransactionField"
import './cash-register.css'

const CashRegister = () => {

  return (
    <CashRegisterProvider bills={[1, 2, 5, 10, 20, 50, 100]} initialAmount={5}>
      <div className='cash-register'>
        <CashRegisterDisplay />
        <CashRegisterTransactionField />
        <CashRegisterControls />
      </div>
    </CashRegisterProvider>
  )
}

export default CashRegister
