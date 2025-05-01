import {configureStore} from "@reduxjs/toolkit";
import Ruducer from "./slice";


export default configureStore({
    reducer: {
        Data: Ruducer,
    }
});