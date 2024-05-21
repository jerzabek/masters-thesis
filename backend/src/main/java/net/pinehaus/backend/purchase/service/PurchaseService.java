package net.pinehaus.backend.purchase.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.pinehaus.backend.purchase.dto.CreatePurchaseDTO;
import net.pinehaus.backend.purchase.dto.PurchasedProductAttributeDTO;
import net.pinehaus.backend.purchase.dto.PurchasedProductDTO;
import net.pinehaus.backend.purchase.model.Purchase;
import net.pinehaus.backend.purchase.model.PurchasedProduct;
import net.pinehaus.backend.purchase.model.PurchasedProductAttribute;
import net.pinehaus.backend.purchase.repository.PurchaseRepository;
import net.pinehaus.backend.user.model.UserEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
public class PurchaseService {

  private final PurchaseRepository purchaseRepository;

  private final PurchasedProductService purchasedProductService;
  private final PurchasedProductAttributeService purchasedProductAttributeService;

  @Transactional
  public Purchase createPurchase(CreatePurchaseDTO request, UserEntity createdBy) {
    Purchase purchase = new Purchase();

    purchase.setCreatedBy(createdBy);
    purchase.setTimestamp(new Timestamp(System.currentTimeMillis()));

    for (PurchasedProductDTO productRequest : request.getProducts()) {
      PurchasedProduct purchasedProduct = purchasedProductService.createPurchasedProduct(purchase, productRequest);

      for (PurchasedProductAttributeDTO attributeRequest : productRequest.getAttributes()) {
        PurchasedProductAttribute attribute = purchasedProductAttributeService.createPurchasedProductAttribute(
            attributeRequest, purchasedProduct);
        attribute.setProduct(purchasedProduct);
        purchasedProduct.getAttributes().add(attribute);
      }

      purchase.getProducts().add(purchasedProduct);
    }

    return purchaseRepository.save(purchase);
  }

  public Optional<Purchase> getPurchaseById(int id) {
    return purchaseRepository.findById(id);
  }

  public List<Purchase> getPurchasesForUser(UUID userId) {
    return purchaseRepository.findByCreatedBy_Id(userId);
  }
}