import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const initialFormData = {
  taluka_id: '',
  taluka_name: '',
  accountStatus: 'Active', // Default value
};

const initialData = [
  {
    taluka_id: '1',
    taluka_name: 'Alphonse',
    accountStatus: 'Active',
  },
];

function Taluka() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState(initialData);
  const [editing, setEditing] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [search, setSearch] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editing && editRowIndex !== null) {
      const updatedData = [...data];
      updatedData[editRowIndex] = formData;
      setData(updatedData);
      setEditing(false);
      setEditRowIndex(null);
    } else {
      setData([...data, formData]);
    }
    setFormData(initialFormData);
    setShowForm(false);
  };

  const handleEditClick = (taluka_id) => {
    const rowIndex = data.findIndex((row) => row.taluka_id === taluka_id);
    if (rowIndex !== -1) {
      const selectedRow = data[rowIndex];
      setFormData({
        taluka_id: selectedRow.taluka_id,
        taluka_name: selectedRow.taluka_name,
        accountStatus: selectedRow.accountStatus,
      });
      setEditing(true);
      setEditRowIndex(rowIndex);
      setShowForm(true);
    }
  };

  const handleDeleteClick = (taluka_id) => {
    const rowIndex = data.findIndex((row) => row.taluka_id === taluka_id);
    if (rowIndex !== -1) {
      const shouldDelete = window.confirm('Do you want to delete this Taluka?');
      if (shouldDelete) {
        const updatedData = [...data];
        updatedData.splice(rowIndex, 1);
        setData(updatedData);
      }
    }
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const columns = [
    { name: 'Taluka ID', selector: 'taluka_id', sortable: true },
    { name: 'Taluka Name', selector: 'taluka_name', sortable: true },
    {
      name: 'Taluka Status',
      selector: 'accountStatus',
      sortable: true,

    },
    {
      name: 'Edit',
      cell: (row) => (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => handleEditClick(row.taluka_id)}
        >
          Edit
        </button>
      ),
    },
    {
      name: 'Delete',
      cell: (row) => (
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => handleDeleteClick(row.taluka_id)}
        >
          Delete
        </button>
      ),
    },
  ];

  // const handleStatusChange = (taluka_id, newStatus) => {
  //   const updatedData = data.map((row) =>
  //     row.taluka_id === taluka_id ? { ...row, accountStatus: newStatus } : row
  //   );
  //   setData(updatedData);
  // };

  return (
    <div className="text-black p-4">
      <h1 className="text-3xl font-bold mb-4">Taluka Details</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? 'Close Form' : 'Add Taluka'}
      </button>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="taluka_id"
              className="block text-gray-700 font-semibold"
            >
              Taluka ID:
            </label>
            <input
              type="text"
              id="taluka_id"
              name="taluka_id"
              value={formData.taluka_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="taluka_name"
              className="block text-gray-700 font-semibold"
            >
              Taluka Name:
            </label>
            <input
              type="text"
              id="taluka_name"
              name="taluka_name"
              value={formData.taluka_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="accountStatus"
              className="block text-gray-700 font-semibold"
            >
              Taluka Status:
            </label>
            <div className="flex">
              <label>
                <input
                  type="radio"
                  name="accountStatus"
                  value="Active"
                  checked={formData.accountStatus === 'Active'}
                  onChange={handleInputChange}
                />{' '}
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="accountStatus"
                  value="Inactive"
                  checked={formData.accountStatus === 'Inactive'}
                  onChange={handleInputChange}
                />{' '}
                Inactive
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editing ? 'Save' : 'Submit'}
          </button>
        </form>
      )}

      {editing && (
        <button
          onClick={() => setEditing(false)}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded ml-2"
        >
          Cancel Edit
        </button>
      )}

      <div className="text-center">
        <DataTable
          columns={columns}
          data={filteredData}
          striped
          highlightOnHover
          pointerOnHover
          pagination
          subHeader
          subHeaderComponent={
            <input
              className="w-25 p-2 font-medium"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      </div>
    </div>
  );
}

export default Taluka;
