import React, { useState } from 'react'
import styled from 'styled-components'
 import {useNavigate} from 'react-router-dom'

const Subnavbar = () => {
    const navigate= useNavigate()
   const [howerState, setHowerState] = useState("");

    const hoverHandler = (type) => {
        setHowerState(type)
    }
    
    const handleNoHover = () => {
      setHowerState("")
    }
    return (
        <>
            <Subnav>
                <p  onMouseOver={() => hoverHandler('MAKEUP')}>Makeup </p>
                <p onMouseEnter={() => hoverHandler('SKIN')}>Skin</p>
                <p  onMouseEnter={() => hoverHandler('HAIR')}>Hair</p>
                <p  onMouseEnter={() => hoverHandler('APPLIANCES')}>Appliances</p>
                <p  onMouseEnter={() => hoverHandler('BATH&BODY')}>Bath & Body</p>
                <p  onMouseEnter={() => hoverHandler('NATURAL')}>Natural</p>
                <p  onMouseEnter={() => hoverHandler('MOM&BABY')}>Mom & Baby</p>
                <p  onMouseEnter={() => hoverHandler('HEALTH')}>Health & Wellness</p>
                <p onClick={navigate("/men")}>Men</p>
                <p  onMouseEnter={() => hoverHandler('FRAGRENCE')}>Fragrance</p>
                <p  onMouseEnter={() => hoverHandler('POPUPS')}>Pop Ups</p>
            </Subnav>
        </>
    )
}

export default Subnavbar

const Subnav = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed; /* Stick to the top below Navbar */
  top: 63px; /* Matches the Navbar height */
  left: 0; /* Ensure it starts from the left edge */
  right: 0; /* Ensure it ends at the right edge */
  z-index: 9999; /* Stays above the content but below Navbar if necessary */
  border: 1px solid #e6dede;
  height: 6.3vh;
  background-color: #ffffff;
  gap: 2vw;
  font-weight: 400;
  color: gray;
  font-size: 15px;

  /* Ensure the hover styles work as intended */
  p:hover {
    border-bottom: 3px solid #fc3581;
    cursor: pointer;
    padding: 1.7vh 0; /* Add hover effect spacing */
    color: #fc3581;
    font-weight: 600;
  }
`;
