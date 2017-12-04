export function getCategories(url){

    if(!url) throw new Error("UrlNotFoundException");

    return new Promise((resolve,reject)=>{
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.onerror = (err)=>{
            reject(err);
        };

        xmlHttp.onload = (res)=>{
            if(xmlHttp.readyState === 4){
                resolve(JSON.parse(xmlHttp.responseText));
            }
        };

        xmlHttp.open("GET", url,true);
        xmlHttp.send();
    });
}