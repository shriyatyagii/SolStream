import React, { FC } from "react";
import { TransactionWithSignature } from "../helpers/transactions";
import "./TransactionView.css";
import {arr, receiverUpdatedBalance} from "../helpers/wallet";
import {amountToExport} from "./Sender";


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
const TransactionItemView: FC<TransactionItemViewProps> = ({ transaction }) => { 
  
  const getTransactionItems = () => {
    const signature = transaction.signature?.toString();
    const meta = transaction.confirmedTransaction.meta;
    const trans = transaction.confirmedTransaction.transaction;
    
    let amount = 0;
    let sum;


    if (meta) {
      amount = meta.preBalances[0] - meta.postBalances[0];
      sum = (receiverUpdatedBalance - arr[0] )/1000000000;
     
      amount = amount/1000000000;
      


    }
    return (
      <>
      <div className="tx-main">
        <div className="to-streamed">
            <div className="to">
              <li key={signature + "receiver"}>
                <label>To:</label>&nbsp;
               <span className="span"> {trans.instructions[0].keys[1].pubkey.toBase58()}</span>
              </li>
            </div>
            <div className="streamed">
            <li key={signature + "sum"}>
              <label>Streamed:</label>&nbsp;
              <span className="span">{sum}</span>
            </li>
            </div>
            </div>
            <div className="amt-main">
              <div className="amt-sub"></div>
            <div className="amt-per-interval">
              <li key={signature + "amount"}>
                <label>Amount per interval:</label>&nbsp;
                <span className="span"> {amount}  </span>
              </li>
            </div>
            </div>
          <div className="loading-bar">
          <meter className="meter" value={sum} min="0" max={amountToExport/1000000000}></meter>
          </div>
          <div>
          <label className="initial" >0</label>
          <label className="total">{amountToExport/1000000000} Sol</label>
          </div>
          </div>
          </>
    );
  };

  return (
    <div className="trans-item">
      <ul className="trans-meta">{getTransactionItems()}</ul>
    </div>
  );
};
export default TransactionsView;