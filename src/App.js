import React, {useCallback, useEffect, useState} from 'react';
import gql from 'graphql-tag';
import {Button, message, Upload, Form} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

import {useDropzone} from 'react-dropzone';
import {useMutation} from "@apollo/react-hooks";

const uploadFilesMutation = gql`
    mutation($files: [Upload!]!, $product_id: Int) {
        uploadFiles(files: $files, product_id: $product_id){
            url
        }
    }
`;
const uploadFileMutation = gql`
    mutation($file: Upload!, $product_id: Int) {
        uploadFile(file: $file, product_id: $product_id)
    }
`;
export default () => {
  const [mutation, {data}] = useMutation(uploadFilesMutation)
  const [uploading, setUploading] = useState(false)
  const [fileList, setFileList] = useState([])

  const handleUpload = () => {
    // console.log("asda", files);
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });
    setUploading(true)
    // mutation({variables: {files: fileList, product_id: 1}});

    return new Promise(async (resolve, reject) => {
      mutation({variables: {files: fileList, product_id: 1}});
      resolve(fileList);
    });
  }
  const props = {
    multiple: true,
    beforeUpload: file => {
      setFileList(fileList =>
        [...fileList, file],
      )
      return false;
    },
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList([...newFileList])
    },
    fileList
  }

  return (
    <>
      {/*<Form onFinish={handleChange}>*/}
      <Upload {...props}
      >
        <Button>
          <UploadOutlined/> Select Files
        </Button>
      </Upload>
      <Button
        type="primary"
        disabled={false}
        style={{marginTop: 26}}
        onClick={handleUpload}
      >
        start upload
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

