import React, { useState } from 'react'
import "./createactivity.css"
import {FormControl, InputLabel, MenuItem, Select, TextField, Dialog, DialogContent, DialogContentText, DialogTitle, ListItemText, Checkbox, Input} from "@mui/material"
import { compressImg } from '../../../ImageCompressor';
import Swal from 'sweetalert2';
import { MdDelete } from 'react-icons/md';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { styled } from '@mui/material/styles';

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

function CreateActivity() {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
    const descriptionElementRef = React.useRef(null);

    const handleClickOpen = (scrollType) => () => {
      setOpen(true);
      setScroll(scrollType);
      
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const options = [
      {store_id: 1, store_name: 'Store 1'},{store_id: 2, store_name: 'Store 2'}
    ]

    const [openItem, setOpenItem] = React.useState(false);
    const [scrollItem, setScrollItem] = React.useState('paper');
    const descriptionItemElementRef = React.useRef(null);

    const [startDate, setStartDate] = React.useState(null);

    const storeItems = ["Store 1", "Store 2", "Store 3", "Store 4", "Store 5"];

    const handleClickOpenItem = (scrollType) => () => {
      setOpenItem(true);
      setScrollItem(scrollType);
    };
  
    const handleCloseItem = () => {
      setOpenItem(false);
    };

    

    const handleToggle = (store) => {
      const storeExists = formObj.stores.some(
        (s) => s.store_id === store.store_id
      );
  
      const updatedStores = storeExists
        ? formObj.stores.filter((s) => s.store_id !== store.store_id) // Remove store
        : [...formObj.stores, store]; // Add store
  
      setFormObj({
        ...formObj,
        stores: updatedStores,
      });
    };
    // For Task card
    const [formObj, setFormObj] = useState({
        title: '',
        vendor_id: '',
        description: '',
        task_title: '',
        stores: []
      });
    const [taskObj, setTaskObj] = useState({ taskNumber: '01', taskName: '' });
    // const [isCardOpen, setIsCardOpen] = useState(true);
    const [items, setItems] = useState([
        { title: '', itemCode: '', description: '', width: '', height: '', quantity: '', total_sft: '', rate: '', tax: '', amount: '' }
    ]);
    const [taskCards, setTaskCards] = useState([true]);

    const handleSave = (index) => {
        const newTaskCards = [...taskCards];
        newTaskCards[index] = false; // Collapse the current card after save
        setTaskCards(newTaskCards);
    };
    const handleClear = () => {
        // Clear the task details (task number and task name)
        setTaskObj({ taskNumber: '', taskName: '' });
      
        // Clear the item values
        const newItems = items.map(item => ({
          ...item, 
          title: '', 
          itemCode: '', 
          description: '', 
          width: '', 
          height: '', 
          quantity: '', 
          total_sft: '', 
          rate: '', 
          tax: '', 
          amount: ''
        }));
      
        setItems(newItems);
      };
      
    
    const addItem = (index) => {
      const newItems = [...items, { elementName: '', itemCard: '', description: '', width: '', height: '', quantity: '', total_sft: '', rate: '', tax: '', amount: '' }];
      setItems(newItems);
    };
    const deleteItem = (ind) => {
        let newItems = items.filter((item, index) => index !== ind);
        setItems(newItems);
      };
    
    const handleAddTask = () => {
      setTaskCards([...taskCards, true]); // Add a new task card
    };
    
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

    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);
    
    return (
        <div className='employeeContainer'>
            <h5 className='create-employee'>Create Activity</h5>
            <div className="card forms-card">
                <div className="row mb-3">
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" variant="standard" disabled label="Activity Number" autoComplete="off" required 
                            onChange={(ev) => {
                                setFormObj({...formObj, activityNumber: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <TextField className='w-100' id="outlined-basic" variant="standard" label="Activity Name" autoComplete="off" required 
                            onChange={(ev) => {
                                setFormObj({...formObj, activityName: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                variant="standard"
                                label="Activity Date"
                                className="cust-violet-input-field date-field w-100 me-3"
                                value={startDate ? dayjs(startDate, "DD-MM-YYYY") : null}
                                format="DD-MM-YYYY"
                                onChange={(newValue) => {
                                if (!newValue) return;
                                setStartDate(newValue.format("DD-MM-YYYY")); 
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                variant="standard"  
                                label="Expected Compleation Date"
                                className="cust-violet-input-field date-field w-100 me-3"
                                value={startDate ? dayjs(startDate, "DD-MM-YYYY") : null}
                                format="DD-MM-YYYY"
                                onChange={(newValue) => {
                                if (!newValue) return;
                                setStartDate(newValue.format("DD-MM-YYYY")); 
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="col-12 mb-3">
                        <TextField className='w-100' multiline rows="1" id="outlined-basic" variant="standard" label="Activity Description" autoComplete="off" 
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
                                value={startDate ? dayjs(startDate, "DD-MM-YYYY") : null}
                                format="DD-MM-YYYY"
                                onChange={(newValue) => {
                                if (!newValue) return;
                                setStartDate(newValue.format("DD-MM-YYYY")); 
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
                                value={startDate ? dayjs(startDate, "DD-MM-YYYY") : null}
                                format="DD-MM-YYYY"
                                onChange={(newValue) => {
                                if (!newValue) return;
                                setStartDate(newValue.format("DD-MM-YYYY")); 
                                }}
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="col-12 col-lg-6 mb-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Promo Period To"
                                className="cust-violet-input-field date-field w-100 me-3"
                                value={startDate ? dayjs(startDate, "DD-MM-YYYY") : null}
                                format="DD-MM-YYYY"
                                onChange={(newValue) => {
                                if (!newValue) return;
                                setStartDate(newValue.format("DD-MM-YYYY")); 
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
                                value={formObj.vendor_id}
                                label="Execution By"
                                onChange={(ev) => {
                                    setFormObj({...formObj, vendor_id: ev.target.value})
                                }}
                            >
                                <MenuItem value={1}>Vendor</MenuItem>
                                <MenuItem value={2}>Store Team</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <h5 className='create-employee'>Tasks</h5>
                    {taskCards.map((isOpen, index) => (
                    <div className="row" key={index}>
                        <div className="col-12">
                            <div className="task-card">
                            {isOpen ? ( <>
                                <div className="row">
                                    <div className="col-12 col-lg-6 mb-3">
                                        <TextField className='w-100' id="outlined-basic" variant="standard" disabled label="Task Number" autoComplete="off" required 
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
                    </div>
                    ))}
                    
                    <div className="col-12 mb-3 text-end d-none">
                      <button className='btn btn-dark px-4 py-1' onClick={handleClickOpen('paper')}>+ Add Task</button>
                    </div>
                </div>
                <div className="text-center">
                  <button className='btn btn-dark px-4 me-4' onClick={() => {}}>Create</button>
                  <button className='btn btn-danger px-4' onClick={() => {}}>Cancel</button>
                </div>
            </div>
          <Dialog className='task-dialog d-none'
              open={open}
              onClose={handleClose}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
            <DialogTitle id="scroll-dialog-title"><strong>Add Task</strong></DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <div className="row">
                    <div className="col-12">
                      <div className="row">
                        <div className="col-12 mb-3">
                          <div className="col-12 mb-3">
                              <TextField className='w-100' id="outlined-basic" variant="standard" label="Task" autoComplete="off" required 
                                  onChange={(ev) => {
                                      setFormObj({...formObj, task_title: ev.target.value})
                                  }}
                              />
                          </div>
                          <div className="col-12 mb-3">
                              <FormControl fullWidth variant="standard" required>
                                <InputLabel id="demo-multiple-checkbox-label">Stores Assign</InputLabel>
                                <Select
                                  labelId="demo-simple-select-standard-label"
                                  id="demo-simple-select-standard"
                                  multiple
                                  value={formObj.stores}
                                  onChange={() => {}} // Prevent default Select handling
                                  input={<Input label="Stores Assign" />}
                                  renderValue={(selected) => [...formObj.stores].map((val) => val.store_name).join(', ')}
                                  // MenuProps={MenuProps}
                                >
                                  {[...options].map((store) => (
                                    <MenuItem key={store.store_id} value={store} onClick={() => handleToggle(store)}>
                                      <Checkbox checked={!!formObj.stores.find((s) => s.store_id === store.store_id)} />
                                      <ListItemText primary={store.store_name} />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                          </div>
                          {/* <div className="col-12 mb-3">
                              <TextField className='w-100' multiline rows="3" id="outlined-basic" variant="standard" label="Description" autoComplete="off" required 
                                  onChange={(ev) => {
                                      setFormObj({...formObj, description: ev.target.value})
                                  }}
                              />
                          </div> */}
                        </div>
                      </div>
                    </div>
                    <div className="col-12 mb-3 text-end">
                      <button className='btn btn-dark px-4 py-1' onClick={handleClickOpenItem('paper')}>+ Add Items</button>
                    </div>
                    <div className="col-12 col-lg-4 mb-3">
                      <h6 className="mb-3 text-black" style={{textWrap: 'nowrap'}}><strong>Reference Image</strong> </h6>
                        <div className="d-flex align-items-end">
                          <div className='me-3'>
                            <img src={img} alt="" style={{maxHeight: '120px', maxWidth: '100%'}} />
                            <br />
                          </div>
                          <div>
                            <input type="file" accept=".png, .jpg, .jpeg, .webp" hidden ref={fileIp} onClick={handleReset} onChange={(ev) => {handleFile(ev)}} />
                            <button className="btn btn-dark px-3 py-1 mt-3" onClick={() => {fileIp.current.click();}}>Upload</button>
                          </div>
                        </div>
                    </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Dialog className="item-dialog d-none"
              open={openItem}
              onClose={handleCloseItem}
              scroll={scrollItem}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
            <DialogTitle id="scroll-dialog-title"><strong>Add Items</strong></DialogTitle>
            <DialogContent dividers={scrollItem === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionItemElementRef}
                tabIndex={-1}
              >
                <div className="row">
                    <div className="col-12 mb-3">
                        {items && items.length > 0 && items.map((item, i) => <div className="d-flex align-items-end" key={'task-item'+i}>
                          <div className='mb-3 me-2'>
                              <h5 className='mb-0'>{i+1}.</h5>
                          </div>
                          <div className="mb-3 me-2">
                              <TextField className='w-100' id="outlined-basic" label="Title" variant="standard" autoComplete="off" required
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
                          <div className="mb-3 me-2" style={{minWidth: 300}}>
                              <TextField className='w-100' id="outlined-basic" label="Description" variant="standard" autoComplete="off" required
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
                            <TextField className='w-100' disabled id="outlined-basic" label="sft" variant="standard" autoComplete="off" required
                                value={item.sft}
                                  onChange={(ev) => {
                                    let newItems = [...items].map((newItem, ind) => {
                                      if(ind === i){
                                        newItem.sft = ev.target.value;
                                      }
                                      return newItem;
                                    });
                                    setItems([...newItems])
                                  }}
                              />
                          </div>
                          <div className="mb-3 me-2">
                            <TextField className='w-100' id="outlined-basic" label="Rate per unit" variant="standard" autoComplete="off" required
                                value={item.rate_per_unit}
                                  onChange={(ev) => {
                                    let newItems = [...items].map((newItem, ind) => {
                                      if(ind === i){
                                        newItem.rate_per_unit = ev.target.value;
                                      }
                                      return newItem;
                                    });
                                    setItems([...newItems])
                                  }}
                              />
                          </div>
                          <div className="mb-3 d-flex align-items-center">
                            <button className='btn btn-danger'><MdDelete onClick={() => {deleteItem(i)}} /></button>
                          </div>
                        </div>)}
                    </div>
                    <div className="col-12 mb-3 text-end">
                      <button className='btn btn-dark px-4 py-1' onClick={() => {addItem()}}>+ Add Item</button>
                    </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
        // <div className='employeeContainer'>
        //     <h5 className='create-employee'>Create Activity</h5>
        //     <div className="card forms-card">
        //         <div className="row mb-3">
        //             <div className="col-12 col-lg-6 mb-3">
        //                 <TextField className='w-100' id="outlined-basic" variant="standard" value={formObj.activityNumber} disabled label="Activity Number" autoComplete="off" required 
        //                     onChange={(ev) => {
        //                         setFormObj({...formObj, activityNumber: ev.target.value})
        //                     }}
        //                 />
        //             </div>
        //             <div className="col-12 col-lg-6 mb-3">
        //                 <TextField className='w-100' id="outlined-basic" value={formObj.activityName} variant="standard" label="Activity Name" autoComplete="off" required 
        //                     onChange={(ev) => {
        //                         setFormObj({...formObj, activityName: ev.target.value})
        //                     }}
        //                 />
        //             </div>
        //             <div className="col-12 col-lg-6 mb-2">
        //                 <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                     <DatePicker
        //                         variant="standard"
        //                         label="Activity Date"
        //                         className="cust-violet-input-field date-field w-100 me-3"
        //                         value={activityDate ? dayjs(activityDate, "DD-MM-YYYY") : null}
        //                         format="DD-MM-YYYY"
        //                         onChange={(newValue) => {
        //                         if (!newValue) return;
        //                         setActivityDate(newValue.format("DD-MM-YYYY")); 
        //                         }}
        //                         slots={{ textField: TextField }} // Use slots for TextField
        //                         slotProps={{
        //                         textField: {
        //                             variant: "standard",
        //                             className: "cust-violet-input-field date-field w-100 me-3"
        //                         }
        //                         }}
        //                     />
        //                 </LocalizationProvider>
        //             </div>
        //             <div className="col-12 col-lg-6 mb-2">
        //                 <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                     <DatePicker
        //                         variant="standard"  
        //                         label="Expected Completion Date"
        //                         className="cust-violet-input-field date-field w-100 me-3"
        //                         value={completionDate ? dayjs(completionDate, "DD-MM-YYYY") : null}
        //                         format="DD-MM-YYYY"
        //                         onChange={(newValue) => {
        //                         if (!newValue) return;
        //                         setCompletionDate(newValue.format("DD-MM-YYYY")); 
        //                         }}
        //                         slots={{ textField: TextField }} // Use slots for TextField
        //                         slotProps={{
        //                         textField: {
        //                             variant: "standard",
        //                             className: "cust-violet-input-field date-field w-100 me-3"
        //                         }
        //                         }}
        //                     />
        //                 </LocalizationProvider>
        //             </div>
        //             <div className="col-12 mb-3">
        //                 <TextField className='w-100' multiline rows="3" id="outlined-basic" variant="standard" label="Activity Description" autoComplete="off" 
        //                     onChange={(ev) => {
        //                         setFormObj({...formObj, description: ev.target.value})
        //                     }}
        //                 />
        //             </div>
        //             <div className="col-12 col-lg-6 mb-3">
        //                 <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                     <DatePicker
        //                         variant="standard"
        //                         label="PO/WO Date"
        //                         className="cust-violet-input-field date-field w-100 me-3"
        //                         value={poDate ? dayjs(poDate, "DD-MM-YYYY") : null}
        //                         format="DD-MM-YYYY"
        //                         onChange={(newValue) => {
        //                         if (!newValue) return;
        //                         setPoDate(newValue.format("DD-MM-YYYY")); 
        //                         }}
        //                         slots={{ textField: TextField }} // Use slots for TextField
        //                         slotProps={{
        //                         textField: {
        //                             variant: "standard",
        //                             className: "cust-violet-input-field date-field w-100 me-3"
        //                         }
        //                         }}
        //                     />
        //                 </LocalizationProvider>
        //             </div>
        //             <div className="col-12 col-lg-6 mb-3">
        //                 <TextField className='w-100' id="outlined-basic" variant="standard" label="PO/WO Number" autoComplete="off" required 
        //                     onChange={(ev) => {
        //                         setFormObj({...formObj, activityName: ev.target.value})
        //                     }}
        //                 />
        //             </div>
        //             <div className="col-12 col-lg-6 mb-3">
        //                 <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                     <DatePicker
        //                         label="Promo Period From"
        //                         className="cust-violet-input-field date-field w-100 me-3"
        //                         value={fromDate ? dayjs(fromDate, "DD-MM-YYYY") : null}
        //                         format="DD-MM-YYYY"
        //                         onChange={(newValue) => {
        //                         if (!newValue) return;
        //                         setFromDate(newValue.format("DD-MM-YYYY")); 
        //                         }}
        //                         slots={{ textField: TextField }} // Use slots for TextField
        //                         slotProps={{
        //                         textField: {
        //                             variant: "standard",
        //                             className: "cust-violet-input-field date-field w-100 me-3"
        //                         }
        //                         }}
        //                     />
        //                 </LocalizationProvider>
        //             </div>
        //             <div className="col-12 col-lg-6 mb-3">
        //                 <LocalizationProvider dateAdapter={AdapterDayjs}>
        //                     <DatePicker
        //                         label="Promo Period To"
        //                         value={toDate ? dayjs(toDate, "DD-MM-YYYY") : null}
        //                         format="DD-MM-YYYY"
        //                         onChange={(newValue) => {
        //                         if (!newValue) return;
        //                         setToDate(newValue.format("DD-MM-YYYY"));
        //                         }}
        //                         slots={{ textField: TextField }} // Use slots for TextField
        //                         slotProps={{
        //                         textField: {
        //                             variant: "standard",
        //                             className: "cust-violet-input-field date-field w-100 me-3"
        //                         }
        //                         }}
        //                     />
        //                 </LocalizationProvider>

        //             </div>
        //             <div className="col-12 col-lg-6 mb-3">
        //                 <FormControl fullWidth variant="standard" required>
        //                     <InputLabel>Select Vendor</InputLabel>
        //                     <Select
        //                         value={formObj.vendor_id}
        //                         label="Select Vendor"
        //                         onChange={(ev) => {
        //                             setFormObj({...formObj, vendor_id: ev.target.value})
        //                         }}
        //                     >
        //                         <MenuItem value={1}>Vendor 1</MenuItem>
        //                         <MenuItem value={2}>Vendor 2</MenuItem>
        //                     </Select>
        //                 </FormControl>
        //             </div>
        //             <div className="col-12 col-lg-6 mb-3">
        //                 <FormControl fullWidth variant="standard" required>
        //                     <InputLabel>Execution By</InputLabel>
        //                     <Select
        //                         value={formObj.execution_id}
        //                         label="Execution By"
        //                         onChange={(ev) => {
        //                             setFormObj({...formObj, execution_id: ev.target.value})
        //                         }}
        //                     >
        //                         <MenuItem value={1}>Vendor</MenuItem>
        //                         <MenuItem value={2}>Store Team</MenuItem>
        //                     </Select>
        //                 </FormControl>
        //             </div>
        //             <div className="col-12 mb-3">
        //                 <FormControl fullWidth required variant="standard">
        //                 <InputLabel id="demo-multiselect-label">Select Store</InputLabel>
        //                     <Select
        //                         labelId="demo-multiselect-label"
        //                         id="demo-multiselect"
        //                         required
        //                         multiple
        //                         label="Select Store"
        //                         value={selectedTestItems}
        //                         onChange={handleSelectTestChange}
        //                         renderValue={(selected) => (
        //                             <div>
        //                                 {selected.map((value) => (
        //                                     <Chip key={value} label={value} style={{ margin: '2px' }} />
        //                                 ))}
        //                             </div>
        //                         )}
        //                     >
        //                         {storeItems.map((item) => (
        //                             <MenuItem key={item} value={item}>
        //                                 <ColoredCheckbox
        //                                     checked={selectedTestItems.indexOf(item) > -1}
        //                                 />
        //                                 <ListItemText primary={item} />
        //                             </MenuItem>
        //                         ))}
        //                     </Select>
        //                 </FormControl>
        //             </div>
        //             <div className="col-12 col-lg-6 mb-3">
        //             <h6 className="mb-3 text-black" style={{ textWrap: "nowrap" }}>
        //                 <strong>Reference PPT</strong>
        //             </h6>
        //             <div className="choose-file-input mt-3">
        //                 <label className="btn choose-file-btn" htmlFor="pptFileInput">
        //                 Choose File
        //                 </label>

        //                 <input
        //                 id="pptFileInput"
        //                 type="file"
        //                 style={{ display: "none" }}
        //                 onChange={handleFileChange} // Separate handler for PPT
        //                 />

        //                 <p
        //                 className="mb-0 choose-file-name"
        //                 onClick={() => document.getElementById("pptFileInput").click()}
        //                 style={{ cursor: "pointer" }}
        //                 >
        //                 {fileName || "No file chosen"}
        //                 </p>
        //             </div>
        //             </div>
        //             <div className="col-12 col-lg-6 mb-3">
        //             <h6 className="mb-3 text-black" style={{ textWrap: "nowrap" }}>
        //                 <strong>Commercial Documents</strong>
        //             </h6>
        //             <div className="upload-doc-file">
        //                 <div className="d-flex align-items-center">
        //                 <label className="btn" id="doc-file" style={{ cursor: "pointer", padding: "0.6rem 1rem" }}>
        //                     Choose File
        //                     <input
        //                     id="docFileInput"
        //                     type="file"
        //                     accept=".pdf"
        //                     hidden
        //                     multiple
        //                     onChange={handleDoc} // Separate handler for documents
        //                     />
        //                 </label>
        //                 <p
        //                     className="mb-0"
        //                     style={{ marginLeft: "10px", cursor: "pointer" }}
        //                     onClick={() => document.getElementById("docFileInput").click()}
        //                 >
        //                     {fileNames.length === 0 ? "No file chosen" : fileNames.join(", ")}
        //                 </p>
        //                 </div>
        //             </div>
        //             </div>
        //             {taskCards.map((task, index) => (
        //             <Accordion expanded={isAccordionOpen} onChange={() => setIsAccordionOpen(!isAccordionOpen)}>
        //                 <AccordionSummary
        //                     expandIcon={<ExpandMore />}
        //                     aria-controls="panel1-content"
        //                     id="panel1-header"
        //                 >
        //                     <h5 className='accordion-heading'>Tasks</h5>
        //                 </AccordionSummary>
        //                 <AccordionDetails>
                        
        //                     <div className="row" key={index}>
        //                         <div className="col-12">
        //                             <div className="task-card">
        //                                 <div className="row">
        //                                     <div className="col-12 col-lg-6 mb-3">
        //                                         <TextField 
        //                                             className='w-100' 
        //                                             id={`task-number-${index}`} 
        //                                             variant="standard" 
        //                                             disabled 
        //                                             label="Task Number" 
        //                                             autoComplete="off" 
        //                                             required 
        //                                             value={taskObj.taskNumber}
        //                                             onChange={(ev) => {
        //                                                 setTaskObj({ ...taskObj, taskNumber: ev.target.value });
        //                                             }}
        //                                         />
        //                                     </div>
        //                                     <div className="col-12 col-lg-6 mb-3">
        //                                         <TextField className='w-100' id="outlined-basic" variant="standard" label="Task Name" autoComplete="off" required 
        //                                             onChange={(ev) => {
        //                                                 setTaskObj({ ...taskObj, taskName: ev.target.value });
        //                                             }}
        //                                         />
        //                                     </div>
        //                                     <h6 className='items-heading'>Items</h6>
        //                                     <div className="row" style={{ overflowX: "scroll", maxWidth: "calc(100vw - 360px)"}}>
        //                                         <div className="col-12 mb-3" style={{ minWidth: "100vw", tableLayout: "auto"}}>
        //                                             {items && items.length > 0 && items.map((item, i) => <div className="d-flex align-items-end" key={'task-item'+i}>
        //                                                 <div className='mb-3 me-2 d-none'>
        //                                                     <h5 className='mb-0'>{i+1}.</h5>
        //                                                 </div>
        //                                                 <div className="mb-3 me-2" style={{minWidth: 150}}>
        //                                                     <TextField className='w-100' id="outlined-basic" label="Element Name" variant="standard" autoComplete="off" required
        //                                                         value={item.title}
        //                                                         onChange={(ev) => {
        //                                                             let newItems = [...items].map((newItem, ind) => {
        //                                                             if(ind === i){
        //                                                                 newItem.title = ev.target.value;
        //                                                             }
        //                                                             return newItem;
        //                                                             });
        //                                                             setItems([...newItems])
        //                                                         }}
        //                                                     />
        //                                                 </div>
        //                                                 <div className="mb-3 me-2">
        //                                                     <TextField className='w-100' id="outlined-basic" label="Item Code" variant="standard" autoComplete="off" required
        //                                                         value={item.itemCode}
        //                                                         onChange={(ev) => {
        //                                                             let newItems = [...items].map((newItem, ind) => {
        //                                                             if(ind === i){
        //                                                                 newItem.itemCode = ev.target.value;
        //                                                             }
        //                                                             return newItem;
        //                                                             });
        //                                                             setItems([...newItems])
        //                                                         }}
        //                                                     />
        //                                                 </div>
        //                                                 <div className="mb-3 me-2" style={{minWidth: 150}}>
        //                                                     <TextField className='w-100' id="outlined-basic" label="Item Description" variant="standard" autoComplete="off" required
        //                                                         value={item.description}
        //                                                         onChange={(ev) => {
        //                                                             let newItems = [...items].map((newItem, ind) => {
        //                                                             if(ind === i){
        //                                                                 newItem.description = ev.target.value;
        //                                                             }
        //                                                             return newItem;
        //                                                             });
        //                                                             setItems([...newItems])
        //                                                         }}
        //                                                     />
        //                                                 </div>
        //                                                 <div className="mb-3 me-2">
        //                                                     <TextField className='w-100' id="outlined-basic" label="Width" variant="standard" autoComplete="off" required
        //                                                         value={item.width}
        //                                                         type="number"
        //                                                         onChange={(ev) => {
        //                                                         let newItems = [...items].map((newItem, ind) => {
        //                                                             if(ind === i){
        //                                                             newItem.width = ev.target.value;
        //                                                             if(newItem.height && newItem.width && newItem.quantity){
        //                                                                 newItem.sft = ((newItem.height*newItem.width)/144)*newItem.quantity;
        //                                                                 newItem.sft = (Math.round(newItem.sft*100))/100;
        //                                                             }else{
        //                                                                 newItem.sft = ''
        //                                                             }
        //                                                             }
        //                                                             return newItem;
        //                                                         });
        //                                                         setItems([...newItems])
        //                                                         }}
        //                                                     />
        //                                                 </div>
        //                                                 <div className="mb-3 me-2">
        //                                                     <TextField className='w-100' id="outlined-basic" label="Height" variant="standard" autoComplete="off" required
        //                                                         value={item.height}
        //                                                         type="number"
        //                                                         onChange={(ev) => {
        //                                                         let newItems = [...items].map((newItem, ind) => {
        //                                                             if(ind === i){
        //                                                             newItem.height = ev.target.value;
        //                                                             if(newItem.height && newItem.width && newItem.quantity){
        //                                                                 newItem.sft = ((newItem.height*newItem.width)/144)*newItem.quantity;
        //                                                                 newItem.sft = (Math.round(newItem.sft*100))/100;
        //                                                             }else{
        //                                                                 newItem.sft = ''
        //                                                             }
        //                                                             }
        //                                                             return newItem;
        //                                                         });
        //                                                         setItems([...newItems])
        //                                                         }}
        //                                                     />
        //                                                 </div>
        //                                                 <div className="mb-3 me-2">
        //                                                     <TextField className='w-100' id="outlined-basic" label="Quantity" variant="standard" autoComplete="off" required
        //                                                         value={item.quantity}
        //                                                         type="number"
        //                                                         onChange={(ev) => {
        //                                                         let newItems = [...items].map((newItem, ind) => {
        //                                                             if(ind === i){
        //                                                             newItem.quantity = ev.target.value;
        //                                                             if(newItem.height && newItem.width && newItem.quantity){
        //                                                                 newItem.sft = ((newItem.height*newItem.width)/144)*newItem.quantity;
        //                                                                 newItem.sft = (Math.round(newItem.sft*100))/100;
        //                                                             }else{
        //                                                                 newItem.sft = ''
        //                                                             }
        //                                                             }
        //                                                             return newItem;
        //                                                         });
        //                                                         setItems([...newItems])
        //                                                         }}
        //                                                     />
        //                                                 </div>
        //                                                 <div className="mb-3 me-2">
        //                                                     <TextField className='w-100' disabled id="outlined-basic" label="Total sft" variant="standard" autoComplete="off" required
        //                                                         value={item.total_sft}
        //                                                         onChange={(ev) => {
        //                                                             let newItems = [...items].map((newItem, ind) => {
        //                                                             if(ind === i){
        //                                                                 newItem.total_sft = ev.target.value;
        //                                                             }
        //                                                             return newItem;
        //                                                             });
        //                                                             setItems([...newItems])
        //                                                         }}
        //                                                     />
        //                                                 </div>
        //                                                 <div className="mb-3 me-2">
        //                                                     <TextField className='w-100' id="outlined-basic" label="Rate" variant="standard" autoComplete="off" required
        //                                                         value={item.rate}
        //                                                         onChange={(ev) => {
        //                                                             let newItems = [...items].map((newItem, ind) => {
        //                                                             if(ind === i){
        //                                                                 newItem.rate = ev.target.value;
        //                                                             }
        //                                                             return newItem;
        //                                                             });
        //                                                             setItems([...newItems])
        //                                                         }}
        //                                                     />
        //                                                 </div>
        //                                                 <div className="mb-3 me-2">
        //                                                     <TextField className='w-100' id="outlined-basic" label="Tax" variant="standard" autoComplete="off" required
        //                                                         value={item.tax}
        //                                                         onChange={(ev) => {
        //                                                             let newItems = [...items].map((newItem, ind) => {
        //                                                             if(ind === i){
        //                                                                 newItem.tax = ev.target.value;
        //                                                             }
        //                                                             return newItem;
        //                                                             });
        //                                                             setItems([...newItems])
        //                                                         }}
        //                                                     />
        //                                                 </div>
        //                                                 <div className="mb-3 me-2">
        //                                                     <TextField className='w-100' id="outlined-basic" label="Amount" variant="standard" autoComplete="off" required
        //                                                         value={item.amount}
        //                                                         onChange={(ev) => {
        //                                                             let newItems = [...items].map((newItem, ind) => {
        //                                                             if(ind === i){
        //                                                                 newItem.amount = ev.target.value;
        //                                                             }
        //                                                             return newItem;
        //                                                             });
        //                                                             setItems([...newItems])
        //                                                         }}
        //                                                     />
        //                                                 </div>
        //                                                 <div className="mb-3 d-flex align-items-center">
        //                                                     <button className='btn btn-danger me-2'><MdDelete onClick={() => deleteItem(i)} /></button>
        //                                                 </div>
        //                                                 <div className="mb-3 d-flex align-items-center">
        //                                                     <button className='btn btn-dark' onClick={() => {addItem()}}>+</button>
        //                                                 </div>
        //                                             </div>)}
        //                                         </div>
                                                
                                                
        //                                     </div>
        //                                     <div className="text-center mt-3">
        //                                         <button className='btn btn-dark px-4 me-4' onClick={() => handleSave(index)}>Save</button>
        //                                         <button className='btn btn-danger px-4' onClick={() => handleClear(index)}>Clear</button>
        //                                     </div>
        //                                 </div>
        //                             </div>
        //                         </div>
        //                     </div>
                            
        //                     {!isAccordionOpen && (
        //                         <div className="text-end mb-3">
        //                             <button className="btn btn-dark px-4 py-1" onClick={handleAddTask}>
        //                                 + Add Task
        //                             </button>
        //                         </div>
        //                     )}

        //                 </AccordionDetails>
        //             </Accordion>
        //             ))}
        //             {/* <div className="col-12 mb-3 text-end d-none">
        //               <button className='btn btn-dark px-4 py-1' onClick={handleClickOpen('paper')}>+ Add Task</button>
        //             </div> */}
        //         </div>
        //         <div className="text-center">
        //           <button className='btn btn-dark px-4 me-4' onClick={() => {}}>Create</button>
        //           <button className='btn btn-danger px-4' onClick={() => {navigate('/app/manage-activities')}}>Cancel</button>
        //         </div>
        //     </div>
        // </div>
    )
}

export default CreateActivity