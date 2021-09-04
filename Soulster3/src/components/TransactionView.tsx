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
          
          return  <TransactionItemView key={transactions.slice(-1)[0].signature} transaction={transactions.slice(-1)[0]}  />;
        }
        
        
        // transactions?[transactions?.length-1].key={} transaction={}
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
        <li key={signature + "signature"}>
          <label>Tx:</label> &nbsp;
          {signature}
        </li>
        <li key={signature + "fee"}>
          <label>Fee:</label>&nbsp;
          {meta?.fee}
        </li>

        
        <li key={signature + "amount"}>
          <label>Sent Amount(Stream + Performance):</label>&nbsp;
          {amount}
        </li>
        <li key={signature + "sum"}>
          <label>Sum (in Sol):</label>&nbsp;
          {sum}
        </li>

        <li key={signature + "sender"}>
          <label>Sender:</label>&nbsp;
          {trans.instructions[0].keys[0].pubkey.toBase58()}
        </li>
        <li key={signature + "sender-balance"}>
          <label>Sender Balance:</label>&nbsp;
          {meta?.postBalances[0]}
        </li>
        <li key={signature + "receiver"}>
          <label>Receiver:</label>&nbsp;
          {trans.instructions[0].keys[1].pubkey.toBase58()}
        </li>
        <li key={signature + "receiver-balance"}>
          <label>Receiver Balance:</label>&nbsp;
          {meta?.postBalances[1]}
        </li>
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
