import React, { useState } from 'react'
import "./editactivity.css"
import {FormControl, InputLabel, MenuItem, Select, TextField, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { compressImg } from '../../../ImageCompressor';
import Swal from 'sweetalert2';
import { MdDelete, MdUpload } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';

function EditActivity() {
    // const navigate = useNavigate();
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

    const [formObj, setFormObj] = React.useState({
      title: "BigC Promo",
      vendor_id: "1",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, distinctio",
    });

    const [refImg, setRefImg] = useState('')
    const [tasks, setTasks] = React.useState([
      {
        task_id: 1,
        task_title: 'Task_001',
        store_name: 'Store 1',
        reference_image: 'https://img.freepik.com/free-vector/3d-block-layers-infographic_23-2148564776.jpg',
        reference_file: '',
        items: [
          {title: 'Item 1', description: 'Description 1', height: '25', width: '30', quantity: '35', sft: '10', rate_per_unit: '12', amount: '5000'},
          {title: 'Item 2', description: 'Description 2', height: '28', width: '15', quantity: '10', sft: '16', rate_per_unit: '12', amount: '3600'},
        ]
      },
      {
        task_id: 2,
        task_title: 'Task_002',
        store_name: 'Store 2',
        reference_image: 'https://img.freepik.com/free-vector/low-poly-polygonal-geometric-shapes-design-3d-abstract-crystal-element_1284-41295.jpg',
        reference_file: '',
        items: [
          {title: 'Item 1', description: 'Description 1', height: '25', width: '30', quantity: '35', sft: '10', rate_per_unit: '12', amount: '5000'},
          {title: 'Item 2', description: 'Description 2', height: '28', width: '15', quantity: '10', sft: '16', rate_per_unit: '12', amount: '3600'},
        ]
      }
    ]);

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

    const addItem = (ti) => {
      let newTasks = tasks.map((tskVal, tvi) => {
        if(tvi === ti){
          tskVal.items = [...tskVal.items, {title: '', description: '', height: '', width: '', quantity: '', sft: '', rate_per_unit: '', amount: ''}];
        }
        return tskVal;
      })
      setTasks([...newTasks])
    }
    const deleteItem = (ti, ind) => {
      let newTasks = tasks.map((tskVal, tvi) => {
        if(tvi === ti){
          tskVal.items.slice(ind);
        }
        return tskVal;
      })
      setTasks([...newTasks])
    }

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
            <h5 className='create-employee'>Edit Activity</h5>
            <div className="card forms-card">
                <div className="row mb-3">
                    <div className="col-12 mb-3">
                        <TextField className='w-100' id="outlined-basic" variant="standard" label="Title" autoComplete="off" required 
                            value={formObj.title}
                            onChange={(ev) => {
                                setFormObj({...formObj, title: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        <FormControl fullWidth variant="standard" required>
                            <InputLabel>Assigned Vendor</InputLabel>
                            <Select
                                value={formObj.vendor_id}
                                label="Assign Vendor"
                                onChange={(ev) => {
                                    setFormObj({...formObj, vendor_id: ev.target.value})
                                }}
                            >
                                <MenuItem value={1}>Vendor 1</MenuItem>
                                <MenuItem value={2}>Vendor 2</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="col-12 mb-3">
                        <TextField className='w-100' multiline rows="3" id="outlined-basic" variant="standard" label="Description" autoComplete="off" 
                            value={formObj.description}
                            onChange={(ev) => {
                                setFormObj({...formObj, description: ev.target.value})
                            }}
                        />
                    </div>
                    <div className="col-12 mb-3">
                        {tasks && tasks.length > 0 && tasks.map((task, ti) => <div className="row my-4" key={'task-'+task.task_id}>
                          <div className="col-12">
                            <h6><strong>Task {ti+1}</strong></h6>
                            <div className="d-flex">
                              <div className="mb-3 me-3">
                                  <TextField className='w-100' id="outlined-basic" variant="standard" label="Task Name" autoComplete="off" required 
                                      value={task.task_title}
                                      onChange={(ev) => {
                                        
                                      }}
                                  />
                              </div>
                              <div className="mb-3 me-3">
                                  <TextField className='w-100' disabled id="outlined-basic" variant="standard" label="Store Name" autoComplete="off" required 
                                      value={task.store_name}
                                      onChange={(ev) => {
                                        
                                      }}
                                  />
                              </div>
                              <div className="mb-3 d-flex align-items-end">
                                  <TextField className='w-100' id="outlined-basic" variant="standard" value="Reference Image" label="" />
                                  <button className="btn btn-light text-primary px-4 me-2" onClick={() => {
                                    setOpen(true);
                                    setRefImg(task.reference_image)
                                  }}><IoMdEye /></button>
                                  <button className="btn btn-light text-dark px-4" onClick={() => {
                                  }}><MdUpload /></button>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 mt-2">
                            <h6 className='mb-2'>Items Info</h6>
                            {task.items && task.items.length > 0 && task.items.map((item, i) => <div className="d-flex align-items-end" key={'task-item'+i}>
                              <div className='mb-3 me-2'>
                                  <h5 className='mb-0'>{i+1}.</h5>
                              </div>
                              <div className="mb-3 me-2">
                                  <TextField className='w-100' id="outlined-basic" label="Title" variant="standard" autoComplete="off" required
                                    value={item.title}
                                      onChange={(ev) => {
                                        let newItems = [...task.items].map((newItem, ind) => {
                                          if(ind === i){
                                            newItem.title = ev.target.value;
                                          }
                                          return newItem;
                                        });
                                        let newTasks = [...tasks].map((newTask, tii) => {
                                          if(tii === ti){
                                            newTask.items = newItems;
                                          }
                                          return newTask;
                                        })
                                        setTasks([...newTasks])
                                      }}
                                  />
                              </div>
                              <div className="mb-3 me-2" style={{minWidth: 300}}>
                                  <TextField className='w-100' id="outlined-basic" label="Description" variant="standard" autoComplete="off" required
                                    value={item.description}
                                      onChange={(ev) => {
                                        let newItems = [...task.items].map((newItem, ind) => {
                                          if(ind === i){
                                            newItem.description = ev.target.value;
                                          }
                                          return newItem;
                                        });
                                        let newTasks = [...tasks].map((newTask, tii) => {
                                          if(tii === ti){
                                            newTask.items = newItems;
                                          }
                                          return newTask;
                                        })
                                        setTasks([...newTasks])
                                      }}
                                  />
                              </div>
                              <div className="mb-3 me-2">
                                  <TextField className='w-100' id="outlined-basic" label="Height" variant="standard" autoComplete="off" required
                                    value={item.height}
                                    type="number"
                                    onChange={(ev) => {
                                      let newItems = [...task.items].map((newItem, ind) => {
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
                                      let newTasks = [...tasks].map((newTask, tii) => {
                                        if(tii === ti){
                                          newTask.items = newItems;
                                        }
                                        return newTask;
                                      })
                                      setTasks([...newTasks])
                                    }}
                                  />
                              </div>
                              <div className="mb-3 me-2">
                                <TextField className='w-100' id="outlined-basic" label="Width" variant="standard" autoComplete="off" required
                                    value={item.width}
                                    type="number"
                                    onChange={(ev) => {
                                      let newItems = [...task.items].map((newItem, ind) => {
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
                                      let newTasks = [...tasks].map((newTask, tii) => {
                                        if(tii === ti){
                                          newTask.items = newItems;
                                        }
                                        return newTask;
                                      })
                                      setTasks([...newTasks])
                                    }}
                                  />
                              </div>
                              <div className="mb-3 me-2">
                                <TextField className='w-100' id="outlined-basic" label="Quantity" variant="standard" autoComplete="off" required
                                    value={item.quantity}
                                    type="number"
                                    onChange={(ev) => {
                                      let newItems = [...task.items].map((newItem, ind) => {
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
                                      let newTasks = [...tasks].map((newTask, tii) => {
                                        if(tii === ti){
                                          newTask.items = newItems;
                                        }
                                        return newTask;
                                      })
                                      setTasks([...newTasks])
                                    }}
                                  />
                              </div>
                              <div className="mb-3 me-2">
                                <TextField className='w-100' disabled id="outlined-basic" label="sft" variant="standard" autoComplete="off" required
                                    value={item.sft}
                                  />
                              </div>
                              <div className="mb-3 me-2">
                                <TextField className='w-100' id="outlined-basic" label="Rate per unit" variant="standard" autoComplete="off" required
                                    value={item.rate_per_unit}
                                      onChange={(ev) => {
                                        let newItems = [...task.items].map((newItem, ind) => {
                                          if(ind === i){
                                            newItem.rate_per_unit = ev.target.value;
                                          }
                                          return newItem;
                                        });
                                        let newTasks = [...tasks].map((newTask, tii) => {
                                          if(tii === ti){
                                            newTask.items = newItems;
                                          }
                                          return newTask;
                                        })
                                        setTasks([...newTasks])
                                      }}
                                  />
                              </div>
                              <div className="mb-3 d-flex align-items-center">
                                <button className='btn btn-danger'><MdDelete onClick={() => {deleteItem(ti, i)}} /></button>
                              </div>
                            </div>)}
                          </div>
                        </div>)}
                    </div>
                    {/* <div className="col-12 mb-3 text-end">
                      <button className='btn btn-dark px-4 py-1' onClick={handleClickOpen('paper')}>+ Add Task</button>
                    </div> */}
                </div>
                <div className="text-center">
                  <button className='btn btn-dark px-4 me-4' onClick={() => {}}>Update</button>
                  <button className='btn btn-danger px-4' onClick={() => {}}>Cancel</button>
                </div>
            </div>
          <Dialog className='task-dialog'
              open={open}
              onClose={handleClose}
              scroll={scroll}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
            <DialogTitle id="scroll-dialog-title"><strong>Reference Image</strong></DialogTitle>
            <DialogContent dividers={scroll === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <div className="row">
                    <div className="col-12 text-center">
                      <div>
                            <img src={refImg} alt="" style={{maxHeight: '500px', maxWidth: '100%'}} />
                            <br />
                          </div>
                          <div>
                            <input type="file" accept=".png, .jpg, .jpeg, .webp" hidden ref={fileIp} onClick={handleReset} onChange={(ev) => {handleFile(ev)}} />
                            <button className="btn btn-dark px-3 py-1 mt-3" onClick={() => {setOpen(false)}}>Close</button>
                          </div>
                    </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
    //     <div className='employeeContainer'>
    //     <h5 className='create-employee'>Edit Activity</h5>
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
    //                         value={activityDate ? dayjs(activityDate, "YYYY-MM-DD") : null}
    //                         format="DD-MM-YYYY"
    //                         onChange={(newValue) => {
    //                         if (!newValue) return;
    //                         setActivityDate(newValue.format("YYYY-MM-DD")); 
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
    //                         value={completionDate ? dayjs(completionDate, "YYYY-MM-DD") : null}
    //                         format="DD-MM-YYYY"
    //                         onChange={(newValue) => {
    //                         if (!newValue) return;
    //                         setCompletionDate(newValue.format("YYYY-MM-DD")); 
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
    //                 <TextField className='w-100' multiline rows="3" value={formObj.description} id="outlined-basic" variant="standard" label="Activity Description" autoComplete="off" 
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
    //                         value={poDate ? dayjs(poDate, "YYYY-MM-DD") : null}
    //                         format="DD-MM-YYYY"
    //                         onChange={(newValue) => {
    //                         if (!newValue) return;
    //                           setPoDate(newValue.format("YYYY-MM-DD")); 
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
    //                 <TextField className='w-100' id="outlined-basic" value={formObj.poNumber} variant="standard" label="PO/WO Number" autoComplete="off" required 
    //                     onChange={(ev) => {
    //                         setFormObj({...formObj, poNumber: ev.target.value})
    //                     }}
    //                 />
    //             </div>
    //             <div className="col-12 col-lg-6 mb-3">
    //                 <LocalizationProvider dateAdapter={AdapterDayjs}>
    //                     <DatePicker
    //                         label="Promo Period From"
    //                         className="cust-violet-input-field date-field w-100 me-3"
    //                         value={fromDate ? dayjs(fromDate, "YYYY-MM-DD") : null}
    //                         format="DD-MM-YYYY"
    //                         onChange={(newValue) => {
    //                         if (!newValue) return;
    //                         setFromDate(newValue.format("YYYY-MM-DD")); 
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
    //                         value={toDate ? dayjs(toDate, "YYYY-MM-DD") : null}
    //                         format="DD-MM-YYYY"
    //                         onChange={(newValue) => {
    //                         if (!newValue) return;
    //                         setToDate(newValue.format("YYYY-MM-DD"));
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
    //                         disabled
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
    //                 <h6 className="mb-3 text-black" style={{ textWrap: "nowrap" }}>
    //                     <strong>Reference PPT</strong>
    //                 </h6>
    //                 <div className="choose-file-input mt-3">
    //                     <label className="btn choose-file-btn" htmlFor="pptFileInput">
    //                     Choose File
    //                     </label>

    //                     <input
    //                     id="pptFileInput"
    //                     type="file"
    //                     style={{ display: "none" }}
    //                     onChange={handleFileChange} // Separate handler for PPT
    //                     />

    //                     <p
    //                     className="mb-0 choose-file-name"
    //                     onClick={() => document.getElementById("pptFileInput").click()}
    //                     style={{ cursor: "pointer" }}
    //                     >
    //                     {fileName || "No file chosen"}
    //                     </p>
    //                 </div>
    //             </div>

    //                 <div className="col-12 col-lg-6 mb-3">
    //                     <h6 className="mb-3 text-black" style={{ textWrap: "nowrap" }}>
    //                         <strong>Commercial Documents</strong>
    //                     </h6>
    //                     <div className="upload-doc-file">
    //                         <div className="d-flex align-items-center">
    //                         <label className="btn" id="doc-file" style={{ cursor: "pointer", padding: "0.6rem 1rem" }}>
    //                             Choose File
    //                             <input
    //                             id="docFileInput"
    //                             type="file"
    //                             accept=".pdf"
    //                             hidden
    //                             multiple
    //                             onChange={handleDoc} // Separate handler for documents
    //                             />
    //                         </label>
    //                         <p
    //                             className="mb-0"
    //                             style={{ marginLeft: "10px", cursor: "pointer" }}
    //                             onClick={() => document.getElementById("docFileInput").click()}
    //                         >
    //                             {fileNames.length === 0 ? "No file chosen" : fileNames.join(", ")}
    //                         </p>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="d-flex justify-content-between align-items-center mb-3">
    //                 <h5 className='accordion-heading mb-0'>Tasks</h5>
    //                 <div
    //                     className="d-flex ms-4 align-items-center"
    //                     style={{ gap: 10, flex: 1 }}
    //                 >
    //                     <input
    //                     type="checkbox"
    //                     style={{ position: "relative", zIndex: 20 }}
    //                     onChange={(ev) => {
    //                         let newTasks = tasks.map((taskV) => {
    //                         taskV.checked = ev.target.checked;
    //                         return taskV;
    //                         });
    //                         setTasks(newTasks);
    //                     }}
    //                     />

    //                     <Typography
    //                     component="span"
    //                     style={{ flex: 1 }}
    //                     >
    //                     Select All
    //                     </Typography>
    //                 </div>
    //                 {selectedTasks > 0 && <div className="col-12 col-lg-6 text-end">
    //                   <button className="btn btn-success px-4 py-1 me-3" onClick={() => {
    //                     setOpenAssign(true)
    //                   }}>Assign Stores</button>
    //                 </div>}
    //                 </div>
    //                 <Dialog className='task-dialog'
    //       open={openAssign}
    //       onClose={handleCloseAssign}
    //       scroll={scrollAssign}
    //       aria-labelledby="scroll-dialog-title"
    //       aria-describedby="scroll-dialog-description"
    //     >
    //     <DialogTitle id="scroll-dialog-title"><strong>Assign Stores</strong></DialogTitle>
    //     <DialogContent dividers={scrollAssign === 'paper'}>
    //       <DialogContentText
    //         id="scroll-dialog-description"
    //         ref={descriptionAssignElementRef}
    //         tabIndex={-1}
    //       >
    //         <div className="row">
    //             <div className="col-12 mb-3">
    //             <FormControl fullWidth required variant="standard">
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
    //             {/* <div className="col-12 mb-3">
    //                 <TextField className='w-100' multiline rows="3" id="outlined-basic" variant="standard" label="Comments" autoComplete="off" 
                       
    //                 />
    //             </div> */}
    //             <div className="col-12 text-center">
    //                 <button className="btn btn-dark px-3 py-1 me-3" onClick={() => {setOpenAssign(false)}}>Submit</button>
    //                 <button className="btn btn-danger px-3 py-1" onClick={() => {setOpenAssign(false)}}>Cancel</button>
    //             </div>
    //         </div>
    //       </DialogContentText>
    //     </DialogContent>
    //   </Dialog>
    //     {tasks.map((taskObj, index) => (<>
    //               <Accordion expanded={taskObj.expanded}>
    //                   <AccordionSummary
    //                     onClick={(e) => e.stopPropagation()}
    //                       aria-controls={"panel"+index+"-content"}
    //                       id={"panel"+index+"-header"}
    //                   >
    //                     <div className="d-flex w-100 justify-content-between">
                          
    //                     <div className="d-flex" style={{gap: 10, flex: 1}}>
    //                         <input type="checkbox" style={{position: 'relative', zIndex: 20}} id={'checkBoxTask-'+index} checked={taskObj.checked || false}
    //                           onChange={(ev) => {
    //                             setTasks((prevTasks) =>
    //                               prevTasks.map((taskV, taskInd) =>
    //                                 taskInd === index ? { ...taskV, checked: ev.target.checked } : taskV
    //                               )
    //                             );
    //                           }} />
                              
    //                       <Typography component="span" style={{flex: 1}} onClick={() => {
    //                         setTasks((prevTasks) =>
    //                           prevTasks.map((taskV, taskInd) =>
    //                             taskInd === index ? { ...taskV, expanded: !taskV.expanded } : taskV
    //                           )
    //                         );
    //                     }}>{taskObj.taskName}</Typography>
    //                     </div>
    //                     <ExpandMore className='ms-auto' onClick={() => {
    //                           setTasks((prevTasks) =>
    //                             prevTasks.map((taskV, taskInd) =>
    //                               taskInd === index ? { ...taskV, expanded: !taskV.expanded } : taskV
    //                             )
    //                           );
    //                         }} />
    //                     </div>
    //                   </AccordionSummary>
    //                 <AccordionDetails>
    //                     <div className="row alignItems" key={index}>
    //                         <div className="col-12" style={{gap: 10}}>
    //                             <div className="task-card mt-0" style={{flex: 1}}>
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
    //                                         <TextField className='w-100' id="outlined-basic" variant="standard" value={taskObj.taskName || ''} label="Task Name" autoComplete="off" required 
    //                                             onChange={(ev) => {
    //                                                 setTaskObj({ ...taskObj, taskName: ev.target.value });
    //                                             }}
    //                                         />
    //                                     </div>
    //                                     <h6 className='items-heading'>Items</h6>
    //                                     <div className="row" style={{ overflowX: "scroll", maxWidth: "calc(100vw - 360px)"}}>
    //                                         <div className="col-12 mb-3" style={{ minWidth: "100vw", tableLayout: "auto"}}>
    //                                             {taskObj.items && taskObj.items.length > 0 && taskObj.items.map((item, i) => <div className="d-flex align-items-end" key={'task-item'+index+'-'+i}>
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
    //                                         {/* <div className="text-center mb-3">
    //                                             <button className='btn btn-dark px-4 me-4' onClick={() => handleSave(index)}>Save</button>
    //                                             <button className='btn btn-danger px-4' onClick={() => handleClear(index)}>Clear</button>
    //                                         </div> */}
                                            
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </AccordionDetails>
    //               </Accordion>
    //     </>))}

    //             {/* <div className="col-12 mb-3 text-end d-none">
    //               <button className='btn btn-dark px-4 py-1' onClick={handleClickOpen('paper')}>+ Add Task</button>
    //             </div> */}
    //         </div>
    //         <div className="text-center">
    //           <button className='btn btn-dark px-4 me-4' onClick={() => {}}>Update</button>
    //           <button className='btn btn-danger px-4' onClick={() => {navigate('/app/manage-activities')}}>Cancel</button>
    //         </div>
    //     </div>
    // </div>

    //  {tasks.map((taskObj, index) => (<>
    //                   <Accordion expanded={taskObj.expanded}>
    //                       <AccordionSummary
    //                         onClick={(e) => e.stopPropagation()}
    //                           aria-controls={"panel"+index+"-content"}
    //                           id={"panel"+index+"-header"}
    //                       >
    //                         <div className="d-flex w-100 justify-content-between">
                              
    //                         <div className="d-flex" style={{gap: 10, flex: 1}}>
    //                             <input type="checkbox" style={{position: 'relative', zIndex: 20}} id={'checkBoxTask-'+index} checked={taskObj.checked || false}
    //                               onChange={(ev) => {
    //                                 setTasks((prevTasks) =>
    //                                   prevTasks.map((taskV, taskInd) =>
    //                                     taskInd === index ? { ...taskV, checked: ev.target.checked } : taskV
    //                                   )
    //                                 );
    //                               }} />
                                  
    //                           <Typography component="span" style={{flex: 1}} onClick={() => {
    //                             setTasks((prevTasks) =>
    //                               prevTasks.map((taskV, taskInd) =>
    //                                 taskInd === index ? { ...taskV, expanded: !taskV.expanded } : taskV
    //                               )
    //                             );
    //                         }}>{taskObj.taskName}</Typography>
    //                         </div>
    //                         <ExpandMore className='ms-auto' onClick={() => {
    //                               setTasks((prevTasks) =>
    //                                 prevTasks.map((taskV, taskInd) =>
    //                                   taskInd === index ? { ...taskV, expanded: !taskV.expanded } : taskV
    //                                 )
    //                               );
    //                             }} />
    //                         </div>
    //                       </AccordionSummary>
    //                     <AccordionDetails>
    //                         <div className="row alignItems" key={index}>
    //                             <div className="col-12" style={{gap: 10}}>
    //                                 <div className="task-card mt-0" style={{flex: 1}}>
    //                                     <div className="row">
    //                                         <div className="col-12 col-lg-6 mb-3">
    //                                             <TextField 
    //                                                 className='w-100' 
    //                                                 id={`task-number-${index}`} 
    //                                                 variant="standard" 
    //                                                 disabled 
    //                                                 label="Task Number" 
    //                                                 autoComplete="off" 
    //                                                 required 
    //                                                 value={taskObj.taskNumber}
    //                                                 onChange={(ev) => {
    //                                                     setTaskObj({ ...taskObj, taskNumber: ev.target.value });
    //                                                 }}
    //                                             />
    //                                         </div>
    //                                         <div className="col-12 col-lg-6 mb-3">
    //                                             <TextField className='w-100' id="outlined-basic" variant="standard" value={taskObj.taskName || ''} label="Task Name" autoComplete="off" required 
    //                                                 onChange={(ev) => {
    //                                                     setTaskObj({ ...taskObj, taskName: ev.target.value });
    //                                                 }}
    //                                             />
    //                                         </div>
    //                                         <h6 className='items-heading'>Items</h6>
    //                                         <div className="row" style={{ overflowX: "scroll", maxWidth: "calc(100vw - 360px)"}}>
    //                                             <div className="col-12 mb-3" style={{ minWidth: "100vw", tableLayout: "auto"}}>
    //                                                 {taskObj.items && taskObj.items.length > 0 && taskObj.items.map((item, i) => <div className="d-flex align-items-end" key={'task-item'+index+'-'+i}>
    //                                                     <div className='mb-3 me-2 d-none'>
    //                                                         <h5 className='mb-0'>{i+1}.</h5>
    //                                                     </div>
    //                                                     <div className="mb-3 me-2" style={{minWidth: 150}}>
    //                                                         <TextField className='w-100' id="outlined-basic" label="Element Name" variant="standard" autoComplete="off" required
    //                                                             value={item.title}
    //                                                             onChange={(ev) => {
    //                                                                 let newItems = [...items].map((newItem, ind) => {
    //                                                                 if(ind === i){
    //                                                                     newItem.title = ev.target.value;
    //                                                                 }
    //                                                                 return newItem;
    //                                                                 });
    //                                                                 setItems([...newItems])
    //                                                             }}
    //                                                         />
    //                                                     </div>
    //                                                     <div className="mb-3 me-2">
    //                                                         <TextField className='w-100' id="outlined-basic" label="Item Code" variant="standard" autoComplete="off" required
    //                                                             value={item.itemCode}
    //                                                             onChange={(ev) => {
    //                                                                 let newItems = [...items].map((newItem, ind) => {
    //                                                                 if(ind === i){
    //                                                                     newItem.itemCode = ev.target.value;
    //                                                                 }
    //                                                                 return newItem;
    //                                                                 });
    //                                                                 setItems([...newItems])
    //                                                             }}
    //                                                         />
    //                                                     </div>
    //                                                     <div className="mb-3 me-2" style={{minWidth: 150}}>
    //                                                         <TextField className='w-100' id="outlined-basic" label="Item Description" variant="standard" autoComplete="off" required
    //                                                             value={item.description}
    //                                                             onChange={(ev) => {
    //                                                                 let newItems = [...items].map((newItem, ind) => {
    //                                                                 if(ind === i){
    //                                                                     newItem.description = ev.target.value;
    //                                                                 }
    //                                                                 return newItem;
    //                                                                 });
    //                                                                 setItems([...newItems])
    //                                                             }}
    //                                                         />
    //                                                     </div>
    //                                                     <div className="mb-3 me-2">
    //                                                         <TextField className='w-100' id="outlined-basic" label="Width" variant="standard" autoComplete="off" required
    //                                                             value={item.width}
    //                                                             type="number"
    //                                                             onChange={(ev) => {
    //                                                             let newItems = [...items].map((newItem, ind) => {
    //                                                                 if(ind === i){
    //                                                                 newItem.width = ev.target.value;
    //                                                                 if(newItem.height && newItem.width && newItem.quantity){
    //                                                                     newItem.sft = ((newItem.height*newItem.width)/144)*newItem.quantity;
    //                                                                     newItem.sft = (Math.round(newItem.sft*100))/100;
    //                                                                 }else{
    //                                                                     newItem.sft = ''
    //                                                                 }
    //                                                                 }
    //                                                                 return newItem;
    //                                                             });
    //                                                             setItems([...newItems])
    //                                                             }}
    //                                                         />
    //                                                     </div>
    //                                                     <div className="mb-3 me-2">
    //                                                         <TextField className='w-100' id="outlined-basic" label="Height" variant="standard" autoComplete="off" required
    //                                                             value={item.height}
    //                                                             type="number"
    //                                                             onChange={(ev) => {
    //                                                             let newItems = [...items].map((newItem, ind) => {
    //                                                                 if(ind === i){
    //                                                                 newItem.height = ev.target.value;
    //                                                                 if(newItem.height && newItem.width && newItem.quantity){
    //                                                                     newItem.sft = ((newItem.height*newItem.width)/144)*newItem.quantity;
    //                                                                     newItem.sft = (Math.round(newItem.sft*100))/100;
    //                                                                 }else{
    //                                                                     newItem.sft = ''
    //                                                                 }
    //                                                                 }
    //                                                                 return newItem;
    //                                                             });
    //                                                             setItems([...newItems])
    //                                                             }}
    //                                                         />
    //                                                     </div>
    //                                                     <div className="mb-3 me-2">
    //                                                         <TextField className='w-100' id="outlined-basic" label="Quantity" variant="standard" autoComplete="off" required
    //                                                             value={item.quantity}
    //                                                             type="number"
    //                                                             onChange={(ev) => {
    //                                                             let newItems = [...items].map((newItem, ind) => {
    //                                                                 if(ind === i){
    //                                                                 newItem.quantity = ev.target.value;
    //                                                                 if(newItem.height && newItem.width && newItem.quantity){
    //                                                                     newItem.sft = ((newItem.height*newItem.width)/144)*newItem.quantity;
    //                                                                     newItem.sft = (Math.round(newItem.sft*100))/100;
    //                                                                 }else{
    //                                                                     newItem.sft = ''
    //                                                                 }
    //                                                                 }
    //                                                                 return newItem;
    //                                                             });
    //                                                             setItems([...newItems])
    //                                                             }}
    //                                                         />
    //                                                     </div>
    //                                                     <div className="mb-3 me-2">
    //                                                         <TextField className='w-100' disabled id="outlined-basic" label="Total sft" variant="standard" autoComplete="off" required
    //                                                             value={item.total_sft}
    //                                                             onChange={(ev) => {
    //                                                                 let newItems = [...items].map((newItem, ind) => {
    //                                                                 if(ind === i){
    //                                                                     newItem.total_sft = ev.target.value;
    //                                                                 }
    //                                                                 return newItem;
    //                                                                 });
    //                                                                 setItems([...newItems])
    //                                                             }}
    //                                                         />
    //                                                     </div>
    //                                                     <div className="mb-3 me-2">
    //                                                         <TextField className='w-100' id="outlined-basic" label="Rate" variant="standard" autoComplete="off" required
    //                                                             value={item.rate}
    //                                                             onChange={(ev) => {
    //                                                                 let newItems = [...items].map((newItem, ind) => {
    //                                                                 if(ind === i){
    //                                                                     newItem.rate = ev.target.value;
    //                                                                 }
    //                                                                 return newItem;
    //                                                                 });
    //                                                                 setItems([...newItems])
    //                                                             }}
    //                                                         />
    //                                                     </div>
    //                                                     <div className="mb-3 me-2">
    //                                                         <TextField className='w-100' id="outlined-basic" label="Tax" variant="standard" autoComplete="off" required
    //                                                             value={item.tax}
    //                                                             onChange={(ev) => {
    //                                                                 let newItems = [...items].map((newItem, ind) => {
    //                                                                 if(ind === i){
    //                                                                     newItem.tax = ev.target.value;
    //                                                                 }
    //                                                                 return newItem;
    //                                                                 });
    //                                                                 setItems([...newItems])
    //                                                             }}
    //                                                         />
    //                                                     </div>
    //                                                     <div className="mb-3 me-2">
    //                                                         <TextField className='w-100' id="outlined-basic" label="Amount" variant="standard" autoComplete="off" required
    //                                                             value={item.amount}
    //                                                             onChange={(ev) => {
    //                                                                 let newItems = [...items].map((newItem, ind) => {
    //                                                                 if(ind === i){
    //                                                                     newItem.amount = ev.target.value;
    //                                                                 }
    //                                                                 return newItem;
    //                                                                 });
    //                                                                 setItems([...newItems])
    //                                                             }}
    //                                                         />
    //                                                     </div>
    //                                                     <div className="mb-3 d-flex align-items-center">
    //                                                         <button className='btn btn-danger me-2'><MdDelete onClick={() => deleteItem(i)} /></button>
    //                                                     </div>
    //                                                     <div className="mb-3 d-flex align-items-center">
    //                                                         <button className='btn btn-dark' onClick={() => {addItem()}}>+</button>
    //                                                     </div>
    //                                                 </div>)}
    //                                             </div>
    //                                             <div className="text-center mb-3">
    //                                                 <button className='btn btn-dark px-4 me-4' onClick={() => handleSave(index)}>Save</button>
    //                                                 <button className='btn btn-danger px-4' onClick={() => handleClear(index)}>Clear</button>
    //                                             </div>
                                                
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </AccordionDetails>
    //                   </Accordion>
    //         </>))} 
    )
}

export default EditActivity