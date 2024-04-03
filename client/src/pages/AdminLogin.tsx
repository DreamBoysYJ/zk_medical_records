import React, { useState } from 'react';
import {Box, motion} from 'framer-motion';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useMemo} from "react";
import { Link } from 'react-router-dom';

import {
  WalletProvider, useWallet,
} from "@demox-labs/aleo-wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";

import { Button, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignMessage } from './Sign';

// Default styles that can be overridden by your app
require("@demox-labs/aleo-wallet-adapter-reactui/styles.css");

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  border-radius: 30px;
  width: 75%;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 600px;
  background-color: white;
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

const ModalTitle = styled.div`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 60px;
`;

const ModalInput = styled.input`
  width: 75%;
  height: 40px;
  padding: 5px;
`;

const ModalAmount = styled.div`
  height: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;

`

const ModalBtn = styled.button`
  margin-top: 20px;
  width: 100px;
  height: 50px;
  border-radius: 10px;
  background-color: #fd115c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
    cursor: pointer;

`;

const Select = styled.select`
  margin-top: 5px;
  width : 75%;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
`;

const WalletContainer = styled.div`
display: flex;
justify-content: center;
align-item: center;

`

const WalletToolBox = () => {
  const [programId, setProgramId] = useState<string>("");
  const [hyperlink, setHyperlink] = useState<string | null>(null);

  const handleGenerateHyperlink = () => {
    if (programId && programId.endsWith(".aleo")) {
      const explorerLink = `https://explorer.hamp.app/program?id=${programId}`;
      toast.success("Hyperlink has been generated.");
      setHyperlink(explorerLink);
    } else {
      // Display an error toast message
      toast.error("Invalid program ID. Please enter a valid program ID ending with '.aleo'.");
      setHyperlink(null);
    }
  };

  return (
    <div className="mt-2 flex-column rounded border-2 p-4 bg-light shadow">
      <Form.Group>
        <Form.Label>Program ID:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter program ID (e.g., program_name.aleo)"
          onChange={(e) => setProgramId(e.target.value)}
        />
      </Form.Group>
      <Button className="mt-3" onClick={handleGenerateHyperlink}>Click to generate Hyperlink</Button>

      {hyperlink && (
        <div className="mt-2">
          <p>Generated Hyperlink:</p>
          <a href={hyperlink} target="_blank" rel="noopener noreferrer">
            🔗
          </a>
          &nbsp;
          Link
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};



const AdminLogin = () => {
  const { wallet, publicKey } = useWallet();

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();
  const wallets = useMemo(() => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],[]);



  interface AdminData {
    username: string;
    password: string;
  }

  const [selectedOption, setSelectedOption] = useState('');

  // 콤보 박스 변경 핸들러
  const handleSelectChange = (e : any) => {
    setSelectedOption(e.target.value);
    console.log(selectedOption);
  };


  const onLoginClick = () => {

    console.log("씨발련아 : ",  wallet?.adapter?.publicKey);


    // 선택된 옵션에 따라 다른 동작을 수행합니다.
    if (selectedOption === 'person') {
      // 개인 로그인 처리
      console.log("여기요");
      axios.post('login', { /* 개인 로그인 데이터 */ })
        .then(response => {
          // 로그인 성공 시의 동작
          console.log('개인 로그인 성공:', response.data);
        })
        .catch(error => {
          // 로그인 실패 시의 동작
          console.error('개인 로그인 실패:', error);
        });
    } else if (selectedOption === 'doctor') {
      // 의사 로그인 처리
      axios.post('/api/doctor/login', { /* 의사 로그인 데이터 */ })
        .then(response => {
          // 로그인 성공 시의 동작
          console.log('의사 로그인 성공:', response.data);
        })
        .catch(error => {
          // 로그인 실패 시의 동작
          console.error('의사 로그인 실패:', error);
        });
    } else {
      // 선택된 옵션이 없을 경우의 처리
      console.error('회원 타입을 선택하세요.');
    }
  };

  const handleDataFromChild = (data : any) => {
    console.log("자식이 나보고 : " , data);
  }


  const onSubmit = async (data: any) => {
    const {username, password} = data;
    const response = await axios.post(
      'http://localhost:8000/admin/login',
      {username, password},
      {withCredentials: true},
    );
    if (response.status == 200) {
      navigate('/admin');
    }
    return console.log(response);
  };




  console.log(watch('username'));
  return (
    <div>   
      <WalletProvider
          wallets={wallets}
          decryptPermission={DecryptPermission.UponRequest}
          network={WalletAdapterNetwork.Testnet}
          autoConnect={true}
        >
      <ModalOverlay>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalTitle >Aleo - Zk Medical Records</ModalTitle>
    <div>
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="flex-column rounded border-2 p-4 bg-light shadow">



          <WalletModalProvider>
            
            <WalletContainer>
            <ButtonContainer><SignMessage />
            <WalletMultiButton /></ButtonContainer>  
            

            </WalletContainer>

          </WalletModalProvider>
      </div>
    </div>



    </div>

            

            <Select value={selectedOption} onChange={handleSelectChange}>
        <option value="">회원 타입</option>
        <option value="person">개인</option>
        <option value="doctor">의사</option>
      </Select>
            <ButtonContainer>
            <ModalBtn type="submit" as={Link} to='/signup'>회원가입</ModalBtn>
            <ModalBtn type="submit">로그인</ModalBtn>

            </ButtonContainer>

          </ModalContent>
        </form>
      </ModalOverlay>
      </WalletProvider>
    </div>
  );
};

export default AdminLogin;
