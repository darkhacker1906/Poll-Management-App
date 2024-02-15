import { Box, Button, Card, CardActions, CardContent, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddPollimg from "../assets/images/AddPollimg.jpeg"

function AddPoll() {
  const [rowData,setRowData]=useState()
  const addInputField=()=>{

  }
  return (
    <Box 
    sx={{ backgroundImage: `url(${AddPollimg})`}}>
      <Stack width={"100vw"} height={"100vh"}> 
      <Card sx={{width:'35%', margin:"auto",borderRadius:5}}>
      <CardContent>
        <Stack direction={"column"}  spacing={2}>
          <Typography sx={{textAlign:'center'}} variant='h4'>Add Poll</Typography>
          <TextField variant='outlined' label='Title' fullWidth/>
          <TextField variant='outlined' label='Option1' fullWidth/>
          <TextField variant='outlined' label='Option2' fullWidth/>
          <Box><Button variant='contained' sx={{background:"#08879C"}} onClick={addInputField()}>Add Button</Button></Box>
          <Button variant='contained' sx={{background:"#08879C"}}>Submit</Button>
          <Button variant='contained' sx={{background:"#08879C"}}>Cancel</Button>
        </Stack>
      </CardContent>
    </Card>
      </Stack>
    </Box>
  )
}

export default AddPoll
