import React, { useState } from 'react'
import "./createactivity.css"
import {FormControl, InputLabel, MenuItem, Select, TextField, Chip, ListItemText, Checkbox, Button, Accordion, AccordionSummary, AccordionDetails} from "@mui/material"
import { compressImg } from '../../../ImageCompressor';
import Swal from 'sweetalert2';
import { MdDelete } from 'react-icons/md';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';
import { ExpandMoreOutlined } from '@mui/icons-material';

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
    width: '100%',
    color: '#000',
    '&.Mui-focused': {
        color: '#000',
    },
}));

const CustomSelect = styled(Select)(({ theme }) => ({
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'black',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#000',
    },
}));

const ColoredCheckbox = styled(Checkbox)(({ theme }) => ({
    color: theme.palette.main,
    '&.Mui-checked': {
        color: '#000',
        borderColor: '#000',
    },
}));
const storeItems = ["Store 1", "Store 2", "Store 3", "Store 4", "Store 5"];
function CreateActivity() {
    const [activityDate, setActivityDate] = React.useState(null);
    const [completionDate, setCompletionDate] = React.useState(null);
    const [startDate, setStartDate] = React.useState(null);
    const [poDate, setPoDate] = React.useState(null);
    const [fromDate, setFromDate] = React.useState(null);
    const [toDate, setToDate] = React.useState(null);

    
    const [selectedTestItems, setSelectedTestItems] = useState([]);

    const handleSelectTestChange = (event) => {
        const value = event.target.value;
        setSelectedTestItems(value);
    };

    // const handleDelete = (store) => {
    //     setSelectedTestItems((prevItems) => {
    //         // Filter out the store to remove it
    //         const updatedItems = prevItems.filter((item) => item !== store);
    //         console.log("Updated selectedTestItems after delete: ", updatedItems);
    //         return updatedItems; // Return the updated list
    //     });
    // };
    

    
    // For Task card management
    const [formObj, setFormObj] = useState({
        title: '',
        vendor_id: '',
        execution_id: '',
        description: '',
        task_title: '',
        stores: [],
        activityNumber: '5678',
        activityName: ''
    });

    // State to track all tasks
    const [tasks, setTasks] = useState([]);

    // State to track which task cards are open
    // const [taskCards, setTaskCards] = useState([true]);

    // Current task being edited
    const [taskObj, setTaskObj] = useState({ taskNumber: '01', taskName: '' });

    // Items for the current task
    // const [items, setItems] = useState([
    //     { title: '', itemCode: '', description: '', width: '', height: '', quantity: '', total_sft: '', rate: '', tax: '', amount: '' }
    // ]);

    // Handle saving a task
    const handleSave = (index) => {
        // Create task object with current taskObj and items
        const taskData = {
            ...taskObj,
            items: [...items] // Create a copy of items
        };
        
        // Update tasks array
        const newTasks = [...tasks];
        if (index < newTasks.length) {
            // Update existing task
            newTasks[index] = taskData;
        } else {
            // Add new task
            newTasks.push(taskData);
        }
        setTasks(newTasks);
        
        // Close current card
        const newTaskCards = [...taskCards];
        newTaskCards[index] = false;
        setTaskCards(newTaskCards);
        
        // Reset form for next task
        setTaskObj({ taskNumber: `0${newTasks.length + 1}`, taskName: '' });
        setItems([{ title: '', itemCode: '', description: '', width: '', height: '', quantity: '', total_sft: '', rate: '', tax: '', amount: '' }]);
    };

    // Clear the current task form
    const handleClear = (index) => {
        setTaskObj({ taskNumber: `0${index + 1}`, taskName: '' });
        setItems([{ title: '', itemCode: '', description: '', width: '', height: '', quantity: '', total_sft: '', rate: '', tax: '', amount: '' }]);
    };

    // Add a new item to the current task
    const addItem = () => {
        const newItems = [...items, { title: '', itemCode: '', description: '', width: '', height: '', quantity: '', total_sft: '', rate: '', tax: '', amount: '' }];
        setItems(newItems);
    };

    // Delete an item from the current task
    const deleteItem = (ind) => {
        let newItems = items.filter((item, index) => index !== ind);
        setItems(newItems);
    };

    // Add a new task card
    // const handleAddTask = () => {
    //     // Add a new task card as "open"
    //     setTaskCards([...taskCards, true]);
        
    //     // Prepare task number for the new task
    //     setTaskObj({ taskNumber: `0${tasks.length + 1}`, taskName: '' });
        
    //     // Reset items for the new task
    //     setItems([{ title: '', itemCode: '', description: '', width: '', height: '', quantity: '', total_sft: '', rate: '', tax: '', amount: '' }]);
    // };
    // For file
    const fileIp = React.useRef(null);
        const [img, setImg] = React.useState('https://placehold.co/250x250');
        const handleReset = () => {
          if(fileIp.current) {
              fileIp.current.value = "";
              fileIp.current.type = "text";
              fileIp.current.type = "file";
          }
        };
        const handleFile = (event) => {
          console.log(event);
          setImg('https://placehold.co/250x250');
          const file = event.target.files[0];
          console.log('Before compression', file.size)
          let splitfile = file.name;
          let extension = splitfile.split('.').pop();
          if(extension === 'png' || extension === 'PNG' || extension === 'jpg' || extension === 'JPG' || extension === 'jpeg' || extension === 'JPEG') {
              console.log('valid file');
              var reader = new FileReader();
              if(event.target.files[0]){
                  reader.readAsDataURL(event.target.files[0]);
                  reader.onload = (e)=>{
                      setImg(e.target.result);
                  }
                  compressImg(event.target.files[0]).then(img => {
                      setFormObj({...formObj, reference_image: img});
                      console.log('After compression', img.size)
                  });
              }
          }else{
              Swal.fire({
                  text: 'Invalid file format. Only .png, .jpg files are allowed',
                  icon: 'warning',
                  heightAuto: false
              })
              return
          }
        }

        // For Documents
        const docIp = React.useRef(null);
        const [filePreviews, setFilePreviews] = useState([]); // Store multiple previews
        const [fileNames, setFileNames] = useState(["commercial-document.pdf"]); // Default dummy file

        const handleDocReset = () => {
            if (docIp.current) {
              docIp.current.value = '';
              docIp.current.type = 'text';
              docIp.current.type = 'file';
            }
          };

          const handleDoc = (event) => {
            const files = event.target.files;
            let previews = [];
            let names = [];
        
            Array.from(files).forEach((file) => {
                let extension = file.name.split('.').pop().toLowerCase();
                if (['pdf'].includes(extension)) {
                    // For PDFs, just store the file name
                    names.push(file.name);
                } else {
                    Swal.fire({
                        text: 'Invalid file format. Only .pdf files are allowed',
                        icon: 'warning',
                        heightAuto: false,
                    });
                }
            });
        
            // Update state after processing all files
            setFileNames((prevNames) => [...prevNames, ...names]);
        };
        
        
        const [taskCards, setTaskCards] = useState([]);
        const [items, setItems] = useState([]);
      
        const handleAddTask = () => {
          setTaskCards([...taskCards, { isOpen: true, taskNumber: "", taskName: "", items: [] }]);
        };
      
        const handleToggle = (index) => {
          setTaskCards((prev) =>
            prev.map((task, i) => (i === index ? { ...task, isOpen: !task.isOpen } : task))
          );
        };
    
    return (
        <div className='employeeContainer'>
            <h5 className='create-employee'>Create Activity</h5>
            <div className="card forms-card">
                <div className="row mb-3">
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" variant="standard" value={formObj.activityNumber} disabled label="Activity Number" autoComplete="off" required 
                            onChange={(ev) => {
                                setFormObj({...formObj, activityNumber: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" value={formObj.activityName} variant="standard" label="Activity Name" autoComplete="off" required 
                            onChange={(ev) => {
                                setFormObj({...formObj, activityName: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                variant="standard"
                                label="Activity Date"
                                className="cust-violet-input-field date-field w-100 me-3"
                                value={activityDate ? dayjs(activityDate, "DD-MM-YYYY") : null}
                                format="DD-MM-YYYY"
                                onChange={(newValue) => {
                                if (!newValue) return;
                                setActivityDate(newValue.format("DD-MM-YYYY")); 
                                }}
                                slots={{ textField: TextField }} // Use slots for TextField
                                slotProps={{
                                textField: {
                                    variant: "standard",
                                    className: "cust-violet-input-field date-field w-100 me-3"
                                }
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="col-12 col-lg-6 mb-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                variant="standard"  
                                label="Expected Completion Date"
                                className="cust-violet-input-field date-field w-100 me-3"
                                value={completionDate ? dayjs(completionDate, "DD-MM-YYYY") : null}
                                format="DD-MM-YYYY"
                                onChange={(newValue) => {
                                if (!newValue) return;
                                setCompletionDate(newValue.format("DD-MM-YYYY")); 
                                }}
                                slots={{ textField: TextField }} // Use slots for TextField
                                slotProps={{
                                textField: {
                                    variant: "standard",
                                    className: "cust-violet-input-field date-field w-100 me-3"
                                }
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="col-12 mb-3">
                        <TextField className='w-100' multiline rows="3" id="outlined-basic" variant="standard" label="Activity Description" autoComplete="off" 
                            onChange={(ev) => {
                                setFormObj({...formObj, description: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                variant="standard"
                                label="PO/WO Date"
                                className="cust-violet-input-field date-field w-100 me-3"
                                value={poDate ? dayjs(poDate, "DD-MM-YYYY") : null}
                                format="DD-MM-YYYY"
                                onChange={(newValue) => {
                                if (!newValue) return;
                                setPoDate(newValue.format("DD-MM-YYYY")); 
                                }}
                                slots={{ textField: TextField }} // Use slots for TextField
                                slotProps={{
                                textField: {
                                    variant: "standard",
                                    className: "cust-violet-input-field date-field w-100 me-3"
                                }
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" variant="standard" label="PO/WO Number" autoComplete="off" required 
                            onChange={(ev) => {
                                setFormObj({...formObj, activityName: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Promo Period From"
                                className="cust-violet-input-field date-field w-100 me-3"
                                value={fromDate ? dayjs(fromDate, "DD-MM-YYYY") : null}
                                format="DD-MM-YYYY"
                                onChange={(newValue) => {
                                if (!newValue) return;
                                setFromDate(newValue.format("DD-MM-YYYY")); 
                                }}
                                slots={{ textField: TextField }} // Use slots for TextField
                                slotProps={{
                                textField: {
                                    variant: "standard",
                                    className: "cust-violet-input-field date-field w-100 me-3"
                                }
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Promo Period To"
                                value={toDate ? dayjs(toDate, "DD-MM-YYYY") : null}
                                format="DD-MM-YYYY"
                                onChange={(newValue) => {
                                if (!newValue) return;
                                setToDate(newValue.format("DD-MM-YYYY"));
                                }}
                                slots={{ textField: TextField }} // Use slots for TextField
                                slotProps={{
                                textField: {
                                    variant: "standard",
                                    className: "cust-violet-input-field date-field w-100 me-3"
                                }
                                }}
                            />
                        </LocalizationProvider>

                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <FormControl fullWidth variant="standard" required>
                            <InputLabel>Select Vendor</InputLabel>
                            <Select
                                value={formObj.vendor_id}
                                label="Select Vendor"
                                onChange={(ev) => {
                                    setFormObj({...formObj, vendor_id: ev.target.value})
                                }}
                            >
                                <MenuItem value={1}>Vendor 1</MenuItem>
                                <MenuItem value={2}>Vendor 2</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <FormControl fullWidth variant="standard" required>
                            <InputLabel>Execution By</InputLabel>
                            <Select
                                value={formObj.execution_id}
                                label="Execution By"
                                onChange={(ev) => {
                                    setFormObj({...formObj, execution_id: ev.target.value})
                                }}
                            >
                                <MenuItem value={1}>Vendor</MenuItem>
                                <MenuItem value={2}>Store Team</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-12 mb-3">
                        <FormControl fullWidth required variant="standard">
                        <InputLabel id="demo-multiselect-label">Select Store</InputLabel>
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
                                            <Chip key={value} label={value} style={{ margin: '2px' }} />
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
                    <div className="col-12 col-lg-6 mb-3">
                        <h6 className="mb-3 text-black" style={{textWrap: 'nowrap'}}><strong>Reference PPT</strong> </h6>
                        <div className="me-3">
                           
                            <img
                                src={img}
                                alt="Preview"
                                style={{ maxHeight: '120px', maxWidth: '100%' }}
                            />
                        </div>
                        <div>
                            <input type="file" accept=".png, .jpg, .jpeg, .webp" hidden ref={fileIp} onClick={handleReset} onChange={(ev) => {handleFile(ev)}} />
                            <button className="btn btn-dark px-3 py-1 mt-3" onClick={() => {fileIp.current.click();}}>Upload</button>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                    <h6 className="mb-3 text-black" style={{ textWrap: 'nowrap' }}>
                        <strong>Commercial Documents</strong>
                    </h6>

                    <div className="me-3">
                        {fileNames.length > 0 && (
                            <div>
                                {fileNames.map((fileName, index) => (
                                    <div key={index} style={{ marginBottom: '10px' }}>
                                        <strong>{fileName}</strong>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <div>
                        <input
                        type="file"
                        accept=".pdf"
                        hidden
                        ref={docIp}
                        onClick={handleDocReset}
                        onChange={(ev) => handleDoc(ev)}
                        multiple
                        />
                        <button className="btn btn-dark px-3 py-1 mt-3" onClick={() => docIp.current.click()}>
                        Upload
                        </button>
                    </div>
                    </div>

                    <h5 className='create-employee'>Tasks</h5>
                    {/* {taskCards.map((isOpen, index) => (
                        <div className="row" key={index}>
                            <div className="col-12">
                            {isOpen ? ( <>
                                <div className="task-card">
                                    <div className="row">
                                        <div className="col-12 col-lg-6 mb-3">
                                            <TextField 
                                                className='w-100' 
                                                id={`task-number-${index}`} 
                                                variant="standard" 
                                                disabled 
                                                label="Task Number" 
                                                autoComplete="off" 
                                                required 
                                                value={taskObj.taskNumber}
                                                onChange={(ev) => {
                                                    setTaskObj({ ...taskObj, taskNumber: ev.target.value });
                                                }}
                                            />
                                        </div>
                                        <div className="col-12 col-lg-6 mb-3">
                                            <TextField className='w-100' id="outlined-basic" variant="standard" label="Task Name" autoComplete="off" required 
                                                onChange={(ev) => {
                                                    setTaskObj({ ...taskObj, taskName: ev.target.value });
                                                }}
                                            />
                                        </div>
                                        <h6 className='items-heading'>Items</h6>
                                        <div className="row" style={{ overflowX: "scroll", maxWidth: "1200px"}}>
                                            <div className="col-12 mb-3" style={{ minWidth: "1300px", tableLayout: "auto"}}>
                                                {items && items.length > 0 && items.map((item, i) => <div className="d-flex align-items-end" key={'task-item'+i}>
                                                    <div className='mb-3 me-2 d-none'>
                                                        <h5 className='mb-0'>{i+1}.</h5>
                                                    </div>
                                                    <div className="mb-3 me-2" style={{minWidth: 150}}>
                                                        <TextField className='w-100' id="outlined-basic" label="Element Name" variant="standard" autoComplete="off" required
                                                            value={item.title}
                                                            onChange={(ev) => {
                                                                let newItems = [...items].map((newItem, ind) => {
                                                                if(ind === i){
                                                                    newItem.title = ev.target.value;
                                                                }
                                                                return newItem;
                                                                });
                                                                setItems([...newItems])
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3 me-2">
                                                        <TextField className='w-100' id="outlined-basic" label="Item Code" variant="standard" autoComplete="off" required
                                                            value={item.itemCode}
                                                            onChange={(ev) => {
                                                                let newItems = [...items].map((newItem, ind) => {
                                                                if(ind === i){
                                                                    newItem.itemCode = ev.target.value;
                                                                }
                                                                return newItem;
                                                                });
                                                                setItems([...newItems])
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3 me-2" style={{minWidth: 150}}>
                                                        <TextField className='w-100' id="outlined-basic" label="Item Description" variant="standard" autoComplete="off" required
                                                            value={item.description}
                                                            onChange={(ev) => {
                                                                let newItems = [...items].map((newItem, ind) => {
                                                                if(ind === i){
                                                                    newItem.description = ev.target.value;
                                                                }
                                                                return newItem;
                                                                });
                                                                setItems([...newItems])
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3 me-2">
                                                        <TextField className='w-100' id="outlined-basic" label="Width" variant="standard" autoComplete="off" required
                                                            value={item.width}
                                                            type="number"
                                                            onChange={(ev) => {
                                                            let newItems = [...items].map((newItem, ind) => {
                                                                if(ind === i){
                                                                newItem.width = ev.target.value;
                                                                if(newItem.height && newItem.width && newItem.quantity){
                                                                    newItem.sft = ((newItem.height*newItem.width)/144)*newItem.quantity;
                                                                    newItem.sft = (Math.round(newItem.sft*100))/100;
                                                                }else{
                                                                    newItem.sft = ''
                                                                }
                                                                }
                                                                return newItem;
                                                            });
                                                            setItems([...newItems])
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3 me-2">
                                                        <TextField className='w-100' id="outlined-basic" label="Height" variant="standard" autoComplete="off" required
                                                            value={item.height}
                                                            type="number"
                                                            onChange={(ev) => {
                                                            let newItems = [...items].map((newItem, ind) => {
                                                                if(ind === i){
                                                                newItem.height = ev.target.value;
                                                                if(newItem.height && newItem.width && newItem.quantity){
                                                                    newItem.sft = ((newItem.height*newItem.width)/144)*newItem.quantity;
                                                                    newItem.sft = (Math.round(newItem.sft*100))/100;
                                                                }else{
                                                                    newItem.sft = ''
                                                                }
                                                                }
                                                                return newItem;
                                                            });
                                                            setItems([...newItems])
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3 me-2">
                                                        <TextField className='w-100' id="outlined-basic" label="Quantity" variant="standard" autoComplete="off" required
                                                            value={item.quantity}
                                                            type="number"
                                                            onChange={(ev) => {
                                                            let newItems = [...items].map((newItem, ind) => {
                                                                if(ind === i){
                                                                newItem.quantity = ev.target.value;
                                                                if(newItem.height && newItem.width && newItem.quantity){
                                                                    newItem.sft = ((newItem.height*newItem.width)/144)*newItem.quantity;
                                                                    newItem.sft = (Math.round(newItem.sft*100))/100;
                                                                }else{
                                                                    newItem.sft = ''
                                                                }
                                                                }
                                                                return newItem;
                                                            });
                                                            setItems([...newItems])
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3 me-2">
                                                        <TextField className='w-100' disabled id="outlined-basic" label="Total sft" variant="standard" autoComplete="off" required
                                                            value={item.total_sft}
                                                            onChange={(ev) => {
                                                                let newItems = [...items].map((newItem, ind) => {
                                                                if(ind === i){
                                                                    newItem.total_sft = ev.target.value;
                                                                }
                                                                return newItem;
                                                                });
                                                                setItems([...newItems])
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3 me-2">
                                                        <TextField className='w-100' id="outlined-basic" label="Rate" variant="standard" autoComplete="off" required
                                                            value={item.rate}
                                                            onChange={(ev) => {
                                                                let newItems = [...items].map((newItem, ind) => {
                                                                if(ind === i){
                                                                    newItem.rate = ev.target.value;
                                                                }
                                                                return newItem;
                                                                });
                                                                setItems([...newItems])
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3 me-2">
                                                        <TextField className='w-100' id="outlined-basic" label="Tax" variant="standard" autoComplete="off" required
                                                            value={item.tax}
                                                            onChange={(ev) => {
                                                                let newItems = [...items].map((newItem, ind) => {
                                                                if(ind === i){
                                                                    newItem.tax = ev.target.value;
                                                                }
                                                                return newItem;
                                                                });
                                                                setItems([...newItems])
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3 me-2">
                                                        <TextField className='w-100' id="outlined-basic" label="Amount" variant="standard" autoComplete="off" required
                                                            value={item.amount}
                                                            onChange={(ev) => {
                                                                let newItems = [...items].map((newItem, ind) => {
                                                                if(ind === i){
                                                                    newItem.amount = ev.target.value;
                                                                }
                                                                return newItem;
                                                                });
                                                                setItems([...newItems])
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mb-3 d-flex align-items-center">
                                                        <button className='btn btn-danger me-2'><MdDelete onClick={() => deleteItem(i)} /></button>
                                                    </div>
                                                    <div className="mb-3 d-flex align-items-center">
                                                        <button className='btn btn-dark' onClick={() => {addItem()}}>+</button>
                                                    </div>
                                                </div>)}
                                            </div>
                                            <div className="text-center mb-3">
                                                <button className='btn btn-dark px-4 me-4' onClick={() => handleSave(index)}>Save</button>
                                                <button className='btn btn-danger px-4' onClick={() => handleClear(index)}>Clear</button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                                    </>
                                ) : (
                                    <div className="col-12 mb-3 text-end">
                                    <button className="btn btn-dark px-4 py-1" onClick={() => handleAddTask()}>
                                        + Add Task
                                    </button>
                                    </div>
                                )}
                                
                            </div>
                        </div>
                    ))} */}
                    {taskCards.map((task, index) => (
        <Accordion key={index} expanded={task.isOpen}>
          <AccordionSummary expandIcon={<ExpandMoreOutlined />} onClick={() => handleToggle(index)}>
            <strong>Task {index + 1}</strong>
          </AccordionSummary>
          <AccordionDetails>
            <div className="task-card">
              <div className="row">
                <div className="col-12 col-lg-6 mb-3">
                  <TextField
                    className="w-100"
                    variant="standard"
                    disabled
                    label="Task Number"
                    autoComplete="off"
                    required
                    value={task.taskNumber}
                  />
                </div>
                <div className="col-12 col-lg-6 mb-3">
                  <TextField
                    className="w-100"
                    variant="standard"
                    label="Task Name"
                    autoComplete="off"
                    required
                    value={task.taskName}
                  />
                </div>
                <h6 className="items-heading">Items</h6>
                {items.map((item, i) => (
                  <div className="d-flex align-items-end" key={i}>
                    <div className="mb-3 me-2">
                      <TextField
                        className="w-100"
                        label="Element Name"
                        variant="standard"
                        value={item.title}
                      />
                    </div>
                    <div className="mb-3 me-2">
                      <TextField className="w-100" label="Item Code" variant="standard" value={item.itemCode} />
                    </div>
                    <div className="mb-3 me-2">
                      <TextField className="w-100" label="Width" variant="standard" value={item.width} type="number" />
                    </div>
                    <div className="mb-3 me-2">
                      <TextField className="w-100" label="Height" variant="standard" value={item.height} type="number" />
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                      <Button variant="contained" color="error" onClick={() => setItems(items.filter((_, idx) => idx !== i))}>
                        <MdDelete />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      <div className="text-end mt-3">
        <Button variant="contained" color="primary" onClick={handleAddTask}>
          + Add Task
        </Button>
      </div>
  
                    {/* <div className="col-12 mb-3 text-end d-none">
                      <button className='btn btn-dark px-4 py-1' onClick={handleClickOpen('paper')}>+ Add Task</button>
                    </div> */}
                </div>
                <div className="text-center">
                  <button className='btn btn-dark px-4 me-4' onClick={() => {}}>Create</button>
                  <button className='btn btn-danger px-4' onClick={() => {}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CreateActivity