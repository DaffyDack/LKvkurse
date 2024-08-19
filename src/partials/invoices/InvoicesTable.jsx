import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import Invoices from './InvoicesTableItem';
import './style.scss'

import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";

function InvoicesTable({
  selectedItems
}) {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([])

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);
  const [idDeleted, setIdDeleted] = useState(0);
  const [loading, setLoading] = useState(false)
  const [link, setLink] = useState('')
  const [confirmedEmail, setConfirmedEmail] = useState(false)
  const buttonRef = useRef(null);
  const fonRef = useRef(null);

  useEffect(() => {
    initTE({ Modal, Ripple });
    setList(invoices);
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [invoices]);

  useEffect(() => {
    let token = localStorage.getItem('Auth')
    fetch(`https://billing-dev.vkurse.ru/api/v1/profile`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        if (json.data.is_verified) {
          setConfirmedEmail(true)
        } else {
          setConfirmedEmail(false)
        }
      }).catch(error => {
        console.log('что то пошло не так')
      });
    getCart()
  }, []);

  const newGetCart = () => {
    
    getCart()
  }

  const getCart = () => {
    let token = localStorage.getItem('Auth')
    fetch(`https://billing-dev.vkurse.ru/api/v1/cart`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data.length, '11')
        setInvoices(json.data)
      }).catch(error => {
        console.log('что то пошло не так')
      });
  }
  const pay = () => {
    setLoading(true)
    let token = localStorage.getItem('Auth')
    fetch("https://billing-dev.vkurse.ru/api/v1/buy-cart", {
      method: "POST",
      body: JSON.stringify([{ invoices }]),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json.data.pay)
        setLoading(false)
        if (json.data.pay) {
          setLink(json.data.url_buy_tariff)
        }
      }).catch(error => {
        console.log('что то пошло не так')
        setLoading(false)
      });
  }
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    setSelectAll(false);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter(item => item !== id));
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  const getID = (e) => {
    setIdDeleted(e)
    buttonRef.current.click()
  }
  const deleteTariffID = () => {
    setInvoices(invoices.filter(item => item.id !== idDeleted));
  }

  return (
    <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 relative">
      <header className="px-5 py-4">
        <button
          type="button"

          className=""
          data-te-toggle="modal"
          data-te-target="#exampleModal"
          data-te-ripple-init
          data-te-ripple-color="light"
          ref={buttonRef}>
        </button>

        <div
          data-te-modal-init
          className="fixed left-0 top-0 bg-neutral-500/[.6] z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          >
          <div
            data-te-modal-dialog-ref
            className="pointer-events-none relative w-auto translate-y-[50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
            <div
              className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current  shadow-lg outline-none dark:bg-neutral-600">
              <div
                className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <h5
                  className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                  id="exampleModalLabel">
                  Удалить тариф
                </h5>

                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  data-te-modal-dismiss
                  aria-label="Close">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative flex-auto p-4" data-te-modal-body-ref>
                Вы действительно хотите удалить тариф <b>{idDeleted}</b>
              </div>

              <div
                className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <button
                  type="button"
                  className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 "
                  data-te-modal-dismiss
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  Отмена
                </button>
                <button
                  type="button"
                  className=""
                  data-te-ripple-init
                  data-te-modal-dismiss
                  data-te-ripple-color="light"
                  onClick={deleteTariffID}>
                  Удалить
                </button>
              </div>
            </div>
          </div>
        </div>
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
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                  <div className="flex items-center">
                    <label className="inline-flex">
                      <span className="sr-only">Select all</span>
                      <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                    </label>
                  </div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">id</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Тариф</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Тариф id</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Месяцев</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Цена за мес.</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Итоговая цена</div>
                </th>
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Ред</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm divide-y divide-slate-200 dark:divide-slate-700">
              {
                list.map(invoice => {
                  return (
                    <Invoices
                      onClickDelete={getID}
                      handleClick={handleClick}
                      key={invoice.id}
                      id={invoice.id}
                      name={invoice.name}
                      total_price={invoice.total_price}
                      price_month={invoice.price_month}
                      month={invoice.month}
                      tariff_id={invoice.tariff_id}
                      isChecked={isCheck.includes(invoice.id)}
                    />
                  )
                })
              }
            </tbody>
          </table>
          <div className="border-t border-slate-200 dark:border-slate-700">

            <div className="space-y-8 mt-8"></div>
            <button onClick={pay} type="button"
              data-te-toggle="modal"
              data-te-target="#exampleModalLg"
              data-te-ripple-init
              data-te-ripple-color="light" className="btn greenIVA w-full disabled:border-slate-200 dark:disabled:border-slate-700 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 disabled:cursor-not-allowed shadow-none" disabled={loading ? true : false}>

              {loading ? <svg className="animate-spin w-4 h-4 fill-current shrink-0" viewBox="0 0 16 16">
                <path d="M8 16a7.928 7.928 0 01-3.428-.77l.857-1.807A6.006 6.006 0 0014 8c0-3.309-2.691-6-6-6a6.006 6.006 0 00-5.422 8.572l-1.806.859A7.929 7.929 0 010 8c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
              </svg> : ''}

              <span className="ml-2 text-white">Оплатить</span>
            </button>
            <div
              data-te-modal-init
              className="fixed left-0 top-0 z-[1055] bg-neutral-500/[.6] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
              id='exampleModalLg'
              tabIndex="-1"
              aria-labelledby="exampleModalLgLabel"
              aria-modal="true"
              role="dialog"
              onClick={newGetCart}
              ref={fonRef}
            >
              <div
                data-te-modal-dialog-ref
                className="pointer-events-none relative w-auto translate-y-[150px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] min-[992px]:max-w-[800px]">
                <div
                  className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                  <div
                    className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                    <h5
                      className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                      id="exampleModalLgLabel">
                      Оплатить
                    </h5>
                    <button
                      type="button"
                      className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                      data-te-modal-dismiss
                      aria-label="Close">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="relative p-4">
                    {confirmedEmail ? <iframe
                      id="inlineFrameExample"
                      title="Inline Frame Example"
                      width="100%"
                      height="560"
                      src={link}>
                    </iframe> : 'Почта не подтверждена'}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoicesTable;
