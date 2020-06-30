import React, {useCallback, useEffect, useState} from 'react';
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

  const handleUpload = (files) => {
    console.log("asda", files);

    return new Promise(async (resolve, reject) => {
      mutation({variables: {files, product_id: 1}});

      resolve(files);
    });
  }


  return (
    <>
    {/*<Form onFinish={handleChange}>*/}
      <Upload multiple
              // beforeUpload={handleBeforeUpload}
        action={handleUpload}
      >
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
      {/*</Form>*/}
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

