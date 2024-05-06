let url = '/list';

async function get()
{
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function add()
{
    let newName = document.getElementById("new").value;
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        });
        get().then(data => {
            display(data);
        });
    } catch (error) {
        console.log(error);
    }
}

async function del(id)
{
    try {
        let response = await fetch(url + '/' + id, { method: 'DELETE' });
        get().then(data => {
            display(data);
        });
    } catch (error) {
        console.log(error);
    }
}

async function check(id)
{
    try {
        let response = await fetch(url + '/' + id, { method: 'PUT'});
        get().then(data => {
            display(data);
        });
    } catch (error) {
        console.log(error);
    }
}

function display(products)
{
    let list = document.getElementById("list");
    list.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        let li = document.createElement("li");

        let checkButton = document.createElement("button");
        checkButton.innerHTML = "✓";
        checkButton.onclick = function() {
            check(products[i].id);
        };
        li.appendChild(checkButton);

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "🗑️";
        deleteButton.onclick = function() {
            del(products[i].id);
        };
        li.appendChild(deleteButton);

        let productName = document.createElement("span");
        productName.innerHTML = "  " + products[i].name;
        if (products[i].isCheck) {
            productName.style.textDecoration = "line-through";
        }
        li.appendChild(productName);

        list.appendChild(li);
    }
}

get().then(data => {
    display(data);
});