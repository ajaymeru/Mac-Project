import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ActivityScreenEndUser.css';

const ActivityScreenEndUser = () => {
    const sampleData = {
        activityName: 'Sankranthi_Fashion',
        activityNumber: '1001',
        taskNumber: '1001',
        executionReference: 'Execution Reference PPT', // file
        tankName: 'Sankranthi_Fashion',
        attachments: 'Attachments', // file
        storeCode: 'Fr01',
        dcInvoice: 'DC/Invoice', // file
        executionBy: 'Vendor', // select
        docketNumber: '987456',
        Button: 'Complete',
    };

    const tableData = [
        {
            lineNo: 1,
            storeCode: 'FR01',
            storeName: 'Ameerpet',
            elementName: 'Dangler',
            itemCode: '123095',
            itemDescription: 'Dangler',
            width: 12,
            height: 12,
            quantity: 100,
            totalSFT: 100,
        },
        {
            lineNo: 2,
            storeCode: 'FR01',
            storeName: 'Ameerpet',
            elementName: 'Dropdown',
            itemCode: '590081',
            itemDescription: '5mm Form Board',
            width: 36,
            height: 24,
            quantity: 1,
            totalSFT: 6,
        },
        {
            lineNo: 3,
            storeCode: 'FR01',
            storeName: 'Ameerpet',
            elementName: 'Dropdown',
            itemCode: '590081',
            itemDescription: 'Vinyl',
            width: 36,
            height: 24,
            quantity: 2,
            totalSFT: 12,
        },
        {
            lineNo: 4,
            storeCode: 'FR01',
            storeName: 'Ameerpet',
            elementName: 'Floor Stack',
            itemCode: '590082',
            itemDescription: 'Star Flex',
            width: 36,
            height: 24,
            quantity: 1,
            totalSFT: 6,
        },
    ];

    const [filters, setFilters] = useState({
        storeCode: '',
        storeName: '',
        elementName: '',
        itemCode: '',
    });

    const filteredData = tableData.filter((item) => {
        return (
            item.storeCode.toLowerCase().includes(filters.storeCode.toLowerCase()) &&
            item.storeName.toLowerCase().includes(filters.storeName.toLowerCase()) &&
            item.elementName.toLowerCase().includes(filters.elementName.toLowerCase()) &&
            item.itemCode.toLowerCase().includes(filters.itemCode.toLowerCase())
        );
    });

    return (
        <div className="ActivityScreenEndUser container-fluid" style={{}}>
            <h5 className="col-12 mb-3 create-employee">Activity Screen EndUser</h5>
            <div className="data-table row p-3">
                <div className="enduser col-12">
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Activity Name:</label>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                className="form-control"
                                value={sampleData.activityName}
                                readOnly
                            />
                        </div>
                        <label className="col-sm-2 col-form-label">Activity Number:</label>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                className="form-control"
                                value={sampleData.activityNumber}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Task Number:</label>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                className="form-control"
                                value={sampleData.taskNumber}
                                readOnly
                            />
                        </div>
                        <label className="col-sm-2 col-form-label">Execution Reference:</label>
                        <div className="col-sm-4">
                            <input type="file" className="form-control" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Tank Name:</label>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                className="form-control"
                                value={sampleData.tankName}
                                readOnly
                            />
                        </div>
                        <label className="col-sm-2 col-form-label">Attachments:</label>
                        <div className="col-sm-4">
                            <input type="file" className="form-control" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Store Code:</label>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                className="form-control"
                                value={sampleData.storeCode}
                                readOnly
                            />
                        </div>
                        <label className="col-sm-2 col-form-label">DC/Invoice:</label>
                        <div className="col-sm-4">
                            <input type="file" className="form-control" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label className="col-sm-2 col-form-label">Execution By:</label>
                        <div className="col-sm-4">
                            <select className="form-control">
                                <option value="Vendor">Vendor</option>
                                <option value="Store Team">Store Team</option>
                            </select>
                        </div>
                        <label className="col-sm-2 col-form-label">Docket Number:</label>
                        <div className="col-sm-4">
                            <input
                                type="text"
                                className="form-control"
                                value={sampleData.docketNumber}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-sm-2">
                            <button className="btn btn-primary">{sampleData.Button}</button>
                        </div>
                    </div>
                </div>
                <div className="card table-card mt-3" style={{ width: '100%' }}>
                    <div className="tableContainer activity-table" style={{ overflowX: "auto", maxWidth: "calc(100vw - 360px)" }}>
                        <table className="table" style={{ minWidth: "100vw", tableLayout: "auto", paddingInline: '1em' }}>
                            <thead>
                                <tr>
                                    <th className="table-heading">Line No</th>
                                    <th className="table-heading">Store / Branch Code</th>
                                    <th className="table-heading">Store / Branch Name</th>
                                    <th className="table-heading">Element Name</th>
                                    <th className="table-heading">Item code</th>
                                    <th className="table-heading">Item Description</th>
                                    <th className="table-heading">Width (Inches)</th>
                                    <th className="table-heading">Height (Inches)</th>
                                    <th className="table-heading">Quantity</th>
                                    <th className="table-heading">Total SFT</th>
                                </tr>
                                <tr className="table-heading">
                                    <th></th>
                                    <th className="table-search">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="searchInput"
                                            value={filters.storeCode}
                                            onChange={(e) => setFilters({ ...filters, storeCode: e.target.value })}
                                        />
                                    </th>
                                    <th className="table-search">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="searchInput"
                                            value={filters.storeName}
                                            onChange={(e) => setFilters({ ...filters, storeName: e.target.value })}
                                        />
                                    </th>
                                    <th className="table-search">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="searchInput"
                                            value={filters.elementName}
                                            onChange={(e) => setFilters({ ...filters, elementName: e.target.value })}
                                        />
                                    </th>
                                    <th className="table-search">
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            className="searchInput"
                                            value={filters.itemCode}
                                            onChange={(e) => setFilters({ ...filters, itemCode: e.target.value })}
                                        />
                                    </th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((data, index) => (
                                        <tr key={index} className="table-row-color">
                                            <td>{data.lineNo}</td>
                                            <td>{data.storeCode}</td>
                                            <td>{data.storeName}</td>
                                            <td>{data.elementName}</td>
                                            <td>{data.itemCode}</td>
                                            <td>{data.itemDescription}</td>
                                            <td>{data.width}</td>
                                            <td>{data.height}</td>
                                            <td>{data.quantity}</td>
                                            <td>{data.totalSFT}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10" className="text-center">
                                            No records found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActivityScreenEndUser;