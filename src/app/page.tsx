"use client";
import { signIn, useSession } from "next-auth/react";
import { FormEvent, useEffect } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Acessar a propriedade 'role' do objeto de sessão
      const userRole = session?.user?.role as String;

      // Verifique a role do usuário e redirecione com base nela
      if (userRole === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/user");
      }
    }
  }, [status, session, router]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const inputData = {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    };

    const res = await signIn("credentials", inputData);

    if (res?.error) {
      return console.log(res);
    }

    router.replace("/admin");
  }
  return (
    <>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-azulClaro5">
              Entre na sua conta
            </h2>
          </div>
          <form className="mt-8 space-y-4" onSubmit={(e) => handleSubmit(e)}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only teste">
                  Email
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative text-black w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-azulClaro hover:bg-azulClaro1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azulClaro-500"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
