import {
    validateEmail,
    validateName,
    validateAddress,
    validateUserData,
    ShowAlert,
    creatRowInnerHtml,
    newUserDefault,
} from "/js/misc.js"

import {
    deleteDataFromServer,
    saveNewDataToServer,
    updateDataOnServer
} from "/js/server.js"




function saveNewClickHandler() {
    const tableRow = document.querySelector(".new_user_form")
    const new_user_data = document.querySelectorAll(".new_user_form input")
    if (!isUnderEdit) {
        const tableRows = document.querySelectorAll(".theTable tr")
        let id_arr = []
        tableRows.forEach(row => id_arr.push(row.children[0].innerHTML))

        id_arr[0] = '0'//delete table header and new user 
        id_arr[1] = '0'

        id_arr = id_arr.map(item => parseInt(item))

        let new_id = Math.max(...id_arr) + 1

        const firstUserRow = document.querySelector(".theTable tr:nth-of-type(3)")

        let row_data_obj =
        {
            id: new_id,
            name: new_user_data[0].value,
            email: new_user_data[1].value,
            address: new_user_data[2].value
        }
        if (validateUserData(row_data_obj)) {
            const newUserRow = document.createElement('tr')
            firstUserRow.parentElement.insertBefore(newUserRow, firstUserRow);
            newUserRow.setAttribute("id", `${new_id}_data_row`);
            newUserRow.setAttribute("class", "data_row");
            newUserRow.innerHTML = creatRowInnerHtml(row_data_obj)
            tableRow.innerHTML = newUserDefault()
            saveNewDataToServer(row_data_obj)
            ShowAlert('Success', 5000, tableRow, 'green')

        }
        else {
            if (!validateName(row_data_obj.name)) {
                ShowAlert("Name is not valid!", 5000, tableRow)
            }
            if (!validateEmail(row_data_obj.email)) {
                ShowAlert("Email is not valid!", 5000, tableRow)
            }
            if (!validateAddress(row_data_obj.address)) {
                ShowAlert("Address is not valid!", 5000, tableRow)
            }
        }



    }
    else {
        ShowAlert("Először be kell fejezned az aktuális szerkesztést!", 5000, tableRow)
    }
}

function cancelNewClickHandler() {
    const tableRow = document.querySelector(".new_user_form")
    if (!isUnderEdit) {
        tableRow.innerHTML = newUserDefault()
    }
    else {
        ShowAlert("Először be kell fejezned az aktuális szerkesztést!", 5000, tableRow)
    }
}

function saveClickHandler(saveButton) {
    const tableRow = document.querySelector(`[id='${parseInt(saveButton.id)}_data_row']`)
    const row_data = document.querySelectorAll(`[id='${parseInt(saveButton.id)}_data_row'] input`)
    let row_data_obj =
    {
        id: parseInt(saveButton.id),
        name: row_data[0].value,
        email: row_data[1].value,
        address: row_data[2].value
    }
    if (validateUserData(row_data_obj)) {
        tableRow.innerHTML = creatRowInnerHtml(row_data_obj)
        isUnderEdit = false
        ShowAlert('Success', 5000, tableRow, 'green')
        updateDataOnServer(row_data_obj)
    }
    else {
        if (!validateName(row_data_obj.name)) {
            ShowAlert("Name is not valid!", 5000, tableRow)
        }
        if (!validateEmail(row_data_obj.email)) {
            ShowAlert("Email is not valid!", 5000, tableRow)
        }
        if (!validateAddress(row_data_obj.address)) {
            ShowAlert("Address is not valid!", 5000, tableRow)
        }
    }
}

function cancelClickHandler(cancelButton) {
    let tableRow = document.querySelector(`[id='${parseInt(cancelButton.id)}_data_row']`)

    tableRow.innerHTML = creatRowInnerHtml(rowDataForCancel)
    isUnderEdit = false
}

function editClickHandler(editButton) {

    const tableRow = document.querySelector(`[id='${parseInt(editButton.id)}_data_row']`)
    if (!isUnderEdit) {
        let row_data = document.querySelectorAll(`[id='${parseInt(editButton.id)}_data_row'] td`)

        rowDataForCancel.id = row_data[0].innerHTML
        rowDataForCancel.name = row_data[1].innerHTML
        rowDataForCancel.email = row_data[2].innerHTML
        rowDataForCancel.address = row_data[3].innerHTML


        tableRow.innerHTML = `<td>${row_data[0].innerHTML}</td>
                <td><input type="text" value="${row_data[1].innerHTML}"></td>
                <td><input type="text" value="${row_data[2].innerHTML}"></td>
                <td><input type="text" value="${row_data[3].innerHTML}"></td>
                <td><button class="data_row_button" id="${parseInt(editButton.id)}_save" onclick="saveClickHandler(this)">Save</button></td>
                <td><button class="data_row_button" id="${parseInt(editButton.id)}_cancel" onclick="cancelClickHandler(this)">Cancel</button></td>`
        isUnderEdit = true
    }
    else {

        ShowAlert("Először be kell fejezned az aktuális szerkesztést!", 5000, tableRow)

    }
}
function delClickHandler(delButton) {

    let tableRow = document.querySelector(`[id='${parseInt(delButton.id)}_data_row']`)
    //let tableRow=document.getElementById(`${parseInt(delButton.id)}_data_row`)
    if (!isUnderEdit) {
        tableRow.remove();
        deleteDataFromServer(tableRow);
    }
    else {
        ShowAlert("Először be kell fejezned az aktuális szerkesztést!", 5000, tableRow)
    }

}

export {saveNewClickHandler,
    cancelNewClickHandler,
    saveClickHandler,
    cancelClickHandler,
    editClickHandler,
    delClickHandler,
 }