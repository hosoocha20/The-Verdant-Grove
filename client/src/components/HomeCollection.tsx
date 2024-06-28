import React from "react";
import { Link } from "react-router-dom";
import { HiArrowNarrowRight } from "react-icons/hi";
import Box from "@mui/material/Box";
import winterSeasonal1 from "../assets/winterSeason1.jpg";
import winterSeasonal2 from "../assets/winterSeason2.jpg";
import homeVideo from "../assets/homevideo4.mp4";



const HomeCollection = () => {
  return (
    <div className="home-collection-container">
      <Box
        sx={{
          flexGrow: 1,
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        {/* <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'background.default',
        }}
      >
        <Typography>{images[activeStep].label}</Typography>
      </Paper> */}
        <div className="home-collection-text-container">
          <h1>24. SUMMER SEASON</h1>
          <div>
            <Link to={"/seasonal"}>VIEW SEASONAL</Link>
            <HiArrowNarrowRight className="home-text-container-arrow-icon" />
          </div>
        </div>
        {/* <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        style={{backgroundColor: '#fafcfb'}}
      >
        <div className='home-carousel-item'>
            <img src={winterSeasonal1}/>
        </div>
        <div className='home-carousel-item'>
            <img src={winterSeasonal2}/>
        </div>
      </AutoPlaySwipeableViews> */}
        <video
          id="homeVideo"
          autoPlay
          disablePictureInPicture
          muted
          loop
          poster={winterSeasonal1}
        >
          <source src={homeVideo} type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </Box>
    </div>
  );
};

export default HomeCollection;
