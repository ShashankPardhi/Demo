import React, { useState } from "react";
import DataTable from "react-data-table-component";

const initialFormData = {
  schoolType_name: "",
  schoolType_id: "",
};

const initialData = [
  {
    schoolType_name: "ZP Pench",
    schoolType_id: "68",
  },
];

function SchoolType() {
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

  const handleEditClick = (schoolType_id) => {
    const rowIndex = data.findIndex((row) => row.schoolType_id === schoolType_id);
    if (rowIndex !== -1) {
      const selectedRow = data[rowIndex];
      setFormData({
        schoolType_id: selectedRow.schoolType_id,
        schoolType_name: selectedRow.schoolType_name,
      });
      setEditing(true);
      setEditRowIndex(rowIndex);
      setShowForm(true);
    }
  };

  const handleDeleteClick = (schoolType_id) => {
    const rowIndex = data.findIndex((row) => row.schoolType_id === schoolType_id);
    if (rowIndex !== -1) {
      const shouldDelete = window.confirm("Do you want to delete this School Type?");
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
    {
      name: "School Type ID",
      selector: "schoolType_id",
      sortable: true,
      isRequired: true,
      value: "number",
    },
    {
      name: "School Type Name",
      selector: "schoolType_name",
      sortable: true,
      isRequired: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => handleEditClick(row.schoolType_id)}
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
          onClick={() => handleDeleteClick(row.schoolType_id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="text-black p-4">
      <h1 className="text-3xl font-bold mb-4">School Type Details</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? "Close Form" : "Add School Type"}
      </button>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="schoolType_name"
              className="block text-gray-700 font-semibold"
            >
              School Type Name:
            </label>
            <input
              type="text"
              id="schoolType_name"
              name="schoolType_name"
              value={formData.schoolType_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="schoolType_id"
              className="block text-gray-700 font-semibold"
            >
              School Type ID:
            </label>
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

export default SchoolType;
