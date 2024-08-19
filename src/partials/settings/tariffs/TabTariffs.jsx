import React, { useEffect, useState } from 'react';
import InnerTab from './InnerTab'
import './style.scss'

function TabTariffs({ response }) {

    return (
        <>
            <section className="wrapper_tarifs" >
                <div className="mx-auto wrapper flex flex-col midmd:flex-row gap-10 lg:gap-12">
                    <div>
                        <div className="container">
                            <div className="tab">
                                {response.columns &&
                                    response.columns.map((item, i) => {
                                        return (
                                            <React.Fragment key={item.id}>
                                                {
                                                    i == 0 ? <input
                                                        id={`${item.id}`}
                                                        name="tab-btn"
                                                        type="radio"
                                                        value=""
                                                        defaultChecked
                                                    /> : <input
                                                        id={`${item.id}`}
                                                        name="tab-btn"
                                                        type="radio"
                                                        value=""
                                                    />
                                                }
                                                <label className="click" htmlFor={`${item.id}`}>
                                                    {item.name}
                                                </label>
                                            </React.Fragment>
                                        );
                                    })
                                }
                                {response.rows &&
                                    response.rows.map((item) => {
                                        return (
                                            <div className="tab-content" id={`${item.id}`} key={item.id}>
                                                <InnerTab
                                                    id={item.id}
                                                    tariff={item.tariff}
                                                />
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )

}

export default TabTariffs;