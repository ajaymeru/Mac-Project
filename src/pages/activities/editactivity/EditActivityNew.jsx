// import React, { useState } from 'react'
// import "./createactivity.css"
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import { MdAdd, MdDelete } from 'react-icons/md';


// function CreateActivity() {

//     const [fileName, setFileName] = useState("No file chosen");

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];
//         setFileName(file ? file.name : "No file chosen");
//     };
     
//     const [fileNames, setFileNames] = useState([]); // Default file
      
//     const handleDoc = (event) => {
//           const files = event.target.files;
//           let names = [];
      
//           Array.from(files).forEach((file) => {
//             let extension = file.name.split(".").pop().toLowerCase();
//             if (extension === "pdf") {
//               names.push(file.name);
//             } else {
//               alert("Only .pdf files are allowed"); // Replace with SweetAlert if needed
//             }
//           });
      
//           setFileNames((prevNames) => [...prevNames, ...names]);
//     };
     
//     // Stores
//     const [selectedStores, setSelectedStores] = useState([]);

//     const stores = ["Store 1", "Store 2", "Store 3"];

//     const handleCheckboxChange = (store) => {
//         setSelectedStores((prevSelected) =>
//         prevSelected.includes(store)
//             ? prevSelected.filter((s) => s !== store) // Remove if already selected
//             : [...prevSelected, store] // Add if not selected
//         );
//     };

      
//     const [taskCards, setTaskCards] = useState([
//         {
//             taskNumber: '0101',
//             taskName: 'Store 1_Task 1',
//             items: [
//                 { 
//                     title: 'Item title', 
//                     itemCode: '01', 
//                     description: 'Lorem Ipsum Dolor sit amet', 
//                     width: 20, 
//                     height: 50, 
//                     quantity: 10, 
//                     total_sft: 135.2, 
//                     rate: 1000, 
//                     tax: 100, 
//                     amount: 300 
//                 }
//             ]
//         }
//     ]);
     
//     // State to show/hide Add Task button
//     const [showAddTask, setShowAddTask] = useState(false);
      
//     // Event handlers and helper functions
//     const handleTaskChange = (taskIndex, field, value) => {
//         const updatedTasks = [...taskCards];
//         updatedTasks[taskIndex][field] = value;
//         setTaskCards(updatedTasks);
//     };
     
//     const handleItemChange = (taskIndex, itemIndex, field, value) => {
//         const updatedTasks = [...taskCards];
//         updatedTasks[taskIndex].items[itemIndex][field] = value;
//         setTaskCards(updatedTasks);
//     };
     
//       // Add a new item to a specific task
//     const addItem = (taskIndex) => {
//         const updatedTasks = [...taskCards];
//         updatedTasks[taskIndex].items.push({ 
//           title: '', 
//           itemCode: '', 
//           description: '', 
//           width: '', 
//           height: '', 
//           quantity: '', 
//           total_sft: '', 
//           rate: '', 
//           tax: '', 
//           amount: '' 
//         });
//         setTaskCards(updatedTasks);
//       };
     
//       // Delete an item from a specific task
//     const deleteItem = (taskIndex, itemIndex) => {
//         const updatedTasks = [...taskCards];
//         updatedTasks[taskIndex].items = updatedTasks[taskIndex].items.filter((_, idx) => idx !== itemIndex);
//         setTaskCards(updatedTasks);
//     };
     
//       // Clear all items in a specific task
//     const handleClear = (taskIndex) => {
//         const updatedTasks = [...taskCards];
//         updatedTasks[taskIndex] = {
//           taskNumber: '',
//           taskName: '',
//           items: [
//             { title: '', itemCode: '', description: '', width: '', height: '', quantity: '', total_sft: '', rate: '', tax: '', amount: '' }
//           ]
//         };
//         setTaskCards(updatedTasks);
//     };
     
//       // Save the current task state and show Add Task button
//     const handleSave = (taskIndex) => {
//         // Keep existing task data, just enable "Add Task" button
//         setShowAddTask(true);
//     };
     
//       // Add a new task card
//     const handleAddTask = () => {
//         const newTaskNumber = `0${taskCards.length + 1}01`;
//         const newTask = {
//           taskNumber: newTaskNumber,
//           taskName: `Task ${taskCards.length + 1}`,
//           items: [
//             { title: '', itemCode: '', description: '', width: '', height: '', quantity: '', total_sft: '', rate: '', tax: '', amount: '' }
//           ]
//         };
        
//         setTaskCards([...taskCards, newTask]);
//         setShowAddTask(false); // Hide "Add Task" after adding a new task
//     };
    
//     return (
//         <div className="employeeContainer">
//             <h5 className='create-employee'>Activity Screen EndUser</h5>
//             <div className="card forms-card">
//                 <div className="row mb-3">
//                     <div className="col-12 col-lg-6 mb-3">
//                         <div className="row align-items-center">
//                             <div className="col-12 col-lg-4">
//                                 <label className="form-label">Activity Number</label>
//                             </div>
//                             <div className="col-12 col-lg-8">
//                                 <input type="text" className="form-control" placeholder="" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12 col-lg-6 mb-3">
//                         <div className="row align-items-center">
//                             <div className="col-12 col-lg-4">
//                                 <label className="form-label">Activity Name</label>
//                             </div>
//                             <div className="col-12 col-lg-8">
//                                 <input type="text" className="form-control" placeholder="" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12 col-lg-6 mb-3">
//                         <div className="row align-items-center">
//                             <div className="col-12 col-lg-4">
//                                 <label className="form-label">Activity Date</label>
//                             </div>
//                             <div className="col-12 col-lg-8">
//                                 <input type="date" className="form-control" placeholder="" />
//                             </div>
//                         </div>
//                     </div>
//                     {/* <div className="col-12 col-lg-6 mb-3">
//                         <div className="row align-items-center">
//                             <div className="col-12 col-lg-4">
//                                 <label className="form-label">Expected Completion Date</label>
//                             </div>
//                             <div className="col-12 col-lg-8">
//                                 <input type="date" className="form-control" placeholder="" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12 col-lg-6 mb-3">
//                         <div className="row align-items-center">
//                             <div className="col-12 col-lg-4">
//                                 <label className="form-label">Activity Desc</label>
//                             </div>
//                             <div className="col-12 col-lg-8">
                                
//                                 <textarea className="form-control" rows="1"></textarea>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12 col-lg-6 mb-3">
//                         <div className="row align-items-center">
//                             <div className="col-12 col-lg-4">
//                                 <label className="form-label">PO/WO Date</label>
//                             </div>
//                             <div className="col-12 col-lg-8">
//                                 <input type="date" className="form-control" placeholder="" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12 col-lg-6 mb-3">
//                         <div className="row align-items-center">
//                             <div className="col-12 col-lg-4">
//                                 <label className="form-label">PO/WO Number</label>
//                             </div>
//                             <div className="col-12 col-lg-8">
//                                 <input type="text" className="form-control" placeholder="" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12 col-lg-6 mb-3">
//                         <div className="row align-items-center">
//                             <div className="col-12 col-lg-4">
//                                 <label className="form-label">Promo Period From</label>
//                             </div>
//                             <div className="col-12 col-lg-8">
//                                 <input type="date" className="form-control" placeholder="" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12 col-lg-6 mb-3">
//                         <div className="row align-items-center">
//                             <div className="col-12 col-lg-4">
//                                 <label className="form-label">Promo Period To</label>
//                             </div>
//                             <div className="col-12 col-lg-8">
//                                 <input type="date" className="form-control" placeholder="" />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12 col-lg-6 mb-3">
//                         <div className="row align-items-center">
//                             <div className="col-12 col-lg-4">
//                                 <label className="form-label">Select Vendor</label>
//                             </div>
//                             <div className="col-12 col-lg-8">
//                                 <select className="form-select">
//                                     <option value="" disabled selected>Select a vendor</option>
//                                     <option value="vendor1">Vendor 1</option>
//                                     <option value="vendor2">Vendor 2</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12 col-lg-6 mb-3">
//                         <div className="row align-items-center">
//                             <div className="col-12 col-lg-4">
//                                 <label className="form-label">Execution By</label>
//                             </div>
//                             <div className="col-12 col-lg-8">
//                                 <select className="form-select">
//                                     <option value="" disabled selected>Select an Executor</option>
//                                     <option value="vendor1">Vendor</option>
//                                     <option value="vendor2">Store Team</option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12 col-lg-6 mb-3">
//                         <div className="row align-items-center">
//                             <div className="col-12 col-lg-4">
//                             <label htmlFor="storeSelect" className="form-label">
//                                 Select Store
//                             </label>
//                             </div>
//                             <div className="col-12 col-lg-8">
//                                 <div className="dropdown">
//                                     <button
//                                     className="form-select"
//                                     type="button"
//                                     id="storeSelect"
//                                     data-bs-toggle="dropdown"
//                                     aria-expanded="false"
//                                     >
//                                     {selectedStores.length > 0 ? selectedStores.join(", ") : "Select Store "}
//                                     </button>
//                                 <ul className="dropdown-menu" aria-labelledby="storeSelect">
//                                     {stores.map((store, index) => (
//                                         <li key={index} className="dropdown-item">
//                                             <label className="w-100">
//                                                 <input
//                                                 type="checkbox"
//                                                 className="form-check-input me-2"
//                                                 checked={selectedStores.includes(store)}
//                                                 onChange={() => handleCheckboxChange(store)}
//                                                 />
//                                                 {store}
//                                             </label>
//                                         </li>
//                                     ))}
//                                     </ul>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12 col-lg-6 mb-3">
//                         <h6 className="mb-3 text-black" style={{ textWrap: "nowrap" }}>
//                             <strong>Reference PPT</strong>
//                         </h6>
//                         <div className="choose-file-input mt-3">
//                             <label className="btn choose-file-btn" htmlFor="pptFileInput">
//                                 Choose File
//                             </label>

//                             <input
//                                 id="pptFileInput"
//                                 type="file"
//                                 style={{ display: "none" }}
//                                 onChange={handleFileChange}  Separate handler for PPT
//                             />

//                             <p
//                                 className="mb-0 choose-file-name"
//                                 onClick={() => document.getElementById("pptFileInput").click()}
//                                 style={{ cursor: "pointer" }}
//                             >
//                                 {fileName || "No file chosen"}
//                             </p>
//                         </div>
//                     </div>
//                     <div className="col-12 col-lg-6 mb-3">
//                         <h6 className="mb-3 text-black" style={{ textWrap: "nowrap" }}>
//                             <strong>Commercial Documents</strong>
//                         </h6>
//                         <div className="upload-doc-file">
//                             <div className="d-flex align-items-center">
//                                 <label className="btn" id="doc-file" style={{ cursor: "pointer", padding: "0.6rem 1rem" }}>
//                                     Choose File
//                                     <input
//                                     id="docFileInput"
//                                     type="file"
//                                     accept=".pdf"
//                                     hidden
//                                     multiple
//                                     onChange={handleDoc}  Separate handler for documents
//                                     />
//                                 </label>
//                                 <p
//                                     className="mb-0"
//                                     style={{ marginLeft: "10px", cursor: "pointer" }}
//                                     onClick={() => document.getElementById("docFileInput").click()}
//                                 >
//                                     {fileNames.length === 0 ? "No file chosen" : fileNames.join(", ")}
//                                 </p>
//                             </div>
//                         </div>
//                     </div> */}
//                 </div>
//                 <h5 className='accordion-heading'>Tasks</h5>
//                 {taskCards.map((task, taskIndex) => (
//                     <div key={taskIndex} className="task-card remove-box-shadow">
//                         <div className="row mb-3">
//                             <div className="col-12 col-lg-6">
//                                 <div className="row align-items-center">
//                                     <div className="col-12 col-lg-4">
//                                         <label className="form-label">Task Number</label>
//                                     </div>
//                                     <div className="col-12 col-lg-8">
//                                         <input 
//                                         type="text" 
//                                         className="form-control" 
//                                         value={task.taskNumber} 
//                                         onChange={(e) => handleTaskChange(taskIndex, 'taskNumber', e.target.value)}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="col-12 col-lg-6">
//                                 <div className="row align-items-center">
//                                 <div className="col-12 col-lg-4">
//                                     <label className="form-label">Task Name</label>
//                                 </div>
//                                 <div className="col-12 col-lg-8">
//                                     <input 
//                                     type="text" 
//                                     className="form-control" 
//                                     value={task.taskName} 
//                                     onChange={(e) => handleTaskChange(taskIndex, 'taskName', e.target.value)}
//                                     />
//                                 </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="row">
//                             <div className="row align-items-center">
//                                 <div className="col-12 col-lg-4">
//                                     <label className="form-label">Task Name</label>
//                                 </div>
//                                 <div className="col-12 col-lg-8">
//                                     <input 
//                                     type="text" 
//                                     className="form-control" 
//                                     value={task.taskName} 
//                                     onChange={(e) => handleTaskChange(taskIndex, 'taskName', e.target.value)}
//                                     />
//                                 </div>
//                         </div>
//                         <div className="card table-card mt-3" style={{ width: "100%" }}>
//                             <div className="tableContainer items-table" style={{ overflowX: "auto", maxWidth: "calc(100vw - 360px)"}}>
//                                 <table className="table" style={{ minWidth: "100vw", tableLayout: "auto", paddingInline: '1em'}}>
//                                 <thead className="table-head-color">
//                                     <tr>
//                                     <th className='table-heading'>Element Name</th>
//                                     <th className='table-heading'>Item Code</th>
//                                     <th className='table-heading'>Item Description</th>
//                                     <th className='table-heading'>Width</th>
//                                     <th className='table-heading'>Height</th>
//                                     <th className='table-heading'>Quantity</th>
//                                     <th className='table-heading'>Total Sft</th>
//                                     <th className='table-heading'>Rate</th>
//                                     <th className='table-heading'>Tax</th>
//                                     <th className='table-heading'>Amount</th>
//                                     <th className='table-heading'>Actions</th>
//                                     </tr>
//                                 </thead>

//                                 <tbody>
//                                 {task.items.length > 0 ? (
//                                     task.items.map((item, itemIndex) => (
//                                         <tr key={itemIndex} className='table-row-color'>
//                                         <td>
//                                             <input 
//                                             type="text" 
//                                             className="table-data-form-control" 
//                                             value={item.title || ''} 
//                                             onChange={(e) => handleItemChange(taskIndex, itemIndex, "title", e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input 
//                                             type="text" 
//                                             className="table-data-form-control" 
//                                             value={item.itemCode || ''} 
//                                             onChange={(e) => handleItemChange(taskIndex, itemIndex, "itemCode", e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input 
//                                             type="text" 
//                                             className="table-data-form-control" 
//                                             value={item.description || ''} 
//                                             onChange={(e) => handleItemChange(taskIndex, itemIndex, "description", e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input 
//                                             type="text" 
//                                             className="table-data-form-control" 
//                                             value={item.width || ''} 
//                                             onChange={(e) => handleItemChange(taskIndex, itemIndex, "width", e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input 
//                                             type="text" 
//                                             className="table-data-form-control" 
//                                             value={item.height || ''} 
//                                             onChange={(e) => handleItemChange(taskIndex, itemIndex, "height", e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input 
//                                             type="text" 
//                                             className="table-data-form-control" 
//                                             value={item.quantity || ''} 
//                                             onChange={(e) => handleItemChange(taskIndex, itemIndex, "quantity", e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input 
//                                             type="text" 
//                                             className="table-data-form-control" 
//                                             value={item.total_sft || ''} 
//                                             onChange={(e) => handleItemChange(taskIndex, itemIndex, "total_sft", e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input 
//                                             type="text" 
//                                             className="table-data-form-control" 
//                                             value={item.rate || ''} 
//                                             onChange={(e) => handleItemChange(taskIndex, itemIndex, "rate", e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input 
//                                             type="text" 
//                                             className="table-data-form-control" 
//                                             value={item.tax || ''} 
//                                             onChange={(e) => handleItemChange(taskIndex, itemIndex, "tax", e.target.value)}
//                                             />
//                                         </td>
//                                         <td>
//                                             <input 
//                                             type="text" 
//                                             className="table-data-form-control" 
//                                             value={item.amount || ''} 
//                                             onChange={(e) => handleItemChange(taskIndex, itemIndex, "amount", e.target.value)}
//                                             />
//                                         </td>
//                                         <td className='d-flex align-items-center'>
//                                             <button className="btn btn-delete me-2" onClick={() => deleteItem(taskIndex, itemIndex)}>
//                                             <MdDelete />
//                                             </button>
//                                             <button className="btn btn-add" onClick={() => addItem(taskIndex)}>
//                                             <MdAdd />
//                                             </button>
//                                         </td>
//                                         </tr>
//                                     ))
//                                     ) : (
//                                     <tr>
//                                         <td colSpan="11" className="text-center">No records found</td>
//                                     </tr>
//                                     )}
//                                 </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                         <div className="text-center mt-3">
//                             <button className='btn btn-dark px-4 me-4' onClick={() => handleSave(taskIndex)}>Save</button>
//                             <button className='btn btn-danger px-4' onClick={() => handleClear(taskIndex)}>Clear</button>
//                         </div>
//                     </div>
//                 ))}
//                 {showAddTask && (
//                 <div className="text-end mt-3 cursor-pointer" onClick={handleAddTask}>
//                     + Add Task
//                 </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default CreateActivity

