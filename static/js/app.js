$(function () {
  var init = function () {
    initBuyBtn();
    $('#addToCart').click(addProductToCart);
    $('#addProductPopup .count').change(calculateCost);
    $('#loadMore').click(loadMoreProducts);
  };

  var initBuyBtn = function () {
    $('.buy-btn').click(showAddProductPopup);
  };

  var showAddProductPopup = function () {
    var productId = $(this).attr('data-id-product');
    var product = $('#product' + productId);
    var productImg = product.find('.thumbnail img').attr('src');
    var productName = product.find('.name').text();
    var productCategory = product.find('.category').text();
    var productProduser = product.find('.produser').text();
    var productPrice = product.find('.price').text();

    $('#addProductPopup').attr('data-id-product', productId);
    $('#addProductPopup .product-image').attr('src', productImg);
    $('#addProductPopup .name').text(productName);
    $('#addProductPopup .category').text(productCategory);
    $('#addProductPopup .producer').text(productProduser);
    $('#addProductPopup .price').text(productPrice);
    $('#addProductPopup .count').val(1);
    $('#addProductPopup .cost').text(productPrice);

    $('#addToCartIndicator').addClass('hidden');
    $('#addToCart').removeClass('hidden');

    $('#addProductPopup').modal({
      show: true
    });
  };

  var addProductToCart = function () {
    var productId = $('#addProductPopup').attr('data-id-product');
    var productCount = $('#addProductPopup .count').val();
    $('#addToCartIndicator').removeClass('hidden');
    $('#addToCart').addClass('hidden');

    setTimeout(function () {
      var data = {
        totalCount: productCount,
        totalCost: 2000
      };

      $('#currentShoppingCart .total-count').text(data.totalCount);
      $('#currentShoppingCart .total-cost').text(data.totalCost);
      $('#currentShoppingCart').removeClass('hidden');
      $('#addProductPopup').modal('hide');
    }, 800);
  };

  var calculateCost = function () {
    var productPriceStr = $('#addProductPopup .price').text();
    var productPrice = parseFloat(productPriceStr.replace('₽', ''));
    var productCount = parseInt($('#addProductPopup .count').val());
    var productCountMin = parseInt($('#addProductPopup .count').attr('min'));
    var productCountMax = parseInt($('#addProductPopup .count').attr('max'));
    if (productCount >= productCountMin && productCount <= productCountMax) {
      var productsCost = productPrice * productCount;
      $('#addProductPopup .cost').text(productsCost + '₽');
    } else {
      $('#addProductPopup .count').val(1);
      $('#addProductPopup .cost').text(productPriceStr);
    }
  };

  var loadMoreProducts = function () {
    $('#loadMore').addClass('hidden');
    $('#loadMoreIndicator').removeClass('hidden');
    setTimeout(function () {
      $('#loadMoreIndicator').addClass('hidden');
      $('#loadMore').removeClass('hidden');
    }, 800);
  };

  init();
});
