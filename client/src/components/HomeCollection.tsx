import React from 'react'
import {Link} from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { HiArrowNarrowRight } from "react-icons/hi";
import Box from '@mui/material/Box';

import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import winterSeasonal1 from "../assets/winterSeason1.jpg";
import winterSeasonal2 from "../assets/winterSeason2.jpg";
import homeVideo from "../assets/homevideo4.mp4";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];


const HomeCollection = () => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step: number) => {
      setActiveStep(step);
    };
  return (
    <div className='home-collection-container'>
        
        <Box sx={{ flexGrow: 1, position: 'relative', width: '100%', height: '100%' }}>
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
      <div className='home-collection-text-container'>
        <h1>24. SUMMER SEASON</h1>
        <div>
            <Link to={'/seasonal'}>VIEW SEASONAL</Link>
            <HiArrowNarrowRight className='home-text-container-arrow-icon'/>
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
      <video id='homeVideo' autoPlay disablePictureInPicture muted loop poster={winterSeasonal1}>
        <source src={homeVideo} type="video/mp4" />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </Box>
    </div>
  )
}

export default HomeCollection