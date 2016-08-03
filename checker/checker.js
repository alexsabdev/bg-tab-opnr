var techName = document.querySelector("#tr_data > tbody > tr:nth-child(1) > td:nth-child(2) > a")
                        .textContent
                        .slice(0, -6)
                        .trim()
                        .replace(/\s/g, "-");

function techlookup(techName) {
    var xhr = new XMLHttpRequest();
    var url = "http://techlookup.herokuapp.com/api/v1.0/" + techName;
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() {
        var data;
            status;
            res1 = '';
            res2 = '';
        if (xhr.readyState == 4) {
            status = xhr.status;
            if (status == 200) {
                data = JSON.parse(xhr.responseText);
                if (data.techsummary === "Not found") {
                    showNotFound();
                } else {
                    if (data.techsummary.builtwith !== undefined) {
                        res1 = data.techsummary.builtwith.samples;
                    }
                    if (data.techsummary.similartech !== undefined) {
                        res2 = data.techsummary.similartech.samples;
                    }
                    showTech(res1, res2);
                }
            } else {
                console.log(status);
            }
        }
    };
    xhr.send();
};
function showNotFound() {
    var techTable = document.querySelector("#tr_data > tbody");
    var tr = document.createElement("TR");
    tr.innerHTML =
    "<td>Competitors</td> \
    <td><strong>Not Found</strong><br /> \
    </td>"
    techTable.appendChild(tr);
}
function showTech(arr1, arr2) {

    var BW = "";
    var ST = "";
    if (arr1 !== undefined) {
        for(var i = 0; i < arr1.length; i++) {
            BW += '<a href="' + arr1[i] + '">' +
            arr1[i] + '</a><br />';
        }
    }
    if (arr2 !== undefined) {
        for(var i = 0; i < arr2.length; i++) {
            ST += '<a href="' + arr2[i] + '">' +
            arr2[i] + '</a><br />';
        }
    }
    var techTable = document.querySelector("#tr_data > tbody");
    var tr = document.createElement("TR");
    tr.innerHTML =
    "<td>Competitors</td> \
    <td><strong>BW:</strong><br />" + BW + " \
    <strong>ST:</strong><br />" + ST + "\
    </td>"
    techTable.appendChild(tr);
};

techlookup(techName);
