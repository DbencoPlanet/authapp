export interface userregister {
  userName: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface registerconfirm {
  userid: number;
  username: string;
  otptext: string;
}

export interface usercred {
  username: string;
  password: string;
}

export interface loginresp {
  token: string;
  refreshToken: string;
  userRole: string;
}

export interface menu {
  code: string;
  name: string;
}

export interface resetpassword {
  username: string;
  oldpassword: string;
  newpassword: string;
}

export interface updatepassword {
  username: string;
  password: string;
  otptext: string;
}

export interface menupermission {
  code: string;
  name: string;
  haveview: boolean;
  haveadd: boolean;
  haveedit: boolean;
  havedelete: boolean;
}

export interface users {
  username: string;
  name: string;
  email: string;
  phone: string;
  isactive: boolean;
  statusname: string;
  role: string;
}
