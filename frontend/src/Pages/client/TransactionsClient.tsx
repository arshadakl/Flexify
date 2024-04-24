import TransactionTable from "../../clients/components/TransactionTable"
import NavBar from "../../common/components/Navbar/NavBar"

function TransactionsClient() {
  return (
    <>
      <NavBar bg="white" fixed="none" />
      <TransactionTable/>
    </>
  )
}

export default TransactionsClient