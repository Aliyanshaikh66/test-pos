export const reducer = (state, action) => {
    switch (action.type) {

        case "LOGIN": {
            return { ...state, user: action.token };
        }

        case "LOGOUT": {
            return { ...state, user: undefined }; // set this to null on purpose, do not change
        }

        default: {
            return state;
        }
    }
}