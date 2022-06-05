import { createContext, useReducer, useEffect } from "react";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  password: null,
};

const INITIALIZE = "INITIALIZE";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user, password } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
        password,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        password: action.payload.password,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        password: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const username = window.localStorage.getItem("username");
        const password = window.localStorage.getItem("password");

        if (username && password) {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user: { username },
              password: { password },
            },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null, password: null },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
            password: null,
          },
        });
      }
    };
    initialize();
  }, []);

  const login = async (username, password, callback) => {
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("password", password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: { username }, password: { password } },
    });
    // debugger;
    callback();
  };

  const logout = async (callback) => {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
