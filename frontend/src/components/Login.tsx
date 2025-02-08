
const Login = () => {
    return (
        <div>

            <div className={"login-container"}>
                <p className={"title"}>Login to your account</p>

                <p className={"user"}>User</p>
                <input type="text" placeholder="Type your username..."/>

                <p className={"password"}>Password</p>
                <input type="text" placeholder="Type your password..."/>

                <div className={"remember-me-container"}>
                    <input type="checkbox"
                           id="remember-me"/>
                    <label htmlFor="remember-me"> Remember me</label>
                </div>

                <a href="https://wikirby.com/wiki/Sleep">Forgot password?</a>

                <button className={"login-button"}>Login</button>
                </div>
        </div>
    );
};

export default Login;