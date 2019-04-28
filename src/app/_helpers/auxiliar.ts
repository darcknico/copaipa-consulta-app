export class Auxiliar {
    public static convertBaseb64ToBlob(b64Data, contentType): Blob {
        contentType = contentType || '';
        const sliceSize = 512;
        b64Data = b64Data.replace(/^[^,]+,/, '');
        b64Data = b64Data.replace(/\s/g, '');
        const byteCharacters = window.atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
             const slice = byteCharacters.slice(offset, offset + sliceSize);
             const byteNumbers = new Array(slice.length);
             for (let i = 0; i < slice.length; i++) {
                 byteNumbers[i] = slice.charCodeAt(i);
             }
             const byteArray = new Uint8Array(byteNumbers);
             byteArrays.push(byteArray);
        }
       return new Blob(byteArrays, {type: contentType});
    }

    public static toParams(modelo){
        let obj = {};
        for(let key in modelo){
            obj[key] = String(modelo[key]);
        }
        return obj;
    }

    public static isNullorUndefined(x):boolean{
        if (x == null) {
            return true;
        }
    
        if (x === null) {
            return true;
        }
    
        if (typeof x === 'undefined') {
            return true;
        }
        return false;
    }
    
}