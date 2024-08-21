import { useEffect, useState } from 'react';
import { banks, mfsList } from '../lib/utils';

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const aggregateData = (data) => {
    const aggregatedData = {};

    data.forEach((item) => {
      const { bank, mfs } = item;

      if (!aggregatedData[bank]) {
        aggregatedData[bank] = {
          count: 0,
          mfs: {},
        };
      }

      aggregatedData[bank].count++;

      mfs.forEach((mfsItem) => {
        if (!aggregatedData[bank].mfs[mfsItem]) {
          aggregatedData[bank].mfs[mfsItem] = 0;
        }
        aggregatedData[bank].mfs[mfsItem]++;
      });
    });

    return aggregatedData;
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortData = (data) => {
    if (sortColumn) {
      const sortedData = [...data].sort((a, b) => {
        const aCount = a.mfs[sortColumn] || 0;
        const bCount = b.mfs[sortColumn] || 0;
        return sortOrder === 'asc' ? aCount - bCount : bCount - aCount;
      });
      return sortedData;
    }
    return data;
  };

  const renderTable = (aggregatedData) => {
    const sortedBanks = sortData(banks.map((bank) => ({
      ...bank,
      mfs: aggregatedData[bank.name]?.mfs || {},
    })));

    return (
      <div className="overflow-auto max-h-screen max-w-fit">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sticky left-0 top-0 bg-gray-100 z-10">
                Bank Name
              </th>
              {mfsList.map((mfs) => (
                <th
                  key={mfs.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-200 sticky top-0 bg-gray-100"
                  onClick={() => handleSort(mfs.name)}
                >
                  {mfs.name}
                  {sortColumn === mfs.name && (
                    <span className="ml-2">
                      {sortOrder === 'asc' ? '▲' : '▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedBanks.map((bank) => (
              <tr key={bank.id}>
                <td className="px-6 py-4 whitespace-nowrap sticky left-0 bg-white">
                  {bank.name}({aggregatedData[bank.name]?.count || 0})
                </td>
                {mfsList.map((mfs) => (
                  <td key={mfs.id} className="px-6 py-4 whitespace-nowrap">
                    {bank.mfs[mfs.name] ? (
                      <span className="text-green-500">
                        ✅({bank.mfs[mfs.name]})
                      </span>
                    ) : (
                      <span className="text-red-500">❌</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const aggregatedData = aggregateData(data);

  const totalBanks = banks.length;
  const totalMFS = mfsList.length;
  const totalData = data.length;
  const totalUniqueBanksWithData = Object.keys(aggregatedData).length;
  const totalMFSWithData = mfsList.filter((mfs) =>
    Object.values(aggregatedData).some((bank) => bank.mfs[mfs.name])
  ).length;

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-4">

<div>Data size: {totalData}</div>
<div>Banks with Data: {totalUniqueBanksWithData}/{totalBanks}</div>
<div>MFS with Data: {totalMFSWithData}/{totalMFS}</div>
</div>
</div>
{data.length > 0 ? (
renderTable(aggregatedData)
) : (
<p>Loading...</p>
)}
</div>
);
}