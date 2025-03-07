import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
// import ChangePassword from "./pages/ChangePassword/ChangePassword";
// import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import Layout from "./pages/layout/Layout";
import CreateAccount from "./pages/admin/accounts/CreateAccount/CreateAccount";
import EditAccount from "./pages/admin/accounts/EditAccount/EditAccount";
import ManageAccounts from "./pages/admin/accounts/ManageAccounts/ManageAccounts";
import ApproveAccount from "./pages/admin/accounts/ApproveAccount/ApproveAccount";
import CreateVendor from "./pages/admin/vendors/CreateVendor/CreateVendor";
import EditVendor from "./pages/admin/vendors/EditVendor/EditVendor";
import ManageVendors from "./pages/admin/vendors/ManageVendors/ManageVendors";
import ApproveVendor from "./pages/admin/vendors/ApproveVendor/ApproveVendor";
// import CreateEmployee from "./pages/createemployee/CreateEmployee";
// import Editemployee from "./pages/editemployee/Editemployee";
import CreateVendorRequest from "./pages/createvendorrequest/CreateVendorRequest";
import ManageEmployees from "./pages/employees/manageemployees/ManageEmployees";
import CreateEmployee from "./pages/employees/createemployee/CreateEmployee";
import EditEmployee from "./pages/employees/editemployee/Editemployee";
import ManageStores from "./pages/stores/managestores/ManageStores";
import CreateStore from "./pages/stores/createstore/CreateStore";
import EditStore from "./pages/stores/editstore/EditStore";
import CreateActivity from "./pages/activities/createactivity/CreateActivity";
import ManageActivities from "./pages/activities/manageactivities/ManageActivities";
import EditActivity from "./pages/activities/editactivity/EditActivity";
import ViewActivity from "./pages/activities/viewactivity/ViewActivity";
import ManageAssignedTasks from "./pages/activities/manageassignedtasks/ManageAssignedTasks";
import ManageApprovedTasks from "./pages/activities/manageapprovedtasks/ManageApprovedTasks";
import ViewTask from "./pages/activities/viewtask/ViewTask";
import ViewEmployeeTask from "./pages/activities/viewemployeetask/ViewEmployeeTask";
import ActivitySummary from "./pages/activities/manageactivities/ActivitySummary";
import SingleActivity from "./pages/activities/editactivity/SingleActivity";
// import CreateLocation from "./pages/createlocation/CreateLocation";
// import Editlocation from "./pages/editlocation/Editlocation";
// import ManageLocations from "./pages/managelocations/ManageLocations";
import Profile from "./pages/profile/Profile";
import ActivitySummaryClient from "./pages/activities/manageactivities/ActivitySummaryClient";
import ActivitySummaryClientCopy from "./pages/activities/manageactivities/ActivitySummaryClientCopy";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/app/login" element={<Login />} />
          {/* <Route path="/app/change-password" element={<ChangePassword />} /> */}
          {/* <Route path="/app/forgot-password" element={<ForgotPassword />} /> */}
          <Route path="/app" element={<Layout />}>
            <Route index path="/app/create-vendor-request" element={<CreateVendorRequest />} />
            <Route index path="/app/create-employee" element={<CreateEmployee />} />
            <Route path="/app/edit-employee" element={<EditEmployee />} />
            <Route path="/app/manage-employees" element={<ManageEmployees />} />
            <Route path="/app/create-store" element={<CreateStore />} />
            <Route path="/app/edit-store" element={<EditStore />} />
            <Route path="/app/manage-stores" element={<ManageStores />} />
            <Route path="/app/create-activity" element={<CreateActivity />} />
            <Route path="/app/edit-activity" element={<EditActivity />} />
            <Route path="/app/view-activity" element={<ViewActivity />} />
            <Route path="/app/manage-activities" element={<ManageActivities />} />
            <Route path="/app/manage-activitie" element={<ActivitySummaryClient />} />

            <Route path="/app/manage-activity2" element={<ActivitySummaryClientCopy />} />

            <Route path="/app/activity-summary" element={<ActivitySummary />} />
            <Route path="/app/single-activity" element={<SingleActivity />} />
            <Route path="/app/manage-assignedtasks" element={<ManageAssignedTasks />} />
            <Route path="/app/manage-approvedtasks" element={<ManageApprovedTasks />} />
            <Route path="/app/view-task" element={<ViewTask />} />
            <Route path="/app/view-employee-task" element={<ViewEmployeeTask />} />
            <Route path="/app/profile" element={<Profile />} />
            <Route path="/app/reset-password" element={<ResetPassword />} />
          </Route>
          <Route path="/admin" element={<Layout />}>
            <Route index path="/admin/create-client" element={<CreateAccount />} />
            <Route index path="/admin/edit-client/:account_code" element={<EditAccount />} />
            <Route index path="/admin/manage-clients" element={<ManageAccounts />} />
            <Route index path="/admin/approve-client" element={<ApproveAccount />} />
            <Route index path="/admin/create-vendor" element={<CreateVendor />} />
            <Route index path="/admin/edit-vendor/:VendorCreateVendor_code" element={<EditVendor />} />
            <Route index path="/admin/manage-vendors" element={<ManageVendors />} />
            <Route index path="/admin/approve-vendor" element={<ApproveVendor />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
