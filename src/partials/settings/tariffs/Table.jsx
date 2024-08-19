import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Table({ options, thead }) {
    const navigate = useNavigate();
    const location = useLocation();
    const payTariffs = (e) => {
        if (e.target.value == 'true') {
            localStorage.setItem("tariff", e.target.name);
            navigate('/settings/paytariffs');
        } 
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full text-left text-sm font-light" style={{'tableLayout':'fixed', 'width': '100%'}}>
                                <thead className="border-b dark:border-neutral-500">
                                    <tr>
                                        {thead &&
                                            thead.map((item, i) => {
                                                if (i==0) {
                                                    return (
                                                    <th key={i} scope="col" className="special_width px-6 py-4" style={{'width': '22%'}}>
                                                            <div>{item}</div>
                                                    </th>
                                                    );
                                                } else {
                                                    return (
                                                    <th key={i} scope="col" className="special_width px-6 py-4">
                                                        <div>{item}</div>
                                                    </th>
                                                    );
                                            }
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {options &&
                                        options.map((item, i) => {
                                            return (
                                                <tr key={i} className="border-b dark:border-neutral-500">
                                                    {
                                                        item.map((rows, j) => {
                                                            return (
                                                                <td key={j} className=" { if (j!=0) } return 'text-center' } px-6 py-4">
                                                                    {
                                                                        
                                                                        (typeof rows === 'object' && rows !== null) ? 
                                                                            <div>
                                                                                {rows.free == false ? 
                                                                                <div><strong className="text-xl">{rows.price}</strong> ₽/м</div> : ""}
                                                                                <br/>
                                                                                {rows.free == false ? 
                                                                                <button style={{ width: '100px', 'word-wrap': 'break-word'}} className={`btn w-full ${rows.pay ? 'greenIVA' : 'bg-blue-500'}  ${rows.pay ? 'greenIVA' : 'hover:bg-blue-600'} text-white`} name={rows.name} value={rows.pay} onClick={payTariffs}>
                                                                                    {rows.pay ? 'купить' : 'заявка'}
                                                                                </button> : 
                                                                                <button style={{ width: '100px', 'word-wrap': 'break-word'}} className={`btn w-full ${rows.pay ? '' : 'bg-blue-500'}  ${rows.pay ? '' : 'hover:bg-blue-600'}`} name={rows.name}>
                                                                                Бесплатно
                                                                                </button>
                                                                                }
                                                                                
                                                                            </div>:
                                                                            <p>{rows}</p> 
                                                                            
                                                                    }

                                                                </td>
                                                            )
                                                        })
                                                    }
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Table;