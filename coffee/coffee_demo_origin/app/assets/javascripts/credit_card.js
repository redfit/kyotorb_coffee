this.CreditCard = (function() {

  function CreditCard(number) {
    this.number = number.replace(/[ -]/g, '');
  }

  CreditCard.prototype.validNumber = function() {
    var i, _i, n;
    total = 0;
    for (i = _i = this.number.length - 1; _i >= 0; i = --_i) {
      n = +this.number[i];
      if ((i + this.number.length) % 2 === 0) {
        n = n * 2 > 9 ? n * 2 - 9 : n * 2;
      }
      total += n;
    }
    return total % 10 === 0;
  };

  return CreditCard;
})();

$.fn.validateCreditCardNumber = function() {
  return this.each(function() {
    return $(this).blur(function() {
      var card;
      card = new CreditCard(this.value);
      if (!card.validNumber()) {
        return $(this).next('.error').text("Invalid card number.");
      } else {
        return $(this).next('.error').text("");
      }
    });
  });
};
