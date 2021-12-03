import React, { useState } from "react";
//import UseForm from "./useForm";
import validate from "./validateInfo";
import { useMutation } from "@apollo/client";
import Swal from 'sweetalert2'
import { CREATE_USER } from "../Graphql/mutation";

function Register() {
    const [createUser] = useMutation(CREATE_USER);

    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        cfpassword: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const addUser = (data) => {
        createUser({
            variables: { input: data },
        })
        .then(() => {
                Swal.fire({
                    title: "Sign up success!",
                    html: "Press Ok to login page",
                    icon: "success",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    didClose: () => {
                        window.location.replace("/login");
                    },
                });
        })
        .catch((error) => {
            const err = error.message;
            Swal.fire({
                title: "Bae Bae Boo!!",
                html: err,
                icon: "error",
                allowOutsideClick: false,
                allowEscapeKey: false,
            });
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setErrors(validate(values));
        console.log(Object.keys(errors).length)
        if (Object.keys(errors).length === 0) {
            const param = {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password,
            };

            addUser(param);
        }
    };


    return (
        <div className="bg-gray-50 min-w-full min-h-full flex justify-center items-center px-10">
            <div className="flex items-center bg-gray-800 rounded-lg shadow-lg overflow-hidden m-8 w-full sm:max-w-md lg:max-w-5xl">
                <div className="w-full p-5 hidden lg:block lg:w-1/2 bg-cover">
                    <img
                        className="object-cover"
                        src="img/regis.gif"
                        alt="planning"
                    />
                </div>
                <div className="w-full bg-white p-10 lg:w-1/2">
                    <h1 className="text-2xl font-bold text-center pb-8">Sign Up</h1>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="flex text-sm">
                            <div className="w-1/2 mr-5 space-y-2">
                                <label for="firstname" className="block text-base font-semibold">First name</label>
                                <div className="flex">
                                    <input type="text" name="firstname" id="firstname"
                                        className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 " required
                                        placeholder="John" value={values.firstname}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.firstname && <div className="text-xs text-red-400 mb-0">{errors.firstname}</div>}
                            </div>
                            <div className="w-1/2 space-y-2">
                                <label for="lastname" className="block text-base font-semibold">Last name</label>
                                <div className="flex">
                                    <input type="text" name="lastname" id="lastname"
                                        className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 " required
                                        placeholder="Smith" value={values.lastname}
                                        onChange={handleChange}
                                    />
                                </div>
                                {errors.lastname && <div className="text-xs text-red-400 mb-0">{errors.lastname}</div>}
                            </div>
                        </div>
                        <div className="space-y-2 mt-6 text-sm">
                            <label for="email" className="block text-base font-semibold">E-mail</label>
                            <input type="email" name="email" id="email"
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 " required
                                placeholder="myemail@example.com" value={values.email}
                                onChange={handleChange}
                            />
                            {errors.email && <div className="text-xs text-red-400 mb-0">{errors.email}</div>}
                        </div>
                        <div className="space-y-2 mt-6 text-sm">
                            <label for="password" className="block text-base font-semibold">Password</label>
                            <input type="password" name="password" id="password"
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0" required
                                placeholder="*****************" value={values.password}
                                onChange={handleChange}
                            />
                            {errors.password && <div className="text-xs text-red-400 mb-0">{errors.password}</div>}
                        </div>
                        <div className="space-y-2 mt-6 text-sm3">
                            <label for="cfpassword" className="block text-base font-semibold">Comfirm Password</label>
                            <input type="password" name="cfpassword" id="cfpassword"
                                className="w-full bg-gray-200 text-gray-700 px-4 py-3 rounded-md block w-full appearance-none border-0 " required
                                placeholder="*****************" value={values.cfpassword}
                                onChange={handleChange}
                            />
                            {errors.cfpassword && <div className="text-xs text-red-400 mb-0">{errors.cfpassword}</div>}
                        </div>
                        <button className="block w-full mt-9 p-3 text-center font-semibold rounded-md text-white bg-gray-800 hover:bg-gray-600">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;