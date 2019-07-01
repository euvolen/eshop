const confirmation = (data)=>(
    `
    <h1> Dear, ${data.user.name}</h1>

    <p>Thank you vey much for purchase im our Eshop</p>

    <table className="table dataTable my-0" id="dataTable">
    <thead>
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
   ${content(data.cart) }

    </tbody>
    <p>One of our specialists will call you within two hours for final confirmation </p>
</table>


    `
)

const content = (data) => data.map(item => { 
  
    return (`<tr>
  <td>${item.name}</td>
  <td>${item.price}</td>

  <td>${item.quantity}</td>
  <td>$ ${item.price*item.quantity}</td>
</tr>`)})

module.exports = {
    confirmation
}