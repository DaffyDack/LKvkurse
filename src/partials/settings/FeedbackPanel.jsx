import React, { useState, useEffect } from 'react';
import InvoicesTable from '../../partials/invoices/InvoicesTable';

function FeedbackPanel() {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  
  return (
    <div className="grow">

      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl text-slate-800 dark:text-slate-100 font-bold mb-4">Оплата тарифов</h2>
          <div className="text-sm">Тарифы ожидающие оплату</div>
        </div>
        <section>
          <InvoicesTable selectedItems={handleSelectedItems}/>
         
        </section>
      </div>


    </div >
  );
}

export default FeedbackPanel;