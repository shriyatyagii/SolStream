import React, { FC } from "react";
import { TransactionWithSignature } from "../helpers/transactions";
import "./TransactionView.css";
import {arr, receiverUpdatedBalance} from "../helpers/wallet";


interface TransactionsViewProps {
  transactions?: Array<TransactionWithSignature>;
  
  
  
}

const TransactionsView: FC<TransactionsViewProps>= ({ transactions }) => {
  const getTransactions = () => {
    if (typeof transactions === 'object') {
      var transactions1 = transactions.reverse();
      
      return  <TransactionItemView key={transactions1[0].signature} transaction={transactions1[0]}  />;
      
    }

  };

return <div>{getTransactions()}</div>;
};




interface TransactionItemViewProps {
  transaction: TransactionWithSignature;

}

const TransactionItemView: FC<TransactionItemViewProps> = ({ transaction  }) => { 
  
  const getTransactionItems = () => {
    const signature = transaction.signature?.toString();
    const meta = transaction.confirmedTransaction.meta;
    const trans = transaction.confirmedTransaction.transaction;
    
    let amount = 0;
    let sum;


    if (meta) {
      amount = meta.preBalances[0] - meta.postBalances[0];
      sum = (receiverUpdatedBalance - arr[0] )/1000000000;
     
      //amount = amount/1000000000;
      


    }
    return (
      <>
      <div className="tx-main">
          <div className="to-amt">
            <div className="to">
              <li key={signature + "receiver"}>
                <label>To:</label>&nbsp;
                {trans.instructions[0].keys[1].pubkey.toBase58()}
              </li>
            </div>
            <div className="amt">
              <li key={signature + "amount"}>
                <label>Amount per interval:</label>&nbsp;
                {amount}
              </li>
            </div>
          </div>
          <div className="streamed">
            <li key={signature + "sum"}>
              <label>Streamed:</label>&nbsp;
              {sum}
            </li>
          </div>
          <div>
          <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
        <div className="w3-light-grey">
          <div id="myBar" className="w3-container w3-green w3-center" /> </div>
          </div>
        </div></>
    );
  };

  return (
    <div className="trans-item">
      <ul className="trans-meta">{getTransactionItems()}</ul>
    </div>
  );
};

export default TransactionsView;