import React from 'react';
import SingUpBussnes from './SingUpBussnes'
import SingUpPersonal from './SingUpPersonal'
import { Link, useSearchParams } from 'react-router-dom';
import Logo from '../images/LogoBlack.png';
import { Tabs } from 'antd';
import './style.scss'
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Личное использование',
    children: <SingUpPersonal />,
  },
  {
    key: '2',
    label: 'Для бизнеса',
    children: <SingUpBussnes />,
  }
];

function Signup() {
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
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Создать аккаунт</h1>
              <h2><a href="https://site-dev.vkurse.ru" className='btn greenIVA text-white mb-4'>Вернуться на сайт</a></h2>
              <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Signup;