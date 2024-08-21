import { useState } from 'react';
import { useRouter } from 'next/router';
import Select from 'react-select';
import { banks, mfsList } from '../lib/utils';

export default function Home() {
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedMFS, setSelectedMFS] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bank: selectedBank?.value,
          mfs: selectedMFS.map((mfs) => mfs.name),
          created_date: new Date().toISOString(),
        }),
      });
      if (response.ok) {
        router.push(`/dashboard`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const bankOptions = banks.map((bank) => ({
    value: bank.name,
    label: bank.name,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bank and MFS Analysis</h1>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="bank" className="block mb-2">Bank Name:</label>
          <Select
            id="bank"
            value={selectedBank}
            onChange={(selectedOption) => setSelectedBank(selectedOption)}
            options={bankOptions}
            isClearable
            placeholder="Search for a bank"
            className="text-black"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Available MFS:</label>
          <div className="grid grid-cols-2 gap-4">
            {mfsList.map((mfs) => (
              <div
                key={mfs.id}
                className={`border rounded p-4 cursor-pointer ${
                  selectedMFS.some((selectedMFS) => selectedMFS.id === mfs.id) ? 'bg-blue-100' : ''
                }`}
                onClick={() => {
                  setSelectedMFS((prevMFS) => {
                    const isSelected = prevMFS.some((selectedMFS) => selectedMFS.id === mfs.id);
                    return isSelected
                      ? prevMFS.filter((selectedMFS) => selectedMFS.id !== mfs.id)
                      : [...prevMFS, mfs];
                  });
                }} 
              >
                <span>{mfs.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}