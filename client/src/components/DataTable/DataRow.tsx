import React from 'react'

export default function DataRow({ data }) {
    return (
        <tr>
            <th>
                <input type="checkbox" className="checkbox" />
            </th>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img src={data.avatar} alt="Avatar" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{data.name}</div>
                        <div className="text-sm opacity-50">{data.country}</div>
                    </div>
                </div>
            </td>
            <td>{data.job}</td>
            <td>{data.color}</td>
            <th>
                <button className="btn btn-ghost btn-xs">details</button>
            </th>
        </tr>
    )
}
