package net.pinehaus.backend.purchase.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.pinehaus.backend.attribute.model.Attribute;
import net.pinehaus.backend.attribute.service.AttributeService;
import net.pinehaus.backend.purchase.dto.CreatePurchaseDTO;
import net.pinehaus.backend.purchase.dto.PurchasedProductDTO;
import net.pinehaus.backend.purchase.model.Purchase;
import net.pinehaus.backend.purchase.model.PurchasedProduct;
import net.pinehaus.backend.purchase.model.PurchasedProductAttribute;
import net.pinehaus.backend.purchase.repository.PurchaseRepository;
import net.pinehaus.backend.user.model.UserEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
@Slf4j
@RequiredArgsConstructor
public class PurchaseService {

  private final PurchaseRepository purchaseRepository;

  private final AttributeService attributeService;
  private final PurchasedProductService purchasedProductService;
  private final PurchasedProductAttributeService purchasedProductAttributeService;

  @Transactional
  public Purchase createPurchase(CreatePurchaseDTO request, UserEntity createdBy) {
    Purchase purchase = new Purchase();

    purchase.setCreatedBy(createdBy);
    purchase.setTimestamp(new Timestamp(System.currentTimeMillis()));

    double total = 0;

    for (PurchasedProductDTO productRequest : request.getProducts()) {
      PurchasedProduct purchasedProduct = purchasedProductService.createPurchasedProduct(purchase, productRequest);

      for (Entry<Integer, String> attributePair : productRequest.getAttributes().entrySet()) {
        Attribute attribute = attributeService.getById(attributePair.getKey())
                                              .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                  "Attribute not found"));

        if (!attribute.getOptions().contains(attributePair.getValue())) {
          throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid attribute value");
        }

        PurchasedProductAttribute purchasedProductAttribute = purchasedProductAttributeService.create(purchasedProduct,
            attribute.getName(), attributePair.getValue());

        purchasedProduct.getAttributes().add(purchasedProductAttribute);
      }

      total += purchasedProduct.getPrice() * purchasedProduct.getQuantity();
      total = Math.round(total * 100.0) / 100.0;

      purchase.getProducts().add(purchasedProduct);
    }

    purchase.setTotal(total);

    return purchaseRepository.save(purchase);
  }

  public Optional<Purchase> getPurchaseById(int id) {
    return purchaseRepository.findById(id);
  }

  public List<Purchase> getPurchasesForUser(UUID userId) {
    return purchaseRepository.findByCreatedBy_Id(userId);
  }
}