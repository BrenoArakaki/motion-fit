import { Button } from "@/components/ui/button";
import LoginImg from "../assets/LoginImg.png";
import { Separator } from "@/components/ui/separator";
import { Apple, Github, Mail } from "lucide-react";
import { loginWithGoogle } from "@/services/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  async function handleLogin() {
    const user = await loginWithGoogle();

    if (user) {
      navigate("/dashboard");
    }
  }

  return (
    <div className="h-[100vh] overflow-y-hidden bg-gradient-to-br from-neutral-700 via-neutral-950 to-black flex items-center justify-center">
      <div className="grid grid-cols-2 items-center justify-center">
        <div className="flex flex-col w-full gap-3">
          <div className="space-y-4 text-center">
            <h1
              className="
    text-4xl font-bold
    tracking-tight
    bg-gradient-to-r
    from-green-500
    via-green-400
    to-white
    bg-clip-text
    text-transparent
  "
            >
              Welcome Back
            </h1>

            <p className="text-neutral-400 text-sm">
              Access your training dashboard and continue your progress.
            </p>
          </div>
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={handleLogin}
              className="
      w-100
      h-10
      transition-all
      duration-300
      font-medium
      cursor-pointer
        hover:border-accent
        rounded-xl
    "
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              Sign in with Google
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="flex justify-center w-100 items-center gap-4">
              <Separator className="flex-1" />

              <span className="text-xs text-neutral-500 tracking-wider whitespace-nowrap">
                Or continue with
              </span>

              <Separator className="flex-1" />
            </div>
          </div>

          {/* Other options */}
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-2 w-100">
              <Button
                variant="outline"
                className="
        h-10
        hover:border-accent
        cursor-pointer
        rounded-xl
      "
              >
                <Apple className="text-lg" />
              </Button>

              <Button
                variant="outline"
                className="
         h-10
        hover:border-accent
        cursor-pointer
        rounded-xl
      "
              >
                <Mail className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                className="
         h-10
        hover:border-accent
        cursor-pointer
        rounded-xl
      "
              >
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
        <div className="relative w-full h-full">
          <img
            src={LoginImg}
            className="w-full h-full object-cover rounded-l-[300px]"
          />
          <div
            className="
    absolute inset-0
    rounded-l-[300px]
    pointer-events-none
    bg-gradient-to-l from-transparent to-black/30
  "
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
