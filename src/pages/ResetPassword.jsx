import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../images/LogoBlack.png';
import Ava from '../images/ava.png';


function ResetPassword() {
  return (
    <main className="bg-white dark:bg-slate-900">

      <div className="relative md:flex justify-center">

        {/* Content */}
        <div className="">
          <div className="min-h-[100dvh] h-full flex flex-col after:flex-1">

            {/* Header */}
            <div className="flex-1">
              <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                {/* Logo */}
                <Link className="block" to="/">
                <img className="" src={Logo} width="220" height="32" alt="User" />
                </Link>
              </div>
            </div>

            <div className="max-w-sm mx-auto w-full px-4 py-8">
              <h1 className="text-3xl text-slate-800 dark:text-slate-100 font-bold mb-6">Создать новый пароль</h1>
              {/* Form */}
              <form>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">Emai<span className="text-rose-500">*</span></label>
                    <input id="email" className="form-input w-full" type="email" />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button className="btn bg-green-500 hover:bg-green-600 text-white whitespace-nowrap">Отправить</button>
                </div>
              </form>
            </div>

          </div>
        </div>

      </div>

    </main>
  );
}

export default ResetPassword;