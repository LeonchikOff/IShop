$(function () {
      var main = function () {
        initBuyBtn();
        $('#addToCart').click(addProductToCart);
        $('#addProductPopup .count').change(calculateCost);
        $('#loadMore').click(loadMoreProducts);

        initSearchForm();
        $('#goSearch').click(goSearch);

        $('.remove-product').click(removeProductFromCart);

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

      var initSearchForm = function () {
        $('#allCategories').click(function () {
          $('.categories .search-option').prop('checked', $(this).is(':checked'));
        });

        $('.categories .search-option').click(function () {
          $('#allCategories').prop('checked', false);
        });

        $('#allProdusers').click(function () {
          $('.produsers .search-option').prop('checked', $(this).is(':checked'));
        });

        $('.produsers .search-option').click(function () {
          $('#allProdusers').prop('checked', false);
        });
      };

      var goSearch = function () {
        var isAllSelected = function (selector) {
          var uncheckedCounter = 0;
          $(selector).each(function (index, value) {
            if (!$(value).is(':checked')) {
              uncheckedCounter++;
            }
          });
          return uncheckedCounter === 0;
        }

        if (isAllSelected('.categories .search-option')) {
          $('.categories .search-option').prop('checked', false);
        }
        if (isAllSelected('.produsers .search-option')) {
          $('.produsers .search-option').prop('checked', false);
        }

        $('form.search').submit();
      };

      var confirm = function (msg, okFunction) {
        if (window.confirm(msg))
          okFunction();
      };

      var removeProductFromCart = function () {
        var btn = $(this);
        confirm('Are you sure?', function () {
          executeRemoveProduct(btn);
        });
      };

        var refreshTotalCost = function () {
          var totalCost = 0;
          $('#shoppingCart .product-item').each(function (index, value) {
            var productCount = parseInt($(value).find('.count').text());
            var productPrice = parseFloat($(value).find('.price').text().replace('₽', ' '));
            totalCost += productCount * productPrice;
          })
          $('#shoppingCart .total-cost').text(totalCost + '₽');
        };

        var executeRemoveProduct = function (btn) {
          var productId = btn.attr('data-id-product');
          var productCountForRemoving = btn.attr('data-count');
          btn.removeClass('btn-danger');
          btn.removeClass('btn');
          btn.addClass('load-indicator');
          var textBtn = btn.text();
          btn.text('');
          btn.off('click');

          setTimeout(function () {
            var data = {
              totalCount: 1,
              totalCost: 1
            };


            if (data.totalCount === 0) {
              window.location.href = 'products.html';
            } else {
              var idOfProductTableRowContainer = '#product' + productId;
              var previousCount = parseInt($(idOfProductTableRowContainer + ' .count').text());
              var removedCount = parseInt(productCountForRemoving);
              var currentCount = previousCount - removedCount;
              if (currentCount === 0) {
                $(idOfProductTableRowContainer).remove();
                // hardCode
                if ($('#shoppingCart .product-item').length === 0)
                  window.location.href = 'products.html';
                //
              } else {
                btn.removeClass('load-indicator');
                btn.addClass('btn');
                btn.addClass('btn-danger');
                btn.text(textBtn);
                btn.click(removeProductFromCart);
                $(idOfProductTableRowContainer + ' .count').text(currentCount);
                if (currentCount == 1) {
                  $(idOfProductTableRowContainer + ' a.remove-product.all').remove();
                }
              }
              refreshTotalCost();
            }
          }, 2000);
        };
  
        main();
      });
