import React, { useState, useEffect } from 'react';
import Invoices from './tariffTableItem';
import './style.scss'

import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";

function InvoicesTable({
  selectedItems
}) {

  const [invoices, setInvoices] = useState([])
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    initTE({ Modal, Ripple });
    setList(invoices);
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [invoices]);

  useEffect(() => {
    getCart()
  }, []);

  const getCart = () => {
    let token = localStorage.getItem('Auth')
    fetch(`https://billing-dev.vkurse.ru/api/v1/my-tariff`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        setInvoices(json.data)
      }).catch(error => {
        console.log('что то пошло не так')
      });
  }

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
      <header className="px-5 py-4">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Тарифы
          {/* <span className="text-slate-400 dark:text-slate-500 font-medium ml-2">{Invoices.length}</span> */}
        </h2>
      </header>
      <div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/20 border-t border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">id</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">тариф</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">tariff_id</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">начало действия</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">окончание действия</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
              {
                list.map(invoice => {
                  return (
                    <Invoices
                      key={invoice.data_start}
                      id={invoice.id}
                      name={invoice.name}
                      data_start={invoice.data_start}
                      data_end={invoice.data_end}
                      tariff_id={invoice.tariff_id}
                    />
                  )
                })
              }
            </tbody>
          </table>
          <div className="border-t border-slate-200 dark:border-slate-700">

            <div className="space-y-8 mt-8"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoicesTable;
