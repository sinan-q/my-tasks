import React from 'react'

export const Validate = (data, type) => {
    let error = null
    if (!data || data === undefined) error = type+ " cannot be empty"
    else switch (type) {
       case "username":
            if(data.length < 3) error = "Username must be greater than 3"
            else if(data.length > 25) error = "Username must be less than 25"
            break;
        case "password":
            if(data.length < 6) error = "Password must be greater than 5"
            else if(data.length > 14) error = "Password must be less than 15"
            break;

    }
    return {result: error === null, error}
}

export default Validate
