import React, { useState, useRef, useEffect } from 'react';
import './editactivity.css';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Chip,
  ListItemText,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MdAdd, MdDelete } from 'react-icons/md';

const ColoredCheckbox = styled(Checkbox)(({ theme }) => ({
  color: theme.palette.main,
  '&.Mui-checked': {
    color: '#000',
    borderColor: '#000',
  },
}));
const storeItems = ['Store 1', 'Store 2', 'Store 3'];
function EditActivity() {
  const navigate = useNavigate('');

  const [selectedTestItems, setSelectedTestItems] = useState([
    'Store 1',
    'Store 2',
  ]);

  const handleSelectTestChange = (event) => {
    const value = event.target.value;
    setSelectedTestItems(value);
  };

  const [expanded, setExpanded] = React.useState(false);

  const [openAssign, setOpenAssign] = React.useState(false);
  const [scrollAssign, setScrollAssign] = React.useState('paper');
  const descriptionAssignElementRef = React.useRef(null);


  const handleCloseAssign = () => {
    setOpenAssign(false);
  };

  // For Task card management
  const [formObj, setFormObj] = useState({
    activityNumber: '5678',
    activityName: 'Big C Promo',
    activityDate: new Date().toISOString().split('T')[0],
    completionDate: new Date().toISOString().split('T')[0],
    activityDesc: 'Lorem ipsum dolor sit amet',
    poDate: new Date().toISOString().split('T')[0],
    poNumber: '1234',
    fromDate: new Date().toISOString().split('T')[0],
    toDate: new Date().toISOString().split('T')[0],
    vendor_id: 1,
    execution_id: 2,
    stores: ['Store 1', 'Store 2'],
  });

  // State to track all tasks
  const [tasks, setTasks] = useState([
    {
      expanded: true,
      checked: false,
      taskNumber: '0101',
      taskName: 'Store 1_Task 1',
      items: [
        {
          title: 'Lorem',
          itemCode: '01',
          description: 'Lorem Ipsum dolor sit amet',
          width: '20',
          height: '50',
          quantity: '40',
          total_sft: '30',
          rate: '1000',
          tax: '100',
          amount: '3000',
        },
        {
          title: 'Lorem',
          itemCode: '02',
          description: 'Lorem Ipsum dolor sit amet',
          width: '20',
          height: '50',
          quantity: '40',
          total_sft: '30',
          rate: '1000',
          tax: '100',
          amount: '3000',
        },
        {
          title: 'Lorem',
          itemCode: '03',
          description: 'Lorem Ipsum dolor sit amet',
          width: '20',
          height: '50',
          quantity: '40',
          total_sft: '30',
          rate: '1000',
          tax: '100',
          amount: '3000',
        },
      ],
    },
    {
      expanded: false,
      checked: false,
      taskNumber: '0102',
      taskName: 'Store 1_Task 2',
      items: [
        {
          title: 'Lorem',
          itemCode: '01',
          description: 'Lorem Ipsum dolor sit amet',
          width: '20',
          height: '50',
          quantity: '40',
          total_sft: '30',
          rate: '1000',
          tax: '100',
          amount: '3000',
        },
      ],
    },
    {
      expanded: false,
      checked: false,
      taskNumber: '0201',
      taskName: 'Store 2_Task 1',
      items: [
        {
          title: 'Lorem',
          itemCode: '01',
          description: 'Lorem Ipsum dolor sit amet',
          width: '20',
          height: '50',
          quantity: '40',
          total_sft: '30',
          rate: '1000',
          tax: '100',
          amount: '3000',
        },
        {
          title: 'Lorem',
          itemCode: '02',
          description: 'Lorem Ipsum dolor sit amet',
          width: '20',
          height: '50',
          quantity: '40',
          total_sft: '30',
          rate: '1000',
          tax: '100',
          amount: '3000',
        },
        {
          title: 'Lorem',
          itemCode: '03',
          description: 'Lorem Ipsum dolor sit amet',
          width: '20',
          height: '50',
          quantity: '40',
          total_sft: '30',
          rate: '1000',
          tax: '100',
          amount: '3000',
        },
      ],
    },
    {
      expanded: false,
      checked: false,
      taskNumber: '0202',
      taskName: 'Store 2_Task 2',
      items: [
        {
          title: 'Lorem',
          itemCode: '01',
          description: 'Lorem Ipsum dolor sit amet',
          width: '20',
          height: '50',
          quantity: '40',
          total_sft: '30',
          rate: '1000',
          tax: '100',
          amount: '3000',
        },
      ],
    },
  ]);

  const allItems = tasks.flatMap((task, taskIndex) =>
    task.items.map((item, itemIndex) => ({
      ...item,
      taskNumber: task.taskNumber,
      taskName: task.taskName,
      taskIndex,
      itemIndex,
    })),
  );

  const selectedTasks = tasks.filter(
    (taskVal) => taskVal.checked === true,
  ).length;

  // State to track which task cards are open
  const [accordions, setAccordions] = useState([{}]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [taskCards, setTaskCards] = useState(tasks);

  // Current task being edited
  const [taskObj, setTaskObj] = useState({});

  // Items for the current task
  const [items, setItems] = useState([]);

  const handleSave = (index) => {
    // Store the current taskObj and items in the taskCards array
    setAccordions((prev) => [...prev, {}]);
    const newTask = {
      taskNumber: taskObj.taskNumber,
      taskName: taskObj.taskName,
      items: [...items], // Store a copy of items array
    };

    // Update the taskCards list
    setTaskCards([...taskCards, newTask]);

    // Reset for the next task
    setTaskObj({ taskNumber: '', taskName: '' });
    setItems([
      {
        title: '',
        itemCode: '',
        description: '',
        width: '',
        height: '',
        quantity: '',
        total_sft: '',
        rate: '',
        tax: '',
        amount: '',
      },
    ]);

    // Ensure new accordion opens
    setIsAccordionOpen(true);
  };

  const addItem = (taskIndex) => {
    const updatedTasks = [...taskCards];
    if (updatedTasks[taskIndex] && updatedTasks[taskIndex].items) {
      updatedTasks[taskIndex].items.push({
        title: '',
        itemCode: '',
        description: '',
        width: '',
        height: '',
        quantity: '',
        total_sft: '',
        rate: '',
        tax: '',
        amount: '',
      });
      setTaskCards(updatedTasks);
      setHasChanges(true);
    } else {
      console.error(`Task at index ${taskIndex} is undefined or has no items array`);
    }
  };
  // Delete an item from the current task
  const deleteItem = (taskIndex, itemIndex) => {
    const updatedTasks = [...taskCards];
    if (updatedTasks[taskIndex] && updatedTasks[taskIndex].items) {
      updatedTasks[taskIndex].items = updatedTasks[taskIndex].items.filter((item, index) => index !== itemIndex);
      setTaskCards(updatedTasks);
      setHasChanges(true);
    } else {
      console.error(`Task at index ${taskIndex} is undefined or has no items array`);
    }
  };

  // show save and clear btns when made changes 
  const [hasChanges, setHasChanges] = useState(false);

  const handleAddTask = () => {
    setTaskCards([
      ...taskCards,
      { taskNumber: `${taskCards.length + 1}`, taskName: '', items: [] },
    ]);
    setIsAccordionOpen(true);
  };

  // Clear the current task form
  const handleClear = (index) => {
    setTaskObj({ taskNumber: `0${index + 1}`, taskName: '' });
    setItems([
      {
        title: '',
        itemCode: '',
        description: '',
        width: '',
        height: '',
        quantity: '',
        total_sft: '',
        rate: '',
        tax: '',
        amount: '',
      },
    ]);
  };

  // For file
  const [fileName, setFileName] = useState('reference.pptx');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : 'No file chosen');
  };

  // For Documents
  const docIp = useRef(null);
  const [fileNames, setFileNames] = useState(['commercial-documents.pdf']); // Default file

  const handleDocReset = () => {
    if (docIp.current) {
      docIp.current.value = '';
    }
  };

  const handleDoc = (event) => {
    const files = event.target.files;
    let names = [];

    Array.from(files).forEach((file) => {
      let extension = file.name.split('.').pop().toLowerCase();
      if (extension === 'pdf') {
        names.push(file.name);
      } else {
        alert('Only .pdf files are allowed'); // Replace with SweetAlert if needed
      }
    });

    setFileNames((prevNames) => [...prevNames, ...names]);
  };

  const [showAddTask, setShowAddTask] = useState(false);

  // Event handlers and helper functions
  const handleTaskChange = (taskIndex, field, value) => {
    const updatedTasks = [...taskCards];
    updatedTasks[taskIndex][field] = value;
    setTaskCards(updatedTasks);
  };
  const handleItemChange = (taskIndex, itemIndex, field, value) => {
    const updatedTasks = [...taskCards];
    updatedTasks[taskIndex].items[itemIndex][field] = value;
    setTaskCards(updatedTasks);
  };
  const vendorOptions = [
    { id: 1, name: 'Vendor 1' },
    { id: 2, name: 'Vendor 2' },
  ];

  const executorOptions = [
    { id: 'vendor', name: 'Vendor' },
    { id: 'store_team', name: 'Store Team' },
  ];

  const storeList = ['Store 1', 'Store 2', 'Store 3'];

  // Handle date changes
  const handleDateChange = (field, value) => {
    setFormObj((prev) => ({ ...prev, [field]: value }));
  };

  // Handle vendor selection
  const handleVendorChange = (e) => {
    setFormObj((prev) => ({ ...prev, vendor_id: e.target.value }));
  };

  // Handle executor selection
  const handleExecutorChange = (e) => {
    setFormObj((prev) => ({ ...prev, execution_id: e.target.value }));
  };

  // Handle store selection
  // const handleCheckboxChange = (store) => {
  //     setFormObj((prev) => {
  //         const isSelected = prev.stores.includes(store);
  //         const updatedStores = isSelected
  //             ? prev.stores.filter((s) => s !== store)
  //             : [...prev.stores, store];
  //         return { ...prev, stores: updatedStores };
  //     });
  // };

  useEffect(() => {
    console.log('Initial stores:', formObj.stores);
  }, []);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectChange = (store) => {
    setFormObj((prev) => {
      const updatedStores = prev.stores.includes(store)
        ? prev.stores.filter((s) => s !== store)
        : [...prev.stores, store];

      return {
        ...prev,
        stores: updatedStores,
      };
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="employeeContainer">
      <h5 className="create-employee">Edit Activity</h5>
      <div className="card forms-card">
        <div className="row mb-3">
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Activity Number</label>
              </div>
              <div className="col-12 col-lg-8 ">
                <input
                  type="text"
                  className="form-control"
                  value={formObj.activityNumber}
                  onChange={(e) =>
                    setFormObj({ ...formObj, activityNumber: e.target.value })
                  }
                  placeholder=""
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Activity Name</label>
              </div>
              <div className="col-12 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  value={formObj.activityName}
                  onChange={(e) =>
                    setFormObj({ ...formObj, activityName: e.target.value })
                  }
                  placeholder=""
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Activity Date</label>
              </div>
              <div className="col-12 col-lg-8">
                <input
                  className="form-control"
                  type="date"
                  value={formObj.activityDate}
                  onChange={(e) =>
                    handleDateChange('activityDate', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Expected Completion Date</label>
              </div>
              <div className="col-12 col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  placeholder=""
                  value={formObj.completionDate}
                  onChange={(e) =>
                    handleDateChange('completionDate', e.target.value)
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Activity Desc</label>
              </div>
              <div className="col-12 col-lg-8">
                {/* <input type="text" className="form-control" placeholder="" /> */}
                <textarea
                  className="form-control"
                  rows="3"
                  value={formObj.activityDesc}
                  onChange={(e) =>
                    setFormObj({ ...formObj, activityDesc: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">PO/WO Date</label>
              </div>
              <div className="col-12 col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  placeholder=""
                  value={formObj.poDate}
                  onChange={(e) => handleDateChange('poDate', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">PO/WO Number</label>
              </div>
              <div className="col-12 col-lg-8">
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  value={formObj.poNumber}
                  onChange={(e) =>
                    setFormObj({ ...formObj, poNumber: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Promo Period From</label>
              </div>
              <div className="col-12 col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  placeholder=""
                  value={formObj.fromDate}
                  onChange={(e) => handleDateChange('fromDate', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row align-items-center">
              <div className="col-12 col-lg-4">
                <label className="form-label">Promo Period To</label>
              </div>
              <div className="col-12 col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  placeholder=""
                  value={formObj.toDate}
                  onChange={(e) => handleDateChange('toDate', e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row">
              <div className="col-12 col-lg-4">
                <label className="form-label">Select Vendor</label>
              </div>
              <div className="col-12 col-lg-8">
                <select
                  className="form-select"
                  value={formObj.vendor_id}
                  onChange={handleVendorChange}
                >
                  <option value="" disabled>
                    Select a vendor
                  </option>
                  {vendorOptions.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <div className="row">
              <div className="col-12 col-lg-4">
                <label className="form-label">Execution By</label>
              </div>
              <div className="col-12 col-lg-8">
                <select
                  className="form-select"
                  value={formObj.execution_id}
                  onChange={handleExecutorChange}
                >
                  <option value="" disabled>
                    Select an Executor
                  </option>
                  {executorOptions.map((executor) => (
                    <option key={executor.id} value={executor.id}>
                      {executor.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* <div className="col-12 col-lg-6 mb-3">
                        <div className="row">
                            <div className="col-12 col-lg-4">
                                <label className="form-label">Select Store</label>
                            </div>
                            <div className="col-12 col-lg-8">
                                <div className="dropdown">
                                    <button
                                        className="form-select"
                                        type="button"
                                        id="storeSelect"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        {formObj.stores.length > 0 ? formObj.stores.join(", ") : "Select Store"}
                                    </button>
                                    <ul className="dropdown-menu" aria-labelledby="storeSelect">
                                        {storeList.map((store, index) => (
                                            <li key={index} className="dropdown-item">
                                                <label className="w-100">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input me-2"
                                                        checked={formObj.stores.includes(store)}
                                                        onChange={() => handleCheckboxChange(store)}
                                                    />
                                                    {store}
                                                </label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        
                    </div> */}
          <div className="col-12 col-lg-6 mb-3">
            <div className="row">
              <div className="col-12 col-lg-4">
                <label className="form-label">Select Store</label>
              </div>
              <div className="col-12 col-lg-8">
                <div className="dropdown">
                  <button
                    className="form-select text-start"
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    aria-expanded={isDropdownOpen}
                  >
                    {formObj.stores.length > 0
                      ? formObj.stores.join(', ')
                      : 'Select Store'}
                  </button>
                  <div
                    className={`dropdown-menu w-100 ${isDropdownOpen ? 'show' : ''}`}
                  >
                    {storeItems.map((item) => (
                      <div
                        key={item}
                        className="dropdown-item d-flex align-items-center"
                        onClick={() => handleSelectChange(item)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div className="form-check mb-0">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={formObj.stores.includes(item)}
                            onChange={() => handleSelectChange(item)}
                            id={`store-${item}`}
                          />
                          <label
                            className="form-check-label ms-2"
                            htmlFor={`store-${item}`}
                          >
                            {item}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <h6 className="mb-3 text-black" style={{ textWrap: 'nowrap' }}>
              <strong>Reference PPT</strong>
            </h6>
            <div className="choose-file-input mt-3">
              <label className="btn choose-file-btn" htmlFor="pptFileInput">
                Choose File
              </label>

              <input
                id="pptFileInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                Separate
                handler
                for
                PPT
              />

              <p
                className="mb-0 choose-file-name"
                onClick={() => document.getElementById('pptFileInput').click()}
                style={{ cursor: 'pointer' }}
              >
                {fileName || 'No file chosen'}
              </p>
            </div>
          </div>
          <div className="col-12 col-lg-6 mb-3">
            <h6 className="mb-3 text-black" style={{ textWrap: 'nowrap' }}>
              <strong>Commercial Documents</strong>
            </h6>
            <div className="upload-doc-file">
              <div className="d-flex align-items-center">
                <label
                  className="btn"
                  id="doc-file"
                  style={{ cursor: 'pointer', padding: '0.6rem 1rem' }}
                >
                  Choose File
                  <input
                    id="docFileInput"
                    type="file"
                    accept=".pdf"
                    hidden
                    multiple
                    onChange={handleDoc}
                    Separate
                    handler
                    for
                    documents
                  />
                </label>
                <p
                  className="mb-0"
                  style={{ marginLeft: '10px', cursor: 'pointer' }}
                  onClick={() =>
                    document.getElementById('docFileInput').click()
                  }
                >
                  {fileNames.length === 0
                    ? 'No file chosen'
                    : fileNames.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="accordion-heading mb-0">Tasks</h5>
          <div
            className="d-flex ms-4 align-items-center"
            style={{ gap: 10, flex: 1 }}
          >
            <input
              type="checkbox"
              style={{ position: 'relative', zIndex: 20 }}
              onChange={(ev) => {
                let newTasks = tasks.map((taskV) => {
                  taskV.checked = ev.target.checked;
                  return taskV;
                });
                setTasks(newTasks);
              }}
            />

            <Typography component="span" style={{ flex: 1 }}>
              Select All
            </Typography>
          </div>
          {selectedTasks > 0 && (
            <div className="col-12 col-lg-6 text-end">
              <button
                className="btn btn-success px-4 py-1 me-3"
                onClick={() => {
                  setOpenAssign(true);
                }}
              >
                Assign Stores
              </button>
            </div>
          )}
        </div>
        <Dialog
          className="task-dialog"
          open={openAssign}
          onClose={handleCloseAssign}
          scroll={scrollAssign}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">
            <strong>Assign Stores</strong>
          </DialogTitle>
          <DialogContent dividers={scrollAssign === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionAssignElementRef}
              tabIndex={-1}
            >
              <div className="row">
                <div className="col-12 mb-3">
                  <FormControl fullWidth required variant="standard">
                    <InputLabel id="demo-multiselect-label">
                      Select Store
                    </InputLabel>
                    <Select
                      labelId="demo-multiselect-label"
                      id="demo-multiselect"
                      required
                      multiple
                      label="Select Store"
                      value={selectedTestItems}
                      onChange={handleSelectTestChange}
                      renderValue={(selected) => (
                        <div>
                          {selected.map((value) => (
                            <Chip
                              key={value}
                              label={value}
                              style={{ margin: '2px' }}
                            />
                          ))}
                        </div>
                      )}
                    >
                      {storeItems.map((item) => (
                        <MenuItem key={item} value={item}>
                          <ColoredCheckbox
                            checked={selectedTestItems.indexOf(item) > -1}
                          />
                          <ListItemText primary={item} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {/* <div className="col-12 mb-3">
                        <TextField className='w-100' multiline rows="3" id="outlined-basic" variant="standard" label="Comments" autoComplete="off" 
                           
                        />
                    </div> */}
                <div className="col-12 text-center">
                  <button
                    className="btn btn-dark px-3 py-1 me-3"
                    onClick={() => {
                      setOpenAssign(false);
                    }}
                  >
                    Submit
                  </button>
                  <button
                    className="btn btn-danger px-3 py-1"
                    onClick={() => {
                      setOpenAssign(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
        {/* Same Layout as Create */}

        {/* <div className="d-flex w-100 justify-content-between"> */}
        {/* <div className="d-flex" style={{ gap: 10, flex: 1 }}>
            <input
              type="checkbox"
              style={{ position: 'relative', zIndex: 20 }}
              id={'checkBoxTask'}
              checked={taskObj.checked || false}
              // onChange={(ev) => {
              //     setTasks((prevTasks) =>
              //     // prevTasks.map((taskV, taskInd) =>
              //     //     taskInd === index ? { ...taskV, checked: ev.target.checked } : taskV
              //     // )
              //     );
              // }}
            />
          </div> */}
        {/* {tasks.map((taskObj, index) => ( */}
        <div className="task-card remove-box-shadow">
          {/* <> */}
            <div className="card table-card mt-3" style={{ width: '100%' }}>
              <div
                className="tableContainer items-table"
                style={{
                  overflowX: 'auto',
                  maxWidth: 'calc(100vw - 360px)',
                }}
              >
                <table
                  className="table"
                  style={{
                    minWidth: '100vw',
                    tableLayout: 'auto',
                    paddingInline: '1em',
                  }}
                >
                  <thead className="table-head-color">
                    <tr>
                      <th className="table-heading">Task Number</th>
                      <th className="table-heading">Task Name</th>
                      <th className="table-heading">Element Name</th>
                      <th className="table-heading">Item Code</th>
                      <th className="table-heading">Item Description</th>
                      <th className="table-heading">Width</th>
                      <th className="table-heading">Height</th>
                      <th className="table-heading">Quantity</th>
                      <th className="table-heading">Total Sft</th>
                      <th className="table-heading">Rate</th>
                      <th className="table-heading">Tax</th>
                      <th className="table-heading">Amount</th>
                      <th className="table-heading">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allItems.length > 0 ? (
                      allItems.map((item, index) => (
                        <tr key={index} className="table-row-color">
                          <td>
                            <input
                              type="text"
                              className="table-data-form-control"
                              value={item.taskNumber}
                              onChange={(e) =>
                                handleTaskChange(
                                  item.taskIndex,
                                  'taskNumber',
                                  e.target.value,
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="table-data-form-control"
                              value={item.taskName}
                              onChange={(e) =>
                                handleTaskChange(
                                  item.taskIndex,
                                  'taskName',
                                  e.target.value,
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="table-data-form-control"
                              value={item.title || ''}
                              onChange={(e) =>
                                handleItemChange(
                                  item.taskIndex,
                                  item.itemIndex,
                                  'title',
                                  e.target.value,
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="table-data-form-control"
                              value={item.itemCode || ''}
                              onChange={(e) =>
                                handleItemChange(
                                  item.taskIndex,
                                  item.itemIndex,
                                  'itemCode',
                                  e.target.value,
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="table-data-form-control"
                              value={item.description || ''}
                              onChange={(e) =>
                                handleItemChange(
                                  item.taskIndex,
                                  item.itemIndex,
                                  'description',
                                  e.target.value,
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="table-data-form-control"
                              value={item.width || ''}
                              onChange={(e) =>
                                handleItemChange(
                                  item.taskIndex,
                                  item.itemIndex,
                                  'width',
                                  e.target.value,
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="table-data-form-control"
                              value={item.height || ''}
                              onChange={(e) =>
                                handleItemChange(
                                  item.taskIndex,
                                  item.itemIndex,
                                  'height',
                                  e.target.value,
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="table-data-form-control"
                              value={item.quantity || ''}
                              onChange={(e) =>
                                handleItemChange(
                                  item.taskIndex,
                                  item.itemIndex,
                                  'quantity',
                                  e.target.value,
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="table-data-form-control"
                              value={item.total_sft || ''}
                              onChange={(e) =>
                                handleItemChange(
                                  item.taskIndex,
                                  item.itemIndex,
                                  'total_sft',
                                  e.target.value,
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="table-data-form-control"
                              value={item.rate || ''}
                              onChange={(e) =>
                                handleItemChange(
                                  item.taskIndex,
                                  item.itemIndex,
                                  'rate',
                                  e.target.value,
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="table-data-form-control"
                              value={item.tax || ''}
                              onChange={(e) =>
                                handleItemChange(
                                  item.taskIndex,
                                  item.itemIndex,
                                  'tax',
                                  e.target.value,
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="table-data-form-control"
                              value={item.amount || ''}
                              onChange={(e) =>
                                handleItemChange(
                                  item.taskIndex,
                                  item.itemIndex,
                                  'amount',
                                  e.target.value,
                                )
                              }
                            />
                          </td>
                          <td className="d-flex align-items-center">
                            <button
                              className="btn btn-delete me-2"
                              onClick={() => deleteItem(item.taskIndex, item.itemIndex)}
                            >
                              <MdDelete />
                            </button>
                            <button
                              className="btn btn-add"
                              onClick={() => addItem(item.taskIndex)}
                            >
                              <MdAdd />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="13" className="text-center">
                          No records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {hasChanges && (
            <div className="text-center mt-3">
              <button
                className="btn btn-dark px-4 me-4"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="btn btn-danger px-4"
                onClick={handleClear}
              >
                Clear
              </button>
            </div>
          )}
          {/* </> */}
        </div>
        {/* ))} */}
        {/* </div> */}

        {showAddTask && (
          <button className="text-end mt-3 cursor-pointer" onClick={handleAddTask}>
            + Add Task
          </button>
        )}
      </div>
      <div className="text-center mt-4">
        <button className="btn btn-dark px-4 me-4" onClick={() => { }}>
          Update
        </button>
        <button
          className="btn btn-danger px-4"
          onClick={() => {
            navigate('/app/manage-activities');
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EditActivity;
