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

var pizzaBook = []





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
    pizzaBook.forEach(function(pizza) {
      $('#pizzaList').append('<li>'+pizza.toppings+', '+pizza.size+', $'+pizza.cost()+'<input type="checkbox" class="'+pizza.toppings+'" value="checked"></li>')
    });
  });
  $('#startDelivery').click(function() {
    console.log($('#pizzaList').index($('#pizzaList input[type="radio"]:checked')));
    $('.address').show();
  })
});
