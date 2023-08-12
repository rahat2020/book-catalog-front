import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firease";
import MainLayouts from "./layouts/MainLayouts"
import { useAppDispatch } from "./redux/hooks";
import { setLoading, setStateUser } from "./redux/user/userSlice";
import { useEffect } from 'react';

function App() {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setLoading(true))
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setStateUser(user.email))
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    });
  }, [dispatch])


  return (
    <>
      <MainLayouts />
    </>
  )
}

export default App
