import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const Memos = ({ state }) => {
    const [memos, setMemos] = useState([]);
    const { contract } = state;

    useEffect(() => {
        const memosMessage = async () => {
            const memos = await contract.getMemos();
            setMemos(memos);
        }
        contract && memosMessage();
    }, [contract]);

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Timestamp',
            selector: row => row.timestamp,
            sortable: true,
            cell: row => new Date(Number(row.timestamp) * 1000).toLocaleString(),
        },
        {
            name: 'Message',
            selector: row => row.message,
            sortable: true,
        },
        {
            name: 'From',
            selector: row => row.from,
            sortable: true,
        },
    ];

    const sortedMemos = [...memos].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

    return (
        <div className="container-fluid memos-container">
            <DataTable
                title="Coffee Transactions"
                columns={columns}
                data={sortedMemos}
                pagination
                highlightOnHover
                responsive
                striped
            />
        </div>

    );
}

export default Memos;
