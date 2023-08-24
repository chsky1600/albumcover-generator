import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { Input } from "~/component/Input";
import { FormGroup } from "~/component/FormGroup";
import { api } from "~/utils/api";
import { set } from "zod";
import { signIn, signOut } from "next-auth/react";
import { Button } from "~/component/Button";
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';


const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
  });

  const { data: session } = useSession();
  const { data: sessionData } = useSession();

  function updateForm(key: string) {
    return function (e: React.ChangeEvent<HTMLInputElement>) {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };
  }

  const generateCover = api.generate.generateCover.useMutation({
    onSuccess(data) {
      console.log('mutated', data)

    },
  });

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();

    generateCover.mutate({
      prompt: form.prompt,
    })
  };

  return (
    <>
      <style jsx>{`

.spinner {
  margin: 20px;
  width: 100px;
  height: 100px;
  background: #f00;
  -webkit-animation-name: spin;
  -webkit-animation-duration: 10000ms;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  -moz-animation-name: spin;
  -moz-animation-duration: 10000ms;
  -moz-animation-iteration-count: infinite;
  -moz-animation-timing-function: linear;
  -ms-animation-name: spin;
  -ms-animation-duration: 10000ms;
  -ms-animation-iteration-count: infinite;
  -ms-animation-timing-function: linear;
  
  animation-name: spin;
  animation-duration: 10000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

  .hero-container {
    position: relative;
    display: flex;
    align-items: left;
    justify-content: center;
    height: 100px;
    perspective: 300px; /* Adjusts the 3D perspective */
    overflow: visible;
  }
  

  .hero-container:before {
    top: 10%; /* Adjusted positioning */
    left: -25%; /* Start from the left */
    transform: rotateX(15deg) rotateY(20deg) scale(0.9);
    transform-origin: 50% 100% -50px; /* Adjusts the pivot point */
    opacity: 0.7;
  }
  
  .hero-container:after {
    bottom: 50px; /* Adjusted positioning */
    left: -100%; /* Start from the left */
    transform: rotateX(0deg) rotateY(-20deg) scale(0.9);
    transform-origin: 50% 0% -50px; /* Adjusts the pivot point */
    opacity: 0.7;
  }
  
  .title {
    font-size: 28px;
    font-weight: 900;
    background: linear-gradient(to right, #ff5cd6, #a59bfd);
    -webkit-background-clip: text;
    color: transparent;
    z-index: 1; /* Ensures the title always stays on top */
    position: relative;
  }
  }
  .scene {
    width:10em;
    height:10em;  
    position:absolute;
    margin:2em 0em;
    perspective:0em;
    transform: rotateX(0deg) rotateY(0deg) rotateZ(45deg);
  }
  
  .cube {
    width:100%;
    height:100%;
    position:relative;
    animation: rotate 10s linear infinite;
    transform-style:preserve-3d;
  }
  
  @keyframes rotate {
    from  { transform: translateZ(15em) rotateY(0deg); }
    to    { transform: translateZ(15em) rotateY(360deg); }
}

@keyframes fadeOut {
  65% 100% { opacity: 1;
  }
  10%, 40% { opacity: 0.05; 
  }  
}
  
  .face {
    width:100%;
    height:100%;
    position:absolute;
    border:0px solid #333;
    font-size: 0.8em;
    background-color:rgba(3, 121, 255, 0.5);
    animation: fadeOut 10s linear infinite;
    
    color:#FFF;
    line-height:10em;
    -webkit-background-clip: text;
    

  }
  
  .username-separator {
    color: white;
    margin: 0 0.5em; /* Adding some horizontal space before and after the 'X' */
  }

  .pi1  { 
    transform: rotateY(0deg) translateZ(6em); 
    animation-delay: 1.5s;
    // color: transparent;
    // background: linear-gradient(to right, #ff5cd6, #a59bfd); 
  }
  .pi2  { 
    transform: rotateY(60deg) translateZ(6em);  
    animation-delay: 0s;
  }
  .pi3   { 
    transform: rotateY(120deg) translateZ(6em); 
    animation-delay: -1s;
  }
  .pi4   {
     transform: rotateY(-120deg) translateZ(6em);
      animation-delay: -4.2s;
  }
  .pi5   { 
    transform: rotateY(-60deg) translateZ(6em); 
    animation-delay: -6.5s;
  } 
  .pi6   { 
    transform: rotateY(180deg) translateZ(6em); 
    animation-delay: -3.55s;
  }
`}</style>
      <Head>
        <title>Album Cover Generator</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center">
 
      <div className="scene">
      <div className="cube">
              <div className="face pi1 ">
                <span>
                Rock
                </span>
                </div>
              <div className="face pi2 ">LoFi</div>
               <div className="face pi3 ">Jazz</div>
               <div className="face pi4 ">R&B</div> 
              <div className="face pi5 ">Pop</div>
              <div className="face pi6 ">EDM</div>
          

  </div>
</div>

<div className="hero-container">
  <span className="title">
    {session?.user?.name && (
      <>
        {session.user.name}
        <span className="username-separator">X</span>
      </>
    )}
    albumaura
  </span>
</div>
        <div className="flex flex-col space-y-3">
          
        <div className="fixed top-4 right-4">
    <button 
        onClick={sessionData ? () => void signOut() : () => void signIn()} 
        className="text-white/60 font-semibold hover:text-white transition-colors duration-300"
    >
        {sessionData ? "Leave" : "Create"}
    </button>
</div>
        
        <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
          <FormGroup>
            <label>Enter Prompt</label>
            <Input value={form.prompt} onChange={updateForm("prompt")} ></Input>
            <Button className="bg-blue-400 transition hover:bg-blue-500 rounded px-4 py-2">Generate</Button>
          </FormGroup>
        </form>
        </div>
      </main>
    </>
  );
};

export default GeneratePage;