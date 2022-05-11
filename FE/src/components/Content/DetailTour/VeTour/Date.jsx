import { Box, Typography } from '@mui/material'
import { padding } from '@mui/system'
import React from 'react'

function DateTour() {
    return (
        <Box component={'div'}
            sx={{
                width: '672px',
                height: '522px',
                boxShadow: "0px 1px 2px rgb(3,18,26,0.2)",
                position: 'absolute',
                top: '55px',
                left: '0',
                borderRadius: '5px',
                backgroundColor: 'white',
                zIndex: '999',
                padding: '40px 16px',
                display:'flex',
            }}
        >
            <Box component={'div'}
                sx={{
                    width: '320px',
                    height: '474px',
                    padding: '0 15px'
                }}
            >
                <Box component={'div'} sx={{ fontWeight: '300', height: '41,6px' }}>
                    Tháng 6 2022
                </Box>
                <Box component={'div'} sx={{ display: 'flex', marginTop: '7px', justifyContent: 'space-between' }}>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center' }}>T2</Typography>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center' }}>T3</Typography>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center' }}>T4</Typography>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center' }}>T5</Typography>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center' }}>T6</Typography>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center' }}>T7</Typography>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center',color:'red' }}>CN</Typography>
                </Box>
                <Box component={'div'} sx={{ marginTop: '15px' }}>
                    <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>1<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>2<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>3<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>4<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'red' }}>5<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                    </Box>
                    <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>6<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>7<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>8<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>9<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>10<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>11<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'red' }}>12<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                    </Box>
                    <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>13<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>14<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>15<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>16<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>17<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>18<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'red' }}>19<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                    </Box>
                    <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>20<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>21<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>22<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>23<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>24<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>25<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'red' }}>26<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                    </Box>
                    <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>27<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>29<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>30<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}></Typography>

                    </Box>
                </Box>

            </Box>
            <Box component={'div'}
                sx={{
                    width: '320px',
                    height: '474px',
                    padding: '0 15px'
                }}
            >
                <Box component={'div'} sx={{ fontWeight: '300', height: '41,6px' }}>
                    Tháng 7 2022
                </Box>
                <Box component={'div'} sx={{ display: 'flex', marginTop: '7px', justifyContent: 'space-between' }}>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center' }}>T2</Typography>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center' }}>T3</Typography>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center' }}>T4</Typography>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center' }}>T5</Typography>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center' }}>T6</Typography>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center' }}>T7</Typography>
                    <Typography variant="overline" display="block" sx={{ width: '32px', textAlign: 'center',color:'red' }}>CN</Typography>
                </Box>
                <Box component={'div'} sx={{ marginTop: '15px' }}>
                    <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>1<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>2<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'red' }}>3<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                    </Box>
                    <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>4<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>5<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>6<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>7<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>8<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>9<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'red' }}>10<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                    </Box>
                    <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>11<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>12<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>13<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>14<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>15<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>16<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'red' }}>17<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                    </Box>
                    <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>18<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>19<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>20<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>21<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>22<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>23<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'red' }}>24<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                    </Box>
                    <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>25<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>26<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>27<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>28<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>29<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'black' }}>30<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>
                        <Typography variant="h6" display="block" sx={{ width: '32px', textAlign: 'center', fontSize: '16px', color: 'red' }}>31<Typography variant="overline" display="block" sx={{ fontSize: "11px", color: 'rgba(104,113,118,1.00)' }}>650K</Typography></Typography>

                    </Box>
                </Box>

            </Box>
        </Box>
    )
}

export default DateTour