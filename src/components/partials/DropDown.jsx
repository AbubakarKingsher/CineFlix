import React, { useState } from 'react'

function DropDown({ options, func }) {

    const [value, setValue] = func

    return (
        <select
            value={value}
            onChange={(e) => {
                setValue(e.target.value);
            }}
            className="border-none outline-0 bg-[#003959] w-24 sm:w-28 mb-3 px-2 py-1 text-xs rounded-md"
        >
            {options.map((item, idx) => (
                <option className="text-xs" key={idx} value={item.toLowerCase()}>
                    {item}
                </option>
            ))}
        </select>

    )
}

export default DropDown