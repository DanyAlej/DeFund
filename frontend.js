var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["foundationName"] = document.getElementById("foundationName").value;
    formData["projectDescription"] = document.getElementById("projectDescription").value;
    formData["target"] = document.getElementById("target").value;
    formData["price"] = document.getElementById("price").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("foundationsList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.foundationName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.projectDescription;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.target;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.price;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                       <a onClick="onDelete(this)"><i class="fa fa-remove" style="margin-left:5px;color:red"></i></a>`;
}

function resetForm() {
    document.getElementById("foundationName").value = "";
    document.getElementById("projectDescription").value = "";
    document.getElementById("target").value = "";
    document.getElementById("price").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("foundationName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("projectDescription").value = selectedRow.cells[1].innerHTML;
    document.getElementById("target").value = selectedRow.cells[2].innerHTML;
    document.getElementById("price").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.foundationName;
    selectedRow.cells[1].innerHTML = formData.projectDescription;
    selectedRow.cells[2].innerHTML = formData.target;
    selectedRow.cells[3].innerHTML = formData.price;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("foundationsList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    if (document.getElementById("foundationName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}
