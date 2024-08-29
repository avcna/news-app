import { useState } from "react";
import { RegisterAPI } from "../api/auth";
import {
  AuthBase,
  AuthVisual,
  Button,
  Form,
  Input,
  TextRedirect,
} from "../components/AuthComponents";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../helpers/context";
import { UserCredential } from "firebase/auth";

interface FormData {
  nama: string;
  email: string;
  password: string;
}

const Daftar = () => {
  const navigate = useNavigate();
  const { setAndGetTokens } = useAuth();
  const [data, setData] = useState<FormData>({
    nama: "",
    email: "",
    password: "",
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res: UserCredential = await RegisterAPI(
        data.email,
        data.password,
        data.nama
      );
      setData({ nama: "", email: "", password: "" });
      const token = await res.user.getIdToken();
      const name = res?.user?.displayName || "User";
      //console.log(token)
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      setAndGetTokens(token, name);
      navigate("/", { replace: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error?.message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <AuthBase>
        <div>
          <AuthVisual />
          <center>
            <Form action="" onSubmit={handleSubmit}>
              <Input
                placeholder="Nama"
                onChange={(e) => setData({ ...data, nama: e.target.value })}
                required
              />
              <Input
                placeholder="Email"
                type="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
              <Input
                placeholder="Password"
                type="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
              />
              <Button type="submit" disabled={isLoading}>
                Daftar
              </Button>
              <TextRedirect>
                Sudah punya akun? <a href="/masuk">Masuk</a>
              </TextRedirect>
            </Form>
          </center>
        </div>
      </AuthBase>
    </>
  );
};

export default Daftar;
