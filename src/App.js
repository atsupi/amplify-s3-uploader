//import logo from './logo.svg';
import '@aws-amplify/ui-react/styles.css'
import './App.css';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import Uploader from './components/Uploader.js'
import { Routes, Route, BrowserRouter, Link } from 'react-router-dom'
import About from './components/About';

function App() {
  return (
    <Authenticator>
      {({signOut,user}) => (
        <>
          <div className="App">
            <header className="App-header">
              <p>
                Amplify S3 Uploader Application
              </p>
            </header>
          </div>
          <BrowserRouter>
          <div className='App-linkbar'>
            <Link to="/">Home</Link>
            <Link to ="/about">About</Link>
          </div>
          <Routes>
            <Route path="/" element={<Uploader />} />
            <Route path="/about" element={<About />} />
          </Routes>
          </BrowserRouter>
          <footer className='App-footer'>
            <p>Hello, {user.username}</p>
            <Button onClick={signOut}>SignOut</Button>
          </footer>
        </>
      )}
    </Authenticator>
  );
}

export default App;
