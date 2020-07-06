import React, {useState} from "react";
import gql from "graphql-tag";
import {Button, message, Upload, Form, Input} from "antd";
import {UploadOutlined} from "@ant-design/icons";

import {useMutation} from "@apollo/react-hooks";

const uploadFilesMutation = gql`
    mutation($files: [Upload!]!, $product_id: Int) {
        uploadFiles(files: $files, product_id: $product_id) {
            uid
            name
            status
            url
        }
    }
`;

const CreateOneProduct = gql`
    mutation($data: ProductCreateInput!, $files: [Upload!]!) {
        createOneProduct(files: $files, data: $data) {
            id
            name
            url
            price

        }
    }
`;

export default () => {
  const [mutation, {data}] = useMutation(CreateOneProduct);
  const [uploading, setUploading] = useState(false);
  const [values, setValues] = useState(false);
  const [fileList, setFileList] = useState([]);

  let val = {...values, price: Number(values.price)};
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file);
    });
    setUploading(true);
    mutation({variables: {files: fileList, data: {...val}}});
    setFileList(() => []);
  };

  const props = {
    multiple: true,
    beforeUpload: (file) => {
      setFileList((fileList) => [...fileList, file]);
      return false;
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList([...newFileList]);
    },
    fileList,
  };
  console.log("values", values);
  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  };
  console.log("createOneProduct", data?.createOneProduct);

  return (
    <>
      {/*<Form onFinish={handleChange}>*/}
      <Input
        onChange={handleChange}
        name="name"
        placeholder="name"
        style={{width: "97%", marginRight: 8}}
      />
      <Input
        onChange={handleChange}
        name="url"
        placeholder="url"
        style={{width: "97%", marginRight: 8}}
      />
      <Input
        onChange={handleChange}
        name="icon"
        placeholder="icon"
        style={{width: "97%", marginRight: 8}}
      />
      <Input
        onChange={handleChange}
        type="number"
        name="price"
        placeholder="Price $"
        style={{width: "97%", marginRight: 8}}
      />
      <Input
        onChange={handleChange}
        name="description"
        placeholder="description"
        style={{width: "97%", marginRight: 8}}
      />
      <Upload {...props}>
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
};
