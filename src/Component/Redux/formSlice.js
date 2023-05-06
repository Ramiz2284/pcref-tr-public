import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";



const initialState = {

    computers:
    {
        brand: "",
        model: "",
        processor: "",
        memory: "",
        storage: "",
        description: "",
        price: "",
        image: "",
    },

    accessories:
    {
        video: '',
        motherboard: '',
        processor: '',
        memory: '',
        storage: '',
        price: '',
        power: '',
        case: '',
    },

    compimg:
    {
        image: '',

    },

    file: null,




};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {

        submitFile: (state, action) => {
            state.file = action.payload;

            const AWS = require('aws-sdk');
            const s3 = new AWS.S3({
                accessKeyId: 'AKIATXCA33DZ5QACK544',
                secretAccessKey: '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'
            });

            const uploadParams = {
                Bucket: 'sultan1',
                Key: state.file.name,
                Body: state.file
            };

            s3.upload(uploadParams, (err, data) => {
                if (err) {
                    console.log("Error", err);
                } if (data) {
                    console.log("Upload Success", data.Location);

                }
            });

        },




        submitForm: (state, action) => {
            try {
                const AWS = require('aws-sdk');

                const s3 = new AWS.S3({
                    accessKeyId: 'AKIATXCA33DZ5QACK544',
                    secretAccessKey: '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'
                });

                const bucketName = 'sultan1';
                const objectKey = state.file.name;

                const params = {
                    Bucket: bucketName,
                    Key: objectKey,
                    ACL: 'public-read'
                };

                s3.putObjectAcl(params, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(`https://s3.amazonaws.com/${bucketName}/${objectKey}`);
                    }
                });

                const url = `https://s3.amazonaws.com/${bucketName}/${objectKey}`

                state.computers = action.payload;

                state.computers.image = url;


                axios.post('https://63b877306f4d5660c6d748fa.mockapi.io/items', state.computers)
                    .then(response => console.log(response))



            } catch (error) {
                if (error) {
                    state.computers = action.payload;

                    axios.post('https://63b877306f4d5660c6d748fa.mockapi.io/items', state.computers)
                        .then(response => console.log('response ok'))
                        .catch(error => {
                            console.log(error);
                            throw new Error(error);
                        });
                }

            }
        },




        accessoriesForm: (state, action) => {

            try {
                const AWS = require('aws-sdk');

                const s3 = new AWS.S3({
                    accessKeyId: 'AKIATXCA33DZ5QACK544',
                    secretAccessKey: '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'
                });

                const bucketName = 'sultan1';
                const objectKey = state.file.name;

                const params = {
                    Bucket: bucketName,
                    Key: objectKey,
                    ACL: 'public-read'
                };

                s3.putObjectAcl(params, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {

                        console.log(`https://s3.amazonaws.com/${bucketName}/${objectKey}`);
                    }
                });

                const url = `https://s3.amazonaws.com/${bucketName}/${objectKey}`

                state.accessories = action.payload;

                state.accessories.image = url;

                axios.post('https://63b877306f4d5660c6d748fa.mockapi.io/accessories', state.accessories)


            } catch (error) {
                if (error) {
                    state.accessories = action.payload;

                    axios.post('https://63b877306f4d5660c6d748fa.mockapi.io/accessories', state.accessories)
                        .then(response => console.log(response))
                        .catch(error => console.log(error));

                }
            }
        },

    },
});



export const { submitForm, accessoriesForm, submitFile } = formSlice.actions;
export default formSlice.reducer;

