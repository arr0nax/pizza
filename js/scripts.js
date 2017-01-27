//////////////BACK END

function Pizza(size, sizeCost) {
  this.toppings = [];
  this.size = size;
  this.sizeCost = sizeCost;
}

Pizza.prototype.cost = function() {
  cost = this.toppings.length + this.sizeCost;
  return cost.toString();
}

Pizza.prototype.display = function() {
  return ' '+this.toppings+', '+this.size+', $'+this.cost()
}

var pizzaBook = []
var pizzaDeliveryBook = []





////////////FRONT END
$(function() {
  $('.pizza').submit(function(event) {
    event.preventDefault();
    var currentPizza = new Pizza()
    $('.toppings input[type="checkbox"]:checked').each(function() {
      currentPizza.toppings.push($(this).val());
    });
    currentPizza.sizeCost = parseInt($('.size input[type="radio"]:checked').val());
    currentPizza.size = $('.size input[type="radio"]:checked').attr('id');
    $('#price-display').text(currentPizza.cost());
    pizzaBook.push(currentPizza);
    $('#pizzaList').text('');
    for (var i=0;i<pizzaBook.length;i++) {
      $('#pizzaList').append('<li><input type="checkbox" id="pizza'+i+'" value="checked">'+pizzaBook[i].display()+'</li>')
    };
  });

  $('.pricecheck').click(function() {
    var currentPizza = new Pizza()
    $('.toppings input[type="checkbox"]:checked').each(function() {
      currentPizza.toppings.push($(this).val());
    });
    currentPizza.sizeCost = parseInt($('.size input[type="radio"]:checked').val());
    $('#price-display').text(currentPizza.cost());
  });

  $('#pizzaList').click(function() {
    $('#deliveryPizzas').text('')
    for (var i=0;i<pizzaBook.length;i++) {
      if($('#pizza'+i).prop('checked')) {
        $('#deliveryPizzas').append('<li>'+pizzaBook[i].display())
      };
    };
    $('#startDelivery').show();
  })



  $('#startDelivery').click(function() {
    for (var i=0;i<pizzaBook.length;i++) {
      if($('#pizza'+i).prop('checked')) {
        pizzaDeliveryBook.push(pizzaBook[i]);
      };
    };
    $('.address').show();
  });


  $('.address').submit(function(event) {
    event.preventDefault();
    var name = $('#name').val();
    var address = $('#address').val();
    var requests = $('#requests').val();
    $('.pizza, .address, .checkout').hide();
    $('.completed').show();
    $('#ordercompleted').text('Congratulations '+name+'! Your pizzas are on their way to '+address+'. We are doing our best to do this for you too: '+requests+'. See you soon!')
    for (var i=0;i<pizzaDeliveryBook.length;i++) {
      $('#finalorderlist').append('<li>'+pizzaDeliveryBook[i].display()+'</li>');
    };


  });
});
