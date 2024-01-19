import React, { useEffect, useRef } from 'react';
// import { data } from '../data';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PROFILE_PROCESS } from '../redux-saga/user/action';

const Login = () => {
    // Retrieve data from localStorage or use an empty array if not present

    const abc = useSelector((state) => state.profile_reducer)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({ type: GET_PROFILE_PROCESS })
    }, [])

    localStorage.setItem("Data", JSON.stringify(abc.profile_data))

    const userName = useRef();
    const password = useRef();
    const role = useRef();

    const login = () => {
        const input = {
            userName: userName.current.value,
            password: password.current.value,
            role: role.current.value,
        };

        console.log(input);
        // Check if input matches any object in the stored data
        const isMatch = abc.profile_data.some(obj => areObjectsEqual(obj, input));

        if (isMatch) {
            Swal.fire({
                title: "Login successfully !",
                text: "You clicked the button!",
                icon: "success"
            })
            Cookies.set("User", input.userName)
            Cookies.set("Password", input.password)
            Cookies.set("Role", input.role)
            window.location.href = "http://localhost:3000/dashboard"
            // Perform additional actions for successful login
        } else {
            Swal.fire({
                icon: "Wrong username or password",
                title: "Oops...",
                text: "Something went wrong!",
                footer: '<a href="#">Why do I have this issue?</a>'
            })
        }
    };

    // Function to compare two objects
    const areObjectsEqual = (obj1, obj2) => {
        for (let key in obj1) {
            if (obj1.hasOwnProperty(key) !== obj2.hasOwnProperty(key) ||
                obj1[key] !== obj2[key]) {
                return false;
            }
        }

        for (let key in obj2) {
            if (obj2.hasOwnProperty(key) !== obj1.hasOwnProperty(key)) {
                return false;
            }
        }

        return true;
    };

    return (
        <>
            <div className="wrapper">
                <div class="logo">
                    <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="" />
                </div>
                <div class="text-center mt-4 name">
                    Shop online
                </div>
                {/* <form class="p-3 mt-3"> */}
                <div class="form-field d-flex align-items-center">
                    <span class="far fa-user"></span>
                    <input type="text" name="userName" ref={userName} id="userName" placeholder="Username" />
                </div>
                <div class="form-field d-flex align-items-center">
                    <span class="fas fa-key"></span>
                    <input type="password" name="password" ref={password} id="pwd" placeholder="Password" />
                </div>
                <div class="form-field d-flex align-items-center">
                    <span class="fas fa-key"></span>
                    <input type="role" name="role" ref={role} id="role" placeholder="Role" />
                </div>
                <button class="btn mt-3" onClick={login}>Login</button>
                {/* </form> */}
                <div class="text-center fs-6">
                    {/* <a href="#">Forget password?</a> or <a href="#">Sign up</a> */}
                </div>
            </div>
        </>
    );
};

export default Login;
