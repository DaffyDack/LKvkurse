import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { Button, notification, Space } from 'antd';


import Sidebar from '../../partials/Sidebar';
import Header from '../../partials/Header';
import "./style.scss"

import {
  Modal,
  Ripple,
  initTE,
} from "tw-elements";
function PayTariffs() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tariffList, setTariffList] = useState([])
  const [tariffInfo, setTariffInfo] = useState([])
  const [link, setLink] = useState('')
  const [verifiedEmail, setVerifiedEmail] = useState(false)

  const [storage, setStorage] = useState('')
  const [price, setPrice] = useState(0)
  const [id, setId] = useState(0)
  const [month, setMount] = useState(12)
  const [save, setSave] = useState('')
  const [sum, seSum] = useState(0)

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message: message,
      description: <Link className="text-sm font-medium text-green-500 hover:text-green-600 dark:hover:text-indigo-400" to="/settings/feedback">Перейти в корзину</Link>,
    });
  };
  // settings/paytariffs
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("tariff") !== null) {
      setStorage(searchParams.get("tariff"));
    } else {
      const rememberMe = localStorage.getItem('tariff');
      setStorage(rememberMe);
    }

  }, [])
  useEffect(() => {
    initTE({ Modal, Ripple });
    fetch(`https://billing-dev.vkurse.ru/api/v1/tariff-name/${storage}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTariffList(json.data.tariff_option)
        setTariffInfo(json.data.tariff_info)
        setPrice(json.data.price)
        setId(json.data.tariff_id)
        seSum(json.data.price * month)
      }).catch(error => {
        console.log('что то пошло не так')
      });
  }, [storage]);

  const addTariff = () => {
    let token = localStorage.getItem('Auth')
    fetch("https://billing-dev.vkurse.ru/api/v1/cart", {
      method: "POST",
      body: JSON.stringify([{
        tariff_id: id,
        month: month,
      }]),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((json) => {
        openNotificationWithIcon('success', 'Тариф добавлен')
      }).catch(error => {
        openNotificationWithIcon('error', 'Ошибка')
        console.log('что то пошло не так')
      });
  }
  function handleChange(e) {
    seSum(price * e.target.value)
    setMount(e.target.value)
  }
  function saveMouth() {
    setSave(month)
  }
  function returnMonth() {
    seSum(price * save)
    setMount(save)
  }
  const pay = () => {
    let token = localStorage.getItem('Auth')
    fetch("https://billing-dev.vkurse.ru/api/v1/buy-tariff", {
      method: "POST",
      body: JSON.stringify({
        tariff_id: id,
        month: month,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${token}`
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setLink(json.data.url_buy_tariff)
      }).catch(error => {
        console.log('что то пошло не так')
      });
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {contextHolder}
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
              <div className="md:-mr-px justify-center PayTariffs">
                <div className="wrapper_form">
                  <div className="left_form">
                    <div>
                      <div className="title_decoration">{storage}</div>
                      <div><b>Конфигурация лицензии</b></div>
                      <ul>
                        {tariffList.map((item, i) => {
                          return <li key={i}>{item}</li>
                        })}
                      </ul>
                      <div className="base_fun"><b>Базовый функционал</b></div>
                      <div>{tariffInfo}</div>
                    </div>
                  </div>
                  <div className="right_form">
                    <div className="title_decoration img">
                      Оформление <br /> заявки
                    </div>

                    <div className="module">
                      <div className="parametr_subscription">параметры подписки</div>
                      <button
                        type="button"
                        className="module_button inline-block "
                        data-te-toggle="modal"
                        data-te-target="#exampleModal"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        onClick={saveMouth}>
                        <div className="title">Период подписки</div>
                        <div>Количество месяцев: {month}</div>
                      </button>

                      <div className="form_pay">
                        <div className="title">Способ оплаты</div>
                        <div className="form_radio_pay">
                          <input id="bank" type="radio" name="radio1" value="1 месяц" defaultChecked></input>
                          <label className="card" htmlFor="bank">
                            <div>Банковская карта</div>
                            <div>Описание</div>
                          </label>
                        </div>
                        <div className="form_radio_pay">
                          <input id="requisites" type="radio" name="radio1" value="6 месяцев"></input>
                          <label htmlFor="requisites">
                            <div>По реквизитам</div>
                            <div>Описание</div>
                          </label>
                        </div>
                      </div>

                      <div
                        data-te-modal-init
                        className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-neutral-500/[.6]"
                        id="exampleModal"

                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
                        <div
                          data-te-modal-dialog-ref
                          className="pointer-events-none relative w-auto translate-y-[50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]">
                          <div
                            className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                            <div
                              className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">

                              <h5
                                className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
                                id="exampleModalLabel">
                                Выберите период подписки
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
                            <div className="formChangeMounth" onChange={handleChange}>
                              <div className="form_radio">
                                <input id="radio-1" type="radio" name="radio" value={1} ></input>
                                <label htmlFor="radio-1">1 месяц</label>
                              </div>
                              <div className="form_radio">
                                <input id="radio-2" type="radio" name="radio" value={6}></input>
                                <label htmlFor="radio-2">6 месяцев</label>
                              </div>
                              <div className="form_radio">
                                <input id="radio-3" type="radio" name="radio" value={12} defaultChecked></input>
                                <label htmlFor="radio-3">12 месяцев</label>
                              </div>
                            </div>
                            <div
                              className="bottom_popup">
                              <button
                                type="button"
                                className="inline-block "
                                data-te-modal-dismiss
                                data-te-ripple-init
                                data-te-ripple-color="light"
                                onClick={returnMonth}
                              >
                                Отмена
                              </button>
                              <button
                                type="button"
                                className="ml-1 inline-block"
                                data-te-modal-dismiss
                                data-te-ripple-init
                                data-te-ripple-color="light"
                              >
                                Сохранить
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="aboutTheSubscription">
                      <ul>
                        <li>Стоимость подписки <div>н/д</div></li>
                        <li>Дополнительные модули <div>н/д</div></li>
                        <li>Итого на {month} <div className="price">{sum}</div></li>
                      </ul>
                    </div>

                    {
                      verifiedEmail ?
                        <button
                          type="button"
                          className="buttonForPay"
                          data-te-toggle="modal"
                          data-te-target="#exampleModalLg"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          onClick={pay}>
                          Оплатить
                        </button> : <Button className='buttonForPay' onClick={addTariff}>Добавить</Button>
                    }

                    <div
                      data-te-modal-init
                      className="fixed left-0 top-0 z-[1055] bg-neutral-500/[.6] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
                      id='exampleModalLg'
                      tabIndex="-1"
                      aria-labelledby="exampleModalLgLabel"
                      aria-modal="true"
                      role="dialog">
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
                            <iframe
                              id="inlineFrameExample"
                              title="Inline Frame Example"
                              width="100%"
                              height="560"
                              src={link}>
                            </iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </main>

      </div>

    </div>
  );
}

export default PayTariffs;