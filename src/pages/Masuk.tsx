import { useState } from "react";
import {
  AuthBase,
  AuthVisual,
  Button,
  Form,
  Input,
  TextRedirect,
} from "../components/AuthComponents";
import { LoginAPI } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../helpers/context';
import styled from "styled-components";
import { UserCredential } from "firebase/auth";

const ErrText = styled(TextRedirect)`
color:red;
`;

const Masuk = () => {
  const navigate = useNavigate()
  const {setAndGetTokens} = useAuth();
  const [data, setData] = useState({email:"", password:""})
  const [isError, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  
  const handleSubmit= async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res:UserCredential = await LoginAPI(data.email, data.password)
      setData({email:"", password:""})
      //console.log(res?.user);
      const token = await res.user.getIdToken();
      const name = res?.user?.displayName || "User";
      localStorage.setItem("token",token)
      localStorage.setItem("name", name)
      setAndGetTokens(token, name)
      navigate("/",  { replace: true });
    } catch (error:unknown) {
      if (error instanceof Error) {
        console.log(error?.message);
        setError(true)
      }
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
              <Input placeholder="Email" type="email" onChange={(e)=>setData({...data,email:e.target.value})} required/>
              <Input placeholder="Password" type="password" onChange={(e)=>setData({...data, password:e.target.value})} required/>
              <Button type="submit" disabled={isLoading}>Masuk</Button>
              <TextRedirect>Belum punya akun? <a href="/daftar">Daftar</a></TextRedirect>
              {isError && <ErrText>Periksa kembali email dan password Anda</ErrText>}
            </Form>
          </center>
        </div>
      </AuthBase>
    </>
  );
};

export default Masuk;
