import { auth, db } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Navbar from "../common/Navbar";
import { setDoc } from "firebase/firestore";
import { doc, serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";
export default function Chat() {
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    const setUserInDb = async () => {
      await setDoc(doc(db, "users", user?.uid || ""), {
        email: user?.email,
        displayName: user?.displayName,
        lastSeen: serverTimestamp(),
        photoURL: user?.photoURL,
      });
    };
    if (user) {
      setUserInDb();
    }
  }, [user]);
  return (
    <div>
      <h1 className="text-2xl font-bold text-center w-full p-10">WEB CHAT</h1>
      <div className="flex h-screen w-4/5 mx-auto">
        <Navbar />
        <h1>Chat</h1>
      </div>
    </div>
  );
}
