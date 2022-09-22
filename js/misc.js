const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const validateName = (name) => {
    return String(name)
        .match(
            /^[A-Z][a-z]+\s[A-Z][a-z]+$/
        );
};

const validateAddress = (address) => {
    return String(address)
        .match(
            /^[0-9]+\s[A-Z][a-z]+\s[A-Z][a-z]+(\s[A-Z][a-z]+)?$/
        );
};

function validateUserData(user) {
    return validateEmail(user.email) &&
        validateName(user.name) &&
        validateAddress(user.address)
}

function ShowAlert(msg, duration, parent, color = 'red') {
    let newCol = document.createElement("td");
    newCol.setAttribute("style", `color:${color};`);
    newCol.innerHTML = msg;
    parent.appendChild(newCol)
    setTimeout(function () {
        newCol.parentNode.removeChild(newCol);
    }, duration);
    ;
}

function creatRowInnerHtml(rowData) {
    return `<tr class="data_row" id="${rowData.id}_data_row">
            <td>${rowData.id}</td>
            <td>${rowData.name}</td>
            <td>${rowData.email}</td>
            <td>${rowData.address}</td>
            <td><button class="data_row_button" id="${rowData.id}_edit" onclick="editClickHandler(this)">Edit</button></td>
            <td><button class="data_row_button" id="${rowData.id}_delete" onclick="delClickHandler(this)">Delete</button></td>
            </tr>`
}

function newUserDefault() {
    return `<td>Add</td>
            <td><input type="text" value="new"></td>
            <td><input type="text" value="user"></td>
            <td><input type="text" value="here."></td>
            <td><button onclick="saveNewClickHandler()">Save</button></td>
            <td><button onclick="cancelNewClickHandler()">Cancel</button></td>`
}

function updateFullTable(data) {
    let theTable = document.querySelector(".theTable")
    let data_rows = data.map(item => {
        return creatRowInnerHtml(item)
    }).join('');

    theTable.innerHTML = `<tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>E-MAIL</th>
                            <th>ADDRESS</th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr class="new_user_form">
                            ${newUserDefault()}
                        </tr>
                        ${data_rows}`
}

export {
    validateEmail,
    validateName,
    validateAddress,
    validateUserData,
    ShowAlert,
    creatRowInnerHtml,
    newUserDefault,
    updateFullTable

}