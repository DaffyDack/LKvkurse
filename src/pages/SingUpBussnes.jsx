
import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useSearchParams } from 'react-router-dom';
function SingUpBussnes() {
    const [form] = Form.useForm();
    const [checkNick, setCheckNick] = useState(false);
    const [storage, setStorage] = useState('')
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get("tariff") !== null) {
            setStorage(searchParams.get("tariff"));
        }
    }, [form]);
    useEffect(() => {
        form.validateFields(['nickname']);
    }, [checkNick, form]);
    const onCheck = async () => {
        try {
            const values = await form.validateFields();
            fetch("https://billing-dev.vkurse.ru/api/registration", {
                method: "POST",
                body: JSON.stringify({
                    email: values.username,
                    password: values.password,
                    company_inn: values.company_inn,
                    company_name: values.company_name,
                    phone: values.phone
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    if (json.data.status == 'ok') {
                        localStorage.setItem('Auth', json.data.token)
                        if (storage.length == 0) {
                            window.location.href = '/'
                        } else {
                            window.location.href = `https://lk-dev.vkurse.ru/settings/paytariffs?tariff=${storage}`
                        }
                    }
                })
                .catch(error => {
                    console.log('что то пошло не так')
                });
            console.log('Success:', values);
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    };

    return (
        <>
            <Form
                form={form}
                name="dynamic_rule"
                layout="vertical"
            >
                <div className='wrapReg'>
                    <div>
                        <Form.Item
                            name="username"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите Email',
                                },
                            ]}
                        >
                            <Input placeholder="Введите Email" />
                        </Form.Item>
                        <Form.Item label="Пароль" name="password" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Повторите пароль"
                            name="password2"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Пароль не совадает'));
                                    },
                                }),
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </div>

                    <div>
                        <Form.Item
                            name="company_inn"
                            label="ИНН"
                            rules={[
                                {
                                    required: false,
                                    message: 'Введите ИНН',
                                },
                            ]}
                        >
                            <Input placeholder="Введите ИНН" />
                        </Form.Item>

                        <Form.Item
                            name="company_name"
                            label="наименование компании"
                            rules={[
                                {
                                    required: false,
                                    message: 'Введите наименование компании',
                                },
                            ]}
                        >
                            <Input placeholder="Введите наименование компании" />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Телефон"
                            rules={[
                                {
                                    required: false,
                                    message: 'Введите телефон',
                                },
                            ]}
                        >
                            <Input placeholder="Введите телефон" />
                        </Form.Item>
                    </div>
                </div>


                <Form.Item >
                    <Button className='btn greenIVA hover:bg-green-600 text-white whitespace-nowrap ' onClick={onCheck}>
                        <span className='text-white'>Зарегистрироваться</span> 
                    </Button>
                </Form.Item>
            </Form>

            <div className="pt-5 mt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="text-sm">
                    У вас есть аккаунт? <Link className="font-medium text-green-500 hover:text-green-600 dark:hover:text-indigo-400" to="/signin">Войти</Link>
                </div>
            </div>
        </>
    );
}

export default SingUpBussnes;