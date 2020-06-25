import React, {useCallback} from 'react';
import gql from 'graphql-tag';
import {useDropzone} from 'react-dropzone';
import {useMutation} from "@apollo/react-hooks";

const uploadFileMutation = gql`
    mutation($file: Upload!, $product_id: Int) {
        uploadFile(file: $file, product_id: $product_id)
    }
`;

export default () => {
  const [mutation] = useMutation(uploadFileMutation)
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      console.log(file);
      return mutation({variables: {file, product_id: 1}});
    })
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <>
      <div {...getRootProps()}>
        <input multiple={true} {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </>
  );
}

