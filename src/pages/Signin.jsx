
import React, { useEffect, useState, useCallback } from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useSearchParams } from "react-router-dom";
const key = 'updatable';

import { Link } from 'react-router-dom';
import Logo from '../images/LogoBlack.png';
import Ava from '../images/ava.png';

function Signin({ signin, onChangeSignin }) {
  const [storage, setStorage] = useState('')
  const [searchParams, setSearchParams] = useSearchParams();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const openNotification = (event, type) => {
    api[type]({
      key,
      message: 'что то не так',
      description: event,
    });
  };

  useEffect(() => {
    form.validateFields([]);
    if (searchParams.get("tariff") !== null) {
      setStorage(searchParams.get("tariff"));
    }
  }, [form]);

  const onCheck = async () => {
    try {
      const values = await form.validateFields();
      fetch("https://billing-dev.vkurse.ru/api/login-check", {
        method: "POST",
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          if (json.code == 401) {
            openNotification(json.message, 'error')
          } else if (json.token !== undefined) {
            localStorage.setItem('Auth', json.token)
            handleInputChange()
            if (storage.length == 0) {
              window.location.href = '/'
            } else {
              window.location.href = `https://lk-dev.vkurse.ru/settings/paytariffs?tariff=${storage}`
            }
          }
        })
        .catch(error => {
          console.log(error, 'что то пошло не так')
        });
      console.log('Success:', values);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  const handleInputChange = useCallback((event) => {
    onChangeSignin(signin = false)

  }, [onChangeSignin])


  return (
    <main className="bg-white dark:bg-slate-900 specialGradient">

      <div className="relative md:flex justify-center">

        <div className="">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                <Link className="block" to="/">
                  <img className="" src={Logo} width="220" height="32" alt="User" />
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Добро пожаловать</h1>
              <h2><a href="https://site-dev.vkurse.ru" className='btn greenIVA text-white mb-4'>Вернуться на сайт</a></h2>
              {contextHolder}
              <Form
                form={form}
                name="dynamic_rule"
                layout="vertical"
              >

                <div className='wrapInner'>
                  <Form.Item

                    name="username"
                    label="email"
                    rules={[
                      {
                        required: true,
                        message: 'Введите email',
                      },
                    ]}
                  >
                    <Input placeholder="Введите email" />
                  </Form.Item>
                  <Form.Item

                    name="password"
                    label="Пароль"
                    rules={[
                      {
                        required: true,
                        message: 'Введите пароль',
                      },
                    ]}
                  >
                    <Input placeholder="Пароль" />
                  </Form.Item>
                  <div className="flex items-center justify-between mt-6">
                    <div className="mr-1">
                      <Link className="text-sm underline hover:no-underline" to="/reset-password">Забыли пароль?</Link>
                    </div>
                    <Form.Item >
                      <Button className='btn greenIVA text-white ml-3' onClick={onCheck}>
                      <span className='text-white'>Войти</span>
                      </Button>
                    </Form.Item>
                  </div>
                </div>
              </Form>
              <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                  <Link className="font-medium text-green-500 hover:text-green-600 dark:hover:text-indigo-400" to={storage.length == 0 ? '/signup' : `/signup?tariff=${storage}`}>Зарегистрироваться</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signin;