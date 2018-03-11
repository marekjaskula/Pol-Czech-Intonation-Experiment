/**
 * Created by Mazi on 2018-03-11.
 */

const blobToBase64 = (blob, callback) => {
    const reader = new FileReader();
    reader.onload = function() {
        const dataUrl = reader.result;
        const base64 = dataUrl.split(',')[1];
        callback(base64);
    };
    reader.readAsDataURL(blob);
};

export default blobToBase64;
