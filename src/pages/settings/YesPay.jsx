import React from 'react';

function YesPay() {
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="bg-white dark:bg-slate-800 shadow-lg rounded-sm mb-8">
              <div className="flex flex-col md:flex-row md:-mr-px text-green-500 justify-center">
                Оплата прошла
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default YesPay;