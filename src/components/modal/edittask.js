import { ReactComponent as EditSvg } from "../../assets/icons/edit.svg";

function EditTask({ setShowEditTaskModalFromParent }) {
  return (
    <>
      <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="w-screen  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white mt-0">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center">
                <EditSvg/>
                <h2 className="text-xl font-bold py-4 ">Edit Task</h2>
              </div>
              <div className="space-y-4">
                <label
                  className="block text-gray-700 text-sm font-normal mb-2 "
                  for="username"
                >
                  Task Name
                </label>
                <input
                  type="text"
                  placeholder="Task Name"
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none border-gray-300 "
                />
                <label
                  className="block text-gray-700 text-sm font-normal mb-2 "
                  for="username"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  placeholder="Start Date"
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none border-gray-300 "
                />
                <label
                  className="block text-gray-700 text-sm font-normal mb-2 "
                  for="username"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  placeholder="Due Date"
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none border-gray-300 "
                />
                <label
                  className="block text-gray-700 text-sm font-normal mb-2 "
                  for="username"
                >
                  Description
                </label>
                <input
                  type="text"
                  placeholder="Description"
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none border-gray-300 "
                />
              </div>

              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  onClick={() => setShowEditTaskModalFromParent(false)}
                >
                  Cancel
                </button>
                <button className="mb-2 md:mb-0 bg-yellow-400  px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-yellow-500">
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditTask;
