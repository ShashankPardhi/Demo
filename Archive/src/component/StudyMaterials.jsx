import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const initialFormData = {
  studyMaterial_id: '',
  name: '',
  description: '',
  subject_id: '',
  fileName: '',
  filePath: '', // Initialize with an empty string
  uploadedBy: '',
  uploadedOn: '',
  approvedBy: 'Admin', // Default value
  approvedOn: '',
  accountStatus: 'Active', // Default value
};

const initialData = [
  {
    studyMaterial_id: '1',
    name: 'Alphonse',
    description: 'Demo Desp',
    subject_id: '12',
    fileName: 'Trees',
    filePath: '',
    uploadedBy: 'Alphonse',
    uploadedOn: '25/09/2023',
    approvedBy: 'Admin', // Default value
    approvedOn: '26/09/2023',
    accountStatus: 'Active', // Default value
  },
];

function StudyMaterial() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [data, setData] = useState(initialData);
  const [editing, setEditing] = useState(false);
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [search, setSearch] = useState('');
const [selectedFile, setSelectedFile] = useState(null);
const [clickedImageSrc, setClickedImageSrc] = useState("");
const [imageModalOpen, setImageModalOpen] = useState(false);
const [rowImages, setRowImages] = useState({});




  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // If the input name is "filePath," update the filePath value
    if (name === 'filePath') {
      setFormData({ ...formData, filePath: e.target.files[0]?.name || '' });
    }
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

  const handleEditClick = (studyMaterial_id) => {
    const rowIndex = data.findIndex((row) => row.studyMaterial_id === studyMaterial_id);
    if (rowIndex !== -1) {
      const selectedRow = data[rowIndex];
      setFormData({
        studyMaterial_id: selectedRow.studyMaterial_id,
        name: selectedRow.name,
        description: selectedRow.description,
        subject_id: selectedRow.subject_id,
        fileName: selectedRow.fileName,
        filePath: selectedRow.filePath,
        uploadedBy: selectedRow.uploadedBy,
        uploadedOn: selectedRow.uploadedOn,
        approvedBy: selectedRow.approvedBy,
        approvedOn: selectedRow.approvedOn,
        accountStatus: selectedRow.accountStatus,
      });
      setEditing(true);
      setEditRowIndex(rowIndex);
      setShowForm(true);
    }
  };

  const handleDeleteClick = (studyMaterial_id) => {
    const rowIndex = data.findIndex((row) => row.studyMaterial_id === studyMaterial_id);
    if (rowIndex !== -1) {
      const shouldDelete = window.confirm('Do you want to delete this Study Material?');
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
  const conditionalDescriptionCellStyle = (column, row) => {
    return {
      width: row.description.length > 50 ? '200px' : 'auto', // Adjust the width as needed
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };
  };

    const handleImageClick = (imageSrc) => {
    setClickedImageSrc(imageSrc);
    setImageModalOpen(true);
  };

  const handleFileInputChange = (e, studyMaterial_id) => {
        const file = e.target.files[0];
        setSelectedFile(file); // Update the selected file (for displaying the currently selected image in the form)
      
        // Update the image state for the currently edited row
        setRowImages((prevImages) => ({
          ...prevImages,
          [studyMaterial_id]: file ? URL.createObjectURL(file) : "",
        }));
        setFormData({
          ...formData,
          filePath: "", // Clear the form's filePath to prevent confusion
        });
      };

  const columns = [
    { name: 'StudyMaterial ID', selector: 'studyMaterial_id', sortable: true, isRequired: true },
    { name: 'Name', selector: 'name', sortable: true, isRequired: true },
    {
      name: 'Description',
      selector: 'description',
      sortable: true,
      cell: (row) => (
        <div style={conditionalDescriptionCellStyle(null, row)}>{row.description}</div>
      ),
    },    { name: 'Subject Id', selector: 'subject_id', sortable: true },
    { name: 'File Name', selector: 'fileName', sortable: true },
    {
      name: "File Path",
      cell: (row) => (
        <img
          src={
            selectedFile
              ? URL.createObjectURL(selectedFile)
              : row.filePath || ""
          }
          alt={row.fileName}
          style={{ width: "100px", height: "auto", cursor: "pointer" }}
          onClick={() =>
            handleImageClick(
              selectedFile ? URL.createObjectURL(selectedFile) : row.filePath
            )
          }
        />
      ),
      sortable: true,
    },  
      { name: 'Uploaded By', selector: 'uploadedBy', sortable: true },
    { name: 'Uploaded On', selector: 'uploadedOn', sortable: true },
    { name: 'Approved By', selector: 'approvedBy', sortable: true },
    { name: 'Approved On', selector: 'approvedOn', sortable: true },
    {
      name: 'Account Status',
      selector: 'accountStatus',
      sortable: true,
      cell: (row) => (row.accountStatus === 'Active' ? 'Active' : 'Inactive'),
      grow: 1,
    },
    {
      name: 'Edit',
      cell: (row) => (
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => handleEditClick(row.studyMaterial_id)}
        >
          Edit
        </button>
      ),
      grow: 1,
    },
    {
      name: 'Delete',
      cell: (row) => (
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-2"
          onClick={() => handleDeleteClick(row.studyMaterial_id)}
        >
          Delete
        </button>
      ),
      grow: 1,
    },
  ];

  return (
    <div className="text-black p-4">
      <h1 className="text-3xl font-bold mb-4">StudyMaterial Details</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {showForm ? 'Close Form' : 'Add StudyMaterial'}
      </button>
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="bg-white p-6 rounded shadow-md"
        >
          <div className="mb-4">
            <label htmlFor="studyMaterial_id" className="block text-gray-700 font-semibold">
              StudyMaterial ID:
            </label>
            <input
              type="text"
              id="studyMaterial_id"
              name="studyMaterial_id"
              value={formData.studyMaterial_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold">Name:</label>
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
            <label htmlFor="description" className="block text-gray-700 font-semibold">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject_id" className="block text-gray-700 font-semibold">Subject Id:</label>
            <input
              type="tel"
              id="subject_id"
              name="subject_id"
              value={formData.subject_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="fileName" className="block text-gray-700 font-semibold">File Name:</label>
            <input
              type="text"
              id="fileName"
              name="fileName"
              value={formData.fileName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="filePath" className="block text-gray-700 font-semibold">
              File Path:
            </label>
            <input
              type="file"
              id="filePath"
              name="filePath"
              // Remove the value attribute as it's not needed for file input
              onChange={handleFileInputChange}         
                   className="w-full p-2 border rounded"
            />
          </div>

          {/* Display the selected file name */}
          {imageModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <img
                  src={clickedImageSrc}
                  alt="Clicked Image"
                  style={{ maxWidth: "50%" }}
                />
                <button
                  onClick={() => {
                    setImageModalOpen(false);
                    setClickedImageSrc("");
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {formData.filePath && (
            <div className="mb-4">
              <p className="text-gray-700">File Path: {formData.filePath}</p>
            </div>
          )}

            <div className="mb-4">
            <label htmlFor="uploadedBy" className="block text-gray-700 font-semibold">Uploaded By:</label>
            <input
              type="text"
              id="uploadedBy"
              name="uploadedBy"
              value={formData.uploadedBy}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="uploadedOn" className="block text-gray-700 font-semibold">Uploaded On:</label>
            <input
              type="date"
              id="uploadedOn"
              name="uploadedOn"
              value={formData.uploadedOn}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="approvedBy" className="block text-gray-700 font-semibold">Approved By:</label>
            <input
              type="text"
              id="approvedBy"
              name="approvedBy"
              value={formData.approvedBy}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="approvedOn" className="block text-gray-700 font-semibold">Approved On:</label>
            <input
              type="date"
              id="approvedOn"
              name="approvedOn"
              value={formData.approvedOn}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
  <label htmlFor="accountStatus" className="block text-gray-700 font-semibold">
    Account Status:
  </label>
  <div className="flex">
    <label className="mr-2">
      <input
        type="radio"
        name="accountStatus"
        value="Active"
        checked={formData.accountStatus === "Active"}
        onChange={handleInputChange}
      />{" "}
      Active
    </label>
    <label className="mr-2">
      <input
        type="radio"
        name="accountStatus"
        value="Inactive"
        checked={formData.accountStatus === "Inactive"}
        onChange={handleInputChange}
      />{" "}
      Inactive
    </label>
  </div>
</div>

          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
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
              type="text"
              className="w-25 p-2 font-medium"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          }
        />
      </div>    </div>
  );
}

export default StudyMaterial;

////////////////////////////////////////////
////////////////////////////////////////////
////////////////////////////////////////////

// import React, { useState, useEffect } from "react";

// const initialFormData = {
//   studyMaterial_id: "",
//   name: "",
//   description: "",
//   subject_id: "",
//   fileName: "",
//   filePath: "",
//   uploadedBy: "",
//   uploadedOn: "",
//   approvedBy: "Admin",
//   approvedOn: "",
//   accountStatus: "Active",
// };

// const initialData = [
//   {
//     studyMaterial_id: "1",
//     name: "Alphonse",
//     description: "Demo Desp",
//     subject_id: "12",
//     fileName: "Trees",
//     filePath: "",
//     uploadedBy: "Alphonse",
//     uploadedOn: "25/09/2023",
//     approvedBy: "Admin",
//     approvedOn: "26/09/2023",
//     accountStatus: "Active",
//   },
// ];

// function StudyMaterial() {
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState(initialFormData);
//   const [data, setData] = useState(initialData);
//   const [editing, setEditing] = useState(false);
//   const [editRowIndex, setEditRowIndex] = useState(null);
//   const [search, setSearch] = useState("");
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [imageModalOpen, setImageModalOpen] = useState(false);
//   const [clickedImageSrc, setClickedImageSrc] = useState("");
//   const [uploadedOn, setUploadedOn] = useState(""); // Add a state for Uploaded On
//     // CSS class names for responsive design
//     const formClass = showForm ? "block" : "hidden";
//     const tableClass = showForm ? "hidden" : "block";

//     const [rowImages, setRowImages] = useState({});


//   useEffect(() => {
//     // When the form is opened, set the "Uploaded On" field to today's date
//     if (showForm) {
//       const today = new Date();
//       const dd = String(today.getDate()).padStart(2, "0");
//       const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
//       const yyyy = today.getFullYear();
//       const formattedDate = `${dd}/${mm}/${yyyy}`;
//       setUploadedOn(formattedDate);
//     }
//   }, [showForm]);
  

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // If the input name is "filePath," update the filePath value
//     if (name === "filePath") {
//       setFormData({ ...formData, filePath: e.target.files[0]?.name || "" });
//     }
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
    
//     // Get the current date in the format "DD/MM/YYYY"
//     const today = new Date();
//     const dd = String(today.getDate()).padStart(2, '0');
//     const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
//     const yyyy = today.getFullYear();
//     const formattedDate = `${dd}/${mm}/${yyyy}`;
    
//     if (editing && editRowIndex !== null) {
//       const updatedData = [...data];
//       const editedRow = {
//         ...formData,
//         uploadedOn: formattedDate, // Set uploadedOn to the formatted date
//       };
//       updatedData[editRowIndex] = editedRow;
//       setData(updatedData);
//       setEditing(false);
//       setEditRowIndex(null);
//     } else {
//       const newFormData = {
//         ...formData,
//         uploadedOn: formattedDate, // Set uploadedOn to the formatted date
//       };
//       setData([...data, newFormData]);
//     }
//     setFormData(initialFormData);
//     setShowForm(false);
//   };
  
  

//   const handleEditClick = (studyMaterial_id) => {
//     const rowIndex = data.findIndex(
//       (row) => row.studyMaterial_id === studyMaterial_id
//     );
//     if (rowIndex !== -1) {
//       const selectedRow = data[rowIndex];
//       setFormData({
//         studyMaterial_id: selectedRow.studyMaterial_id,
//         name: selectedRow.name,
//         description: selectedRow.description,
//         subject_id: selectedRow.subject_id,
//         fileName: selectedRow.fileName,
//         filePath: selectedRow.filePath,
//         uploadedBy: selectedRow.uploadedBy,
//         uploadedOn: selectedRow.uploadedOn,
//         approvedBy: selectedRow.approvedBy,
//         approvedOn: selectedRow.approvedOn,
//         accountStatus: selectedRow.accountStatus,
//       });
//       setEditing(true);
//       setEditRowIndex(rowIndex);
//       setShowForm(true);
//     }
//   };

//   const handleDeleteClick = (studyMaterial_id) => {
//     const rowIndex = data.findIndex(
//       (row) => row.studyMaterial_id === studyMaterial_id
//     );
//     if (rowIndex !== -1) {
//       const shouldDelete = window.confirm(
//         "Do you want to delete this Study Material?"
//       );
//       if (shouldDelete) {
//         const updatedData = [...data];
//         updatedData.splice(rowIndex, 1);
//         setData(updatedData);
//       }
//     }
//   };

//   const filteredData = data.filter((row) =>
//     Object.values(row).some((value) =>
//       value.toString().toLowerCase().includes(search.toLowerCase())
//     )
//   );

//   const saveImageToLocalStorage = (row, imagePath) => {
//     localStorage.setItem(`imagePath_${row.studyMaterial_id}`, imagePath);
//   };
  
//   // Function to retrieve image path from localStorage
//   const getImageFromLocalStorage = (row) => {
//     return localStorage.getItem(`imagePath_${row.studyMaterial_id}`);
//   };

//   const handleFileInputChange = (e, studyMaterial_id) => {
//     const file = e.target.files[0];
//     setSelectedFile(file); // Update the selected file (for displaying the currently selected image in the form)
  
//     // Update the image state for the currently edited row
//     setRowImages((prevImages) => ({
//       ...prevImages,
//       [studyMaterial_id]: file ? URL.createObjectURL(file) : "",
//     }));
//     setFormData({
//       ...formData,
//       filePath: "", // Clear the form's filePath to prevent confusion
//     });
//   };
  
//   const handleImageClick = (imageSrc) => {
//     setClickedImageSrc(imageSrc);
//     setImageModalOpen(true);
//   };

//   const handleSearchChange = (e) => {
//     setSearch(e.target.value);
//   };

//   const columns = [
//     {
//       name: "StudyMaterial ID",
//       selector: "studyMaterial_id",
//       sortable: true,
//       isRequired: true,
//     },
//     { name: "Name", selector: "name", sortable: true, isRequired: true },
//     {
//       name: "Description",
//       selector: "description",
//       sortable: true,
//       cell: (row) => (
//         <div
//           style={{
//             maxWidth: "200px",
//             whiteSpace: "nowrap",
//             overflow: "hidden",
//             textOverflow: "ellipsis",
//           }}
//         >
//           {row.description}
//         </div>
//       ),
//     },
//     { name: "Subject Id", selector: "subject_id", sortable: true },
//     { name: "File Name", selector: "fileName", sortable: true },
//     {
//       name: "File Path",
//       cell: (row) => (
//         <img
//           src={
//             selectedFile
//               ? URL.createObjectURL(selectedFile)
//               : row.filePath || ""
//           }
//           alt={row.fileName}
//           style={{ width: "100px", height: "auto", cursor: "pointer" }}
//           onClick={() =>
//             handleImageClick(
//               selectedFile ? URL.createObjectURL(selectedFile) : row.filePath
//             )
//           }
//         />
//       ),
//       sortable: true,
//     },
    

//     { name: "Uploaded By", selector: "uploadedBy", sortable: true },
//     { name: "Uploaded On", selector: "uploadedOn", sortable: true },
//     { name: "Approved By", selector: "approvedBy", sortable: true },
//     { name: "Approved On", selector: "approvedOn", sortable: true },
//     {
//       name: "Account Status",
//       selector: "accountStatus",
//       sortable: true,
//       cell: (row) => (row.accountStatus === "Active" ? "Active" : "Inactive"),
//       grow: 1,
//     },
//     {
//       name: "Edit",
//       cell: (row) => (
//         <button
//           className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
//           onClick={() => handleEditClick(row.studyMaterial_id)}
//         >
//           Edit
//         </button>
//       ),
//       grow: 1,
//     },
//     {
//       name: "Delete",
//       cell: (row) => (
//         <button
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded ml-2"
//           onClick={() => handleDeleteClick(row.studyMaterial_id)}
//         >
//           Delete
//         </button>
//       ),
//       grow: 1,
//     },
//   ];

//   return (
//     <div className="text-black p-4">
//       <h1 className="text-3xl font-bold mb-4">StudyMaterial Details</h1>
//        <div className="text-right mb-4">
//         <label htmlFor="search" className="text-gray-700 font-semibold mr-2">
//           Search:
//         </label>
//         <input
//           type="text"
//           id="search"
//           name="search"
//           value={search}
//           onChange={handleSearchChange}
//           placeholder="Search..."
//           className="p-2 border rounded"
//         />
//       </div>

//       <button
//         onClick={() => setShowForm(!showForm)}
//         className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-4"
//       >
//         {showForm ? "Close Form" : "Add StudyMaterial"}
//       </button>
//       {showForm && (
//         <div className={`md:flex ${formClass}`}>                
//           <form
//           onSubmit={handleFormSubmit}
//           className="bg-white p-6 rounded shadow-md"
//         >
//           <div className="mb-4">
//             <label
//               htmlFor="studyMaterial_id"
//               className="block text-gray-700 font-semibold"
//             >
//               StudyMaterial ID:
//             </label>
//             <input
//               type="text"
//               id="studyMaterial_id"
//               name="studyMaterial_id"
//               value={formData.studyMaterial_id}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700 font-semibold">
//               Name:
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="description"
//               className="block text-gray-700 font-semibold"
//             >
//               Description:
//             </label>
//             <input
//               type="text"
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="subject_id"
//               className="block text-gray-700 font-semibold"
//             >
//               Subject ID:
//             </label>
//             <input
//               type="text"
//               id="subject_id"
//               name="subject_id"
//               value={formData.subject_id}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="fileName"
//               className="block text-gray-700 font-semibold"
//             >
//               File Name:
//             </label>
//             <input
//               type="text"
//               id="fileName"
//               name="fileName"
//               value={formData.fileName}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="filePath"
//               className="block text-gray-700 font-semibold"
//             >
//               File Path:
//             </label>
//             <input
//               type="file"
//               id="filePath"
//               name="filePath"
//               onChange={handleFileInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>
//           {imageModalOpen && (
//             <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
//               <div className="bg-white p-4 rounded-lg shadow-lg">
//                 <img
//                   src={clickedImageSrc}
//                   alt="Clicked Image"
//                   style={{ maxWidth: "50%" }}
//                 />
//                 <button
//                   onClick={() => {
//                     setImageModalOpen(false);
//                     setClickedImageSrc("");
//                   }}
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-2"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}

//           {formData.filePath && (
//             <div className="mb-4">
//               <p className="text-gray-700">File Path: {formData.filePath}</p>
//             </div>
//           )}

//           <div className="mb-4">
//             <label
//               htmlFor="uploadedBy"
//               className="block text-gray-700 font-semibold"
//             >
//               Uploaded By:
//             </label>
//             <input
//               type="text"
//               id="uploadedBy"
//               name="uploadedBy"
//               value={formData.uploadedBy}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div className="mb-4">
//   <label htmlFor="uploadedOn" className="block text-gray-700 font-semibold">
//     Uploaded On:
//   </label>
//   <input
//     type="text"
//     id="uploadedOn"
//     name="uploadedOn"
//     value={uploadedOn}
//     readOnly // Make the input read-only to prevent changes
//     className="w-full p-2 border rounded"
//   />
// </div>


//           <div className="mb-4">
//             <label
//               htmlFor="approvedBy"
//               className="block text-gray-700 font-semibold"
//             >
//               Approved By:
//             </label>
//             <input
//               type="text"
//               id="approvedBy"
//               name="approvedBy"
//               value={formData.approvedBy}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="approvedOn"
//               className="block text-gray-700 font-semibold"
//             >
//               Approved On:
//             </label>
//             <input
//               type="date"
//               id="approvedOn"
//               name="approvedOn"
//               value={formData.approvedOn}
//               onChange={handleInputChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div className="mb-4">
//             <label
//               htmlFor="accountStatus"
//               className="block text-gray-700 font-semibold"
//             >
//               Account Status:
//             </label>
//             <div className="flex">
//               <label className="mr-2">
//                 <input
//                   type="radio"
//                   name="accountStatus"
//                   value="Active"
//                   checked={formData.accountStatus === "Active"}
//                   onChange={handleInputChange}
//                 />{" "}
//                 Active
//               </label>
//               <label className="mr-2">
//                 <input
//                   type="radio"
//                   name="accountStatus"
//                   value="Inactive"
//                   checked={formData.accountStatus === "Inactive"}
//                   onChange={handleInputChange}
//                 />{" "}
//                 Inactive
//               </label>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//           >
//             {editing ? "Save" : "Submit"}
//           </button>
//         </form>
//         </div>

//       )}
//       {editing && (
//         <button
//           onClick={() => setEditing(false)}
//           className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded ml-2"
//         >
//           Cancel Edit
//         </button>
//       )}
//       <div className={`md:flex ${tableClass}`}>
// <div className="text-center">
//         {/* Table */}
//         <table className="w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               {columns.map((column) => (
//                 <th key={column.name} className="border border-gray-300">
//                   {column.name}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((row) => (
//               <tr key={row.studyMaterial_id}>
//                 {columns.map((column) => (
//                   <td key={column.name} className="border border-gray-300">
//                     {column.cell ? column.cell(row) : row[column.selector]}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
// </div>
//     </div>
//   );
// }

// export default StudyMaterial;
