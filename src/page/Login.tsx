import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../config/Firebase";
import { Chrome, MessageSquareMore } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="max-w-md w-full mx-4">
        {/* Card Container */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-8 transform transition-all ">
          {/* Logo and Header */}
          <div className="text-center space-y-2">
            <div className="inline-block p-3 rounded-full bg-blue-100">
              <MessageSquareMore className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Chat App</h1>
            <p className="text-gray-500">Kết nối và trò chuyện ngay lập tức</p>
          </div>

          {/* Login Options */}
          <div className="space-y-4">
            <button
              onClick={() => signInWithGoogle()}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl 
                       bg-white border-2 border-gray-200 hover:border-blue-400 
                       text-gray-700 font-semibold shadow-sm
                       transform transition-all duration-300 hover:-translate-y-0.5 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Chrome className="w-6 h-6 text-blue-500" />
              {loading ? (
                <span className="inline-block animate-pulse">
                  Đang xử lý...
                </span>
              ) : (
                "Đăng nhập với Google"
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 text-sm text-red-600 bg-red-50 rounded-lg">
              Có lỗi xảy ra. Vui lòng thử lại sau.
            </div>
          )}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>
              Bằng việc đăng nhập, bạn đồng ý với{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Điều khoản sử dụng
              </a>{" "}
              và{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Chính sách bảo mật
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
