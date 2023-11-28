import React, { useState } from "react";
import DataTable from "react-data-table-component";

const initialFormData = {
  userId: "",
  name: "",
  email: "",
  phone: "",
  role: "Admin", // Default value
  accountStatus: "Active", // Default value
};

const initialData = [
  {
    userId: "1",
    name: "Alphonse",
    email: "asd@gmail.com",
    phone: "1234567890",
    role: "Admin",
    accountStatus: "Active",
  },
];

function User() {
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

  const handleEditClick = (userId) => {
    const rowIndex = data.findIndex((row) => row.userId === userId);
    if (rowIndex !== -1) {
      const selectedRow = data[rowIndex];
      setFormData({
        userId: selectedRow.userId,
        name: selectedRow.name,
        email: selectedRow.email,
        phone: selectedRow.phone,
        role: selectedRow.role,
        accountStatus: selectedRow.accountStatus,
      });
      setEditing(true);
      setEditRowIndex(rowIndex);
      setShowForm(true);
    }
  };

  const handleDeleteClick = (userId) => {
    const rowIndex = data.findIndex((row) => row.userId === userId);
    if (rowIndex !== -1) {
      const shouldDelete = window.confirm("Do you want to delete this user?");
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
    { name: "User ID", selector: "userId", sortable: true, grow: 1 },
    { name: "Name", selector: "name", sortable: true, grow: 2 },
    { name: "Email", selector: "email", sortable: true, grow: 3 },
    { name: "Phone", selector: "phone", sortable: true, grow: 2 },
    {
      name: "Role",
      selector: "role",
      sortable: true,
      cell: (row) => (row.role === "Admin" ? "Admin" : "Adhayapak"),
      grow: 1,
    },
    {
      name: "Account Status",
      selector: "accountStatus",
      sortable: true,
      cell: (row) => (row.accountStatus === "Active" ? "Active" : "Inactive"),
      grow: 1,
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => handleEditClick(row.userId)}
        >
          Edit
        </button>
      ),
      grow: 1,
    },
    {
      name: "Delete",
      cell: (row) => (
        <button
          className="bg-red-500 hover.bg-red-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => handleDeleteClick(row.userId)}
        >
          Delete
        </button>
      ),
      grow: 1,
    },
  ];

  return (
    <div className="text-black p-4">
      <h1 className="text-3xl font-bold mb-4">User Details</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? "Close Form" : "Add User"}
      </button>
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
          <div className="mb-4">
            <label
              htmlFor="userId"
              className="block text-gray-700 font-semibold"
            >
              User ID:
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-semibold"
            >
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="role" className="block text-gray-700 font-semibold">
              Role:
            </label>
            <div className="flex">
              {columns[4].cell({ role: formData.role }) === "Admin" ? (
                <label key="Admin" className="mr-2">
                  <input
                    type="radio"
                    name="role"
                    value="Admin"
                    checked={formData.role === "Admin"}
                    onChange={handleInputChange}
                  />{" "}
                  Admin
                </label>
              ) : (
                <label key="Adhayapak" className="mr-2">
                  <input
                    type="radio"
                    name="role"
                    value="Adhayapak"
                    checked={formData.role === "Adhayapak"}
                    onChange={handleInputChange}
                  />{" "}
                  Adhayapak
                </label>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="accountStatus"
              className="block text-gray-700 font-semibold"
            >
              Account Status:
            </label>
            <div className="flex">
              {columns[5].cell({ accountStatus: formData.accountStatus }) ===
              "Active" ? (
                <label key="Active" className="mr-2">
                  <input
                    type="radio"
                    name="accountStatus"
                    value="Active"
                    checked={formData.accountStatus === "Active"}
                    onChange={handleInputChange}
                  />{" "}
                  Active
                </label>
              ) : (
                <label key="Inactive" className="mr-2">
                  <input
                    type="radio"
                    name="accountStatus"
                    value="Inactive"
                    checked={formData.accountStatus === "Inactive"}
                    onChange={handleInputChange}
                  />{" "}
                  Inactive
                </label>
              )}
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
        <h1>HEADING IF ANY</h1>
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
              type="text"
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

export default User;
