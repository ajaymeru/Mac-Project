import React, { useState } from 'react'
import "./viewtask.css"
import {FormControl, InputLabel, MenuItem, Select, TextField, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { compressImg } from '../../../ImageCompressor';
import Swal from 'sweetalert2';
import { MdUpload } from 'react-icons/md';
import { IoMdEye } from 'react-icons/io';

function ViewEmployeeTask() {
    const navigate = useNavigate();
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
    const [openExec, setOpenExec] = React.useState(false);
    const [scrollExec, setScrollExec] = React.useState('paper');
    const descriptionExecElementRef = React.useRef(null);
  
    const handleCloseExec = () => {
      setOpenExec(false);
    };

    const [assignType, setAssignType] = React.useState('');
    const [openAssign, setOpenAssign] = React.useState(false);
    const [scrollAssign, setScrollAssign] = React.useState('paper');
    const descriptionAssignElementRef = React.useRef(null);
  
    const handleCloseAssign = () => {
      setOpenAssign(false);
    };
    const [openStatus, setOpenStatus] = React.useState(false);
    const [scrollStatus, setScrollStatus] = React.useState('paper');
    const descriptionStatusElementRef = React.useRef(null);
  
    const handleCloseStatus = () => {
      setOpenStatus(false);
    };
    const options = [
      {store_id: 1, store_name: 'Store 1'},{store_id: 2, store_name: 'Store 2'}
    ]

    const [formObj, setFormObj] = React.useState({
      title: "BigC Promo",
      vendor_id: "1",
      description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi, distinctio",
    });

    const [refImg, setRefImg] = useState('');
    const [execImg, setExecImg] = useState('');
    const [tasks, setTasks] = React.useState([
      {
        task_id: 1,
        task_title: 'Task_001',
        store_name: 'Store 1',
        reference_image: 'https://img.freepik.com/free-vector/3d-block-layers-infographic_23-2148564776.jpg',
        reference_file: '',
        execution_image: 'https://img.freepik.com/free-vector/low-poly-polygonal-geometric-shapes-design-3d-abstract-crystal-element_1284-41295.jpg',
        execution_file: '',
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

    React.useEffect(() => {
      if (openExec) {
        const { current: descriptionExecElement } = descriptionExecElementRef;
        if (descriptionExecElement !== null) {
          descriptionExecElement.focus();
        }
      }
    }, [openExec]);

    React.useEffect(() => {
      if (openAssign) {
        const { current: descriptionAssignElement } = descriptionAssignElementRef;
        if (descriptionAssignElement !== null) {
          descriptionAssignElement.focus();
        }
      }
    }, [openAssign]);
    
    React.useEffect(() => {
      if (openStatus) {
        const { current: descriptionStatusElement } = descriptionStatusElementRef;
        if (descriptionStatusElement !== null) {
          descriptionStatusElement.focus();
        }
      }
    }, [openStatus]);
    
    return (
        <div className='employeeContainer'>
            <h5 className='create-employee'>View Task</h5>
            <div className="card forms-card">
                <div className="row mb-3">
                    <div className="col-12 mb-3">
                        {tasks && tasks.length > 0 && tasks.map((task, ti) => <div className="row my-4" key={'task-'+task.task_id}>
                          <div className="col-12">
                            <div className="row">
                              <div className="col-12 col-lg-6 mb-3">
                                <TextField disabled className='w-100' id="outlined-basic" variant="standard" label="Task Name" autoComplete="off" required 
                                      value={task.task_title}
                                />
                              </div>
                              <div className="col-12"></div>
                              <div className="col-12 col-lg-6 mb-3">
                                <TextField disabled className='w-100' id="outlined-basic" variant="standard" label="Store Name" autoComplete="off" required 
                                      value={task.store_name}
                                  />
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
                                  <TextField className='w-100' disabled id="outlined-basic" label="Title" variant="standard" autoComplete="off" required
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
                                  <TextField className='w-100' disabled id="outlined-basic" label="Description" variant="standard" autoComplete="off" required
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
                                  <TextField className='w-100' disabled id="outlined-basic" label="Height" variant="standard" autoComplete="off" required
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
                                <TextField className='w-100' disabled id="outlined-basic" label="Width" variant="standard" autoComplete="off" required
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
                                <TextField className='w-100' disabled id="outlined-basic" label="Quantity" variant="standard" autoComplete="off" required
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
                                <TextField className='w-100' disabled id="outlined-basic" label="Rate per unit" variant="standard" autoComplete="off" required
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
                            </div>)}
                          </div>
                        </div>)}
                    </div>
                    
                    <div className="row">
                      <div className="col-12 col-lg-6 mb-3 text-center">
                          <div className="d-flex justify-content-center align-items-center mb-3">
                            <h6>Reference Image</h6>
                            <button className="btn btn-light text-primary py-1 ms-2" onClick={() => {
                              setOpen(true);
                              setRefImg(tasks[0].reference_image)
                            }}><IoMdEye /></button>
                          </div>
                          <div>
                            <img src="https://img.freepik.com/free-vector/3d-block-layers-infographic_23-2148564776.jpg" style={{maxHeight: '20vh', maxWidth: '100%'}} alt="" />
                          </div>
                      </div>
                      <div className="col-12 col-lg-6 mb-3 text-center">
                          <div className="d-flex justify-content-center align-items-center mb-3">
                            <h6>Execution Image</h6>
                            <button className="btn btn-light text-primary py-1 mx-2" onClick={() => {
                              setOpenExec(true);
                              setExecImg(tasks[0].execution_image)
                            }}><IoMdEye /></button>
                            <button className="btn btn-light text-dark py-1" onClick={() => {
                            }}><MdUpload /></button>
                          </div>
                          <div>
                            <img src={tasks[0].execution_image} style={{maxHeight: '20vh', maxWidth: '100%'}} alt="" />
                          </div>
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <button className='btn btn-dark px-4 me-4' style={{minWidth: 160}} onClick={() => {}}>Submit</button>
                      <button className='btn btn-danger px-4' style={{minWidth: 160}} onClick={() => {}}>Cancel</button>
                    </div>
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
                        <img src={refImg} alt="" style={{maxHeight: '500px', maxWidth: '100%'}} />
                        <br />
                        <input type="file" accept=".png, .jpg, .jpeg, .webp" hidden ref={fileIp} onClick={handleReset} onChange={(ev) => {handleFile(ev)}} />
                        <button className="btn btn-dark px-3 py-1 mt-3" onClick={() => {setOpen(false)}}>Close</button>
                    </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
          <Dialog className='task-dialog'
              open={openExec}
              onClose={handleCloseExec}
              scroll={scrollExec}
              aria-labelledby="scroll-dialog-title"
              aria-describedby="scroll-dialog-description"
            >
            <DialogTitle id="scroll-dialog-title"><strong>Execution Image</strong></DialogTitle>
            <DialogContent dividers={scrollExec === 'paper'}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionExecElementRef}
                tabIndex={-1}
              >
                <div className="row">
                    <div className="col-12 text-center">
                        <img src={execImg} alt="" style={{maxHeight: '500px', maxWidth: '100%'}} />
                        <br />
                        <button className="btn btn-dark px-3 py-1 mt-3" onClick={() => {setOpenExec(false)}}>Close</button>
                    </div>
                </div>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        </div>
    )
}

export default ViewEmployeeTask