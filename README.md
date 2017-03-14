## Description
This Photo Uploader Web APP is designed by Yutong Huang (YutongHuangCMU). The framework used is MEAN Stack (MongoDB, Express, AngularJS, NodeJS), follow the MVC pattern. The UI design is based on Materialize.

## Basic Functionalites
### RESTful API endpoint 
1. "/photo_uploader_api/v1/upload" used to upload the photo.
    - User can only upload file with type as "image".
    - Photos are identified by names. 
    - The limit of file size is 50MB.
    - The uploaded photos are stored locally with the path "/public/static/uploaded_photos", and also the basic information of the photos are stored in MongoDB using mlab (Please see the file attached in the email for more information).
2. "/photo_uploader_api/v1/list" used to get the list of uploaded photos.
    - The list is ordered by the upload time of each photo.
    - List information is generated from mlab, might has some delay in updating.

## Additional Functionalities
1. User can use drag and drop to upload images.
2. A thumbnail picture will be automatically generated after a file has been chosen.

## Installation
1. Please clone the code locally.
2. Please download and install Node.js following the official guidance at https://nodejs.org/en/.
3. Please do ```npm install```in the repository that you clone the code to.
4. Please substitute the "PLEASE USE DATABASE INFORMATION HERE" in server.js file using the information attached in email.
5. Please use ```node server.js``` to run server. The port is on 3000.