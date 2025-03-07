const baseUrl = "https://attendlog.com/api";
// const baseUrl = "http://localhost:8090/api";

const getAccessToken = () => {
  let token = JSON.parse(localStorage.getItem('token'));
  return token ? token : '';
}

export const loginApi = async (obj) => {
  let res = await fetch(baseUrl+"/login", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE"
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const changePassword = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/changePassword", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "x-access-token": accessToken
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const forgotPassword = async (obj) => {
  let res = await fetch(baseUrl+"/forgotPassword", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

// CMS Attendance Capture
export const captureAttendance = async (obj) => {
  let res = await fetch(baseUrl+"/captureAttendance", {
    method: "POST",
    body: obj
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const getEmployeeAttendanceInfo = async (account_code, emp_code) => {
  let res = await fetch(baseUrl+"/getEmployeeAttendanceInfo/"+account_code+'/'+emp_code);
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const markLogin = async (obj) => {
  let res = await fetch(baseUrl+"/markLogin", {
    method: "POST",
    body: obj
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const markLogout = async (obj) => {
  let res = await fetch(baseUrl+"/markLogout", {
    method: "PUT",
    body: obj
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

// Accounts
export const createAccountApi = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/createAccount", {
    method: "POST",
    headers: {
      "x-access-token": accessToken
    },
    body: obj
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}
export const getAllAccounts = async () => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/getAllAccounts", {
    headers: {
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}
export const getAccount = async (account_code) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/getAccountInfo/"+account_code, {
    headers: {
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}
export const updateAccount = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/updateAccount", {
    method: 'PUT',
    headers: {
      "x-access-token": accessToken
    },
    body: obj
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}
export const changeAccountStatus = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/changeAccountStatus/"+obj, {
    headers: {
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const deleteAccount = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/deleteAccount/"+obj, {
    method: "DELETE",
    headers: {
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

// Locations / Branches
export const createLoc = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/createLocation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}
export const getLocations = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/getLocations/"+obj, {
    headers: {
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}
export const deleteLoc = async (account_code, location_code) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/deleteLocation/"+account_code+'/'+location_code, {
    method: "DELETE",
    headers: {
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

// Employees
export const createEmp = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/createEmployee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const getAllEmployees = async () => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/getAllEmployees", {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const getEmployees = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(`${baseUrl}/getEmployeesByAccountCode/${obj}`, {
    headers: {
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const getEmployeesData = async (account_code, location_code) => {
  let res = await fetch(baseUrl+"/getEmployeesData/"+account_code+'/'+location_code);
  let data = await res.json();
  return data;
}

export const getEmp = async (account_code, emp_code) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/getEmployeeInfo/"+account_code+'/'+emp_code, {
    headers: {
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const updateEmp = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(`${baseUrl}/updateEmployee`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const deleteEmp = async (account_code,emp_code) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/deleteEmployee/"+account_code+'/'+emp_code, {
    method: "DELETE",
    headers: {
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

// Logs
export const getAttendanceLog = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/getAttendanceLog/"+obj, {
    headers: {
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}
export const getEmpLogByDate = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/getEmpLogByDate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

// Reports
export const generateCompanyReport = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/generateCompanyReport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}
export const generateEmployeeReport = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/generateEmployeeReport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}
export const generateLocationReport = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/generateLocationReport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

// BNI
export const createMember = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/createMember", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const getAllMembers = async () => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/getAllMembers", {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const getMembers = async (account_code) => {
  let accessToken = await getAccessToken()
  let res = await fetch(`${baseUrl}/getMembers/${account_code}`, {
    headers: {
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const getMembersData = async (account_code, qr_name) => {
  let res = await fetch(baseUrl+"/getMembers/"+account_code+'/'+qr_name);
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const getMember = async (id) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/getMemberInfo/"+id, {
    headers: {
      "x-access-token": accessToken
    }
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const updateMember = async (obj, member_id) => {
  let accessToken = await getAccessToken()
  let res = await fetch(`${baseUrl}/updateMember/`+member_id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const deleteMember = async (id) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+"/deleteMember/"+id, {
    method: "DELETE",
    headers: {
      "x-access-token": accessToken
    },
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}

export const captureMemberAttendance = async (obj) => {
  let res = await fetch(baseUrl+'/captureMemberAttendance/', {
    method: "POST",
    body: obj
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}
export const captureSubstituteAttendance = async (obj) => {
  let res = await fetch(baseUrl+'/captureSubstituteAttendance/', {
    method: "POST",
    body: obj
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}
export const captureVisitorAttendance = async (obj) => {
  let res = await fetch(baseUrl+'/captureVisitorAttendance/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}
export const generateBNIReport = async (obj) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+'/generateBNIReport/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": accessToken
    },
    body: JSON.stringify(obj)
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}
export const getBNIMembersLog = async (account_code) => {
  let accessToken = await getAccessToken()
  let res = await fetch(baseUrl+'/getBNIMembersLog/'+account_code, {
    headers: {
      "x-access-token": accessToken
    },
  });
  if (!res.ok) {
    let data = await res.json();
    data.status = 'F';
    data.apiStatus = res.status;
    console.log(data)
    return data;
  }
  let data = await res.json();
  return data;
}