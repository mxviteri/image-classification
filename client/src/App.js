import React, { useState } from 'react'
import { Input, Button, Container } from '@material-ui/core'
import styled from 'styled-components'
import logo from './mariotext.png'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  min-height: 200px;
  justify-content: space-around;
`

function App() {
  const [file, setFile] = useState('')
  const [filePreview, setFilePreview] = useState('')
  const [modelPred, setModelPred] = useState('')

  const submit = (event) => {
    event.preventDefault()

    const data = new FormData();
    data.append('file', file);

    fetch('/classify', {
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(response => {
      setModelPred(response.prediction.toUpperCase())
    })
  }

  const handleChange = (event) => {
    setFilePreview(URL.createObjectURL(event.target.files[0]))
    setFile(event.target.files[0])
    setModelPred('')
  }

  console.log(file)
  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <div style={{ width: 'fit-content', margin: '0 auto' }}>
        <img src={logo} style={{ height: '100px' }} />
      </div>
      <p style={{ marginTop: '20px' }}>Upload an image of Mario or Luigi and this FastAi image recognition model will tell you which character it is!</p>
      <StyledForm onSubmit={submit}>
        <p><strong>Select Image:</strong></p>
        <Input
          type="file"
          inputProps={{ accept: 'image/*' }} 
          id="img"
          name="img"
          onChange={handleChange}
        /> 
        <Button
          type="submit"
          variant="contained"
          disabled={!file ? true : false}
        >Submit!</Button>
      </StyledForm>
      <div style={{ width: 'fit-content', margin: '0 auto' }}>
        {modelPred && <h3 style={{ textAlign: 'center' }}>{modelPred}</h3>}
        <img src={filePreview} style={{ marginTop: '40px' }}/>
      </div>
    </Container>
  )
}

export default App
