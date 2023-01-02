import './Uploader.css'
import { Storage } from 'aws-amplify'
import { useState } from 'react'

async function getPresignedUrl (key) {
    const presignedUrl = await Storage.get(key);
    console.log(presignedUrl);
    return presignedUrl;
}

function Uploader () {

    const [presignedUrl, setPresignedUrl] = useState("");
    const [dataName, setDataName] = useState("No data set");
    const [isUrlSet, setIsUrlSet] = useState(false);

    const inputFile = (event) => {
        console.log(event.target.files[0]);
        if (event.target.files[0].size < 20000000) {
            console.log("Storage.put");
            console.log(event.target.files[0].name);
            console.log(event.target.files[0].type);
            const upload = Storage.put(event.target.files[0].name, event.target.files[0], {
                level: "public", 
                type: event.target.files[0].type,
                progressCallback(progress) {
                    let percentage = 100 * progress.loaded / progress.total;
                    console.log(`progress: ${percentage}%`);
                }
            }).then(result => {
                console.log(`Completed the upload of ${result.key}`);
                console.log(event.target.files[0].name);
                const presignedUrl2 = getPresignedUrl(event.target.files[0].name)
                  .then(result => {
                    setPresignedUrl(result);
                    setDataName(event.target.files[0].name);
                    setIsUrlSet(true);
                  });
            }).catch(event => {
                console.log("caught event")
                console.log(event);
            })
        }
    }

    return (
        <>
        <div className='Uploader'>
            <input type="file" onChange={inputFile} />
        </div>
        <div>
            {(isUrlSet)? <video controls src={presignedUrl}><p>Video playback is not supported</p></video> : `No data set`}
        </div>
        </>
    )
}

export default Uploader;