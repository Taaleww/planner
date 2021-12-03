import { ReactComponent as CompleteSvg } from "../../assets/icons/completeicon.svg";

function CompleteTask({setShowCompleteTaskModalFromParent,taskData,editTask}) {
  function computeData(taskData){
    let status = taskData.status
   if(status === "TODO" ){
     status = "INPROGRESS"
   }
   else if(status === "INPROGRESS"){
     status = "DONE"
   }
   else if(status === "DONE"){
     status = "DONE"
   }
   return {
     id : taskData.taskId,
     status
   }
     
  }
  return (
    <>
      <div className="opacity-80 fixed inset-0 z-40 bg-black"></div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="w-screen  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white mt-0">
            <div className="">
              <div className="text-center p-5 flex-auto justify-center ">
                <CompleteSvg />
                <h2 className="text-xl font-bold py-4 ">Are you sure?</h2>
                <p className="text-sm text-gray-500 px-8">
                  Do you really want to complete task 
                  <span  style={{ color:"red" }}>'{taskData.taskName}'</span> 
                 ? This process cannot
                  be undone
                </p>
              </div>
              <div className="p-3  mt-2 text-center space-x-4 md:block">
                <button
                  className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100"
                  onClick={() => setShowCompleteTaskModalFromParent(false)}
                >
                  Cancel
                </button>
                <button
                   className="mb-2 md:mb-0 bg-green-400  border  px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-500"
                   onClick={() => editTask(computeData(taskData))}
                >
                  complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CompleteTask;
