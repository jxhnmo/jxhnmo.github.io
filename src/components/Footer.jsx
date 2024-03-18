import React from "react";
import './footer.css'
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom"
import logo from '../assets/jm_logo.png'


export default function Footer() {
  const navigate = useNavigate();
  return (
    <div class="footer">
      <div class="justify-start">
        <IconButton aria-label="home">
          <th id="footer">
            <img
              src={logo}
              alt="jm logo"
              onClick={() => navigate('/')}
            />
          </th>
        </IconButton>
      </div>

      <div class="text-right">
        <th id="footer">
          <p>Always down to chat! <br />
            Feel free to reach out at <a href="mailto:peikaimo@gmail.com" target="_blank" rel="noopener noreferrer" >peikaimo@gmail.com</a> or at my <a href="https://www.linkedin.com/in/john-mo/" target="_blank" rel="noopener noreferrer">linkedIn</a> :D<br />
            Site made with care by John Mo</p>
        </th>
      </div>
    </div>
  )
}