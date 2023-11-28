import React, { useState } from 'react';
import DataTable from "react-data-table-component";

const initialFormData = {
  school_id: '',
  school_name: '',
  town_id: '',
  taluka_id: '',
  schoolType_id: '',
  accountStatus: 'Active', // Default value
};

const initialData = [
  {
    school_id: '1',
    school_name: 'ZP Pench',
    town_id: '23',
    taluka_id: '3',
    schoolType_id: '68',
    accountStatus: 'Active',
  },
]; 

function School() {
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

  const handleEditClick = (school_id) => {
    const rowIndex = data.findIndex((row) => row.school_id === school_id);
    if (rowIndex !== -1) {
      const selectedRow = data[rowIndex];
      setFormData({
        school_id: selectedRow.school_id,
        school_name: selectedRow.school_name,
        town_id: selectedRow.town_id,
        taluka_id: selectedRow.taluka_id,
        schoolType_id: selectedRow.schoolType_id,
        accountStatus: selectedRow.accountStatus,
      });
      setEditing(true);
      setEditRowIndex(rowIndex);
      setShowForm(true);
    }
  };

  const handleDeleteClick = (school_id) => {
    const rowIndex = data.findIndex((row) => row.school_id === school_id);
    if (rowIndex !== -1) {
      const shouldDelete = window.confirm("Do you want to delete this School?");
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
    { name: "School ID", selector: "school_id", sortable: true, isRequired: true, value: "number" },
    { name: "School Name", selector: "school_name", sortable: true, isRequired: true },
    { name: "Town ID", selector: "town_id", sortable: true, isRequired: true },
    { name: "Taluka ID", selector: "taluka_id", sortable: true, isRequired: true },
    { name: "School Type ID", selector: "schoolType_id", sortable: true, isRequired: true },
    { name: "School Status", selector: "accountStatus", sortable: true, options: ['Active', 'Inactive'] }, // Add options property here
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => handleEditClick(row.school_id)}
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
          onClick={() => handleDeleteClick(row.school_id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className='text-black p-4'>
      <h1 className='text-3xl font-bold mb-4'>School Details</h1>
      <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4">
        {showForm ? "Close Form" : "Add School"}
      </button>

      {showForm && (
        <form onSubmit={handleFormSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label htmlFor="school_id" className="block text-gray-700 font-semibold">School ID:</label>
            <input
              type="text"
              id="school_id"
              name="school_id"
              value={formData.school_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="school_name" className="block text-gray-700 font-semibold">School Name:</label>
            <input
              type="text"
              id="school_name"
              name="school_name"
              value={formData.school_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="town_id" className="block text-gray-700 font-semibold">Town ID:</label>
            <input
              type="text"
              id="town_id"
              name="town_id"
              value={formData.town_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="taluka_id" className="block text-gray-700 font-semibold">Taluka ID:</label>
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
            <label htmlFor="schoolType_id" className="block text-gray-700 font-semibold">School Type ID:</label>
            <input
              type="text"
              id="schoolType_id"
              name="schoolType_id"
              value={formData.schoolType_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="accountStatus" className="block text-gray-700 font-semibold">School Status:</label>
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

export default School;
