import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Button, message, Upload, Form} from 'antd';
import {UploadOutlined} from '@ant-design/icons';

import {useMutation} from "@apollo/react-hooks";

const uploadFilesMutation = gql`
    mutation($files: [Upload!]!, $product_id: Int) {
        uploadFiles(files: $files, product_id: $product_id){
            uid
            name
            status
            url
        }
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
    mutation({variables: {files: fileList, product_id: 1}});
    setFileList(() => [])
    // return new Promise(async (resolve, reject) => {
    //   mutation({variables: {files: fileList, product_id: 1}});
    // resolve(fileList);
    // });
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

  console.log('uploadFiles', data?.uploadFiles)

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

}

