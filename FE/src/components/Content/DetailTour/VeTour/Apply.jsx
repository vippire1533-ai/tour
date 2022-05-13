import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NumberFormat from "react-number-format";

function Apply({ countLarge, countSmall, setCountLarge, setCountSmall, setPrice, setPeoplePopup }) {

  useEffect(() => {
    setPrice(countLarge * 650000 + countSmall * 500000)
  })

  return (
    <Box component={'div'}
      sx={{
        width: '457px',
        boxShadow: "0px 1px 2px rgb(3,18,26,0.2)",
        position: 'absolute',
        top: '55px',
        left: '0',
        borderRadius: '5px',
        backgroundColor: 'white',
        zIndex: '999',
        padding: '16px',
      }}
    >
      <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 15px' }}>
        <Box component={'div'}>
          <p style={{ margin: 0, color: "rgba(104,113,118,1.00)", fontSize: "12px" }}>Người lớn (12 tuổi trở lên )</p>
          <p style={{ margin: "4px 0 0 0", color: "rgba(3,18,26,1.00)", fontSize: "16px", fontWeight: '700' }}>650.000 VND</p>
        </Box>
        <Box component={'div'}>
          <button style={{ outline: 'none', padding: '8px 12px', color: '#c04b35', width: '40px', height: '40px', margin: '0' }} onClick={() => {
            if (countLarge > 1)
              setCountLarge(countLarge - 1)
          }}>
            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/a869487c6ad0e2edaf75fb4b1268161b.png" />
          </button>
          <span style={{ padding: '10px 20px', border: "0.5px solid rgb(205, 207, 207)", borderRadius: "5px", margin: '0 5px' }}>{countLarge}</span>
          <button style={{ outline: 'none', padding: '8px 12px', color: '#c04b35', width: '40px', height: '40px', margin: '0' }} onClick={() => {
            setCountLarge(countLarge + 1)
          }}>
            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/9a8ac15bdf2821c9863ec4cf3fbae385.png" />
          </button>

        </Box>
      </Box>
      <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 15px' }}>
        <Box component={'div'}>
          <p style={{ margin: 0, color: "rgba(104,113,118,1.00)", fontSize: "12px" }}>Trẻ em (5 - 11 tuổi )</p>
          <p style={{ margin: "4px 0 0 0", color: "rgba(3,18,26,1.00)", fontSize: "16px", fontWeight: '700' }}>500.000 VND</p>
        </Box>
        <Box component={'div'} >
          <button style={{ outline: 'none', padding: '8px 12px', color: '#c04b35', width: '40px', height: '40px', margin: '0' }} onClick={() => {
            if (countSmall > 0)
              setCountSmall(countSmall - 1)
          }}>
            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/a/a869487c6ad0e2edaf75fb4b1268161b.png" />
          </button>
          <span style={{ padding: '10px 20px', border: "0.5px solid rgb(205, 207, 207)", borderRadius: "5px", margin: '0 5px' }}>{countSmall}</span>
          <button style={{ outline: 'none', padding: '8px 12px', color: '#c04b35', width: '40px', height: '40px', margin: '0' }} onClick={() => {
            setCountSmall(countSmall + 1)
          }}>
            <img src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/9a8ac15bdf2821c9863ec4cf3fbae385.png" />
          </button>

        </Box>
      </Box>
      <Box component={'div'} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box component={'div'}>
          <p style={{ margin: 0, color: "rgba(104,113,118,1.00)", fontSize: "12px" }}>Tổng giá tiền</p>
          <p style={{ margin: "4px 0 0 0", color: "rgba(3,18,26,1.00)", fontSize: "16px", fontWeight: '700' }}><NumberFormat thousandSeparator={true} displayType={'text'} thousandsGroupStyle="thousand" value={countLarge * 650000 + countSmall * 500000} /> VND</p>
        </Box>
        <Box component={'div'}>

          <span style={{ color: 'rgb(1, 148, 243)', fontWeight: '700', cursor: 'pointer' }} onClick={() => {
            setPeoplePopup(false)
            }}>Xong</span>
        </Box>
      </Box>
    </Box>
  )
}

export default Apply