import { ChangeEvent, useState } from "react"
import { useCashRegisterContext } from "./contexts/CashRegisterProvider"

const CashRegisterTransactionField = () => {
  const [transactionValue, setTransactionValue] = useState('')
  const { handleTransactionAmount, errorMessage, isSuccess } = useCashRegisterContext()

  const handleTransactionValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTransactionValue(e.target.value)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        handleTransactionAmount(Number(transactionValue))
        setTransactionValue('')
      }}
      className='cash-register__transaction-field'
    >
      <h2>Incoming Transaction: </h2>
      <input type='number' placeholder='Amount...' min='1' max='999' value={transactionValue} onChange={handleTransactionValueChange} />
      <button type='submit'>Submit</button>
      {errorMessage && <h2 className='error-message'>{errorMessage}</h2>}
      {isSuccess && <h2 className='success'>Success!</h2>}
    </form>
  )
}

export default CashRegisterTransactionField