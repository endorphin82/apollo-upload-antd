import React, {useCallback} from 'react';
import gql from 'graphql-tag';
import {Button, message, Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import {useDropzone} from 'react-dropzone';
import {useMutation} from "@apollo/react-hooks";

const uploadFileMutation = gql`
    mutation($file: Upload!, $product_id: Int) {
        uploadFile(file: $file, product_id: $product_id)
    }
`;

export default () => {
  const [mutation, {data}] = useMutation(uploadFileMutation)
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      console.log(file);
      return mutation({variables: {file, product_id: 1}});
    })
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  if (data) {
    if (data.uploadFile = 'file upload successful') {
      message.success(`${data.uploadFile} file uploaded successfully`)
    } else if (data.uploadFile = 'please select image') {
      message.error(`${data.uploadFile} file upload failed.`)
    }
  }

  // return (
  //   <>
  //     <div {...getRootProps()} >
  //     <Upload  {...getInputProps()}>
  //       <Button>
  //         <UploadOutlined /> Click to Upload
  //       </Button>
  //     </Upload>
  //     </div>
  //   </>
  // );

  return (
    <>
      <div {...getRootProps()}>
        <input multiple={true} {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </>
  );

}

