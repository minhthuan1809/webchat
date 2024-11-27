import React, { useMemo, useState } from "react";
import { LogOut, MoreHorizontal, PenSquare, Search } from "lucide-react";
import { auth, db } from "../config/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";

type User = {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
};

const ChatList = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Chỉ redirect khi đã load xong và user không tồn tại
    if (!loading && user === null) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    if (confirm("Bạn có chắc chắn muốn đăng xuất không?")) {
      await signOut(auth);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData: User[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push({
          id: doc.id,
          ...(doc.data() as Omit<User, "id">),
        });
      });
      setUsers(usersData);
    };
    fetchUsers();
  }, []);

  // Hiển thị loading screen trong khi chờ authentication
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Nếu có lỗi, hiện thông báo
  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-red-500">
        Đã có lỗi xảy ra: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full max-w-md h-screen flex flex-col bg-white border-r">
      {/* Header with user profile */}
      <div className="p-4 border-b space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full border-2 border-gray-100 object-cover"
                src={user?.photoURL || "/default-avatar.png"}
                alt={user?.displayName}
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <span className="font-semibold text-sm">{user?.displayName}</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Tin nhắn</h1>
            <div className="flex gap-1">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreHorizontal className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <PenSquare className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search in messages"
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2">
        {users.map((chatUser) => (
          <div
            key={chatUser.id}
            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
          >
            <div className="relative">
              <img
                src={chatUser.photoURL || "/default-avatar.png"}
                alt={chatUser.displayName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm">
                  {chatUser.displayName}
                </h3>
                <span className="text-xs text-gray-500">
                  {chatUser.lastSeen?.seconds &&
                    new Date(
                      chatUser.lastSeen.seconds * 1000
                    ).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">{chatUser.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
