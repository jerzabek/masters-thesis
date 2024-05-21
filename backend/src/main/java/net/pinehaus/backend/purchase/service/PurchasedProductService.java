package net.pinehaus.backend.purchase.service;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.product.model.Product;
import net.pinehaus.backend.product.service.ProductService;
import net.pinehaus.backend.purchase.dto.PurchasedProductDTO;
import net.pinehaus.backend.purchase.model.Purchase;
import net.pinehaus.backend.purchase.model.PurchasedProduct;
import net.pinehaus.backend.purchase.repository.PurchasedProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class PurchasedProductService {

  private final ProductService productService;
  private final PurchasedProductRepository purchasedProductRepository;

  public PurchasedProduct createPurchasedProduct(Purchase purchase, PurchasedProductDTO request) {
    PurchasedProduct purchasedProduct = new PurchasedProduct();

    Optional<Product> productOptional = productService.getProductById(request.getProduct());

    if (productOptional.isEmpty()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found");
    }

    Product product = productOptional.get();

    purchasedProduct.setPurchase(purchase);
    purchasedProduct.setProduct(product);
    purchasedProduct.setProductName(product.getName());
    purchasedProduct.setPrice(product.getPrice());
    purchasedProduct.setQuantity(request.getQuantity());

    return purchasedProduct;
  }

}