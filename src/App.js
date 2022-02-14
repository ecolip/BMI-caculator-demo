import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import { firebaseConfig } from "./config/firebaseConfig";

// Initialize Firebase 8
firebase.initializeApp(firebaseConfig);
let bmiRef = firebase.database().ref().child("bmiRecord");

function App() {
  return (
    <div className="App">
      <Header bmiRef={bmiRef} />
      <Content bmiRef={bmiRef} />
      <Footer />
    </div>
  );
}

export default App;