import * as React from 'react';

import BeforeLogin from "./BeforeLogin"
import AfterLogin from "./AfterLogin"
import { Box } from '@mui/material';

function Card ({currentUser, allHospital, isFirst,everyHospital, setCurrentUser,setTest}){


    return(
        <Box 
        m={10}      
        >
            <Box
            maxWidth={1000}
            m= {"auto"}
            >
                {allHospital.length>0 && <AfterLogin {...{allHospital,everyHospital,currentUser,setCurrentUser,setTest}} />}
                {isFirst && <BeforeLogin/>}

            </Box>
        </Box>
    )
}
export default Card