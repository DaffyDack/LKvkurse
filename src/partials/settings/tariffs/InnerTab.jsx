import React, { Component, useEffect, useState } from 'react';
import Table from './Table'

import './innerStyle.scss'

function InnerTab({ tariff }) {
    return (
        <>
            <div className="button_wrapper special_wrapper">
                <div className="wrap_btn">
                    <div className="inner_button">
                        {tariff &&
                            tariff.map((item, i) => {
                                return (
                                    <React.Fragment key={item.line_id}>

                                        {
                                            i == 0 ? <input

                                                id={`${item.name}-btn-${item.line_id}`}
                                                name={`${item.name}`}
                                                type="radio"
                                                value=""
                                                defaultChecked

                                            /> : <input
                                                id={`${item.name}-btn-${item.line_id}`}
                                                name={`${item.name}`}
                                                type="radio"
                                                value=""
                                            />
                                        }

                                        <label htmlFor={`${item.name}-btn-${item.line_id}`}>
                                            {item.line}
                                        </label>
                                    </React.Fragment>

                                );
                            })
                        }
                        {tariff &&
                            tariff.map((item) => {
                                return (
                                    <div
                                        className={`${item.name}-content`}
                                        id={`${item.name}-btn-${item.line_id}`}
                                        key={item.line_id}
                                    >
                                        <Table options={item.options} thead={item.thead} />
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="wrapper_text">
                ВКУРСЕ «Classic Meetings PRO» – тарифная линейка на «облачную» подписку с
                личным кабинетом на <span>saas.vkurse.ru.</span> Клиенту предоставляется
                доступ к ЛК с правами "Администратора", в рамках которого он может проводить
                мероприятия в формате «Совещаний» (все участники мероприятия – равноправные с
                возможностью включать аудио и видео).
            </div>
        </>
    )

}

export default InnerTab;