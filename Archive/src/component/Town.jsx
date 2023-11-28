import React, { useState } from "react";
import DataTable from "react-data-table-component";

const initialFormData = {
  town_id: "",
  town_name: "",
  taluka_id: "",
  accountStatus: "Active", // Default value
};

const initialData = [
  {
    town_id: "1",
    taluka_id: "1",
    town_name: "Alphonse",
    accountStatus: "Active",
  },
];

function Town() {
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

  const handleEditClick = (town_id) => {
    const rowIndex = data.findIndex((row) => row.town_id === town_id);
    if (rowIndex !== -1) {
      const selectedRow = data[rowIndex];
      setFormData({
        town_id: selectedRow.town_id,
        town_name: selectedRow.town_name,
        taluka_id: selectedRow.taluka_id,
        accountStatus: selectedRow.accountStatus,
      });
      setEditing(true);
      setEditRowIndex(rowIndex);
      setShowForm(true);
    }
  };

  const handleDeleteClick = (town_id) => {
    const rowIndex = data.findIndex((row) => row.town_id === town_id);
    if (rowIndex !== -1) {
      const shouldDelete = window.confirm("Do you want to delete this Town?");
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
      name: "Town ID",
      selector: "town_id",
      sortable: true,
      isRequired: true,
    },
    {
      name: "Town Name",
      selector: "town_name",
      sortable: true,
      isRequired: true,
    },
    {
      name: "Taluka ID",
      selector: "taluka_id",
      sortable: true,
      isRequired: true,
    },
    {
      name: "Town Status",
      selector: "accountStatus",
      sortable: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => handleEditClick(row.town_id)}
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
          onClick={() => handleDeleteClick(row.town_id)}
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <div className="text-black p-4">
      <h1 className="text-3xl font-bold mb-4">Town Details</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? "Close Form" : "Add Town"}
      </button>

      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="town_id"
              className="block text-gray-700 font-semibold"
            >
              Town ID:
            </label>
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
            <label
              htmlFor="town_name"
              className="block text-gray-700 font-semibold"
            >
              Town Name:
            </label>
            <input
              type="text"
              id="town_name"
              name="town_name"
              value={formData.town_name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
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
              htmlFor="accountStatus"
              className="block text-gray-700 font-semibold"
            >
              Taluka Status:
            </label>
            <div className="flex">
              {["Active", "Inactive"].map((option) => (
                <label key={option} className="mr-2">
                  <input
                    type="radio"
                    name="accountStatus"
                    value={option}
                    checked={formData.accountStatus === option}
                    onChange={handleInputChange}
                  />{" "}
                  {option}
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editing ? "Save" : "Submit"}
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

export default Town;
