if (document.readyState == 'loading'){
    document.addEventListener('DomcontentLoaded',ready)
}else{
    ready()
}

function ready() {
var Removecommandebutton = document.getElementsByClassName("button")
for (var i=0; i< Removecommandebutton.length; i++){
    var removebutton = Removecommandebutton[i]
    removebutton.addEventListener('click',Removecommande)    
    }
var quantityInput = document.getElementsByClassName('commande-quantité-input')
for (var i=0; i< quantityInput.length; i++){
    var input = quantityInput[i]
    input.addEventListener('change',quantityChanged)
    }
    var Addcommandebutton = document.getElementsByClassName("button")
    for (var i=0; i< Addcommandebutton.length; i++){
        var addbutton = Addcommandebutton[i]
        addbutton.addEventListener('click',AddCommandeClicked)    
        }

        document.getElementsByClassName('button-valider')[0].addEventListener('click' , validerClicked)
}
function validerClicked(){
    alert('Votre commande sera livré dans 30 minutes')
    var CommandeItem = document.getElementsByClassName('commande-items')[0]
    while (CommandeItem.hasChildNodes()){
        CommandeItem.removeChild(CommandeItem.firstChild)
    }
    UpdateCommande()
}


    function Removecommande(event){
        var buttonClicked = event.target   
        buttonClicked.parentElement.parentElement.remove()
        UpdateCommande()
    }

    function quantityChanged(event){
        var input = event.target
        if (isNaN(input.value)|| input.value <=0) {
            input.value = 1
        }
        UpdateCommande()
    } 
    function AddCommandeClicked(event){
        var addbutton = event.target
        var CommandeItems = addbutton.parentElement
        var Title = CommandeItems.getElementsByClassName('Title-pizza')[0].innerText
        var Price = CommandeItems.getElementsByClassName('price-pizza')[0].innerText
        var imageSrc = CommandeItems.getElementsByClassName('Img-pizza')[0].src
        addItemToCommande(Title,Price,imageSrc)
        UpdateCommande()
    }

    function addItemToCommande(Title, Price, imageSrc) {
        var commandeRow = document.createElement('div')
        commandeRow.classList.add('commande-row')
        var CommandeItem = document.getElementsByClassName('commande-items')[0]
    var CommandeItemNames = CommandeItem.getElementsByClassName('cart-item-title')
    for (var i = 0; i < CommandeItemNames.length; i++){
        if (CommandeItemNames[i].innerText == Title){
            alert('This item is already added to the cart')
            return
        }
    }
        var CommandeContents = `
        <div class="commande-row">
        <img class="Img-pizza" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${Title}</span>
    </div>
    <span class="price-pizza">${Price}</span>
    <div >
        <input class="commande-quantité-input" type="number" value="1">
        <button class="remove-button" type="button">REMOVE</button>
    </div>`
        commandeRow.innerHTML = CommandeContents
        CommandeItem.append(commandeRow)
        commandeRow.getElementsByClassName('remove-button')[0].addEventListener('click',
        Removecommande )
        commandeRow.getElementsByClassName('commande-quantité-input')[0].addEventListener('change' , quantityChanged)
}

    function UpdateCommande() {
        var commandeitemscontainer = document.getElementsByClassName('commande-items')[0]
        var commanderows = commandeitemscontainer.getElementsByClassName('commande-row')
        var total = 0
        for (var i = 0; i < commanderows.length; i++) {
            var commandeRow = commanderows[i]
            var priceElement = commandeRow.getElementsByClassName('price-pizza')[0]
           
            var quantityElement = commandeRow.getElementsByClassName('commande-quantité-input')[0]
            var price = parseFloat(priceElement.innerText)
            var quantity = quantityElement.value
            total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total-commande-price')[0].innerText = '$' + total
    }