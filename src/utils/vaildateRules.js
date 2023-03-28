const vaildateName = (rule, val, callback) => {
  // let reg = /(^[a-zA-Z0-9?:\u4e00-\u9fa5·]{4,10})$/
  let reg = /(^[a-zA-Z0-9]{4,10})$/;

  if (val === "") {
    return callback(new Error("请输入用户名"));
  } else if (!reg.test(val)) {
    callback(new Error("请输入4-10位字母或数字,或汉字组成的用户名"));
  }
  callback();
};
const vaildatePass = (rule, val, callback) => {
  // let reg = /^\S*(?=\S{3,10})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/
  let pass = /(^[a-zA-A0-9]{3,10})$/;
  if (val === "") {
    callback(new Error("请输入密码"));
  } else if (!pass.test(val)) {
    callback(
      new Error("请输入3-10位字母或数字,或汉字组成的密码，不能含特殊字符")
    );
  }
  callback();
};

const vaildatePhone = (rule, val, callback) => {
  let reg =
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/;
  if (val === "") {
    callback(new Error("请输入手机号码"));
  } else if (!reg.test(val)) {
    callback(new Error("手机号码格式不正确！"));
  }
  callback();
};

export { vaildateName, vaildatePass, vaildatePhone };
