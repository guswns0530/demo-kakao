import {toast} from "react-toastify";

const ToastContainer = () => {
    return <div>
        hello world
    </div>
}

export const Toast = () => toast(<ToastContainer/>, {autoClose: 1000, progress: 1, hideProgressBar: false})