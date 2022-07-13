import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="login-form">
                <h1 style={{color:"gray"}} className="login-title"> ورود </h1>
                <form method="post">
                    <div className="form-group">
                        <label htmlFor="user-name" className="form-label"> نام کاربری </label>
                        <input type="text" name="user-name" id="user-name" className="from-input" placeholder="نام کاربری"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="pass-input" className="form-label"> رمز عبور </label>
                        <input type="text" name="pass-input" id="pass-input" className="from-input" placeholder="رمز عبور"/>
                    </div>
                    <input type="submit" name="sub" className="sub" value="ورود"/>
                </form>
            </div>
        );
    }
}

export default Login;