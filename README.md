# Dragon and Eggs generator.

### Firebase env variables:
* `PROJECT_ID` : firebase project.
* `SERVICE_ACCOUNT_KEY` : Path string for firebase keys.
* `FIREBASE_KEY` : firebase database name.

### Blockchain env variables:
* `PROVIDER` : Blockchain node URL.
* `DRAGONZIL` : Main contract address.
* `PROXY` : Proxy contract address.

### [Cloudinary](https://cloudinary.com/) env variables:
* `CLOUD_NAME` : Cloudinary project name.
* `CLOUD_API_KEY` : Cloudinary API key.
* `CLOUD_API_SECRET` : Cloudinary API secret.

### Others env variables:
* `DATA_DIR` : Path for details dir.


### scripts.
Install all dependencies.
```bash
npm install
```

Start blockchain synchronization Blockchain with Firebase. 
```bash
$ npm run sync:eth
```

Run Eggs generate.
```bash
$ npm run egg:eth
```

Run Dragons generate.
```bash
$ npm run dragon:eth
```
