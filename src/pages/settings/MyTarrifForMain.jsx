import React, { useState } from 'react';

import InvoicesTable from '../../partials/invoices/myTariffs';

function MyTariffs() {

  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  };

  return (

                <InvoicesTable selectedItems={handleSelectedItems} />

  );
}

export default MyTariffs;