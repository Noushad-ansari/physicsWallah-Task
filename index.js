var extArr = [];
let tableContainer = document.getElementById("table_Container");
// let infoBtn = document.getElementById("infoBtn")


let filesArray = []


// Main File FUnction
function fileInfo(event) {

    let files = event.files;
    // console.log(files)

    filesArray = Array.from(files).map(file => {
        let fileName = file.name
        let fileSize = file.size
        let fileExt = getFileExtention(file)
        return { fileName, fileSize, fileExt }
    })

    let sortedFile = fileSortByExtention(filesArray)
    showTableUi(sortedFile)
    // console.log(sortedFile)
    // showInfoOnMouseOver(sortedFile)


}


// *************************File Shorting by Extention**************************
function fileSortByExtention(filesArray) {
    let sortedFileByExtention = filesArray.sort((a, b) => a.fileExt.localeCompare(b.fileExt));
    return sortedFileByExtention
}

// ***************************file extention extract**************************
function getFileExtention(file) {
    // console.log(file.fileName.split('.').pop())
    const lastDot = file.name.lastIndexOf(".");
    const ext = file.name.substring(lastDot + 1);
    // extArr.push(ext);
    // extArr.sort();
    return ext;
}

//9****************************SHow Table UI***************************
function showTableUi(files) {

   tableContainer.innerHTML = ' '
    let table = document.createElement("table")
    table.setAttribute("border", "border:2;");
    table.setAttribute("id", "table");
    // table.setAttribute("class", "table-responsive");
    table.style.borderCollapse = "collapse"
    table.innerHTML = ` <thead>
            <tr>
                 <th>File Name</th>
                 <th>File Size</th>
                 <th>File Info</th>
            </tr>
         </thead>`
    files.map((file, ) => {
        // remove extention
        const lastDot = file.fileName.lastIndexOf(".");
        const fileName = file.fileName.substring(0, lastDot)


        let fileSize = file.fileSize
        if (0 > fileSize || fileSize < 1024) {
            fileSize = fileSize + "Bytes"
        } else if (1024 <= fileSize && fileSize < 1048576) {
            fileSize = (fileSize / 1024).toFixed(2) + "KB"
        } else if (1048576 <= fileSize && fileSize < 1073741824) {
            fileSize = (fileSize / 1048576).toFixed(2) + "MB"
        } else if (1073741824 <= fileSize && fileSize < 1099511627776) {
            fileSize = (fileSize / 1073741824).toFixed(2) + "GB"
        } else if (1099511627776 < fileSize) {
            fileSize = (fileSize / 1099511627776).toFixed(2) + "TB"
        }

        // Create TR & TD Element
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        td1.innerHTML = fileName
        let td2 = document.createElement("td")
        td2.innerHTML = fileSize
        let td3 = document.createElement("td")
        td3.innerHTML = `<button id="infoBtn" class = "btn btn-info m-2" onClick= showInfoOnMouseOver(${JSON.stringify(files).split('"').join("&quot;")})  >File Info</button>`
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        // console.log(tr)
        table.appendChild(tr)
    });
    table_Container.appendChild(table)


}


//******************* */ showInformation on mouse Hover************************
function showInfoOnMouseOver(files) {
    let fileName, fileSize, fileExtention
    files.map(file => {
        const lastDot = file.fileName.lastIndexOf(".");
        fileName = file.fileName.substring(0, lastDot)
        fileSize = file.fileSize
        fileExtention = file.fileExt
    })

    alert(`FileName : ${fileName} , FileSize: ${fileSize} , extention: ${fileExtention}`)

    // <!-- Button trigger modal -->
    //   let div = document.createElement("div")
    //   div.innerHTML = `

    //   <!-- Modal -->
    //   <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    //   <div class="modal-dialog modal-dialog-centered" role="document">
    //     <div class="modal-content">
    //       <div class="modal-header">
    //         <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
    //         <button type="button" class="close" data-dismiss="modal" aria-label="Close">
    //           <span aria-hidden="true">&times;</span>
    //         </button>
    //       </div>
    //       <div class="modal-body">
    //         ...
    //       </div>
    //       <div class="modal-footer">
    //         <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    //         <button type="button" class="btn btn-primary">Save changes</button>
    //       </div>
    //     </div>
    //   </div>
    //   </div>`

    //   document.body.appendChild(div)

}


// Units
//a   0byte > fileSIze < 1kb  -- bytes
//b   1kb <= fileSize < 1mb      Kb
//c   1mb <=fileSize <  1gb      MB
//d   1gb <= fileSize < 1TB      GB
//e   1TB <= fileSize            TB
// 1gb <= fileSize < 1TB


