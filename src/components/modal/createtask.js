import Proptypes from "prop-types";
import React, { useState, useEffect } from "react";
import { ReactComponent as CreateSvg } from "../../assets/icons/create.svg";
import { InMemoryCache } from "apollo-cache-inmemory";
import gql from "graphql-tag";

import Select from "react-select";
import { createHttpLink } from "apollo-link-http";
import ApolloClient from "apollo-client";

//! Set to query data currnt user 
const onwerId = 1;

function CreateTask({
  setShowCreateProjectModalFromParent,
  addTask,
  projectId,
}) {
  const httpLink = createHttpLink({
    uri: "http://localhost:5000/graphql",
  });

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });

  const [values, setValues] = useState({
    taskName: "",
    startDate: "",
    dueDate: "",
    description: "",
  });

  const [selectedOption, setSelectedOption] = useState([]);

  function handleMultiChange(option) {
    setSelectedOption(option);
  }

  const [users, setUsers] = useState([]);

  const [errors, setErrors] = useState({});

  // query member of project
  async function getUsers(projectId) { 
    const { data, error } = await client.query({
      query: gql`
        query member {
          member(id: ${projectId}) {
            user {
              userId
              email
            }
          }
        }
      `,
      variables: { id: projectId },
    });

    const userOptions = data.member.map((item) => {
      return {
        value: item.user.userId,
        label: item.user.email,
      };
    });

    setUsers(userOptions);
  }
  useEffect(() => {
    getUsers(parseInt(projectId));
  }, []);

  function Validate() {
    let errors = {};

    if (!values.taskName) {
      errors.taskName = "Please input task name";
    } else if (/[^a-zA-Z0-9\s]/.test(values.taskName)) {
      errors.taskName = "Plese input only characters or number";
    }

    if (!values.startDate) {
      errors.startDate = "Please input start date";
    } else if (/^\d{2}([./-])\d{2}\1\d{4}$/.test(values.startDate)) {
      errors.startDate = "Plese input only date format";
    }

    if (!values.dueDate) {
      errors.dueDate = "Please input due date";
    } else if (/^\d{2}([./-])\d{2}\1\d{4}$/.test(values.dueDate)) {
      errors.dueDate = "Plese input only date format";
    }

    if (!values.description) {
      errors.description = "Please input description";
    }
    setErrors(errors);
    console.log("error1", errors);
    return errors;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  async function onSubmit(event) {
    event.preventDefault();

    const userId = [
      ...selectedOption.map((item) => {
        return item.value;
      }),
    ];
      console.log("member task",userId);
    const errors = Validate();
    if (Object.keys(errors).length === 0) {
      addTask(
        parseInt(projectId),
        values.taskName,
        values.startDate,
        values.dueDate,
        values.description,
        userId,
        onwerId
      );
    }
  }

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none">
      <div className="CreateProject font-mono">
        <div className="absolute bg-black opacity-80 inset-0 z-0 "></div>
        <div className="w-screen  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white mt-0 ">
          <div className="">
            <div className="text-center p-5 flex-auto justify-center ">
              <CreateSvg />
              <h2 className="text-xl font-bold py-4  ">Create Task</h2>
              <div className="space-y-4">
                <form>
                  <label className="block text-gray-700 text-sm font-normal mb-2 text-left ">
                    Name Task
                  </label>
                  <input
                    style={errors.taskName ? { borderColor: "red" } : null}
                    type="text"
                    name="taskName"
                    placeholder="Name task"
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none border-gray-300"
                    value={values.taskName}
                    onChange={handleChange}
                  />
                  <small>
                    {errors.taskName && (
                      <div className="block text-red-400 text-sm font-normal mt-2 mb-2 text-left ">
                        {errors.taskName}
                      </div>
                    )}
                  </small>
                  <label className="block text-gray-700 text-sm font-normal mb-2 mt-2 text-left ">
                    Start Date
                  </label>
                  <input
                    style={errors.startDate ? { borderColor: "red" } : null}
                    type="date"
                    name="startDate"
                    placeholder="Start Date"
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none border-gray-300 "
                    value={values.startDate}
                    onChange={handleChange}
                  />
                  <small>
                    {errors.startDate && (
                      <div className="block text-red-400 text-sm font-normal mt-2 mb-2 text-left ">
                        {errors.startDate}
                      </div>
                    )}
                  </small>
                  <label className="block text-gray-700 text-sm font-normal mb-2 mt-2 text-left ">
                    Due Date
                  </label>
                  <input
                    style={errors.dueDate ? { borderColor: "red" } : null}
                    type="date"
                    name="dueDate"
                    placeholder="Due Date"
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none border-gray-300 "
                    value={values.dueDate}
                    onChange={handleChange}
                  />
                  <small>
                    {errors.dueDate && (
                      <div className="block text-red-400 text-sm font-normal mt-2 mb-2 text-left ">
                        {errors.dueDate}
                      </div>
                    )}
                  </small>
                  <label className="block text-gray-700 text-sm font-normal mb-2 mt-2 text-left ">
                    Description
                  </label>
                  <input
                    style={errors.description ? { borderColor: "red" } : null}
                    type="text"
                    name="description"
                    placeholder="Description"
                    className="block text-sm py-3 px-4 rounded-lg w-full border outline-none border-gray-300 "
                    value={values.description}
                    onChange={handleChange}
                  />
                  <small>
                    {errors.description && (
                      <div className="block text-red-400 text-sm font-normal mt-2 mb-2 text-left ">
                        {errors.description}
                      </div>
                    )}
                  </small>
                  <label className="block text-gray-700 text-sm font-normal mb-2 mt-2 text-left ">
                    Assignee
                  </label>
                  <Select
                    placeholder="Members"
                    style={
                      errors.members
                        ? { borderColor: "red" }
                        : { borderColor: "red" }
                    }
                    defaultValue={selectedOption}
                    onChange={handleMultiChange}
                    options={users}
                    isMulti={true}
                  />
                  <div className="p-3  mt-2 text-center space-x-4 md:block">
                    <button
                      className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100 "
                      onClick={() => setShowCreateProjectModalFromParent(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="mb-2 md:mb-0 bg-green-400  border  px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
                      onClick={onSubmit}
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CreateTask.propTypes = {
  addTask: Proptypes.func.isRequired,
};

export default CreateTask;
