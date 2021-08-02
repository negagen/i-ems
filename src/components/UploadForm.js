import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Toast  from 'react-bootstrap/Toast'
import ToastContainer  from 'react-bootstrap/ToastContainer'


export default function UploadForm() {
    const [selectedFile, setSelectedFile] = React.useState();
	const [, setIsFilePicked] = React.useState(false);
    const [wasFileSubmited, setWasFileSubmited] = React.useState(false);
    const [showSuccessToast, setShowSuccessToast] = React.useState(false);

    const toggleSuccessToast = () => setShowSuccessToast(!showSuccessToast);

    const handleChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    }

    const handleSubmit = (event) => {
        const formData = new FormData();
        formData.append('File', selectedFile);

        fetch(
            "/api/energycost/uploadfile/datos.xlsx",
            {
                method: 'POST',
                cache: "no-cache",
                mode: "no-cors",
                credentials: "include",
                redirect: "follow",
                referrerPolicy: "origin",
                body: formData,
            }

        ).then(
            async (response) => {
                setWasFileSubmited(true)
                setShowSuccessToast(true)
            }
        )
    }

    return (
        <Form className="pt-3">
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Por favor adjunte hoja de excel con datos de los precios.</Form.Label>
            <Form.Control type="file" name="file" onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" onClick={handleSubmit}>
            Subir
          </Button>
          {
              wasFileSubmited ? (
                <ToastContainer className="p-3" position="bottom-end">
                  <Toast show={showSuccessToast} bg="success" onClose={toggleSuccessToast}>
                    <Toast.Header>Notificación de subida de archivo</Toast.Header>
                    <Toast.Body>El archivo a sido subido puede tardar un momento en reflejarse los cambios en la grafico.</Toast.Body>
                  </Toast>
                </ToastContainer>
              ) : (<></>)
          }
        </Form>
    )
}
