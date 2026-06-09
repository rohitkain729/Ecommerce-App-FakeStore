function bodyload(){
loadCategories();
LoadProduct("https://fakestoreapi.com/products");
GetCartCount();
}

function loadCategories(){
    fetch("https://fakestoreapi.com/products/categories")
    .then(function (resp){
    return resp.json()
    }).then(function(categories){
        categories.unshift("All"); 
        categories.map(function(category){
        var option=document.createElement('option');
        option.text = category.toUpperCase();
        option.value=category;
        option.style.borderRadius = "10px";
        option.style.padding = "20px";
        document.getElementById('lstCategories').appendChild(option);
        })
    })
}

function LoadProduct(url){
    document.querySelector('main').innerHTML="";
     fetch(url)
     .then(function(resp){
        return resp.json()
     }).then(function(product){
       product.map(function(product){
        var div = document.createElement('div');
        div.className='card p-2 m-2';
        div.style.width="200px";
        // div.style.height="450px";
        div.innerHTML=`
        <img src=${product.image} class="card-img-top" height="150">
         <div class="card-header overflow-hidden" style="height:130px">
    ${product.title}
  </div>
  <div class="card-body">
<dl>
<dt>Price</dt>
<dd>${product.price}</dd>
<dt>Rating</dt>
<dd>
<span class="badge bg-success p-1 rounded>${product.rating.rate} <span class="bi bi-skip-start-fill"></span></span>[${product.rating.count} Ratings]
</dd>
</dl>

  </div>
   <div class="card-footer">
    <button  onclick="AddClick(${product.id})"   class="btn btn-warning w-100 bi-cart4">Add to Cart</button>
  </div>
        `;
        document.querySelector('main').appendChild(div);
       })
     })
}

function CategoryChanged(){
    var categoryName=document.getElementById('lstCategories').value;
    if(categoryName ==='All'){

        LoadProduct(`https://fakestoreapi.com/products`);
    }else{
        LoadProduct(`https://fakestoreapi.com/products/category/${categoryName}`);
    }
}

var cartItems=[];

function AddClick(id){
    console.log(id);
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then(function(resp){
        return resp.json()})
    .then(function(product){
        console.log(product);
        cartItems.push(product);
        alert(`${product.title} \n Added to Cart`);
        GetCartCount();
    })
}

function GetCartCount(){
    document.getElementById("lblCount").innerHTML = cartItems.length;
}


function LoadCart(){
     document.querySelector("tbody").innerHTML="";
    cartItems.map(function(item){
        var tr=document.createElement("tr");
        var tdTitle=document.createElement("td");
        var tdPhoto=document.createElement("td");
        var tdPrice=document.createElement("td");

        tdTitle.innerHTML =item.title;
        tdPhoto.innerHTML =`<img src=${item.image} width="50" height="50">`;
        tdPrice.innerHTML=item.price;
       
        tr.appendChild(tdTitle); 
        tr.appendChild(tdPhoto); 
        tr.appendChild(tdPrice); 

        document.querySelector("tbody").appendChild(tr);
    })
}