import React, {useCallback} from 'react';
import gql from 'graphql-tag';
import {Button, message, Upload, Form} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

import {useDropzone} from 'react-dropzone';
import {useMutation} from "@apollo/react-hooks";

const uploadFilesMutation = gql`
    mutation($files: [Upload!]!, $product_id: Int) {
        uploadFiles(files: $files, product_id: $product_id)
    }
`;

export default () => {
  const [mutation, {data}] = useMutation(uploadFilesMutation)
  const onDrop = useCallback(acceptedFiles => {
    console.log("acceptedFiles", acceptedFiles.fileList);
    return mutation({variables: {files: acceptedFiles.fileList, product_id: 1}});
    // acceptedFiles.forEach((file) => {
    //   console.log(file);
    //   return mutation({variables: {file, product_id: 1}});
    // })
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  // const handleUpload = (acceptedFiles) => {
  //   console.log("acceptedFiles", acceptedFiles.fileList);
  //   mutation({variables: {files: acceptedFiles.fileList, product_id: 1}})
  //     .then(() => console.log("mut"))
  //     .catch(err => console.log("nomut", err))
  // }

  const handleChange = (acceptedFiles) => {
    acceptedFiles.perventDefault()
    console.log("handleChange", acceptedFiles)
    mutation({variables: {files: acceptedFiles.fileList, product_id: 1}});
  }

  //
  // if (data) {
  //   if (data.uploadFile = 'file upload successful') {
  //     message.success(`${data.uploadFile} file uploaded successfully`)
  //   } else if (data.uploadFile = 'please select image') {
  //     message.error(`${data.uploadFile} file upload failed.`)
  //   }
  // }

  return (
    <>
      <Form onFinish={handleChange}>
        <Upload multiple >
          <Button>
            <UploadOutlined/> Select File
          </Button>
        </Upload>
        <Button
          type="primary"
          disabled={false}
          style={{marginTop: 26}}
        >

        </Button>
      </Form>
    </>
  );
  // console.log('data', getRootProps());
  // return (
  //   <>
  //     <div {...getRootProps()}>
  //       <input multiple={true} {...getInputProps()} />
  //       <p>Drag 'n' drop some files here, or click to select files</p>
  //     </div>
  //   </>
  // );

}

