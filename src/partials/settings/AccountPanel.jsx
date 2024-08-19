import React, { useState, useEffect } from 'react';
import { Alert, Spin, notification, Card, Space, Button, Popover } from 'antd';

import MyTarrifForMain from '../../../src/pages/settings/MyTarrifForMain'

import Ava from '../../images/ava.png';

const key = 'updatable';

function AccountPanel() {
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [accaunt, setAccautn] = useState(null)
  const openNotification = (event, type, message) => {
    api[type]({
      key,
      message: message,
      description: <a href={event} target="_blank">{event}</a>,
    });
  };
  const content = (
    <div>
      <p>Ссылка на email</p>
    </div>
  );

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
        setAccautn(json.data)
      }).catch(error => {
        console.log('что то пошло не так')
      });
  }, []);

  const goToIva = (url) => {

    window.location.href = url;

  }


  return (
    <div className="grow">
      {contextHolder}
      <div className="p-6 space-y-6">
        {/* Business Profile */}
        <section>
          <div className=" sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-5 specialflex">
            <Space direction="vertical" size={16}>
              <Card
                title="Бизнес профиль"
                style={{
                  width: 'auto',
                }}
              >
                {accaunt && (accaunt.is_verified == false) ? <div x-show="open" x-data="{ open: true }" role="alert">
                  <div className="px-4 py-2 rounded-sm text-sm border bg-amber-100 dark:bg-amber-400/30 border-amber-200 dark:border-transparent text-amber-600 dark:text-amber-400">
                    <div className="flex w-full justify-between items-start">
                      <div className="flex">
                        <svg className="w-4 h-4 shrink-0 fill-current opacity-80 mt-[3px] mr-3" viewBox="0 0 16 16">
                          <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z"></path>
                        </svg>
                        <div>
                          Почта <b>{accaunt.email}</b> не подтверждена.
                          Пожалуйста, проверьте свой почтовый ящик и получите тариф <a href="#" className="underline">Free</a>.
                        </div>
                      </div>
                    </div>
                  </div>
                </div> : ""}
                <br />

                <section>
                  <div className="flex items-center">
                    <div className="mr-6">
                      <img className="" src={Ava} width="155" height="155" alt="User" />
                    </div>
                    {accaunt && <div style={{ width: '100%' }}
                    >

                      <ul>
                        <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                          <div className="text-sm">Имя</div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2">{accaunt.name ?? 'Не указано'} (ID {accaunt.id})</div>
                        </li>
                        <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                          <div className="text-sm">
                            {accaunt.is_verified ? <div className="text-sm">Email</div> : <Popover content={content} title="Подтвердите почту">
                              <Button type="error" className='bg-red-500 hover:bg-red-700 text-white hover:text-white'>Email</Button>
                            </Popover>}
                          </div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2">{accaunt.email}</div>
                        </li>
                        <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                          <div className="text-sm">Телефон</div>
                          <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2">{accaunt.phone ?? 'Не указано'}</div>
                        </li>
                      </ul>

                    </div>}
                  </div>
                </section>
                {accaunt && <div>
                  <br />
                  <ul>
                    <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                      <div className="text-sm">Тип аккаунта</div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2">{accaunt.type ?? 'Не указано'}</div>
                    </li>
                    <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                      <div className="text-sm">Название компании</div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2">{accaunt.company_name ?? 'Не указано'}</div>
                    </li>
                    <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                      <div className="text-sm">Инн компании</div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2">{accaunt.company_inn ?? 'Не указано'}</div>
                    </li>
                    <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                      <div className="text-sm">Тип аккаунта</div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2">{accaunt.type ?? 'не указано'}</div>
                    </li>
                    <li className="flex items-center justify-between py-3 border-b border-slate-200 dark:border-slate-700">
                      <div className="text-sm">Название компании</div>
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100 ml-2">{accaunt.company_name ?? 'Не указано'} (Инн {accaunt.company_inn ?? 'не указано'})</div>
                    </li>
                  </ul>
                  <br />
                  {accaunt.is_verified ? <div className="w-full p-3 rounded-sm text bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex h-full">

                      <div className="flex flex-col h-full">
                        <a className='btn greenIVA text-white hover:text-white' href={accaunt.link_iva} target="_blank">
                          <span className="text-white">Перейти в кабинет IVA</span></a>
                      </div>

                    </div>
                  </div> : <br />}

                  <br />
                  <p>ID Bitrix 24: <b>{accaunt.id_b24 ?? ' ---'}</b></p>
                  <p>ID IVA: <b>{accaunt.id_iva ?? ' --- '}</b></p>

                  <p>Ip последнего входа: <b>{accaunt.last_ip}</b></p>
                  <p>Время последнего входа: <b>{accaunt.last_login}</b></p>
                </div>}
              </Card>
            </Space>
            <Space direction="vertical" size={16}>
              <Card title="Активные подписки"
                style={{
                  width: 'auto',
                }}>
                <div>
                  <MyTarrifForMain/>
                </div>
              </Card>
            </Space>
          </div>
        </section>
      </div>
      <footer>
        <div className="flex flex-col px-6 py-5 border-t border-slate-200 dark:border-slate-700">
          <div className="flex self-end">
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AccountPanel;