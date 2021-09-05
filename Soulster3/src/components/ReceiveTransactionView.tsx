import React, { FC } from "react";
import { TransactionWithSignature } from "../helpers/transactions";
import "./TransactionView.css";




interface TransactionsViewProps {
  transactions?: Array<TransactionWithSignature>;
  
  
  
}

const ReceiverTransactionsView: FC<TransactionsViewProps>= ({ transactions }) => {
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
    
    
    
    let balance1 = 0;
    if (meta) {
      //amount = meta.preBalances[0] - meta.postBalances[0];
      //sum = (receiverUpdatedBalance - arr[0] )/1000000000;
     
      //amount = amount/1000000000;
      balance1 = meta?.postBalances[0]/1000000000;


    }
    return (
      <>
      <div className="rc-main">
        <div className="my-streamed">
            <div className="my">
              <li key={signature + "sender"}>
                <label>MyAccount:</label>&nbsp;
               <span className="span1"> {trans.instructions[0].keys[0].pubkey.toBase58()}</span>
              </li>
            </div>
                <div className="streamed1">
                  <li key={signature + "amount"}>
                    <label>Balance:</label>&nbsp;
                  <span className="span1">{balance1}</span>
                </li>
                </div>
                
        </div>
                
                <div className="bigempty"> 
                  <div className="empty1"></div>
                  <div className="empty2"></div>
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

export default ReceiverTransactionsView;
