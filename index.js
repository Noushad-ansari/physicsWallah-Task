var extArr = [];
let tableContainer = document.getElementById("table_Container");

let filesArray = []


// Main File FUnction
function fileInfo(event) {

    let files = event.files;
    
    filesArray = Array.from(files).map(file => {
        let fileName = file.name
        let fileSize = file.size
        let fileExt = getFileExtention(file)
        let lastModifiedDate = file.lastModifiedDate
        console.log(lastModifiedDate)
        return { fileName, fileSize, fileExt,lastModifiedDate }
    })

    let sortedFile = fileSortByExtention(filesArray)
    showTableUi(sortedFile)

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

    files.map((file,) => {

        // remove extention
        const lastDot = file.fileName.lastIndexOf(".");
        const fileName = file.fileName.substring(0, lastDot)


        const fileSize = getFileSize(file)

        // Create TR & TD Element
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        td1.innerHTML = fileName
        let td2 = document.createElement("td")
        td2.innerHTML = fileSize
        let td3 = document.createElement("td")
        td3.innerHTML = `<button  data-toggle="modal" data-target="#exampleModalCenter" id="infoBtn" class = "btn btn-info m-2" onmouseover= showInfoOnMouseOver(${JSON.stringify(file).split('"').join("&quot;")})  >File Info</button>`
        tr.appendChild(td1, td2, td3)
        tr.appendChild(td2)
        tr.appendChild(td3)

        // console.log(tr)
        table.appendChild(tr)
    });
    table_Container.appendChild(table)
}

function getFileSize(file) {


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

    return fileSize
}

//******************* */ showInformation on mouse Hover************************
function showInfoOnMouseOver(file) {
    let fileName, fileSize, fileExtention,lastModifiedDate
    const lastDot = file.fileName.lastIndexOf(".");
    fileName = file.fileName.substring(0, lastDot)
    fileSize = getFileSize(file)
    fileExtention = file.fileExt
    lastModifiedDate = file.lastModifiedDate

    // alert(`FileName : ${fileName} , FileSize: ${fileSize} , extention: ${fileExtention}`)

    let div = document.createElement("div")
    div.innerHTML = `<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-info" id="exampleModalLongTitle">File Info</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          

          <!-- //file info container -->
          <div class="main-content">
            <div class="header bg-gradient-primary pb-8 pt-2 pt-md-8">
              <div class="container-fluid">
                <div class="header-body">
                  <div class="row">
                    <div class="col-xl-3 col-lg-6">
                      <div class="card card-stats mb-4 mb-xl-0">
                        <div class="card-body">
                          <div class="row">
                            <div class="col">
                              <h5 class="card-title text-uppercase text-primary mb-0">File Name</h5>
                           
                              <span class="h2 font-weight-normal mb-0">${fileName}</span>
                            </div>
                            <div class="col-auto">
                              <h5 class="card-title text-uppercase text-success bmb-0">Extention</h5>
                              <span class="h2 font-weight-normal mb-0">.${fileExtention}</span>
    
                              <!-- <div class="icon icon-shape bg-info badge-info text-white rounded shadow">
                                <i class="fas fa-chart-bar p-2"> Extention &nbsp; .${fileExtention}</i>
                              </div> -->
                            </div>
                          </div>
                          <p class="mt-3 mb-0 text-muted text-sm">
                            <a href="../../../../../../../ALL CODING NOTES/C-language.pdf" class="text-danger mr-2" download><i class="fa fa-arrow-up"></i> File Size - ${fileSize}</a>
                           
                          </p>
                          <span class="text-nowrap text-muted">Last Modified: ${lastModifiedDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    <!-- ******* -->
    
            
    

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
      </div>`

    document.body.appendChild(div)

}


// Units
//a   0byte > fileSIze < 1kb  -- bytes
//b   1kb <= fileSize < 1mb      Kb
//c   1mb <=fileSize <  1gb      MB
//d   1gb <= fileSize < 1TB      GB
//e   1TB <= fileSize            TB
// 1gb <= fileSize < 1TB


