import React, { useState } from 'react';
import DataTable from "react-data-table-component";

const initialFormData = {
  class_id: '',
  class_name: '',
  description: '',
  accountStatus: 'Active', // Default value
};

const initialData = [
  {
    class_id: '1',
    class_name: 'Sixth',
    description: 'Demo Message',
    accountStatus: 'Active',
  },
];

function Class() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState(initialData);
  const [editing, setEditing] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [search, setSearch] = useState("");

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

  const handleEditClick = (class_id) => {
    const rowIndex = data.findIndex((row) => row.class_id === class_id);
    if (rowIndex !== -1) {
      const selectedRow = data[rowIndex];
      setFormData({
        class_id: selectedRow.class_id,
        class_name: selectedRow.class_name,
        description: selectedRow.description,
        accountStatus: selectedRow.accountStatus,
      });
      setEditing(true);
      setEditRowIndex(rowIndex);
      setShowForm(true);
    }
  };

  const handleDeleteClick = (class_id) => {
    const rowIndex = data.findIndex((row) => row.class_id === class_id);
    if (rowIndex !== -1) {
      const shouldDelete = window.confirm("Do you want to delete this Class?");
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
    { name: "Class ID", selector: "class_id", sortable: true, isRequired: true },
    { name: "Class Name", selector: "class_name", sortable: true, isRequired: true },
    { name: "Description", selector: "description", sortable: true, isRequired: true },
    { name: "Class Status", selector: "accountStatus", sortable: true },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => handleEditClick(row.class_id)}
        >
          Edit
        </button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => handleDeleteClick(row.class_id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className='text-black p-4'>
      <h1 className='text-3xl font-bold mb-4'>Class Details</h1>
      <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4">
        {showForm ? "Close Form" : "Add Class"}
      </button>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label htmlFor="class_id" className="block text-gray-700 font-semibold">Class ID:</label>
            <input
              type="text"
              id="class_id"
              name="class_id"
              value={formData.class_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="class_name" className="block text-gray-700 font-semibold">Class Name:</label>
            <input
              type="text"
              id="class_name"
              name="class_name"
              value={formData.class_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="accountStatus" className="block text-gray-700 font-semibold">Class Status:</label>
            <div className="flex">
              <label className="mr-2">
                <input
                  type="radio"
                  name="accountStatus"
                  value="Active"
                  checked={formData.accountStatus === 'Active'}
                  onChange={handleInputChange}
                />{' '}
                Active
              </label>
              <label className="mr-2">
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

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Submit
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

export default Class;
