
import React, { useEffect, useState } from 'react';
import TabTariffs from './tariffs/TabTariffs'

function PlansPanel() {
  const [tariffs, setTariffs] = useState(true)
  const [annual, setAnnual] = useState(true);
  useEffect(() => {
    fetch("https://billing-dev.vkurse.ru/api/v1/tariff", {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setTariffs(json.data)
        })
        .catch(error => {
          console.log(error, 'что то пошло не так')
        });
  }, []);
  return (
    <div className="grow">
      <div className="p-6 space-y-6">
        <section>
          <div>
            {tariffs && <TabTariffs response={tariffs} />}
          </div>
        </section>

      </div>
    </div>
  );
}

export default PlansPanel;