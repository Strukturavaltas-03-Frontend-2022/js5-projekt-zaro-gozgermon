function deleteDataFromServer(row) {
    let fetchopt = {
        method: "DELETE",
        mode: "cors",
        cashe: "no-cache"
    }
    fetch(`http://localhost:3000/users/${row.children[0].innerHTML}`, fetchopt).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(data => { })
}

function saveNewDataToServer(row_data_obj) {
    let fetchopt = {
        method: "POST",
        mode: "cors",
        cashe: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(row_data_obj)
    }
    fetch(`http://localhost:3000/users`, fetchopt).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(data => { })
}

function updateDataOnServer(row_data_obj) {
    let fetchopt = {
        method: "PUT",
        mode: "cors",
        cashe: "no-cache",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(row_data_obj)
    }
    fetch(`http://localhost:3000/users/${row_data_obj.id}`, fetchopt).then(
        resp => resp.json(),
        err => console.error(err)
    ).then(data => { })
}

export {
    deleteDataFromServer,
    saveNewDataToServer,
    updateDataOnServer
}