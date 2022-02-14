function fetchData(methode,url,cb){
    const xhr = new XMLHttpRequest()
    xhr.onreadystatechange =()=>{
        if(xhr.readyState === 4 && xhr.status === 200){
            const repoObj = JSON.parse(xhr.responseText)
            cb(repoObj)
        }

    }
    xhr.open(methode , url);
    xhr.send();
}

